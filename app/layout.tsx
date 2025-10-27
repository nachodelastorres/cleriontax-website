// Este layout raíz solo pasa children al layout localizado
// No debe renderizar <html> ni <body> porque el layout [locale] lo hace
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
