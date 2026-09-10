import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { ZodError } from "zod";
import {
  contactFormServerSchema,
  diagnosticoServerSchema,
  etiqueta,
  SITUACIONES_AEAT,
  VOLUMENES,
} from "@/lib/validations";

// Configure nodemailer transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "465"),
  secure: process.env.SMTP_SECURE === "true",
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

const AZUL = "#050A30";
const ROJO = "#DC2618";
const PAPEL = "#F2F3F6";
const NIEBLA = "#C9CCD6";
const PIZARRA = "#4A5A66";

/** Situaciones que traen plazo administrativo y deben verse en el asunto. */
const URGENTES = new Set(["requerimiento", "comprobacion", "inspeccion", "sancion"]);

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

function fila(clave: string, valor: string) {
  return `
    <tr>
      <td style="padding:9px 14px;border-bottom:1px solid ${NIEBLA};color:${PIZARRA};font-size:13px;white-space:nowrap;vertical-align:top;">${esc(clave)}</td>
      <td style="padding:9px 14px;border-bottom:1px solid ${NIEBLA};color:${AZUL};font-size:14px;">${esc(valor)}</td>
    </tr>`;
}

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const texto = (k: string) => (formData.get(k) as string | null) ?? "";

    // El diagnóstico se distingue del contacto simple por traer `volumen`.
    const esDiagnostico = formData.has("volumen");

    const file = formData.get("file") as File | null;

    let asunto: string;
    let cuerpo: string;
    let replyTo: string;

    if (esDiagnostico) {
      const datos = diagnosticoServerSchema.parse({
        name: texto("name"),
        email: texto("email"),
        phone: texto("phone"),
        message: texto("message"),
        situacion: texto("situacion"),
        volumen: texto("volumen"),
        plataformas: texto("plataformas"),
        ejercicios: texto("ejercicios"),
        situacionAeat: texto("situacionAeat"),
      });

      const urgente = URGENTES.has(datos.situacionAeat);
      replyTo = datos.email;
      asunto = `${urgente ? "[PLAZO] " : ""}Diagnóstico de ${datos.name}${
        datos.situacion ? ` · ${datos.situacion}` : ""
      }`;

      cuerpo = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:${AZUL};">
          <h2 style="color:${AZUL};border-bottom:3px solid ${ROJO};padding-bottom:10px;margin:0 0 18px;">
            Diagnóstico de operativa
          </h2>

          ${
            urgente
              ? `<p style="margin:0 0 18px;padding:12px 14px;background:#FFF3F1;border-left:4px solid ${ROJO};color:${AZUL};font-size:14px;">
                   <strong>Hay un plazo administrativo de por medio.</strong>
                   ${esc(etiqueta(SITUACIONES_AEAT, datos.situacionAeat))}.
                 </p>`
              : ""
          }

          <table style="width:100%;border-collapse:collapse;border:1px solid ${NIEBLA};background:#FFFFFF;">
            <tbody>
              ${fila("Nombre", datos.name)}
              ${fila("Email", datos.email)}
              ${fila("Teléfono", datos.phone)}
              ${datos.situacion ? fila("Llega desde", datos.situacion) : ""}
              ${fila("Operaciones", etiqueta(VOLUMENES, datos.volumen))}
              ${fila("Dónde opera", datos.plataformas)}
              ${fila("Ejercicios", datos.ejercicios)}
              ${fila("AEAT", etiqueta(SITUACIONES_AEAT, datos.situacionAeat))}
            </tbody>
          </table>

          ${
            datos.message
              ? `<div style="margin:20px 0;padding:16px;background:${PAPEL};">
                   <h3 style="color:${AZUL};margin:0 0 8px;font-size:14px;">Cuenta además:</h3>
                   <p style="margin:0;line-height:1.6;color:${AZUL};white-space:pre-wrap;font-size:14px;">${esc(datos.message)}</p>
                 </div>`
              : ""
          }

          ${
            file
              ? `<p style="margin:18px 0;padding:10px 14px;background:${PAPEL};border-left:4px solid ${ROJO};font-size:13px;">Archivo adjunto: ${esc(file.name)}</p>`
              : ""
          }

          <p style="margin-top:26px;padding-top:16px;border-top:1px solid ${NIEBLA};color:${PIZARRA};font-size:12px;">
            Enviado desde el diagnóstico de cleriontax.com
          </p>
        </div>`;
    } else {
      const datos = contactFormServerSchema.parse({
        name: texto("name"),
        email: texto("email"),
        phone: texto("phone"),
        message: texto("message"),
      });

      replyTo = datos.email;
      asunto = `Nueva consulta de ${datos.name}`;

      cuerpo = `
        <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:${AZUL};">
          <h2 style="color:${AZUL};border-bottom:3px solid ${ROJO};padding-bottom:10px;margin:0 0 18px;">
            Nueva consulta desde la web
          </h2>

          <table style="width:100%;border-collapse:collapse;border:1px solid ${NIEBLA};background:#FFFFFF;">
            <tbody>
              ${fila("Nombre", datos.name)}
              ${fila("Email", datos.email)}
              ${fila("Teléfono", datos.phone)}
            </tbody>
          </table>

          <div style="margin:20px 0;padding:16px;background:${PAPEL};">
            <h3 style="color:${AZUL};margin:0 0 8px;font-size:14px;">Mensaje:</h3>
            <p style="margin:0;line-height:1.6;color:${AZUL};white-space:pre-wrap;font-size:14px;">${esc(datos.message)}</p>
          </div>

          ${
            file
              ? `<p style="margin:18px 0;padding:10px 14px;background:${PAPEL};border-left:4px solid ${ROJO};font-size:13px;">Archivo adjunto: ${esc(file.name)}</p>`
              : ""
          }

          <p style="margin-top:26px;padding-top:16px;border-top:1px solid ${NIEBLA};color:${PIZARRA};font-size:12px;">
            Enviado desde el formulario de contacto de cleriontax.com
          </p>
        </div>`;
    }

    const attachments: { filename: string; content: Buffer; contentType: string }[] = [];
    if (file) {
      const buffer = Buffer.from(await file.arrayBuffer());
      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    await transporter.sendMail({
      from: `"Cleriontax Web" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo,
      subject: asunto,
      html: cuerpo,
      attachments,
    });

    return NextResponse.json(
      { success: true, message: "Formulario enviado correctamente" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    // Errores de validación: se devuelve el primer mensaje en claro, no el
    // volcado de Zod, que no le dice nada a quien está rellenando el formulario.
    if (error instanceof ZodError) {
      return NextResponse.json(
        {
          success: false,
          message: error.issues[0]?.message ?? "Revisa los datos del formulario.",
          campos: error.issues.map((i) => ({
            campo: i.path.join("."),
            mensaje: i.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message:
          "No hemos podido enviar el formulario. Escríbenos a info@cleriontax.com o llámanos al +34 663 482 301.",
      },
      { status: 500 }
    );
  }
}
