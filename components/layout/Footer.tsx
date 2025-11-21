"use client";

import { Link } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Mail, Phone, Linkedin } from "lucide-react";
import Container from "@/components/ui/Container";
import Logo from "@/components/ui/Logo";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations('footer');
  const tCommon = useTranslations('common.socialNetworks');
  const locale = useLocale();

  const footerLinks = {
    empresa: [
      { name: t('links.about'), href: '/sobre-nosotros' },
      { name: t('links.services'), href: '/servicios' },
      { name: t('links.blog'), href: '/blog' },
      { name: t('links.contact'), href: '/contacto' },
    ],
    // Comentado temporalmente hasta crear las páginas legales
    // legal: [
    //   { name: t('links.privacy'), href: '/privacidad' },
    //   { name: t('links.legal'), href: '/aviso-legal' },
    //   { name: t('links.cookies'), href: '/cookies' },
    // ],
  };

  return (
    <footer className="border-t border-neutral-300 bg-gradient-to-br from-navy via-navy to-navy-darker">
      <Container>
        <div className="py-8">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {/* Brand */}
            <div className="space-y-2">
              <Logo variant="transparent" type="cropped" />
              <p className="text-sm text-gray-blue-light">
                {t('description')}
              </p>
            </div>

            {/* Empresa */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('sections.company')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.empresa.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-blue-light transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal - Temporalmente oculto hasta crear las páginas */}
            {/* <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('sections.legal')}
              </h3>
              <ul className="space-y-2">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-gray-blue-light transition-colors hover:text-white"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div> */}

            {/* Contacto */}
            <div>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {t('sections.contact')}
              </h3>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:info@cleriontax.com"
                    className="flex items-center space-x-2 text-sm text-gray-blue-light transition-colors hover:text-white group"
                  >
                    <Mail className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>info@cleriontax.com</span>
                  </a>
                </li>
                <li>
                  <a
                    href="https://wa.me/34663482301"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-blue-light transition-colors hover:text-white group"
                  >
                    <Phone className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>+34 663 482 301</span>
                  </a>
                </li>
                {/* LinkedIn - Comentado hasta tener URL específica
                <li>
                  <a
                    href="https://linkedin.com/company/cleriontax"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-gray-blue-light transition-colors hover:text-white group"
                  >
                    <Linkedin className="h-4 w-4 group-hover:scale-110 transition-transform" />
                    <span>{tCommon('linkedin')}</span>
                  </a>
                </li>
                */}
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="mt-8 border-t border-gray-blue pt-6 text-center">
            <p className="text-sm text-gray-blue-light">
              © {currentYear} Cleriontax. {t('copyright')}
            </p>
          </div>
        </div>
      </Container>
    </footer>
  );
}
