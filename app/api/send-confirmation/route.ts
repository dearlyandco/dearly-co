import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(req: NextRequest) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const { customerEmail, customerName, items, total, orderId } = await req.json();

    const itemRows = items.map((item: {
      name: string;
      size: string;
      addStand: boolean;
      qty: number;
      price: number;
      standPrice: number;
      persoText: string;
    }) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5;">
          <strong>${item.name}</strong> (${item.size})${item.addStand ? " + Wood Stand" : ""}<br/>
          <span style="color: #9e8579; font-size: 13px; font-style: italic;">"${item.persoText}"</span>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5; text-align: right;">
          Qty: ${item.qty}<br/>
          $${((item.price + (item.addStand ? item.standPrice : 0)) * item.qty).toFixed(2)}
        </td>
      </tr>
    `).join("");

    await resend.emails.send({
      from: "Dearly & Co. <no-reply@dearlyandco.com>",
      to: customerEmail,
      subject: "Your Dearly & Co. Order Confirmation 🎉",
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif; color: #5a3e36;">
          <div style="text-align: center; padding: 40px 0; border-bottom: 1px solid #e8ddd5;">
            <h1 style="font-size: 28px; font-weight: 400; letter-spacing: 0.05em;">Dearly & Co.</h1>
          </div>

          <div style="padding: 40px 0;">
            <h2 style="font-size: 22px; font-weight: 400;">Thank you, ${customerName}! 🎉</h2>
            <p style="color: #7a6358; line-height: 1.8;">
              Your order has been received. We'll send you a digital proof within 1–2 business days for your approval before we begin production.
            </p>

            <p style="font-size: 13px; color: #9e8579;">Order #${orderId}</p>

            <table style="width: 100%; border-collapse: collapse; margin-top: 24px;">
              ${itemRows}
            </table>

            <div style="margin-top: 24px; text-align: right;">
              <p style="font-size: 16px; font-weight: 600;">Total: $${total}</p>
            </div>
          </div>

          <div style="background: #faf7f5; padding: 24px; border-radius: 8px; margin-bottom: 40px;">
            <h3 style="font-size: 16px; font-weight: 400; margin-top: 0;">What happens next?</h3>
            <ol style="color: #7a6358; line-height: 2; padding-left: 20px;">
              <li>We'll create a digital proof of your order</li>
              <li>You'll receive an email with the proof for approval</li>
              <li>Once approved, production begins (3–5 business days)</li>
              <li>Your order ships in custom protective packaging</li>
            </ol>
          </div>

          <div style="text-align: center; padding: 24px 0; border-top: 1px solid #e8ddd5; color: #9e8579; font-size: 12px;">
            <p>Questions? Reply to this email or contact us at hello@dearlyandco.com</p>
            <p>Dearly & Co. · Handcrafted with love</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 });
  }
}
