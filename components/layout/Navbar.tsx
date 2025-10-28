"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Languages } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { usePathname, useRouter } from 'next/navigation';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const t = useTranslations('nav');
  const tCommon = useTranslations('common.languages');
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('services'), href: `/${locale}/servicios` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('about'), href: `/${locale}/sobre-nosotros` },
    { name: t('contact'), href: `/${locale}/contacto` },
  ];

  const languages = [
    { code: 'es', name: tCommon('es') },
    { code: 'en', name: tCommon('en') },
    { code: 'ca', name: tCommon('ca') },
  ];

  const switchLanguage = (newLocale: string) => {
    // Remover cualquier locale del inicio del path (es, en, ca)
    const pathWithoutLocale = pathname.replace(/^\/(es|en|ca)/, '');
    // Construir la nueva URL con el nuevo locale
    const newPath = `/${newLocale}${pathWithoutLocale || ''}`;
    router.push(newPath);
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
                className="text-sm font-medium text-primary-800 transition-colors hover:text-accent"
              >
                {item.name}
              </Link>
            ))}

            {/* Language Selector */}
            <div className="relative">
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-primary-800 transition-colors hover:text-accent"
              >
                <Languages className="h-4 w-4" />
                <span>{locale.toUpperCase()}</span>
              </button>

              {langMenuOpen && (
                <div className="absolute right-0 mt-2 w-32 rounded-lg border border-neutral-200 bg-white shadow-lg">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => switchLanguage(lang.code)}
                      className={`block w-full px-4 py-2 text-left text-sm hover:bg-accent-50 first:rounded-t-lg last:rounded-b-lg transition-colors ${
                        locale === lang.code ? 'bg-accent/10 text-accent font-medium' : 'text-primary-800'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <ButtonLink variant="secondary" size="sm" href={`/${locale}/contacto`}>
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
                    className="block rounded-lg px-3 py-2 text-base font-medium text-primary-800 hover:bg-primary-50 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}

                {/* Mobile Language Selector */}
                <div className="border-t border-neutral-200 pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-semibold text-neutral-500">
                    {tCommon('language')}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full rounded-lg px-3 py-2 text-left text-base font-medium hover:bg-accent-50 transition-colors ${
                        locale === lang.code ? 'text-accent' : 'text-primary-800'
                      }`}
                    >
                      {lang.name}
                    </button>
                  ))}
                </div>

                <div className="pt-2">
                  <ButtonLink variant="secondary" size="sm" href={`/${locale}/contacto`} className="w-full">
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
