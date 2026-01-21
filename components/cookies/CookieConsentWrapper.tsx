"use client";

import { CookieConsentProvider } from '@/contexts/CookieConsentContext';
import CookieBanner from './CookieBanner';

export default function CookieConsentWrapper() {
  return (
    <CookieConsentProvider>
      <CookieBanner />
    </CookieConsentProvider>
  );
}
