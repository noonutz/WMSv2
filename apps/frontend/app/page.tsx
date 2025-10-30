'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { apiFetch } from './lib/api';
import { useLanguage } from './lib/language-context';

export default function LoginPage() {
  const router = useRouter();
  const { t, setLanguage, language } = useLanguage();
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('Admin@123');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ username, password }),
      });
      router.push('/dashboard');
    } catch (err) {
      setError('Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <div className="w-full max-w-md rounded-lg border border-border bg-card p-8 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">Smart Factory WMS</h1>
            <p className="text-sm text-muted-foreground">Full lifecycle warehouse management</p>
          </div>
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'th' : 'en')}
            className="rounded-md border border-border px-3 py-1 text-xs"
          >
            {language === 'en' ? 'ไทย' : 'English'}
          </button>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="text-sm font-medium">{t('username')}</label>
            <input
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label className="text-sm font-medium">{t('password')}</label>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1 w-full rounded-md border border-border px-3 py-2 text-sm focus:border-primary focus:outline-none"
            />
          </div>
          {error && <p className="text-sm text-destructive">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow-sm transition hover:brightness-105 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Processing...' : t('login')}
          </button>
        </form>
        <div className="mt-6 rounded-md border border-dashed border-primary/50 bg-primary/5 p-4 text-xs text-muted-foreground">
          <p>Zebra TC-21 via DataWedge ready</p>
          <p>Demo credential: admin / Admin@123</p>
        </div>
      </div>
    </div>
  );
}
