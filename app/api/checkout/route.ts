import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(req: NextRequest) {
  const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

  try {
    const { items } = await req.json();

    const line_items = items.map((item: {
      name: string;
      size: string;
      addStand: boolean;
      standPrice: number;
      price: number;
      qty: number;
      persoText: string;
      image: string;
    }) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: `${item.name} (${item.size})${item.addStand ? " + Wood Stand" : ""}`,
          description: item.persoText ? `Personalization: ${item.persoText}` : undefined,
          images: [`https://dearly-co.vercel.app${item.image}`],
        },
        unit_amount: Math.round((item.price + (item.addStand ? item.standPrice : 0)) * 100),
      },
      quantity: item.qty,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${req.headers.get("origin")}/checkout/success`,
      cancel_url: `${req.headers.get("origin")}/cart`,
      shipping_address_collection: { allowed_countries: ["US"] },
      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Free shipping (orders over $50)",
          },
        },
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 799, currency: "usd" },
            display_name: "Standard shipping",
          },
        },
      ],
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Checkout failed" }, { status: 500 });
  }
}
