'use client';

import { ReactNode } from 'react';
import { LanguageProvider } from '../lib/language-context';

export const Providers = ({ children }: { children: ReactNode }) => {
  return <LanguageProvider>{children}</LanguageProvider>;
};
