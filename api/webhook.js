import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

function getRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (chunk) => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).end();
  }

  const rawBody = await getRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      rawBody,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return res.status(400).json({ error: 'Invalid signature' });
  }

  if (event.type === 'checkout.session.completed') {
    const session = event.data.object;

    // Only process subscription checkouts
    if (session.mode !== 'subscription') {
      return res.status(200).json({ received: true });
    }

    const email = session.customer_details?.email;
    const restaurantName =
      session.metadata?.restaurant_name || '';

    if (!email) {
      console.error('No email in checkout session:', session.id);
      return res.status(200).json({ received: true });
    }

    // Invite the restaurateur on app.so-miam.com with Gusto-only access
    try {
      const inviteRes = await fetch(
        `${process.env.PLATFORM_URL || 'https://app.so-miam.com'}/api/auth/invite-restaurateur`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-invite-secret': process.env.INVITE_SECRET,
          },
          body: JSON.stringify({
            email,
            hasFormation: false,
          }),
        }
      );

      const result = await inviteRes.json();

      if (!inviteRes.ok) {
        // 409 = already registered — not an error, just skip
        if (inviteRes.status === 409) {
          console.log(`User already exists: ${email}`);
        } else {
          console.error('Invite failed:', result);
        }
      } else {
        console.log(`Invited ${email} (Gusto-only) — userId: ${result.userId}`);
      }
    } catch (err) {
      console.error('Failed to call invite API:', err.message);
    }
  }

  return res.status(200).json({ received: true });
}
