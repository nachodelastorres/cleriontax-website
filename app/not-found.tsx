import "./globals.css";

/**
 * Respaldo para las rutas que no caen bajo ningún idioma. Casi nunca se ve:
 * el middleware añade el idioma a todo y la 404 normal es la de [locale].
 * El layout raíz no pinta <html>, así que esta página lo hace.
 */
export default function NoEncontradaRaiz() {
  return (
    <html lang="es">
      <body className="bg-blanco font-sans text-azul">
        <main className="mx-auto max-w-3xl px-6 py-28">
          <p className="text-dato font-semibold uppercase tracking-wide text-rojo">404</p>
          <h1 className="mt-6 text-[40px] font-extrabold leading-[1.04] tracking-[-0.04em]">
            Esta página no existe
          </h1>
          <a href="/es" className="mt-8 inline-block font-semibold text-rojo underline underline-offset-4">
            Ir a Cleriontax
          </a>
        </main>
      </body>
    </html>
  );
}
