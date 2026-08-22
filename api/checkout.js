import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { restaurantName } = req.body || {};

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
          restaurant_name: restaurantName || '',
          source: 'gusto-landing-page',
        },
      },
      metadata: {
        restaurant_name: restaurantName || '',
      },
      success_url: `${process.env.SITE_URL || 'https://www.so-miam.com'}/gusto-success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.SITE_URL || 'https://www.so-miam.com'}/gusto`,
      locale: 'fr',
      allow_promotion_codes: true,
      integration_identifier: 'gusto_landing_checkout_kX9mQ2wL',
    });

    return res.status(200).json({ url: session.url });
  } catch (err) {
    console.error('Stripe checkout error:', err.message);
    return res.status(500).json({ error: 'Erreur lors de la création du paiement' });
  }
}
