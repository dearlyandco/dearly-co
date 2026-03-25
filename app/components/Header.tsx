"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Header({ activePage }: { activePage?: "shop" }) {
  const [scrolled, setScrolled] = useState(false);
  const [announceDismissed, setAnnounceDismissed] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      {!announceDismissed && (
        <div className="announce-bar" id="announceBar">
          <div className="announce-inner">
            <span>🎁 Free shipping on orders over $50 &nbsp;|&nbsp; Ships in 3–5 business days</span>
            <button
              className="announce-close"
              aria-label="Close announcement"
              onClick={() => setAnnounceDismissed(true)}
            >
              ✕
            </button>
          </div>
        </div>
      )}

      <header
        className={`header${announceDismissed ? " announce-gone" : ""}${scrolled ? " scrolled" : ""}`}
        id="header"
      >
        <div className="header-inner">
          <Link href="/" className="logo">
            Dearly <span>&</span> Co.
          </Link>
          <nav className="nav" id="nav">
            <Link href="/shop" className={activePage === "shop" ? "nav-active" : ""}>Shop</Link>
            <Link href="/#about">Our Story</Link>
            <Link href="/#how">How It Works</Link>
            <Link href="/#reviews">Reviews</Link>
            <Link href="/shop" className="nav-cta">Order Now</Link>
          </nav>
          <button
            className={`hamburger${menuOpen ? " active" : ""}`}
            id="hamburger"
            aria-label="Toggle menu"
            onClick={() => setMenuOpen((v) => !v)}
          >
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </header>

      <div className={`mobile-nav${menuOpen ? " open" : ""}`} id="mobileNav">
        <nav className="mobile-nav-links">
          <Link href="/shop" onClick={closeMenu} className={activePage === "shop" ? "nav-active" : ""}>Shop</Link>
          <Link href="/#about" onClick={closeMenu}>Our Story</Link>
          <Link href="/#how" onClick={closeMenu}>How It Works</Link>
          <Link href="/#reviews" onClick={closeMenu}>Reviews</Link>
          <Link href="/shop" onClick={closeMenu} className="mobile-nav-cta">Order Now</Link>
        </nav>
        <p className="mobile-nav-tagline">Made for those you love dearly.</p>
      </div>
    </>
  );
}
