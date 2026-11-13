/**
 * Preguntas frecuentes de un artículo, leídas de su propio Markdown.
 *
 * El bloque de FAQ de cada post es un `## Preguntas frecuentes` (o su
 * equivalente en inglés y catalán) con una pregunta por `###`. De ahí sale el
 * schema FAQPage, así que lo que lee Google es exactamente lo que se ve.
 */

const TITULO_FAQ = /^(preguntas frecuentes|preguntes freqüents|frequently asked questions|faq\b)/i;

/** Quita el marcado Markdown para dejar texto plano. */
function textoPlano(md: string): string {
  return md
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, "")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/^\s*>\s?/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\|?\s*-{3,}.*$/gm, "")
    .replace(/[*_`#|]/g, "")
    .replace(/\s+/g, " ")
    .trim();
}

export function preguntasDelArticulo(contenido: string): { q: string; a: string }[] {
  const lineas = contenido.split("\n");
  const preguntas: { q: string; a: string }[] = [];
  let dentro = false;
  let actual: { q: string; a: string[] } | null = null;

  const cerrar = () => {
    if (actual) {
      const a = textoPlano(actual.a.join("\n"));
      if (a) preguntas.push({ q: actual.q, a });
    }
    actual = null;
  };

  for (const linea of lineas) {
    const h2 = /^##\s+(.*)$/.exec(linea);
    if (h2) {
      cerrar();
      dentro = TITULO_FAQ.test(h2[1].trim());
      continue;
    }
    if (!dentro) continue;

    const h3 = /^###\s+(.*)$/.exec(linea);
    if (h3) {
      cerrar();
      const q = textoPlano(h3[1]);
      // Solo preguntas de verdad: un H3 que no lo es no entra en el schema.
      if (q.endsWith("?")) actual = { q, a: [] };
      continue;
    }
    if (actual) actual.a.push(linea);
  }
  cerrar();
  return preguntas;
}
