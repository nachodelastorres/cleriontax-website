"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

// Cookie categories
export type CookieCategory = 'necessary' | 'analytics' | 'marketing';

export interface CookieConsent {
  necessary: boolean; // Always true, can't be disabled
  analytics: boolean;
  marketing: boolean;
}

export interface CookieConsentContextType {
  consent: CookieConsent | null;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectAll: () => void;
  acceptSelected: (categories: Partial<CookieConsent>) => void;
  openSettings: () => void;
  closeSettings: () => void;
  showSettings: boolean;
}

const COOKIE_CONSENT_KEY = 'cleriontax_cookie_consent';
const COOKIE_CONSENT_VERSION = '1'; // Increment to force re-consent if policy changes

const defaultConsent: CookieConsent = {
  necessary: true,
  analytics: false,
  marketing: false,
};

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

export function CookieConsentProvider({ children }: { children: React.ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [hasConsented, setHasConsented] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load consent from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (parsed.version === COOKIE_CONSENT_VERSION && parsed.consent) {
          setConsent(parsed.consent);
          setHasConsented(true);
          setShowBanner(false);
        } else {
          // Version mismatch, need re-consent
          setShowBanner(true);
        }
      } catch {
        setShowBanner(true);
      }
    } else {
      setShowBanner(true);
    }
    setIsInitialized(true);
  }, []);

  // Save consent to localStorage
  const saveConsent = useCallback((newConsent: CookieConsent) => {
    const data = {
      version: COOKIE_CONSENT_VERSION,
      consent: newConsent,
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(data));
    setConsent(newConsent);
    setHasConsented(true);
    setShowBanner(false);
    setShowSettings(false);

    // Dispatch event for scripts to react
    window.dispatchEvent(new CustomEvent('cookieConsentChanged', { detail: newConsent }));
  }, []);

  const acceptAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
    });
  }, [saveConsent]);

  const rejectAll = useCallback(() => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
    });
  }, [saveConsent]);

  const acceptSelected = useCallback((categories: Partial<CookieConsent>) => {
    saveConsent({
      necessary: true, // Always true
      analytics: categories.analytics ?? false,
      marketing: categories.marketing ?? false,
    });
  }, [saveConsent]);

  const openSettings = useCallback(() => {
    setShowSettings(true);
  }, []);

  const closeSettings = useCallback(() => {
    setShowSettings(false);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented,
        // Don't show banner until initialized to prevent hydration mismatch
        showBanner: isInitialized ? showBanner : false,
        acceptAll,
        rejectAll,
        acceptSelected,
        openSettings,
        closeSettings,
        showSettings: isInitialized ? showSettings : false,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error('useCookieConsent must be used within a CookieConsentProvider');
  }
  return context;
}

// Hook to check if a specific category is allowed
export function useCookieCategory(category: CookieCategory): boolean {
  const { consent } = useCookieConsent();
  if (!consent) return category === 'necessary';
  return consent[category];
}
