"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Header from "../components/Header";
import Footer from "../components/Footer";

type Filter = "all" | "wood" | "acrylic" | "bestseller";

const products = [
  { id: "family-name-sign", material: "wood", bestseller: true, imgCls: "shop-img--family", delay: "0s",
    mock: <div className="shop-mock"><span className="sm-label">The</span><span className="sm-name">Anderson</span><span className="sm-label">Family</span><div className="sm-rule"></div><span className="sm-year">Est. 2018</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Family Name Sign", desc: "Timeless engraved family sign for any home.", price: "From $42" },
  { id: "kids-room-sign", material: "acrylic", bestseller: true, imgCls: "shop-img--kids", delay: "0.05s",
    mock: <div className="shop-mock shop-mock--clear"><span className="sm-name sm-name--lg sm-name--script">Emma</span></div>,
    tag: "acrylic", tagLabel: "Acrylic", title: "Kids Room Sign", desc: "Modern acrylic name sign for any child's room.", price: "From $35" },
  { id: "nursery-name-sign", material: "acrylic", bestseller: true, imgCls: "shop-img--nursery", delay: "0.1s",
    mock: <div className="shop-mock shop-mock--blush"><span className="sm-label sm-label--soft">sweet little</span><span className="sm-name sm-name--nursery">Oliver</span><span className="sm-stars">✦ ✦ ✦</span></div>,
    tag: "acrylic", tagLabel: "Acrylic", title: "Nursery Name Sign", desc: "Soft, dreamy name sign for your baby's nursery.", price: "From $38" },
  { id: "scripture-wall-art", material: "wood", bestseller: false, imgCls: "shop-img--scripture", delay: "0.15s",
    mock: <div className="shop-mock shop-mock--dark"><span className="sm-label sm-label--gold">— Proverbs 3:5 —</span><span className="sm-quote">&ldquo;Trust in the Lord with all your heart.&rdquo;</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Scripture Wall Art", desc: "Beautifully engraved Bible verses for your home.", price: "From $48" },
  { id: "welcome-sign", material: "wood", bestseller: true, imgCls: "shop-img--welcome", delay: "0s",
    mock: <div className="shop-mock"><span className="sm-label">Welcome to</span><span className="sm-name">Our Home</span><div className="sm-rule"></div><span className="sm-label">The Clarks</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Welcome Sign", desc: "Warm greeting for your entryway or front porch.", price: "From $38" },
  { id: "address-sign", material: "acrylic", bestseller: false, imgCls: "shop-img--address", delay: "0.05s",
    mock: <div className="shop-mock shop-mock--clear"><span className="sm-label">—</span><span className="sm-name sm-name--address">1428</span><span className="sm-label">Elm Street</span></div>,
    tag: "acrylic", tagLabel: "Acrylic", title: "Address Sign", desc: "Elegant house number sign for your front door.", price: "From $45" },
  { id: "wildflower-family-sign", material: "wood", bestseller: true, imgCls: "shop-img--wedding", delay: "0.1s",
    mock: <div className="shop-mock"><span className="sm-label">Mr. &amp; Mrs.</span><span className="sm-name">Carter</span><div className="sm-rule"></div><span className="sm-year">June 14, 2024</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Wedding Sign", desc: "A forever keepsake for the couple you love.", price: "From $55" },
  { id: "custom-quote-sign", material: "wood", bestseller: false, imgCls: "shop-img--quote", delay: "0.15s",
    mock: <div className="shop-mock shop-mock--dark"><span className="sm-label sm-label--gold">✦</span><span className="sm-quote sm-quote--lg">&ldquo;She is clothed in strength &amp; dignity.&rdquo;</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Custom Quote Sign", desc: "Your words, beautifully engraved in rich wood.", price: "From $44" },
  { id: "pet-name-sign", material: "acrylic", bestseller: false, imgCls: "shop-img--pet", delay: "0s",
    mock: <div className="shop-mock shop-mock--blush"><span className="sm-label sm-label--soft">🐾</span><span className="sm-name sm-name--pet">Biscuit</span><span className="sm-label sm-label--soft">good boy since 2021</span></div>,
    tag: "acrylic", tagLabel: "Acrylic", title: "Pet Name Sign", desc: "Celebrate your furry family member with their own sign.", price: "From $30" },
  { id: "holiday-sign", material: "wood", bestseller: false, imgCls: "shop-img--holiday", delay: "0.05s",
    mock: <div className="shop-mock"><span className="sm-label">✦ Joy &amp; Peace ✦</span><span className="sm-name sm-name--holiday">The Millers</span><span className="sm-label">Christmas 2024</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Holiday Sign", desc: "Seasonal & Christmas signs personalized for your home.", price: "From $36" },
  { id: "bathroom-sign", material: "acrylic", bestseller: false, imgCls: "shop-img--bathroom", delay: "0.1s",
    mock: <div className="shop-mock shop-mock--clear"><span className="sm-name sm-name--room">Powder</span><span className="sm-name sm-name--room">Room</span><div className="sm-rule sm-rule--gold"></div><span className="sm-label">♡</span></div>,
    tag: "acrylic", tagLabel: "Acrylic", title: "Bathroom Sign", desc: "Elegant room signs for bathrooms, powder rooms & more.", price: "From $28" },
  { id: "kitchen-sign", material: "wood", bestseller: false, imgCls: "shop-img--kitchen", delay: "0.15s",
    mock: <div className="shop-mock"><span className="sm-label">with love from</span><span className="sm-name sm-name--kitchen">Grandma&apos;s Kitchen</span><div className="sm-rule"></div><span className="sm-label">Est. 1975</span></div>,
    tag: "wood", tagLabel: "Wood", title: "Kitchen Sign", desc: "Warm, personalized décor for the heart of your home.", price: "From $32" },
];

export default function ShopPage() {
  const [filter, setFilter] = useState<Filter>("all");

  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const visible = products.filter((p) => {
    if (filter === "all") return true;
    if (filter === "wood") return p.material === "wood";
    if (filter === "acrylic") return p.material === "acrylic";
    if (filter === "bestseller") return p.bestseller;
    return true;
  });

  return (
    <>
      <Header activePage="shop" />

      {/* PAGE HERO */}
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <p className="section-eyebrow reveal">Handcrafted in the USA</p>
          <h1 className="shop-hero-title reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>Our Collection</h1>
          <p className="shop-hero-sub reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>Every piece is laser engraved or cut to order — personalized just for you.</p>
        </div>
        <div className="shop-hero-deco reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
          <span>✦</span><div className="deco-line"></div><span>✦</span>
        </div>
      </section>

      {/* FILTER BAR */}
      <div className="filter-bar">
        <div className="filter-bar-inner">
          <div className="filter-label">Filter by:</div>
          <div className="filter-buttons">
            {(["all", "wood", "acrylic", "bestseller"] as Filter[]).map((f) => (
              <button
                key={f}
                className={`filter-btn${filter === f ? " active" : ""}`}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "All" : f === "wood" ? "Wood" : f === "acrylic" ? "Acrylic" : "✦ Bestsellers"}
              </button>
            ))}
          </div>
          <div className="filter-count"><span>{visible.length}</span> products</div>
        </div>
      </div>

      {/* PRODUCT GRID */}
      <main className="shop-main">
        {visible.length > 0 ? (
          <div className="shop-grid">
            {visible.map((p) => (
              <article
                key={p.id}
                className="shop-card reveal"
                data-material={p.material}
                data-bestseller={p.bestseller ? "true" : undefined}
                style={{ "--delay": p.delay } as React.CSSProperties}
              >
                {p.bestseller && <div className="shop-card-badge">Bestseller</div>}
                <div className={`shop-card-img ${p.imgCls}`}>{p.mock}</div>
                <div className="shop-card-body">
                  <div className="shop-card-meta">
                    <span className={`shop-tag shop-tag--${p.tag}`}>{p.tagLabel}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                  <div className="shop-card-footer">
                    <span className="shop-price">{p.price}</span>
                    <Link href={`/product/${p.id}`} className="btn btn--primary btn--sm">Customize</Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <p>✦</p>
            <h3>No products found</h3>
            <p>Try a different filter.</p>
          </div>
        )}
      </main>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner-inner reveal">
          <p className="section-eyebrow">Don&apos;t see what you need?</p>
          <h2>We love custom orders.<br /><em>Let&apos;s create something together.</em></h2>
          <a href="mailto:hello@dearlyandco.com" className="btn btn--primary btn--lg">Contact Us</a>
        </div>
      </section>

      <Footer />
    </>
  );
}
