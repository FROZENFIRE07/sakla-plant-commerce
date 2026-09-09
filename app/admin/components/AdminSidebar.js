'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: 'dashboard' },
  { href: '/admin/inquiries', label: 'Inquiries & Leads', icon: 'forum' },
  { href: '/admin/inventory', label: 'Inventory', icon: 'inventory_2' },
  { href: '/admin/inventory/new', label: 'Add Plant', icon: 'add_circle' },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="admin-sidebar">
      <div className="admin-sidebar__brand">
        <div className="admin-sidebar__logo">Sakla</div>
        <div className="admin-sidebar__label">Admin Portal</div>
      </div>
      <nav className="admin-sidebar__nav">
        {navItems.map(item => (
          <Link
            key={item.href}
            href={item.href}
            className={`admin-sidebar__link ${pathname === item.href || (item.href === '/admin/inventory' && pathname.startsWith('/admin/inventory') && !pathname.includes('new')) ? 'admin-sidebar__link--active' : ''}`}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <div className="admin-sidebar__footer">
        <Link href="/" className="admin-sidebar__link" style={{ fontSize: '13px' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>storefront</span>
          View Store
        </Link>
      </div>
    </aside>
  );
}
