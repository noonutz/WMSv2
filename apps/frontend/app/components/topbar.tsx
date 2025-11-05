'use client';

import { useLanguage } from '../lib/language-context';
import { ThemeSwitcher } from './theme-switcher';

export const Topbar = () => {
  const { language, setLanguage } = useLanguage();

  return (
    <header className="flex items-center justify-between border-b border-border bg-card px-4 py-3">
      <div>
        <p className="text-sm text-muted-foreground">Smart Factory WMS</p>
        <h1 className="text-lg font-semibold">Full Lifecycle Control Center</h1>
      </div>
      <div className="flex items-center gap-3">
        <ThemeSwitcher />
        <button
          type="button"
          onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
          className="rounded-md border border-border px-3 py-1 text-sm shadow-sm transition hover:bg-primary/10"
        >
          {language === 'en' ? 'ไทย' : 'English'}
        </button>
        <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1 text-sm">
          <span role="img" aria-label="zebra scanner">
            🤳
          </span>
          Zebra TC-21 Ready
        </div>
      </div>
    </header>
  );
};
