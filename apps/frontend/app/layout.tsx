import './globals.css';
import './themes.css';
import { ThemeProvider } from './components/theme-provider';
import { Providers } from './components/providers';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'WMS Smart Factory',
  description: 'Smart Factory Warehouse Management System with Min/Max monitoring and Zebra TC-21 integration',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
  <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
    <Providers>{children}</Providers>
  </ThemeProvider>
      </body>
    </html>
  );
}
