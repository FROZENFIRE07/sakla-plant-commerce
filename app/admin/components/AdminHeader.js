'use client';

import { useRouter } from 'next/navigation';

export default function AdminHeader({ title }) {
  const router = useRouter();

  async function handleLogout() {
    await fetch('/api/auth/me', { method: 'DELETE' });
    router.push('/admin/login');
  }

  return (
    <header className="admin-header">
      <h1 className="admin-header__title">{title}</h1>
      <div className="admin-header__actions">
        <div className="admin-header__user">
          <div className="admin-header__avatar">A</div>
          <span>Admin</span>
        </div>
        <button className="admin-header__logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </header>
  );
}
