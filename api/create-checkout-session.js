import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  try {
    const { membership, userId } = req.body;

    const priceMap = {
      adulto: { recurring: 'abonado_adulto', registration: 'abonado_adulto_registration' },
      padel: { recurring: 'abonado_padel', registration: 'abonado_padel_registration' },
      gym: { recurring: 'abonado_gym', registration: 'abonado_gym_registration' },
      gym_clases: { recurring: 'abonado_gym_clases', registration: 'abonado_gym_clases_registration' },
      clases_2horas: { recurring: 'abonado_clases_2horas', registration: 'abonado_clases_2horas_registration' },
      clases_ilimitado: { recurring: 'abonado_clases_ilimitado', registration: 'abonado_clases_ilimitado_registration' },
      completo_dirigidas_ilimitadas: { recurring: 'abonado_completo_dirigidas_ilimitadas', registration: 'abonado_completo_dirigidas_ilimitadas_registration' }
    };

    const selectedPrices = priceMap[membership];
    if (!selectedPrices) {
      return res.status(400).json({ error: 'Invalid membership selected' });
    }

    const mode = "subscription";

    const sessionParams = {
      ui_mode: "hosted_page",
      billing_address_collection: "auto",
      phone_number_collection: { enabled: false },
      automatic_tax: { enabled: false },
      allow_promotion_codes: false,
      submit_type: "auto",
      integration_identifier: "hosted_web_0001",
      origin_context: "web",
      mode: mode,
      success_url: `${process.env.DOMAIN}/dashboard.html?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.DOMAIN}/join.html`,
      line_items: [
        { price: selectedPrices.recurring, quantity: 1 },
        { price: selectedPrices.registration, quantity: 1 }
      ],
      // Associate checkout with our database user
      client_reference_id: userId || undefined, 
      metadata: {
        membership_type: membership
      }
    };

    if (mode === "subscription") {
      sessionParams.payment_method_collection = "always";
    }

    const session = await stripe.checkout.sessions.create(sessionParams);
    
    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
}
