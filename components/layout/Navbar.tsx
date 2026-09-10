"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Languages, MessageCircle } from "lucide-react";
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
    { name: t('method'), href: '/metodo' },
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
    <nav className="fixed top-0 z-50 w-full border-b border-niebla bg-blanco/95 backdrop-">
      <Container>
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Logo
            variant="transparent"
            type="full"
            href="/"
            height={32}
          />
          {/* Desktop Navigation */}
          <div className="hidden items-center space-x-8 md:flex">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-sm font-medium text-azul transition-colors hover:text-pizarra"
              >
                {item.name}
              </Link>
            ))}
            {/* Language Selector */}
            <div className="relative" ref={langMenuRef}>
              <button
                onClick={() => setLangMenuOpen(!langMenuOpen)}
                className="flex items-center space-x-1 text-sm font-medium text-azul transition-colors hover:text-pizarra"
                aria-label="Select language"
              >
                <Languages className="h-4 w-4" />
                <span>{locale.toUpperCase()}</span>
              </button>
                {langMenuOpen && (
                  <div
                    className="absolute right-0 mt-2 w-32 border border-niebla bg-blanco z-50"
                  >
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => switchLanguage(lang.code)}
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-niebla/10 transition-colors ${
 locale === lang.code ? 'bg-azul/10 text-azul font-medium' : 'text-pizarra'
 }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
            </div>
            {/* WhatsApp Button */}
            <a
              href="https://wa.me/34663482301"
              target="_blank"
              rel="noopener noreferrer nofollow"
              className="flex items-center space-x-2 bg-green-500 px-4 py-2 text-sm font-medium text-blanco transition-all hover:bg-green-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span>WhatsApp</span>
            </a>
            <ButtonLink variant="principal" size="sm" href="/contacto">
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
              <X className="h-6 w-6 text-azul" />
            ) : (
              <Menu className="h-6 w-6 text-azul" />
            )}
          </button>
        </div>
      </Container>
      {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="overflow-hidden border-t border-niebla bg-blanco md:hidden"
          >
            <Container>
              <div className="space-y-1 py-4">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-base font-medium text-azul hover:bg-niebla/10 transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
                {/* Mobile Language Selector */}
                <div className="border-t border-niebla pt-2 mt-2">
                  <div className="px-3 py-2 text-sm font-semibold text-pizarra">
                    {tCommon('language')}
                  </div>
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setMobileMenuOpen(false);
                      }}
                      className={`block w-full px-3 py-2 text-left text-base font-medium hover:bg-niebla/10 transition-colors ${
 locale === lang.code ? 'text-azul bg-azul/10' : 'text-pizarra'
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
                    rel="noopener noreferrer nofollow"
                    className="flex items-center justify-center space-x-2 bg-green-500 px-4 py-2.5 text-base font-medium text-blanco transition-all hover:bg-green-600 w-full"
                  >
                    <MessageCircle className="h-5 w-5" />
                    <span>WhatsApp</span>
                  </a>
                </div>
                <div className="pt-2">
                  <ButtonLink variant="principal" size="sm" href="/contacto" className="w-full">
                    {t('requestQuote')}
                  </ButtonLink>
                </div>
              </div>
            </Container>
          </div>
        )}
    </nav>
  );
}
