import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
  variant?: 'light' | 'dark' | 'transparent';
  type?: 'full' | 'icon' | 'cropped';
  className?: string;
  width?: number;
  height?: number;
  href?: string;
}

/**
 * Logo component for Cleriontax
 *
 * Variants:
 * - light: Logo for dark backgrounds (fondo_blanco - white elements)
 * - dark: Logo for light backgrounds (fondo_oscuro - dark elements)
 * - transparent: Logo with transparent background
 *
 * Types:
 * - full: Complete logo with text
 * - icon: Icon only
 * - cropped: Cropped logo without extra margins
 */
export default function Logo({
  variant = 'transparent',
  type = 'full',
  className = '',
  width,
  height,
  href
}: LogoProps) {
  // Determine which logo file to use
  const logoMap = {
    'light-full': '/images/logos/logo_fondo_blanco.svg',
    'light-icon': '/images/logos/icono_fondo_blanco.svg',
    'light-cropped': '/images/logos/logo_recortado_fondo_transparente.svg',
    'dark-full': '/images/logos/logo_fondo_oscuro.svg',
    'dark-icon': '/images/logos/icono_fondo_oscuro.svg',
    'dark-cropped': '/images/logos/logo_recortado_fondo_transparente.svg',
    'transparent-full': '/images/logos/logo_fondo_transparente.svg',
    'transparent-icon': '/images/logos/icono_fondo_transparente.svg',
    'transparent-cropped': '/images/logos/logo_recortado_transparente_blanco.svg',
  };

  const logoKey = `${variant}-${type}` as keyof typeof logoMap;
  const logoSrc = logoMap[logoKey];

  // Default dimensions based on type
  const defaultWidth = type === 'full' ? 180 : type === 'cropped' ? 140 : 40;
  const defaultHeight = type === 'full' ? 40 : type === 'cropped' ? 32 : 40;

  const logo = (
    <Image
      src={logoSrc}
      alt="Cleriontax"
      width={width || defaultWidth}
      height={height || defaultHeight}
      className={className}
      priority
    />
  );

  if (href) {
    return (
      <Link href={href} className="inline-block">
        {logo}
      </Link>
    );
  }

  return logo;
}
