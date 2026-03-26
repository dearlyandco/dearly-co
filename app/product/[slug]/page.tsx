"use client";

import { useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";

type AccordionKey = "details" | "how" | "shipping" | "care";

const PRODUCTS: Record<string, { name: string; image: string }> = {
  blessed: { name: "Blessed",  image: "/images/Blessed.jpg" },
  love:    { name: "Love",     image: "/images/Love.jpg" },
  mom:     { name: "Mom",      image: "/images/MOM.jpg" },
  welcome: { name: "Welcome",  image: "/images/welcome.jpg" },
};

const SIZES = [
  { label: '7"×11"',  price: 49 },
  { label: '11"×17"', price: 85 },
];

const STAND_PRICE = 6;

export default function ProductDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "blessed";
  const product = PRODUCTS[slug] ?? PRODUCTS["blessed"];

  const [activeThumb, setActiveThumb]     = useState(0);
  const [activeSize, setActiveSize]       = useState(0);
  const [addStand, setAddStand]           = useState(false);
  const [qty, setQty]                     = useState(1);
  const [persoText, setPersoText]         = useState("");
  const [persoError, setPersoError]       = useState(false);
  const [openAccordion, setOpenAccordion] = useState<AccordionKey | null>(null);
  const [cartAdded, setCartAdded]         = useState(false);

  const basePrice  = SIZES[activeSize].price;
  const totalUnit  = basePrice + (addStand ? STAND_PRICE : 0);
  const totalPrice = totalUnit * qty;

  const toggleAccordion = (key: AccordionKey) =>
    setOpenAccordion((prev) => (prev === key ? null : key));

  const handleAddToCart = () => {
    if (!persoText.trim()) {
      setPersoError(true);
      document.getElementById("persoInput")?.focus();
      return;
    }
    setPersoError(false);
    setCartAdded(true);
    setTimeout(() => setCartAdded(false), 2500);
  };

  return (
    <>
      {/* Sticky header */}
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
                style={{ cursor: "pointer" }}
              >
                <Image
                  src={product.image}
                  alt={`${product.name} view ${i + 1}`}
                  width={52}
                  height={64}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
            ))}
          </div>

          <div className="main-image">
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="50vw"
              style={{ objectFit: "cover", objectPosition: "center" }}
              priority
            />
            <div className="img-badge">Laser Engraved · Made to Order</div>
          </div>
        </div>

        {/* RIGHT: Product Info */}
        <div className="product-info-panel">

          <div className="info-crumb">
            <Link href="/">Home</Link>
            <span>/</span>
            <Link href="/shop">Shop</Link>
            <span>/</span>
            {product.name}
          </div>

          <h1 className="product-title-pd">{product.name}</h1>
          <p className="product-subtitle-pd">Laser Engraved · Wood &amp; Acrylic · Made to Order</p>

          <div className="product-rating">
            <span className="stars">★★★★★</span>
            <span className="rating-text">4.9 · 127 reviews</span>
          </div>

          {/* Dynamic price */}
          <div className="price-row">
            <span className="price-main">${totalPrice.toFixed(2)}</span>
            <span className="price-note">
              {qty > 1 ? `$${totalUnit} × ${qty}` : "Free shipping over $50"}
            </span>
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

          {/* Size */}
          <div className="option-block">
            <span className="option-label">Size</span>
            <div className="swatch-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
              {SIZES.map((s, i) => (
                <div
                  key={i}
                  className={`swatch-card${activeSize === i ? " active" : ""}`}
                  onClick={() => setActiveSize(i)}
                >
                  <span className="swatch-name">{s.label}</span>
                  <span className="swatch-price">${s.price}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Wood Stand add-on */}
          <div className="option-block">
            <span className="option-label">Add-Ons</span>
            <label className="stand-addon">
              <input
                type="checkbox"
                checked={addStand}
                onChange={(e) => setAddStand(e.target.checked)}
                className="stand-checkbox"
              />
              <span className="stand-label">
                Add Wood Stand
                <span className="stand-price">+${STAND_PRICE}</span>
              </span>
            </label>
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
              placeholder="Enter your custom message, family name, quote, etc."
              value={persoText}
              onChange={(e) => { setPersoText(e.target.value); setPersoError(false); }}
              style={persoError ? { borderColor: "#C9897A" } : undefined}
            />
            <div className="perso-char">{persoText.length} / 120</div>
            {persoError && (
              <p style={{ fontSize: 11, color: "#C9897A", marginTop: 4 }}>
                Please enter your personalization text before adding to cart.
              </p>
            )}
            <p className="perso-hint">
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

          {/* Total summary */}
          <div className="price-summary">
            <div className="price-summary-row">
              <span>{SIZES[activeSize].label}</span>
              <span>${basePrice}</span>
            </div>
            {addStand && (
              <div className="price-summary-row">
                <span>Wood Stand</span>
                <span>+${STAND_PRICE}</span>
              </div>
            )}
            {qty > 1 && (
              <div className="price-summary-row">
                <span>Qty × {qty}</span>
                <span>${totalUnit} each</span>
              </div>
            )}
            <div className="price-summary-total">
              <span>Total</span>
              <span>${totalPrice.toFixed(2)}</span>
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
              { key: "details" as AccordionKey, label: "Product Details", content: (
                <ul>
                  <li>Laser engraved and laser cut in our US studio</li>
                  <li>Premium Baltic birch or maple wood substrate</li>
                  <li>Gold acrylic lettering layered on black panel</li>
                  <li>Hanging hardware included for wall mounting</li>
                  <li>Optional wood stand for tabletop display</li>
                </ul>
              )},
              { key: "how" as AccordionKey, label: "How It Works", content: (
                <ul>
                  <li>Place your order and fill in your personalization text</li>
                  <li>We&apos;ll send a digital proof within 1–2 business days</li>
                  <li>Once approved, production begins (3–5 business days)</li>
                  <li>Shipped carefully in custom protective packaging</li>
                </ul>
              )},
              { key: "shipping" as AccordionKey, label: "Shipping & Returns", content: (
                <p>All orders ship via USPS Priority or UPS Ground. Free shipping on orders over $50. Because every piece is made to order, we are unable to accept returns unless the item arrives damaged. Please reach out within 48 hours of delivery if there&apos;s an issue.</p>
              )},
              { key: "care" as AccordionKey, label: "Care Instructions", content: (
                <ul>
                  <li>Wipe gently with a dry or slightly damp cloth</li>
                  <li>Avoid prolonged exposure to direct sunlight</li>
                  <li>Keep away from high humidity environments</li>
                  <li>Do not submerge in water</li>
                </ul>
              )},
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
