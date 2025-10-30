'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useLanguage } from '../lib/language-context';

const NAV_ITEMS = [
  { href: '/dashboard', key: 'dashboard', icon: '📊' },
  { href: '/layout-grid', key: 'layoutGrid', icon: '📦' },
  { href: '/imports', key: 'imports', icon: '📥' },
  { href: '/alerts', key: 'alerts', icon: '🚨' },
  { href: '/operations', key: 'operations', icon: '⚙️' },
  { href: '/settings', key: 'settings', icon: '🛠️' },
];

export const Sidebar = () => {
  const pathname = usePathname();
  const { t } = useLanguage();

  return (
    <aside className="hidden h-full w-60 flex-shrink-0 border-r border-border bg-card p-4 md:flex md:flex-col">
      <div className="mb-6 flex items-center gap-2 text-lg font-semibold">
        <span role="img" aria-label="factory">
          🏭
        </span>
        WMS Smart Factory
      </div>
      <nav className="space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors hover:bg-primary/10 ${
                isActive ? 'bg-primary/10 text-primary' : 'text-muted-foreground'
              }`}
            >
              <span>{item.icon}</span>
              {t(item.key)}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};
