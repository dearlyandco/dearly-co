"use client";

import { useState } from "react";
import Link from "next/link";
import Header from "../../components/Header";

type AccordionKey = "details" | "how" | "shipping" | "care";

export default function ProductDetailPage() {
  const [activeThumb, setActiveThumb] = useState(0);
  const [activeMaterial, setActiveMaterial] = useState(0);
  const [activeSize, setActiveSize] = useState(1);
  const [activeFloral, setActiveFloral] = useState(0);
  const [qty, setQty] = useState(1);
  const [persoText, setPersoText] = useState("");
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(null);
  const [cartAdded, setCartAdded] = useState(false);

  const sizes = ['8 × 10"', '10 × 12"', '12 × 16"'];
  const florals = ["Wildflower ①", "Wildflower ②", "Wildflower ③", "No Floral"];
  const materials = [
    { name: "Dark Wood", sub: "Walnut + Black", price: "$55" },
    { name: "Light Wood", sub: "Maple + Natural", price: "$50" },
    { name: "Acrylic", sub: "Clear + Gold", price: "$48" },
  ];

  const toggleAccordion = (key: AccordionKey) => {
    setOpenAccordion((prev) => (prev === key ? null : key));
  };

  const handleAddToCart = () => {
    if (!persoText.trim()) {
      const el = document.getElementById("persoInput") as HTMLTextAreaElement;
      if (el) {
        el.focus();
        el.style.borderColor = "#C9897A";
        el.placeholder = "↑ Please enter your personalization text first";
      }
      return;
    }
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  };

  return (
    <>
      {/* Simplified sticky header for product page */}
      <header className="site-header">
        <Link href="/" className="site-logo">Dearly <span>&</span> Co.</Link>
        <nav className="site-nav">
          <Link href="/shop">Shop</Link>
          <Link href="/#about">Our Story</Link>
          <Link href="/#how">How It Works</Link>
        </nav>
      </header>

      <div className="product-page">

        {/* LEFT: Image Gallery */}
        <div className="product-gallery">
          <div className="thumb-strip">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`thumb${activeThumb === i ? " active" : ""}`}
                onClick={() => setActiveThumb(i)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/images/BlessedSample.jpg"
                  alt={`View ${i + 1}`}
                  style={{
                    width: "100%", height: "100%", objectFit: "cover",
                    objectPosition: i === 0 ? "center" : i === 1 ? "center top" : "center bottom",
                  }}
                />
              </div>
            ))}
          </div>

          <div className="main-image" id="mainImg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/BlessedSample.jpg"
              alt="Blessed Wildflower Family Sign — Walnut Frame"
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center" }}
            />
            <div className="img-badge">Wildflower Design · Walnut Frame</div>
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info-panel">

          <div className="info-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            Family Signs
          </div>

          <h1 className="product-title-pd">Wildflower Family Sign</h1>
          <p className="product-subtitle-pd">Laser Engraved · Wood &amp; Acrylic · Made to Order</p>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">4.9 · 127 reviews</span>
          </div>

          <div className="price-row">
            <span className="price-main">$55.00</span>
            <span className="price-note">Free shipping over $50</span>
          </div>

          <div className="trust-badges">
            <div className="badge-item">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              </div>
              Secure, encrypted checkout
            </div>
            <div className="badge-item">
              <div className="badge-icon">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="2" y="7" width="20" height="14" rx="2"/>
                  <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                </svg>
              </div>
              Ships in 3–5 business days
            </div>
            <div className="badge-item">
              <div className="badge-icon"><span className="dot-green"></span></div>
              In stock · Ready to make
            </div>
          </div>

          {/* Material */}
          <div className="option-block">
            <span className="option-label">Material</span>
            <div className="swatch-grid">
              {materials.map((m, i) => (
                <div
                  key={i}
                  className={`swatch-card${activeMaterial === i ? " active" : ""}`}
                  onClick={() => setActiveMaterial(i)}
                >
                  <span className="swatch-name">{m.name}</span>
                  <span className="swatch-sub">{m.sub}</span>
                  <span className="swatch-price">{m.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="option-block">
            <span className="option-label">Size</span>
            <div className="option-pills">
              {sizes.map((s, i) => (
                <button
                  key={i}
                  className={`option-pill${activeSize === i ? " active" : ""}`}
                  onClick={() => setActiveSize(i)}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Floral Design */}
          <div className="option-block">
            <span className="option-label">Floral Design</span>
            <div className="option-pills">
              {florals.map((f, i) => (
                <button
                  key={i}
                  className={`option-pill${activeFloral === i ? " active" : ""}`}
                  onClick={() => setActiveFloral(i)}
                >
                  {f}
                </button>
              ))}
            </div>
          </div>

          {/* Personalization */}
          <div className="personalization-block">
            <div className="perso-header">
              <span className="perso-label">Personalization</span>
              <span className="perso-required">Required</span>
            </div>
            <textarea
              id="persoInput"
              className="perso-input"
              rows={3}
              maxLength={120}
              placeholder="e.g. THE JOHNSON FAMILY · Est. 2019"
              value={persoText}
              onChange={(e) => setPersoText(e.target.value)}
            />
            <div className="perso-char">{persoText.length} / 120</div>
            <p className="perso-hint">
              Enter your family name, couple&apos;s names, or any custom text.<br />
              A digital proof will be sent before production begins.
            </p>
          </div>

          {/* Qty */}
          <div className="qty-row">
            <span className="qty-label">Quantity</span>
            <div className="qty-control">
              <button className="qty-btn" onClick={() => setQty((q) => Math.max(1, q - 1))}>−</button>
              <div className="qty-num">{qty}</div>
              <button className="qty-btn" onClick={() => setQty((q) => q + 1)}>+</button>
            </div>
          </div>

          {/* CTA */}
          <div className="cta-stack">
            <button
              className="btn-cart"
              onClick={handleAddToCart}
              style={cartAdded ? { background: "#22c55e" } : undefined}
            >
              {cartAdded ? "✓  Added to Cart" : "Add to Cart"}
            </button>
            <button className="btn-wishlist">♡ &nbsp; Save to Wishlist</button>
          </div>

          <p className="shipping-note">
            Free shipping on orders over $50 · <a href="#">View shipping policy</a>
          </p>

          {/* Accordion */}
          <div className="accordion">
            {([
              {
                key: "details" as AccordionKey,
                label: "Product Details",
                content: (
                  <ul>
                    <li>Laser engraved and laser cut in our US studio</li>
                    <li>Premium Baltic birch or maple wood substrate</li>
                    <li>Gold acrylic lettering layered on black panel</li>
                    <li>Oval walnut wood frame, sanded and finished</li>
                    <li>Includes a small wood stand for tabletop display</li>
                    <li>Hanging hardware included for wall mounting</li>
                  </ul>
                ),
              },
              {
                key: "how" as AccordionKey,
                label: "How It Works",
                content: (
                  <ul>
                    <li>Place your order and fill in your personalization text</li>
                    <li>We&apos;ll send a digital proof within 1–2 business days</li>
                    <li>Once approved, production begins (3–5 business days)</li>
                    <li>Shipped carefully in custom protective packaging</li>
                  </ul>
                ),
              },
              {
                key: "shipping" as AccordionKey,
                label: "Shipping & Returns",
                content: (
                  <p>All orders ship via USPS Priority or UPS Ground. Free shipping on orders over $50. Because every piece is made to order, we are unable to accept returns unless the item arrives damaged. Please reach out within 48 hours of delivery if there&apos;s an issue.</p>
                ),
              },
              {
                key: "care" as AccordionKey,
                label: "Care Instructions",
                content: (
                  <ul>
                    <li>Wipe gently with a dry or slightly damp cloth</li>
                    <li>Avoid prolonged exposure to direct sunlight</li>
                    <li>Keep away from high humidity environments</li>
                    <li>Do not submerge in water</li>
                  </ul>
                ),
              },
            ]).map(({ key, label, content }) => (
              <div key={key} className={`accordion-item${openAccordion === key ? " open" : ""}`}>
                <button className="accordion-trigger" onClick={() => toggleAccordion(key)}>
                  {label}
                  <span className="accordion-icon">+</span>
                </button>
                <div className="accordion-body">{content}</div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </>
  );
}
