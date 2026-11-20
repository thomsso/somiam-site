import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { restaurantName: typedName, affiliateCode, diagnosticId: rawDiagnosticId } = req.body || {};
    const partnerCode = typeof affiliateCode === 'string' && /^[a-z0-9]{12}$/.test(affiliateCode) ? affiliateCode : null;

    // Essai lance depuis le diagnostic gratuit : Gusto rend l'e-mail deja
    // donne (pre-rempli chez Stripe) et note l'ouverture du paiement. Si Gusto
    // ne repond pas, l'essai s'ouvre quand meme, sans pre-remplissage.
    let diagnosticId = null, customerEmail = null, restaurantName = typedName;
    if (typeof rawDiagnosticId === 'string' && /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/.test(rawDiagnosticId) && process.env.INVITE_SECRET) {
      try {
        const lookup = await fetch(`${(process.env.PLATFORM_URL || 'https://app.so-miam.com').replace(/\/$/, '')}/api/public/diagnostic/${rawDiagnosticId}/checkout`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'x-invite-secret': process.env.INVITE_SECRET },
          body: '{}',
          signal: AbortSignal.timeout(8000),
        });
        if (lookup.ok) {
          const found = await lookup.json();
          diagnosticId = rawDiagnosticId;
          if (typeof found.email === 'string' && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(found.email)) customerEmail = found.email;
          if (typeof found.restaurantName === 'string') restaurantName = found.restaurantName;
        }
      } catch (err) {
        console.error('Diagnostic lookup error:', err.message);
      }
    }
    const site = process.env.SITE_URL || 'https://www.so-miam.com';

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [
        {
          price: process.env.STRIPE_PRICE_ID,
          quantity: 1,
        },
      ],
      subscription_data: {
        trial_period_days: 14,
        metadata: {
          restaurant_name: typeof restaurantName === 'string' ? restaurantName.trim().slice(0, 200) : '',
          source: 'gusto-landing-page',
          ...(partnerCode ? { affiliate_code: partnerCode } : {}),
          ...(diagnosticId ? { diagnostic_id: diagnosticId } : {}),
        },
      },
      metadata: {
        restaurant_name: typeof restaurantName === 'string' ? restaurantName.trim().slice(0, 200) : '',
        ...(partnerCode ? { affiliate_code: partnerCode } : {}),
        ...(diagnosticId ? { diagnostic_id: diagnosticId } : {}),
      },
      ...(customerEmail ? { customer_email: customerEmail } : {}),
      custom_text: {
        submit: { message: '0 € aujourd’hui. Ton essai dure 14 jours et tu arrêtes en 1 clic depuis ton compte, quand tu veux.' },
      },
      success_url: `${site}/gusto-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: diagnosticId
        ? `${site}/gusto/diagnostic?d=${diagnosticId}`
        : `${site}/gusto${partnerCode ? '?ref=' + encodeURIComponent(partnerCode) : ''}`,
      locale: 'fr',
      allow_promotion_codes: true,
      // 69 EUR HT : Stripe Tax ajoute la TVA d'apres l'adresse de facturation
      // (obligatoire). Un restaurateur est une entreprise : numero de TVA propose.
      automatic_tax: { enabled: true },
      billing_address_collection: 'required',
      tax_id_collection: { enabled: true },
      integration_identifier: 'gusto_landing_checkout_kX9mQ2wL',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la création du paiement' });
  }
}
