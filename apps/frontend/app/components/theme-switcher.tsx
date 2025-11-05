'use client';

import { useTheme } from './theme-provider';

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  console.log('ThemeSwitcher rendered');

  return (
    <div className="flex items-center space-x-2">
      <select
        data-testid="theme-switcher"
        onChange={(e) => setTheme(e.target.value as 'light' | 'dark' | 'blue' | 'green')}
        className="border rounded-md px-2 py-1"
      >
        <option value="light">Light</option>
        <option value="dark">Dark</option>
        <option value="blue">Blue</option>
        <option value="green">Green</option>
      </select>
    </div>
  );
}
