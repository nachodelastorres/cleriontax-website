import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import { contactFormServerSchema } from "@/lib/validations";

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

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extract form fields
    const data = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      message: formData.get("message") as string,
    };

    const file = formData.get("file") as File | null;

    // Validate form data
    const validatedData = contactFormServerSchema.parse(data);

    // Prepare email content
    let htmlContent = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #050a30; border-bottom: 3px solid #d4a574; padding-bottom: 10px;">
          Nueva consulta desde la web
        </h2>

        <div style="margin: 20px 0; padding: 20px; background-color: #f9f9f9; border-radius: 8px;">
          <p style="margin: 10px 0;"><strong style="color: #050a30;">Nombre:</strong> ${validatedData.name}</p>
          <p style="margin: 10px 0;"><strong style="color: #050a30;">Email:</strong> <a href="mailto:${validatedData.email}" style="color: #d4a574;">${validatedData.email}</a></p>
          <p style="margin: 10px 0;"><strong style="color: #050a30;">Teléfono:</strong> <a href="tel:${validatedData.phone}" style="color: #d4a574;">${validatedData.phone}</a></p>
        </div>

        <div style="margin: 20px 0;">
          <h3 style="color: #050a30;">Mensaje:</h3>
          <p style="line-height: 1.6; color: #333; white-space: pre-wrap;">${validatedData.message}</p>
        </div>

        ${file ? `<p style="margin: 20px 0; padding: 10px; background-color: #fff3cd; border-left: 4px solid #d4a574;">📎 <strong>Archivo adjunto:</strong> ${file.name}</p>` : ''}

        <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #ddd; color: #666; font-size: 12px;">
          <p>Este email fue enviado desde el formulario de contacto de <a href="https://www.cleriontax.com" style="color: #d4a574;">cleriontax.com</a></p>
        </div>
      </div>
    `;

    // Prepare attachments
    const attachments: any[] = [];
    if (file) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      attachments.push({
        filename: file.name,
        content: buffer,
        contentType: file.type,
      });
    }

    // Send email
    await transporter.sendMail({
      from: `"Cleriontax Web" <${process.env.SMTP_FROM}>`,
      to: process.env.SMTP_TO,
      replyTo: validatedData.email,
      subject: `Nueva consulta de ${validatedData.name}`,
      html: htmlContent,
      attachments: attachments,
    });

    // Log success
    console.log("Email sent successfully to:", process.env.SMTP_TO);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Formulario enviado correctamente",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error processing contact form:", error);

    if (error instanceof Error) {
      return NextResponse.json(
        {
          success: false,
          message: error.message,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: "Error al procesar el formulario",
      },
      { status: 500 }
    );
  }
}
