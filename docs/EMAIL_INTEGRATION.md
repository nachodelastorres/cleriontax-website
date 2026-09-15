# Guía de Integración de Email - Cleriontax

## Opciones de Servicios de Email

### Opción 1: Resend (Recomendado) ⭐

**Ventajas**:
- API moderna y fácil de usar
- Gratis hasta 3,000 emails/mes
- Excelente experiencia de desarrollo
- Templates con React Email

**Instalación**:
```bash
npm install resend
```

**Configuración**:

1. Crear cuenta en https://resend.com
2. Obtener API key
3. Añadir a `.env.local`:

```env
RESEND_API_KEY=re_xxxxxxxxxxx
```

4. Actualizar `/app/api/contact/route.ts`:

```typescript
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    // ... código de validación existente ...

    // Enviar email
    const { data, error } = await resend.emails.send({
      from: 'Cleriontax <noreply@tudominio.com>',
      to: 'info@cleriontax.com',
      subject: `Nueva consulta de ${validatedData.name}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}</p>
        <p><strong>Servicio:</strong> ${validatedData.service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message}</p>
      `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // ... manejo de errores ...
  }
}
```

**Para adjuntar archivos**:
```typescript
const bytes = await file.arrayBuffer();
const buffer = Buffer.from(bytes);

await resend.emails.send({
  // ... campos anteriores ...
  attachments: [
    {
      filename: file.name,
      content: buffer,
    },
  ],
});
```

---

### Opción 2: SendGrid

**Ventajas**:
- Robusto y confiable
- Gratis hasta 100 emails/día
- Muy usado en producción

**Instalación**:
```bash
npm install @sendgrid/mail
```

**Configuración**:

1. Crear cuenta en https://sendgrid.com
2. Obtener API key
3. Añadir a `.env.local`:

```env
SENDGRID_API_KEY=SG.xxxxxxxxxxx
```

4. Actualizar `/app/api/contact/route.ts`:

```typescript
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);

export async function POST(request: NextRequest) {
  try {
    // ... código de validación existente ...

    const msg = {
      to: 'info@cleriontax.com',
      from: 'noreply@tudominio.com', // Debe estar verificado en SendGrid
      subject: `Nueva consulta de ${validatedData.name}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}</p>
        <p><strong>Servicio:</strong> ${validatedData.service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message}</p>
      `,
    };

    await sgMail.send(msg);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // ... manejo de errores ...
  }
}
```

---

### Opción 3: Nodemailer (SMTP)

**Ventajas**:
- Funciona con cualquier servidor SMTP
- No depende de terceros
- Gratis si tienes SMTP propio

**Instalación**:
```bash
npm install nodemailer
npm install -D @types/nodemailer
```

**Configuración**:

1. Configurar servidor SMTP (Gmail, Outlook, servidor propio)
2. Añadir a `.env.local`:

```env
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=tu@email.com
SMTP_PASSWORD=tu_contraseña_app
```

3. Actualizar `/app/api/contact/route.ts`:

```typescript
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export async function POST(request: NextRequest) {
  try {
    // ... código de validación existente ...

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: 'info@cleriontax.com',
      subject: `Nueva consulta de ${validatedData.name}`,
      html: `
        <h2>Nueva consulta desde la web</h2>
        <p><strong>Nombre:</strong> ${validatedData.name}</p>
        <p><strong>Email:</strong> ${validatedData.email}</p>
        <p><strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}</p>
        <p><strong>Servicio:</strong> ${validatedData.service}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${validatedData.message}</p>
      `,
    });

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // ... manejo de errores ...
  }
}
```

**Nota para Gmail**:
- Activar autenticación de 2 factores
- Generar "Contraseña de aplicación" en configuración de Google
- Usar esa contraseña en SMTP_PASSWORD

---

## Template HTML Mejorado

Para un email más profesional:

