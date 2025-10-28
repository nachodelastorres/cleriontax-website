// Root layout - must not render <html> and <body> when using [locale] pattern
// The locale-specific layout handles these
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
