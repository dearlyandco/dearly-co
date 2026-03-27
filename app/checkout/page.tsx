"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  if (items.length === 0) {
    router.push("/cart");
    return null;
  }

  const handleCheckout = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      const data = await res.json();
      if (data.url) {
        window.location.href = data.url;
      } else {
        setError("Something went wrong. Please try again.");
        setLoading(false);
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">Dearly <span>&</span> Co.</Link>
        <nav className="site-nav">
          <Link href="/shop">Shop</Link>
          <Link href="/cart">Cart ({items.length})</Link>
        </nav>
      </header>

      <div style={{ maxWidth: 700, margin: "100px auto 60px", padding: "0 24px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "#5a3e36", fontWeight: 400, marginBottom: 8 }}>Order Summary</h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9e8579", marginBottom: 40, letterSpacing: "0.05em" }}>
          Review your items before continuing to payment
        </p>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, marginBottom: 40 }}>
          {items.map((item, i) => {
            const unitPrice = item.price + (item.addStand ? item.standPrice : 0);
            return (
              <div key={i} style={{ display: "flex", gap: 16, padding: "20px 0", borderBottom: "1px solid #e8ddd5" }}>
                <div style={{ position: "relative", width: 72, height: 88, flexShrink: 0, borderRadius: 4, overflow: "hidden", background: "#f5f0eb" }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 18, color: "#5a3e36", margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", margin: "3px 0 0", letterSpacing: "0.05em" }}>
                        {item.size}{item.addStand ? " · With Wood Stand" : ""} · Qty {item.qty}
                      </p>
                      {item.persoText && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#7a6358", margin: "6px 0 0", fontStyle: "italic" }}>
                          "{item.persoText}"
                        </p>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#5a3e36", fontWeight: 500, margin: 0 }}>
                      ${(unitPrice * item.qty).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ background: "#faf7f5", borderRadius: 8, padding: "24px", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#7a6358" }}>Subtotal</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#5a3e36" }}>${totalPrice.toFixed(2)}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 12 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#7a6358" }}>Shipping</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#5a3e36" }}>
              {totalPrice >= 50 ? "Free" : "Calculated at next step"}
            </span>
          </div>
          <div style={{ borderTop: "1px solid #e8ddd5", paddingTop: 12, display: "flex", justifyContent: "space-between" }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#5a3e36", fontWeight: 500 }}>Total</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 16, color: "#5a3e36", fontWeight: 500 }}>${totalPrice.toFixed(2)}</span>
          </div>
        </div>

        {error && (
          <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#C9897A", marginBottom: 16, textAlign: "center" }}>{error}</p>
        )}

        <button onClick={handleCheckout} disabled={loading}
          style={{ width: "100%", padding: "16px 0", background: loading ? "#9e8579" : "#5a3e36", color: "#fff", border: "none", borderRadius: 4, fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: loading ? "not-allowed" : "pointer", transition: "background 0.2s" }}>
          {loading ? "Redirecting to Payment..." : "Continue to Payment →"}
        </button>

        <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", textAlign: "center", marginTop: 16, letterSpacing: "0.05em" }}>
          Secure payment powered by Stripe · SSL encrypted
        </p>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Link href="/cart" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "underline" }}>
            ← Back to Cart
          </Link>
        </div>
      </div>
    </>
  );
}
