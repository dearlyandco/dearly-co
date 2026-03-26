"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Header from "../components/Header";
import Footer from "../components/Footer";

const products = [
  { id: "blessed",  name: "Blessed",  image: "/images/Blessed.jpg",  price: "From $49" },
  { id: "love",     name: "Love",     image: "/images/Love.jpg",     price: "From $49" },
  { id: "mom",      name: "Mom",      image: "/images/MOM.jpg",      price: "From $49" },
  { id: "welcome",  name: "Welcome",  image: "/images/welcome.jpg",  price: "From $49" },
];

export default function ShopPage() {
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

  return (
    <>
      <Header activePage="shop" />

      {/* PAGE HERO */}
      <section className="shop-hero">
        <div className="shop-hero-inner">
          <p className="section-eyebrow reveal">Handcrafted in the USA</p>
          <h1 className="shop-hero-title reveal" style={{ "--delay": "0.1s" } as React.CSSProperties}>
            Our Collection
          </h1>
          <p className="shop-hero-sub reveal" style={{ "--delay": "0.2s" } as React.CSSProperties}>
            Every piece is laser engraved or cut to order — personalized just for you.
          </p>
        </div>
        <div className="shop-hero-deco reveal" style={{ "--delay": "0.3s" } as React.CSSProperties}>
          <span>✦</span><div className="deco-line"></div><span>✦</span>
        </div>
      </section>

      {/* PRODUCT GRID — 2×2 */}
      <main className="shop-main">
        <div className="shop-grid-2x2">
          {products.map((p, i) => (
            <article
              key={p.id}
              className="shop-card reveal"
              style={{ "--delay": `${i * 0.08}s` } as React.CSSProperties}
            >
              <Link href={`/product/${p.id}`} className="shop-card-img-link">
                <div className="shop-card-photo">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 50vw"
                    style={{ objectFit: "cover" }}
                  />
                </div>
              </Link>
              <div className="shop-card-body">
                <h3>{p.name}</h3>
                <div className="shop-card-footer">
                  <span className="shop-price">{p.price}</span>
                  <Link href={`/product/${p.id}`} className="btn btn--primary btn--sm">
                    Customize
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
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
