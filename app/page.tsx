import { permanentRedirect } from 'next/navigation';

export default function RootPage() {
  // Permanente: la raíz siempre lleva al español, que es también el x-default.
  permanentRedirect('/es');
}
