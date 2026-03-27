"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "../../context/CartContext";

export default function SuccessPage() {
  const { clearCart } = useCart();

  useEffect(() => {
    clearCart();
  }, []);

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">Dearly <span>&</span> Co.</Link>
        <nav className="site-nav">
          <Link href="/shop">Shop</Link>
        </nav>
      </header>

      <div style={{ textAlign: "center", padding: "120px 24px", maxWidth: 540, margin: "0 auto" }}>
        <div style={{ fontSize: 48, marginBottom: 24 }}>🎉</div>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 40, color: "#5a3e36", fontWeight: 400, marginBottom: 16 }}>
          Thank You!
        </h1>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 14, color: "#7a6358", lineHeight: 1.8, marginBottom: 12 }}>
          Your order has been placed successfully. We'll send a digital proof within 1–2 business days for your approval before we begin production.
        </p>
        <p style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#9e8579", marginBottom: 40 }}>
          Check your email for your order confirmation.
        </p>
        <Link href="/shop"
          style={{ fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff", background: "#5a3e36", padding: "14px 32px", borderRadius: 4, textDecoration: "none" }}>
          Continue Shopping
        </Link>
      </div>
    </>
  );
}
