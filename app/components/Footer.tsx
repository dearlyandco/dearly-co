import Link from "next/link";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <p className="logo">Dearly <span>&</span> Co.</p>
          <p className="footer-tagline">Made for those you love dearly.</p>
          <div className="social-links">
            <a href="#" aria-label="Instagram">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <rect x="2" y="2" width="20" height="20" rx="5"/>
                <circle cx="12" cy="12" r="4"/>
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
              </svg>
            </a>
            <a href="#" aria-label="Pinterest">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.236 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.428 1.808-2.428.852 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.476 1.806 1.771 0 3.132-1.867 3.132-4.562 0-2.387-1.715-4.055-4.163-4.055-2.836 0-4.5 2.127-4.5 4.326 0 .856.33 1.773.741 2.276a.3.3 0 0 1 .069.286c-.076.315-.244.995-.277 1.134-.044.183-.146.222-.337.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.967-.527-2.292-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.446 2.962.446 5.523 0 10-4.477 10-10S17.523 2 12 2z"/>
              </svg>
            </a>
            <a href="#" aria-label="Facebook">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
              </svg>
            </a>
            <a href="#" aria-label="TikTok">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
              </svg>
            </a>
          </div>
        </div>
        <div className="footer-links">
          <div className="footer-col">
            <h4>Shop</h4>
            <Link href="/shop">Family Signs</Link>
            <Link href="/shop">Kids Name Signs</Link>
            <Link href="/shop">Room Signs</Link>
            <Link href="/shop">Wedding &amp; Anniversary</Link>
            <Link href="/shop">Kitchen Signs</Link>
          </div>
          <div className="footer-col">
            <h4>Info</h4>
            <Link href="/#about">Our Story</Link>
            <Link href="/#how">How It Works</Link>
            <a href="#">Custom Orders</a>
            <a href="#">Shipping &amp; Returns</a>
            <a href="#">FAQ</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">Contact Us</a>
            <a href="#">Instagram</a>
            <a href="#">Pinterest</a>
            <a href="mailto:hello@dearlyandco.com">hello@dearlyandco.com</a>
          </div>
        </div>
      </div>
      <div className="footer-bottom">
        <p>© 2025 Dearly &amp; Co. All rights reserved. Made with ♡ in the USA.</p>
      </div>
    </footer>
  );
}
