import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer__inner">
        <div>
          <div className="footer__brand">Verdant Grove</div>
          <p className="footer__desc">
            Wholesale &amp; retail nursery supplying high-grade botanicals for professional and home environments.
          </p>
        </div>
        <div>
          <h4 className="footer__heading">Company</h4>
          <nav>
            <Link href="#" className="footer__link">About Us</Link>
            <Link href="#" className="footer__link">Sustainability</Link>
            <Link href="/services" className="footer__link">Contract Services</Link>
          </nav>
        </div>
        <div>
          <h4 className="footer__heading">Support</h4>
          <nav>
            <Link href="#" className="footer__link">Shipping Policy</Link>
            <Link href="#" className="footer__link">Contact</Link>
          </nav>
        </div>
        <div className="footer__copy">
          © {new Date().getFullYear()} Verdant Grove Wholesale &amp; Retail. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
