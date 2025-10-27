'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function LanguageRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Detectar idioma del navegador
    const browserLanguage = navigator.language.split('-')[0];
    const supportedLocales = ['es', 'en', 'ca'];
    
    // Si el idioma del navegador está soportado, redirigir a él
    if (supportedLocales.includes(browserLanguage)) {
      router.replace(`/${browserLanguage}`);
    } else {
      // Si no, usar español por defecto
      router.replace('/es');
    }
  }, [router]);

  return null; // Este componente no renderiza nada
}
