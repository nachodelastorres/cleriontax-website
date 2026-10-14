import { createElement, type ComponentProps } from 'react';
import { useLocale } from 'next-intl';
import { createNavigation } from 'next-intl/navigation';
import { locales } from '../locales';
import { localizarRuta } from '../lib/rutas';

const navegacion = createNavigation({
  locales
});

export const { redirect, usePathname, useRouter } = navegacion;

/**
 * El Link de next-intl, con el slug traducido: `href="/precios"` lleva a
 * /en/pricing en inglés. Los enlaces se escriben siempre con la ruta española.
 */
export function Link({ href, locale, ...props }: ComponentProps<typeof navegacion.Link>) {
  const actual = useLocale();
  const destino = typeof href === 'string' ? localizarRuta(href, (locale as string) ?? actual) : href;
  return createElement(navegacion.Link, { href: destino, locale, ...props });
}
