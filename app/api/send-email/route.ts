import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface OrderItem {
  name: string;
  qty: number;
  price: number;
}

export async function POST(req: NextRequest) {
  try {
    const { to, orderId, customerName, items, total }: {
      to: string;
      orderId: string;
      customerName: string;
      items: OrderItem[];
      total: number;
    } = await req.json();

    const itemRows = items.map((item) => `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5;">
          <strong>${item.name}</strong>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5; text-align: center; color: #7a6358;">
          Qty: ${item.qty}
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5; text-align: right;">
          $${(item.price * item.qty).toFixed(2)}
        </td>
      </tr>
    `).join("");

   const shipping = total - items.reduce((sum: number, item: { price: number; qty: number }) => sum + item.price * item.qty, 0);
   const shippingRow = shipping > 0 ? `
      <tr>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5;">
          <strong>Shipping</strong>
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5; text-align: center; color: #7a6358;">
          —
        </td>
        <td style="padding: 12px 0; border-bottom: 1px solid #e8ddd5; text-align: right;">
          $${shipping.toFixed(2)}
        </td>
      </tr>
    ` : '';
    await resend.emails.send({
      from: "Dearly & Co. <no-reply@dearlyandco.com>",
      to,
      subject: `[Dearly & Co.] Order Confirmation — Order #${orderId}`,
      html: `
        <div style="max-width: 600px; margin: 0 auto; font-family: Georgia, serif; color: #5a3e36;">

          <div style="text-align: center; padding: 40px 0; border-bottom: 1px solid #e8ddd5;">
            <h1 style="font-size: 28px; font-weight: 400; letter-spacing: 0.08em; margin: 0;">Dearly &amp; Co.</h1>
          </div>

          <div style="padding: 40px 0;">
            <h2 style="font-size: 22px; font-weight: 400; margin-top: 0;">Thank you, ${customerName}!</h2>
            <p style="color: #7a6358; line-height: 1.9; margin-top: 0;">
              Your order has been received.<br/>
              We'll send you a digital proof within 1–2 business days for your approval before we begin production.
            </p>

            <p style="font-size: 13px; color: #9e8579; margin-bottom: 24px;">Order #: <strong>${orderId}</strong></p>

            <table style="width: 100%; border-collapse: collapse;">
              <thead>
                <tr style="border-bottom: 2px solid #d9cec8;">
                  <th style="padding: 8px 0; text-align: left; font-weight: 600; font-size: 13px; color: #9e8579;">Item</th>
                  <th style="padding: 8px 0; text-align: center; font-weight: 600; font-size: 13px; color: #9e8579;">Qty</th>
                  <th style="padding: 8px 0; text-align: right; font-weight: 600; font-size: 13px; color: #9e8579;">Amount</th>
                </tr>
              </thead>
              <tbody>
                ${itemRows}${shippingRow}
              </tbody>
            </table>

            <div style="margin-top: 24px; text-align: right; padding-top: 16px; border-top: 2px solid #d9cec8;">
              <p style="font-size: 17px; font-weight: 600; margin: 0;">
                Total: $${total.toFixed(2)}
              </p>
            </div>
          </div>

          <div style="background: #faf7f5; padding: 24px; border-radius: 8px; margin-bottom: 40px;">
            <h3 style="font-size: 15px; font-weight: 600; margin-top: 0; color: #5a3e36;">What happens next?</h3>
            <ol style="color: #7a6358; line-height: 2.2; padding-left: 20px; margin: 0;">
              <li>We'll create a digital proof and send it to you by email</li>
              <li>Review and approve your proof</li>
              <li>Production begins after approval (3–5 business days)</li>
              <li>Your order ships in custom protective packaging</li>
            </ol>
          </div>

          <div style="text-align: center; padding: 24px 0; border-top: 1px solid #e8ddd5; color: #9e8579; font-size: 12px; line-height: 2;">
            <p style="margin: 0;">Questions? Reply to this email or reach us at <a href="mailto:hello@dearlyandco.com" style="color: #9e8579;">hello@dearlyandco.com</a></p>
            <p style="margin: 0;">Dearly &amp; Co. · Handcrafted with love</p>
          </div>

        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("[send-email]", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
