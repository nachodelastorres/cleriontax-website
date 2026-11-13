/**
 * Alta de leads en Airtable.
 *
 * Cada envío de formulario crea un registro en la tabla «leads». Es un canal
 * paralelo al correo: si Airtable falla, se registra el error y el correo sale
 * igual, así que ningún lead se pierde ni el visitante ve un error por esto.
 *
 * Los nombres de columna están todos aquí: si cambia alguno en Airtable, solo
 * hay que tocarlo en `CAMPOS`.
 */

const BASE_ID = "applfTYQoKVDqqYZ9";
const TABLA_ID = "tblq4Tmx920PxwJ9o";

/** Nombre exacto de cada columna en la tabla de Airtable. */
export const CAMPOS = {
  nombre: "Nombre",
  email: "Email",
  telefono: "Teléfono",
  mensaje: "Mensaje",
  tipo: "Tipo",
  llegaDesde: "Llega desde",
  volumen: "Volumen",
  plataformas: "Plataformas",
  ejercicios: "Ejercicios",
  situacionAeat: "Situación AEAT",
  urgente: "Urgente",
  pagina: "Página",
  adjunto: "Adjunto",
  estado: "Estado",
} as const;

export type Lead = {
  nombre: string;
  email: string;
  telefono: string;
  mensaje?: string;
  tipo: "Contacto" | "Diagnóstico";
  llegaDesde?: string;
  volumen?: string;
  plataformas?: string;
  ejercicios?: string;
  situacionAeat?: string;
  urgente: boolean;
  pagina?: string;
  /** Solo el nombre del archivo: el archivo en sí llega por correo. */
  adjunto?: string;
};

export async function crearLead(lead: Lead): Promise<void> {
  const token = process.env.AIRTABLE_TOKEN;
  if (!token) {
    console.warn("AIRTABLE_TOKEN no está definido: el lead no se guarda en Airtable.");
    return;
  }

  const fields: Record<string, string | boolean> = {
    [CAMPOS.nombre]: lead.nombre,
    [CAMPOS.email]: lead.email,
    [CAMPOS.telefono]: lead.telefono,
    [CAMPOS.tipo]: lead.tipo,
    [CAMPOS.urgente]: lead.urgente,
    [CAMPOS.estado]: "Nuevo",
  };
  const opcionales: [string, string | undefined][] = [
    [CAMPOS.mensaje, lead.mensaje],
    [CAMPOS.llegaDesde, lead.llegaDesde],
    [CAMPOS.volumen, lead.volumen],
    [CAMPOS.plataformas, lead.plataformas],
    [CAMPOS.ejercicios, lead.ejercicios],
    [CAMPOS.situacionAeat, lead.situacionAeat],
    [CAMPOS.pagina, lead.pagina],
    [CAMPOS.adjunto, lead.adjunto],
  ];
  for (const [campo, valor] of opcionales) {
    if (valor) fields[campo] = valor;
  }

  // Si a la tabla le falta una columna, Airtable rechaza el registro entero.
  // En ese caso se quita esa columna y se reintenta, para que el lead entre
  // con lo que sí cabe; el aviso queda en los logs.
  for (let intento = 0; intento <= Object.keys(fields).length; intento++) {
    const res = await fetch(`https://api.airtable.com/v0/${BASE_ID}/${TABLA_ID}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      // `typecast` crea solas las opciones nuevas de los campos de selección,
      // para que un valor que aún no exista no tumbe el alta.
      body: JSON.stringify({ records: [{ fields }], typecast: true }),
    });

    if (res.ok) return;

    const texto = await res.text();
    const desconocido = columnaDesconocida(texto);
    if (res.status === 422 && desconocido && desconocido in fields) {
      console.warn(`Airtable: la tabla no tiene la columna «${desconocido}»; el lead se guarda sin ella.`);
      delete fields[desconocido];
      continue;
    }
    throw new Error(`Airtable respondió ${res.status}: ${texto}`);
  }
}

/** Nombre de la columna que Airtable no reconoce, si ese es el error. */
function columnaDesconocida(respuesta: string): string | null {
  try {
    const { error } = JSON.parse(respuesta);
    if (error?.type !== "UNKNOWN_FIELD_NAME") return null;
    return /"(.+)"/.exec(error.message ?? "")?.[1] ?? null;
  } catch {
    return null;
  }
}
