'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/shop?category=herbs', label: 'Herbs', icon: 'eco' },
  { href: '/shop', label: 'Show Plants', icon: 'local_florist' },
  { href: '/shop?category=fruiting', label: 'Fruiting', icon: 'cloud_download' },
  { href: '/services', label: 'Contracts', icon: 'business_center' },
];

export default function Navbar() {
  const pathname = usePathname();

  function isActive(href) {
    if (href === '/') return pathname === '/';
    if (href === '/shop') return pathname === '/shop' && !pathname.includes('category');
    return pathname.startsWith(href.split('?')[0]);
  }

  return (
    <>
      {/* Top App Bar */}
      <header className="nav-header">
        <div className="nav-header__inner">
          <button className="nav-header__btn" style={{ display: 'none' }} aria-label="Menu">
            <span className="material-symbols-outlined">menu</span>
          </button>
          <Link href="/" className="nav-header__logo">Sakla</Link>
          <button className="nav-header__btn" aria-label="Search">
            <span className="material-symbols-outlined">search</span>
          </button>
        </div>

        {/* Mobile horizontal tabs */}
        <nav className="nav-mobile-tabs">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-mobile-tab ${isActive(link.href) ? 'nav-mobile-tab--active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </header>

      {/* Desktop Side Drawer */}
      <aside className="nav-drawer">
        <div className="nav-drawer__title">Nursery Menu</div>
        <nav className="nav-drawer__links">
          {navLinks.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`nav-drawer__link ${isActive(link.href) ? 'nav-drawer__link--active' : ''}`}
            >
              <span
                className={`material-symbols-outlined ${isActive(link.href) ? 'fill' : ''}`}
              >
                {link.icon}
              </span>
              <span>{link.label}</span>
            </Link>
          ))}
        </nav>
      </aside>
    </>
  );
}
