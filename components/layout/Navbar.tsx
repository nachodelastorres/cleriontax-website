"use client";
import { useState, useEffect, useRef } from "react";
import { useTranslations, useLocale } from 'next-intl';
import { Menu, X, Languages, ChevronDown } from "lucide-react";
import IconoWhatsApp from "@/components/brand/IconoWhatsApp";
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import ButtonLink from "@/components/ui/ButtonLink";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";
import { GRUPOS, porGrupo } from "@/lib/paginas";

const PAGINAS_POR_GRUPO = porGrupo();
export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [langMenuOpen, setLangMenuOpen] = useState(false);
  const [serviciosOpen, setServiciosOpen] = useState(false);
  const [serviciosMovil, setServiciosMovil] = useState(false);
  const langMenuRef = useRef<HTMLDivElement>(null);
  const serviciosRef = useRef<HTMLDivElement>(null);
  const t = useTranslations('nav');
  const tPag = useTranslations('paginas');
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
  // El desplegable de servicios se cierra al pulsar fuera, con Escape o al navegar.
  useEffect(() => {
    if (!serviciosOpen) return;
    function fuera(event: MouseEvent) {
      if (serviciosRef.current && !serviciosRef.current.contains(event.target as Node)) {
        setServiciosOpen(false);
      }
    }
    function escape(event: KeyboardEvent) {
      if (event.key === 'Escape') setServiciosOpen(false);
    }
    document.addEventListener('mousedown', fuera);
    document.addEventListener('keydown', escape);
    return () => {
      document.removeEventListener('mousedown', fuera);
      document.removeEventListener('keydown', escape);
    };
  }, [serviciosOpen]);
  useEffect(() => {
    setServiciosOpen(false);
    setMobileMenuOpen(false);
  }, [pathname]);
  // Con el menú móvil abierto, la página de detrás no se desplaza.
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const previo = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previo;
    };
  }, [mobileMenuOpen]);
  const navigation = [
    { name: t('prices'), href: '/precios' },
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
            {/* Servicios: las páginas agrupadas por la pregunta del cliente */}
            <div
              className="relative"
              ref={serviciosRef}
              onMouseEnter={() => setServiciosOpen(true)}
              onMouseLeave={() => setServiciosOpen(false)}
            >
              <button
                type="button"
                onClick={() => setServiciosOpen(!serviciosOpen)}
                aria-expanded={serviciosOpen}
                aria-controls="menu-servicios"
                className="flex items-center gap-1 text-sm font-medium text-azul transition-colors hover:text-pizarra"
              >
                {t('services')}
                <ChevronDown
                  className={`h-4 w-4 transition-transform ${serviciosOpen ? 'rotate-180' : ''}`}
                  aria-hidden="true"
                />
              </button>
              {serviciosOpen && (
                <div id="menu-servicios" className="absolute left-0 top-full z-50 pt-4">
                  <div className="grid w-[640px] grid-cols-3 gap-px border border-niebla bg-niebla">
                    {GRUPOS.map((g) => (
                      <div key={g} className="bg-blanco p-5">
                        <p className="text-dato font-semibold text-pizarra">
                          {tPag(`grupos.${g}.titulo`)}
                        </p>
                        <ul className="mt-3 space-y-1">
                          {PAGINAS_POR_GRUPO[g].map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/${p.slug}`}
                                className="block py-1 text-sm font-medium text-azul transition-colors hover:text-rojo"
                              >
                                {tPag(`nombres.${p.slug}`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
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
            {/* WhatsApp: solo el logotipo oficial, en su verde. */}
            <a
              href="https://wa.me/34663482301"
              target="_blank"
              rel="noopener noreferrer nofollow"
              aria-label="WhatsApp"
              title="WhatsApp"
              className="flex h-10 w-10 items-center justify-center transition-transform duration-200 hover:scale-110"
            >
              <IconoWhatsApp className="h-7 w-7" />
            </a>
            <ButtonLink variant="principal" size="sm" href="/contacto">
              {t('requestQuote')}
            </ButtonLink>
          </div>
          {/* Mobile menu button */}
          <button
            type="button"
            className="-mr-2.5 p-2.5 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-controls="menu-movil"
          >
            <span className="sr-only">{mobileMenuOpen ? t('closeMenu') : t('openMenu')}</span>
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
            id="menu-movil"
            className="max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-niebla bg-blanco md:hidden"
          >
            <Container>
              <div className="space-y-1 py-4">
                <button
                  type="button"
                  onClick={() => setServiciosMovil(!serviciosMovil)}
                  aria-expanded={serviciosMovil}
                  className="flex w-full items-center justify-between px-3 py-2 text-base font-medium text-azul hover:bg-niebla/10 transition-colors"
                >
                  {t('services')}
                  <ChevronDown
                    className={`h-5 w-5 transition-transform ${serviciosMovil ? 'rotate-180' : ''}`}
                    aria-hidden="true"
                  />
                </button>
                {serviciosMovil && (
                  <div className="space-y-4 px-3 pb-2">
                    {GRUPOS.map((g) => (
                      <div key={g}>
                        <p className="text-dato font-semibold text-pizarra">
                          {tPag(`grupos.${g}.titulo`)}
                        </p>
                        <ul className="mt-1">
                          {PAGINAS_POR_GRUPO[g].map((p) => (
                            <li key={p.slug}>
                              <Link
                                href={`/${p.slug}`}
                                className="block py-1.5 pl-3 text-base text-azul hover:text-rojo"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {tPag(`nombres.${p.slug}`)}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
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
                    className="flex w-full items-center justify-center gap-3 border border-niebla px-4 py-2.5 text-base font-medium text-azul transition-colors hover:bg-papel"
                  >
                    <IconoWhatsApp className="h-6 w-6" />
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
