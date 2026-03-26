"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "./components/Header";
import Footer from "./components/Footer";

const HERO_PHOTOS = [
  { src: "/images/Blessed.jpg",  name: "Blessed",  slug: "blessed" },
  { src: "/images/Love.jpg",     name: "Love",     slug: "love" },
  { src: "/images/MOM.jpg",      name: "Mom",      slug: "mom" },
  { src: "/images/welcome.jpg",  name: "Welcome",  slug: "welcome" },
];

export default function Home() {
  const [heroIdx, setHeroIdx] = useState(0);
  const [fading, setFading]   = useState(false);

  // Scroll reveal
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

  // Hero photo cycling — fade out → swap → fade in
  useEffect(() => {
    const interval = setInterval(() => {
      setFading(true);
      setTimeout(() => {
        setHeroIdx((i) => (i + 1) % HERO_PHOTOS.length);
        setFading(false);
      }, 500);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <Header />

      {/* HERO */}
      <section className="hero">
        <div className="hero-bg">
          <div className="hero-circle hero-circle--1"></div>
          <div className="hero-circle hero-circle--2"></div>
        </div>
        <div className="hero-content">
          <p className="hero-eyebrow reveal">Handcrafted in the USA</p>
          <h1 className="hero-title reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            Gifts that feel<br /><em>truly personal.</em>
          </h1>
          <p className="hero-tagline reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Made for those you love dearly.
          </p>
          <div className="hero-actions reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <Link href="/shop" className="btn btn--primary">Shop Personalized Gifts</Link>
            <a href="#how" className="btn btn--ghost">How It Works</a>
          </div>
          <div className="hero-badges reveal" style={{ "--delay": "0.4s" } as React.CSSProperties}>
            <span>✦ Laser Engraved Wood &amp; Acrylic</span>
            <span>✦ Custom Orders Welcome</span>
            <span>✦ Ships Across the US</span>
          </div>
        </div>
        <div className="hero-image reveal" style={{ "--delay": "0.25s" } as React.CSSProperties}>
          <Link href={`/product/${HERO_PHOTOS[heroIdx].slug}`} className="hero-photo-wrap">
            <Image
              src={HERO_PHOTOS[heroIdx].src}
              alt={HERO_PHOTOS[heroIdx].name}
              fill
              sizes="(max-width: 768px) 80vw, 400px"
              style={{
                objectFit: "cover",
                opacity: fading ? 0 : 1,
                transition: "opacity 0.5s ease",
              }}
              priority
            />
            <div className="hero-photo-label" style={{ opacity: fading ? 0 : 1, transition: "opacity 0.5s ease" }}>
              {HERO_PHOTOS[heroIdx].name}
            </div>
            {/* dot indicators */}
            <div className="hero-photo-dots">
              {HERO_PHOTOS.map((_, i) => (
                <span key={i} className={`hero-dot${i === heroIdx ? " hero-dot--active" : ""}`} />
              ))}
            </div>
          </Link>
        </div>
      </section>

      {/* WHY DEARLY & CO. */}
      <section className="section why" id="why">
        <div className="section-header reveal">
          <p className="section-eyebrow">Why Choose Us</p>
          <h2 className="section-title">Why Dearly <span style={{ color: "var(--gold)" }}>&</span> Co.</h2>
        </div>
        <div className="why-grid">
          <div className="why-card reveal" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="why-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <h3>Fully Personalized</h3>
            <p>Every piece is made to order with your name, date, or message — never mass-produced.</p>
          </div>
          <div className="why-card reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            <div className="why-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                <polyline points="9 22 9 12 15 12 15 22"/>
              </svg>
            </div>
            <h3>Handcrafted</h3>
            <p>Laser engraved and cut in our US studio from premium wood and acrylic materials.</p>
          </div>
          <div className="why-card reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            <div className="why-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <rect x="2" y="7" width="20" height="14" rx="2"/>
                <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/>
                <line x1="12" y1="12" x2="12" y2="16"/>
                <line x1="10" y1="14" x2="14" y2="14"/>
              </svg>
            </div>
            <h3>Ships Fast</h3>
            <p>Most orders ship within 3–5 business days. Free shipping on all orders over $50.</p>
          </div>
          <div className="why-card reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <div className="why-icon">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.3">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
              </svg>
            </div>
            <h3>Made with Love</h3>
            <p>Woman-owned and small-batch. Every order is handled with genuine care and pride.</p>
          </div>
        </div>
      </section>

      {/* FEATURED PRODUCTS */}
      <section className="section products" id="products">
        <div className="section-header reveal">
          <p className="section-eyebrow">Our Collection</p>
          <h2 className="section-title">Crafted with love,<br /><em>made just for them.</em></h2>
        </div>
        <div className="products-grid">
          <article className="product-card reveal" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="product-img product-img--1">
              <div className="product-mock">
                <span className="mock-label">Home</span>
                <span className="mock-name">The Williams</span>
                <span className="mock-sub">Est. 2015</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Family Name Sign</h3>
              <p>Custom wood engraved family sign — a timeless piece for any home.</p>
              <div className="product-footer">
                <span className="price">From $42</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
          <article className="product-card reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            <div className="product-img product-img--2">
              <div className="product-mock product-mock--acrylic">
                <span className="mock-name mock-name--lg">Emma</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Kids Name Sign</h3>
              <p>Acrylic name sign for nurseries &amp; kids&apos; rooms. Soft, modern, magical.</p>
              <div className="product-footer">
                <span className="price">From $35</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
          <article className="product-card reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            <div className="product-img product-img--3">
              <div className="product-mock">
                <span className="mock-label">Welcome to</span>
                <span className="mock-name">Our Home</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Welcome Home Sign</h3>
              <p>Laser-cut wooden welcome sign, perfect for entryways &amp; front porches.</p>
              <div className="product-footer">
                <span className="price">From $38</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
          <article className="product-card reveal" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="product-img product-img--4">
              <div className="product-mock product-mock--dark">
                <span className="mock-label mock-label--light">♡</span>
                <span className="mock-name mock-name--light">Master</span>
                <span className="mock-sub mock-sub--light">Bedroom</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Room Sign</h3>
              <p>Elegant acrylic room signs for every space — kitchen, nursery, office &amp; more.</p>
              <div className="product-footer">
                <span className="price">From $28</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
          <article className="product-card reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            <div className="product-img product-img--5">
              <div className="product-mock">
                <span className="mock-label">Established</span>
                <span className="mock-name">2024</span>
                <span className="mock-sub">Mr. &amp; Mrs. Carter</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Wedding Sign</h3>
              <p>Celebrate forever with a custom engraved wedding or anniversary sign.</p>
              <div className="product-footer">
                <span className="price">From $55</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
          <article className="product-card reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            <div className="product-img product-img--6">
              <div className="product-mock product-mock--acrylic">
                <span className="mock-label">with love,</span>
                <span className="mock-name mock-name--md">Grandma&apos;s Kitchen</span>
              </div>
            </div>
            <div className="product-info">
              <h3>Kitchen Sign</h3>
              <p>Warm, personalized kitchen décor in rich wood or clear acrylic.</p>
              <div className="product-footer">
                <span className="price">From $32</span>
                <Link href="/shop" className="btn-link">Customize →</Link>
              </div>
            </div>
          </article>
        </div>
        <div className="section-cta reveal">
          <Link href="/shop" className="btn btn--primary">View Full Collection</Link>
        </div>
      </section>

      {/* ABOUT */}
      <section className="section about" id="about">
        <div className="about-image reveal">
          <div className="about-frame">
            <div className="about-frame-deco">✦</div>
            <p className="about-frame-text">&ldquo;Every piece tells<br />a story.&rdquo;</p>
          </div>
        </div>
        <div className="about-content reveal" style={{ "--delay": "0.15s" } as React.CSSProperties}>
          <p className="section-eyebrow">Our Story</p>
          <h2 className="section-title">Born from a love of<br /><em>meaningful gifting.</em></h2>
          <p>Dearly &amp; Co. started with a simple belief — the best gifts aren&apos;t bought, they&apos;re made. Made with thought, with care, with a name or a date that means everything to someone.</p>
          <p>Every sign we create is laser engraved or cut in our studio from premium wood and acrylic. No two are exactly alike, because no two families, homes, or stories are either.</p>
          <p>We&apos;re a small, women-owned shop based in the US — and every order is made with the same love you put into giving it.</p>
          <a href="#" className="btn btn--outline">Meet the Maker</a>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="section how" id="how">
        <div className="section-header reveal">
          <p className="section-eyebrow">The Process</p>
          <h2 className="section-title">Simple, personal,<br /><em>beautifully easy.</em></h2>
        </div>
        <div className="steps">
          <div className="step reveal" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="step-number">01</div>
            <div className="step-icon">✦</div>
            <h3>Choose Your Design</h3>
            <p>Browse our collection and pick the sign style that speaks to you — wood, acrylic, or both.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step reveal" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <div className="step-number">02</div>
            <div className="step-icon">✎</div>
            <h3>Add Your Details</h3>
            <p>Tell us the name, date, or phrase you want. We&apos;ll send a digital proof before we cut.</p>
          </div>
          <div className="step-divider"></div>
          <div className="step reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <div className="step-number">03</div>
            <div className="step-icon">♡</div>
            <h3>We Create &amp; Ship</h3>
            <p>Your piece is handcrafted and carefully packaged. Ready to gift, ready to hang, ready to love.</p>
          </div>
        </div>
      </section>

      {/* REVIEWS */}
      <section className="section reviews" id="reviews">
        <div className="section-header reveal">
          <p className="section-eyebrow">Customer Love</p>
          <h2 className="section-title">What families<br /><em>are saying.</em></h2>
        </div>
        <div className="reviews-grid">
          <div className="review-card reveal" style={{ "--delay": "0s" } as React.CSSProperties}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">&ldquo;I ordered the family name sign for our new home and it&apos;s absolutely stunning. Better than the photos. Everyone asks where I got it.&rdquo;</p>
            <div className="review-author">
              <div className="review-avatar">S</div>
              <div>
                <p className="review-name">Sarah M.</p>
                <p className="review-loc">Austin, TX</p>
              </div>
            </div>
          </div>
          <div className="review-card review-card--featured reveal" style={{ "--delay": "0.15s" } as React.CSSProperties}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">&ldquo;Bought this as a baby shower gift and the mom cried. The quality is incredible — you can feel how much care went into making it. Will be ordering again!&rdquo;</p>
            <div className="review-author">
              <div className="review-avatar">J</div>
              <div>
                <p className="review-name">Jessica L.</p>
                <p className="review-loc">Nashville, TN</p>
              </div>
            </div>
          </div>
          <div className="review-card reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
            <div className="review-stars">★★★★★</div>
            <p className="review-text">&ldquo;The kids&apos; name signs for my twins&apos; room are perfect. Fast shipping, beautiful packaging, and exactly what I envisioned. Dearly &amp; Co. is my go-to!&rdquo;</p>
            <div className="review-author">
              <div className="review-avatar">M</div>
              <div>
                <p className="review-name">Michelle R.</p>
                <p className="review-loc">Charlotte, NC</p>
              </div>
            </div>
          </div>
        </div>
        <div className="reviews-stat reveal">
          <span>✦ 500+ happy families</span>
          <span>✦ 4.9 average rating</span>
          <span>✦ Ships in 3–5 days</span>
        </div>
      </section>

      {/* INSTAGRAM */}
      <section className="section instagram" id="instagram">
        <div className="section-header reveal">
          <p className="section-eyebrow">Follow Along</p>
          <h2 className="section-title">Made with love,<br /><em>shared with joy.</em></h2>
          <a href="https://instagram.com/dearlyandco" target="_blank" rel="noopener noreferrer" className="insta-handle">@dearlyandco</a>
        </div>
        <div className="insta-grid">
          {[
            { cls: "insta-inner--1", content: <div className="insta-mock-sm"><span className="ims-family">The Harrison<br />Family</span></div>, delay: "0s" },
            { cls: "insta-inner--2", content: <div className="insta-mock-sm insta-mock-sm--clear"><span className="ims-name">Sophia</span></div>, delay: "0.07s" },
            { cls: "insta-inner--3", content: <div className="insta-mock-sm insta-mock-sm--dark"><span className="ims-quote">&ldquo;Grandma&apos;s Kitchen&rdquo;</span></div>, delay: "0.14s" },
            { cls: "insta-inner--4", content: <div className="insta-mock-sm"><span className="ims-family">Mr. &amp; Mrs.<br />Bennett</span></div>, delay: "0.21s" },
            { cls: "insta-inner--5", content: <div className="insta-mock-sm insta-mock-sm--blush"><span className="ims-name ims-name--italic">Noah ✦</span></div>, delay: "0.28s" },
            { cls: "insta-inner--6", content: <div className="insta-mock-sm"><span className="ims-family">Welcome to<br />Our Home</span></div>, delay: "0.35s" },
          ].map((tile, i) => (
            <a
              key={i}
              href="https://instagram.com/dearlyandco"
              target="_blank"
              rel="noopener noreferrer"
              className="insta-tile reveal"
              style={{ "--delay": tile.delay } as React.CSSProperties}
            >
              <div className={`insta-inner ${tile.cls}`}>{tile.content}</div>
              <div className="insta-overlay">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5">
                  <rect x="2" y="2" width="20" height="20" rx="5"/>
                  <circle cx="12" cy="12" r="4"/>
                  <circle cx="17.5" cy="6.5" r="1" fill="white" stroke="none"/>
                </svg>
              </div>
            </a>
          ))}
        </div>
        <div className="insta-follow reveal">
          <a href="https://instagram.com/dearlyandco" target="_blank" rel="noopener noreferrer" className="btn btn--outline">Follow on Instagram</a>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner">
        <div className="cta-banner-inner reveal">
          <p className="section-eyebrow">Ready to create?</p>
          <h2>Every home deserves a sign<br /><em>that feels like it belongs.</em></h2>
          <Link href="/shop" className="btn btn--primary btn--lg">Start Your Order</Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
