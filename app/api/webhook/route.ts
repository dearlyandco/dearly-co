import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
  const body = await req.text();
  const sig = req.headers.get("stripe-signature")!;

  let event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    if (session.payment_status !== "paid") {
    console.log("[webhook] skipping, payment_status:", session.payment_status);  
    return NextResponse.json({ received: true });
  }
  console.log("[webhook] payment_status:", session.payment_status);   
    const customerEmail = session.customer_details?.email ?? session.customer_email;
    console.log("[webhook] customerEmail:", customerEmail);
    const customerName = session.customer_details?.name;
    const orderId = session.id.slice(-8).toUpperCase();
    const total = (session.amount_total ?? 0) / 100;
    const items = JSON.parse(session.metadata?.items ?? "[]");
    console.log("[webhook] items:", JSON.stringify(items));
    if (customerEmail) {
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ to: customerEmail, customerName, items, total, orderId }),
      });
    }
  }

  return NextResponse.json({ received: true });
}
