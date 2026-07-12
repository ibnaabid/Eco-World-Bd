// app/api/checkout_sessions/route.ts
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(request: NextRequest) {
  try {
    const { items, orderId } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items in cart" }, { status: 400 });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: items.map((item: any) => ({
        price_data: {
          currency: "bdt",
          product_data: {
            name: item.productName,
            images: item.image ? [item.image] : [],
            description: item.parcelType || "",
          },
          unit_amount: Math.round(item.price * 100), // paisa
        },
        quantity: item.quantity || 1,
      })),
      mode: "payment",
      success_url: `${process.env.BETTER_AUTH_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.BETTER_AUTH_URL}/cart?canceled=true`,
      metadata: {
        orderId: orderId || `ORD-${Date.now()}`,
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}