```typescript
const emailHTML = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: #1B263B;
      color: white;
      padding: 20px;
      text-align: center;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 8px;
      margin-top: 20px;
    }
    .field {
      margin-bottom: 15px;
      padding: 10px;
      background: white;
      border-left: 3px solid #66C7A9;
    }
    .field strong {
      color: #1B263B;
    }
    .footer {
      text-align: center;
      margin-top: 30px;
      color: #666;
      font-size: 12px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nueva Consulta - Cleriontax</h1>
    </div>

    <div class="content">
      <h2>Detalles de la consulta</h2>

      <div class="field">
        <strong>Nombre:</strong> ${validatedData.name}
      </div>

      <div class="field">
        <strong>Email:</strong>
        <a href="mailto:${validatedData.email}">${validatedData.email}</a>
      </div>

      <div class="field">
        <strong>Teléfono:</strong> ${validatedData.phone || 'No proporcionado'}
      </div>

      <div class="field">
        <strong>Servicio solicitado:</strong> ${validatedData.service}
      </div>

      <div class="field">
        <strong>Mensaje:</strong><br>
        ${validatedData.message.replace(/\n/g, '<br>')}
      </div>

      ${file ? `
      <div class="field">
        <strong>Archivo adjunto:</strong> ${file.name}
      </div>
      ` : ''}
    </div>

    <div class="footer">
      <p>Este email fue generado automáticamente desde cleriontax.com</p>
      <p>Responde al cliente lo antes posible a ${validatedData.email}</p>
    </div>
  </div>
</body>
</html>
`;
```

---

## Email de Confirmación al Cliente

Es buena práctica enviar también un email de confirmación al cliente:

```typescript
// Email al cliente
await resend.emails.send({
  from: 'Cleriontax <noreply@tudominio.com>',
  to: validatedData.email,
  subject: 'Hemos recibido tu consulta - Cleriontax',
  html: `
    <!DOCTYPE html>
    <html>
    <body style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
      <div style="background: #1B263B; color: white; padding: 30px; text-align: center;">
        <h1>¡Gracias por contactarnos!</h1>
      </div>

      <div style="padding: 30px;">
        <p>Hola ${validatedData.name},</p>

        <p>Hemos recibido tu consulta correctamente. Nuestro equipo la revisará y te responderemos en menos de 24 horas laborables.</p>

        <h3>Resumen de tu consulta:</h3>
        <ul>
          <li><strong>Servicio:</strong> ${validatedData.service}</li>
          <li><strong>Mensaje:</strong> ${validatedData.message.substring(0, 100)}...</li>
        </ul>

        <p>Mientras tanto, puedes explorar nuestros <a href="https://cleriontax.com/servicios" style="color: #66C7A9;">planes y servicios</a>.</p>

        <p>Saludos,<br>El equipo de Cleriontax</p>
      </div>

      <div style="background: #f9f9f9; padding: 20px; text-align: center; color: #666; font-size: 12px;">
        <p>Cleriontax - Especialistas en fiscalidad de criptoactivos</p>
        <p>info@cleriontax.com | +34 900 000 000</p>
      </div>
    </body>
    </html>
  `,
});
```

---

## Variables de Entorno

Crear archivo `.env.local` en la raíz del proyecto:

```env
# Resend
RESEND_API_KEY=re_xxxxxxxxxxx

# O SendGrid
# SENDGRID_API_KEY=SG.xxxxxxxxxxx

# O SMTP
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=tu@email.com
# SMTP_PASSWORD=tu_contraseña
```

**⚠️ IMPORTANTE**:
- Añadir `.env.local` al `.gitignore` (ya está incluido)
- NUNCA commitear las API keys al repositorio
- En producción (Vercel), añadir las variables en el dashboard

---

## Verificación de Dominio

Para que los emails no vayan a spam:

### Con Resend/SendGrid:
1. Verificar tu dominio en el dashboard
2. Añadir registros DNS (SPF, DKIM, DMARC)
3. Esperar propagación (24-48h)

### Registros DNS típicos:
```
TXT @ "v=spf1 include:_spf.resend.com ~all"
TXT resend._domainkey [valor proporcionado por Resend]
TXT _dmarc "v=DMARC1; p=none; rua=mailto:dmarc@tudominio.com"
```

---

## Testing

### En desarrollo:
```bash
# Ver logs en consola
npm run dev

# Enviar formulario de prueba
# Verificar que aparece en console.log
```

### En producción:
1. Usar email real (no @test.com)
2. Verificar carpeta de spam
3. Comprobar dashboard del servicio de email
4. Verificar límites de envío

---

## Rate Limiting (Recomendado)

Para evitar spam, añadir rate limiting:

```bash
npm install @upstash/ratelimit @upstash/redis
```

```typescript
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(3, "1 h"), // 3 requests por hora
});

export async function POST(request: NextRequest) {
  const ip = request.ip ?? "127.0.0.1";
  const { success } = await ratelimit.limit(ip);

  if (!success) {
    return NextResponse.json(
      { error: "Demasiadas solicitudes. Intenta más tarde." },
      { status: 429 }
    );
  }

  // ... resto del código ...
}
```

---

## Checklist de Integración

- [ ] Elegir servicio de email (Resend, SendGrid, SMTP)
- [ ] Crear cuenta y obtener API key
- [ ] Añadir variables de entorno
- [ ] Instalar dependencias
- [ ] Actualizar `/app/api/contact/route.ts`
- [ ] Crear template de email profesional
- [ ] Añadir email de confirmación al cliente
- [ ] Verificar dominio
- [ ] Configurar DNS (SPF, DKIM, DMARC)
- [ ] Testear en desarrollo
- [ ] Testear en producción
- [ ] Verificar que no va a spam
- [ ] Configurar rate limiting (opcional)
- [ ] Monitorear límites de envío

---

## Costos Estimados

| Servicio | Gratis hasta | Precio después |
|----------|--------------|----------------|
| Resend | 3,000/mes | $20/mes (50K emails) |
| SendGrid | 100/día | $19.95/mes (40K emails) |
| SMTP propio | Ilimitado | Costo del servidor |

**Recomendación**: Comenzar con Resend (gratis) y escalar si es necesario.

---

**¡Listo para integrar!** 🚀

Elige una opción y sigue los pasos. En 10 minutos tendrás emails funcionando.
