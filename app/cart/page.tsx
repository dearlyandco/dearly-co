"use client";

import { useCart } from "../context/CartContext";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function CartPage() {
  const { items, removeItem, updateQty, totalPrice, clearCart } = useCart();
  const router = useRouter();

  if (items.length === 0) {
    return (
      <>
        <header className="site-header">
          <Link href="/" className="site-logo">Dearly <span>&</span> Co.</Link>
          <nav className="site-nav">
            <Link href="/shop">Shop</Link>
            <Link href="/#about">Our Story</Link>
            <Link href="/#how">How It Works</Link>
          </nav>
        </header>
        <div style={{ textAlign: "center", padding: "120px 24px" }}>
          <p style={{ fontFamily: "var(--font-display)", fontSize: 28, color: "#5a3e36", marginBottom: 16 }}>Your cart is empty</p>
          <Link href="/shop" style={{ fontFamily: "var(--font-body)", fontSize: 13, letterSpacing: "0.1em", textTransform: "uppercase", color: "#5a3e36", borderBottom: "1px solid #5a3e36", paddingBottom: 2 }}>
            Continue Shopping
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <header className="site-header">
        <Link href="/" className="site-logo">Dearly <span>&</span> Co.</Link>
        <nav className="site-nav">
          <Link href="/shop">Shop</Link>
          <Link href="/#about">Our Story</Link>
          <Link href="/#how">How It Works</Link>
        </nav>
      </header>

      <div style={{ maxWidth: 860, margin: "100px auto 60px", padding: "0 24px" }}>
        <h1 style={{ fontFamily: "var(--font-display)", fontSize: 36, color: "#5a3e36", fontWeight: 400, marginBottom: 40 }}>Your Cart</h1>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          {items.map((item, i) => {
            const unitPrice = item.price + (item.addStand ? item.standPrice : 0);
            return (
              <div key={i} style={{ display: "flex", gap: 20, padding: "24px 0", borderBottom: "1px solid #e8ddd5" }}>
                <div style={{ position: "relative", width: 90, height: 110, flexShrink: 0, borderRadius: 6, overflow: "hidden", background: "#f5f0eb" }}>
                  <Image src={item.image} alt={item.name} fill style={{ objectFit: "cover" }} />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                    <div>
                      <p style={{ fontFamily: "var(--font-display)", fontSize: 20, color: "#5a3e36", fontWeight: 400, margin: 0 }}>{item.name}</p>
                      <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#9e8579", margin: "4px 0 0", letterSpacing: "0.05em" }}>
                        {item.size}{item.addStand ? " · With Wood Stand" : ""}
                      </p>
                      {item.persoText && (
                        <p style={{ fontFamily: "var(--font-body)", fontSize: 12, color: "#7a6358", margin: "6px 0 0", fontStyle: "italic" }}>
                          "{item.persoText}"
                        </p>
                      )}
                    </div>
                    <p style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#5a3e36", fontWeight: 500, margin: 0 }}>
                      ${(unitPrice * item.qty).toFixed(2)}
                    </p>
                  </div>

                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 16 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 0, border: "1px solid #d4c4b8", borderRadius: 4 }}>
                      <button onClick={() => item.qty > 1 ? updateQty(i, item.qty - 1) : removeItem(i)}
                        style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#5a3e36" }}>−</button>
                      <span style={{ width: 32, textAlign: "center", fontFamily: "var(--font-body)", fontSize: 13, color: "#5a3e36" }}>{item.qty}</span>
                      <button onClick={() => updateQty(i, item.qty + 1)}
                        style={{ width: 32, height: 32, background: "none", border: "none", cursor: "pointer", fontSize: 16, color: "#5a3e36" }}>+</button>
                    </div>
                    <button onClick={() => removeItem(i)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "underline" }}>
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{ marginTop: 40, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 12 }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", maxWidth: 320 }}>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 13, color: "#7a6358", letterSpacing: "0.05em" }}>Subtotal</span>
            <span style={{ fontFamily: "var(--font-body)", fontSize: 15, color: "#5a3e36", fontWeight: 500 }}>${totalPrice.toFixed(2)}</span>
          </div>
          <p style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", margin: 0 }}>Shipping calculated at checkout</p>
          <button onClick={() => router.push("/checkout")}
            style={{ marginTop: 8, width: "100%", maxWidth: 320, padding: "14px 0", background: "#5a3e36", color: "#fff", border: "none", borderRadius: 4, fontFamily: "var(--font-body)", fontSize: 12, letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer" }}>
            Proceed to Checkout
          </button>
          <Link href="/shop" style={{ fontFamily: "var(--font-body)", fontSize: 11, color: "#9e8579", letterSpacing: "0.08em", textTransform: "uppercase", textDecoration: "underline" }}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </>
  );
}
