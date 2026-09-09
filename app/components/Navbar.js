'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks = [
  { href: '/', label: 'Home', icon: 'home' },
  { href: '/shop', label: 'Show Plants', icon: 'local_florist' },
  { href: '/shop?category=herbs', label: 'Herbs', icon: 'eco' },
  { href: '/shop?category=fruiting', label: 'Fruiting', icon: 'cloud_download' },
  { href: '/services', label: 'Contracts & Services', icon: 'business_center' },
];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

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
          <button
            className="nav-header__btn"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open Navigation Menu"
          >
            <span className="material-symbols-outlined">menu</span>
          </button>

          <Link href="/" className="nav-header__logo">Sakla</Link>

          <Link href="/shop" className="nav-header__btn" aria-label="Search Catalog">
            <span className="material-symbols-outlined">search</span>
          </Link>
        </div>
      </header>

      {/* Mobile Slide-in Drawer */}
      {mobileDrawerOpen && (
        <div
          className="mobile-drawer-backdrop"
          onClick={() => setMobileDrawerOpen(false)}
        >
          <div
            className="mobile-drawer"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mobile-drawer__header">
              <div className="mobile-drawer__title">Sakla Botanicals</div>
              <button
                className="mobile-drawer__close"
                onClick={() => setMobileDrawerOpen(false)}
                aria-label="Close Menu"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <nav className="mobile-drawer__links">
              {navLinks.map(link => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setMobileDrawerOpen(false)}
                  className={`mobile-drawer__link ${isActive(link.href) ? 'mobile-drawer__link--active' : ''}`}
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

            <div className="mobile-drawer__footer">
              <Link
                href="/admin"
                onClick={() => setMobileDrawerOpen(false)}
                className="mobile-drawer__link"
                style={{ color: '#717976', fontSize: '13px' }}
              >
                <span className="material-symbols-outlined">lock</span>
                <span>Admin Portal</span>
              </Link>
            </div>
          </div>
        </div>
      )}

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
