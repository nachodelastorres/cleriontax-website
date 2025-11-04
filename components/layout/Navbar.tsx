"use client";

import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Languages, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');
  const tCommon = useTranslations('common');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  // Close language menu when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (langMenuRef.current && !langMenuRef.current.contains(event.target as Node)) {
        setLangMenuOpen(false);
      }
    }

    if (langMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }
  }, [langMenuOpen]);

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('services'), href: '/servicios' },
    { name: t('blog'), href: '/blog' },
    { name: t('about'), href: '/sobre-nosotros' },
    { name: t('contact'), href: '/contacto' },
  ];

  const languages = [
    { code: 'es', name: tCommon('languages.es') },
    { code: 'en', name: tCommon('languages.en') },
    { code: 'ca', name: tCommon('languages.ca') },
  ];

  const switchLanguage = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
    setLangMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-neutral-200 bg-white/95 backdrop-blur-md shadow-sm">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo
            variant="transparent"
            type="full"
            href={`/${locale}`}
            height={32}
          />

          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-navy transition-colors hover:text-gray-blue"
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-navy transition-colors hover:text-gray-blue"
                aria-label="Select language"
              >
                <Languages className="h-4 w-4" />
                <span>{locale.toUpperCase()}</span>
              </button>

              <AnimatePresence>
                {langMenuOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-2 w-32 rounded-lg border border-neutral-200 bg-white shadow-lg z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-blue-light/10 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                          locale === lang.code ? 'bg-navy/10 text-navy font-medium' : 'text-gray-blue'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/34663482301"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center space-x-2 rounded-lg bg-green-500 px-4 py-2 text-sm font-medium text-white transition-all hover:bg-green-600 hover:shadow-md"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>

            <ButtonLink variant="secondary" size="sm" href="/contacto">
              {t('requestQuote')}
            </ButtonLink>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">{t('openMenu')}</span>
            {mobileMenuOpen ? (
              <X className="h-6 w-6 text-primary" />
            ) : (
              <Menu className="h-6 w-6 text-primary" />
            )}
          </button>
        </div>
      </Container>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-neutral-200 bg-white md:hidden"
          >
            <Container>
              <div className="space-y-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block rounded-lg px-3 py-2 text-base font-medium text-navy hover:bg-gray-blue-light/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Language Selector */}
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-semibold text-gray-blue">
                    {tCommon('language')}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-base font-medium hover:bg-gray-blue-light/10 transition-colors ${
                        locale === lang.code ? 'text-navy bg-navy/10' : 'text-gray-blue'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                {/* Mobile WhatsApp Button */}
                <div className="pt-2">
                  <a
                    href="https://wa.me/34663482301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center space-x-2 rounded-lg bg-green-500 px-4 py-2.5 text-base font-medium text-white transition-all hover:bg-green-600 w-full"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>

                <div className="pt-2">
                  <ButtonLink variant="secondary" size="sm" href="/contacto" className="w-full">
                    {t('requestQuote')}
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
