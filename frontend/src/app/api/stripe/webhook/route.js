import { NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  apiVersion: '2024-11-20.acacia',
});

export async function POST(request) {
  const body = await request.text();
  const signature = request.headers.get('stripe-signature');
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!webhookSecret) {
    console.error('STRIPE_WEBHOOK_SECRET is not set');
    return NextResponse.json(
      { error: 'Webhook secret not configured' },
      { status: 500 }
    );
  }

  let event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error('Webhook signature verification failed:', err.message);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  if (event.type !== 'checkout.session.completed') {
    return NextResponse.json({ received: true });
  }

  const session = event.data.object;

  try {
    const cartStr = session.metadata?.cart;
    if (!cartStr) {
      console.error('No cart in session metadata:', session.id);
      return NextResponse.json({ received: true });
    }

    const cart = JSON.parse(cartStr);
    const address = session.customer_details?.address;
    const name = session.customer_details?.name || session.customer_details?.email || 'Customer';

    if (!address) {
      console.error('No address in checkout session:', session.id);
      return NextResponse.json({ received: true });
    }

    const recipient = {
      name,
      address1: address.line1 || '',
      address2: address.line2 || null,
      city: address.city || '',
      state_code: address.state || '',
      country_code: address.country || '',
      zip: address.postal_code || '',
    };

    const items = cart.map((item) => ({
      variant_id: item.printfulVariantId,
      quantity: item.quantity,
    }));

    const printfulRes = await fetch('https://api.printful.com/orders', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.PRINTFUL_API_KEY}`,
      },
      body: JSON.stringify({ recipient, items }),
    });

    if (!printfulRes.ok) {
      const errText = await printfulRes.text();
      console.error('Printful order failed:', printfulRes.status, errText);
      return NextResponse.json(
        { error: 'Fulfillment request failed' },
        { status: 502 }
      );
    }

    const printfulOrder = await printfulRes.json();
    console.log('Printful order created:', session.id, printfulOrder.id);
    return NextResponse.json({ received: true });
  } catch (err) {
    console.error('Webhook handler error:', err);
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    );
  }
}
