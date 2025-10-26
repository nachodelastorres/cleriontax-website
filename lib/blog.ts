// Sistema de gestión de contenido del blog
// Cada artículo incluye metadata completa para SEO

export interface BlogPost {
  slug: string;
  slugTranslations: {
    es: string;
    en: string;
    ca: string;
  };
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  updatedAt?: string;
  readingTime: number; // en minutos
  category: string;
  tags: string[];
  image: {
    url: string;
    alt: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    ogImage?: string;
  };
  featured: boolean;
}

// Base de datos de artículos del blog
export const blogPosts: Record<string, BlogPost> = {
  "guia-completa-declaracion-fiscal-criptomonedas-2025": {
    slug: "guia-completa-declaracion-fiscal-criptomonedas-2025",
    slugTranslations: {
      es: "guia-completa-declaracion-fiscal-criptomonedas-2025",
      en: "complete-guide-cryptocurrency-tax-declaration-2025",
      ca: "guia-completa-declaracio-fiscal-criptomonedes-2025"
    },
    title: "Guía Completa para la Declaración Fiscal de Criptomonedas en España 2025",
    excerpt: "Todo lo que necesitas saber para declarar tus criptomonedas correctamente ante la AEAT: FIFO, modelo 100, 720, 721, ganancias patrimoniales y casos prácticos resueltos.",
    content: `
> **Resumen ejecutivo:** Esta guía completa te ayudará a entender cómo declarar tus inversiones en criptomonedas ante la AEAT. Aprenderás a calcular ganancias con el método FIFO, conocerás los modelos 100, 720 y 721, y descubrirás estrategias legales de optimización fiscal.

---

# Guía Completa para la Declaración Fiscal de Criptomonedas en España 2025

La declaración de criptomonedas en España puede parecer compleja, pero con esta guía comprenderás exactamente qué necesitas hacer para cumplir con tus obligaciones fiscales ante la AEAT de manera correcta y optimizada.

---

## 📊 ¿Por qué es importante declarar tus criptomonedas?

Desde 2014, la Dirección General de Tributos (DGT) ha establecido criterios claros sobre la fiscalidad de criptoactivos. No declarar puede resultar en:

**Consecuencias económicas:**
- 💰 **Sanciones económicas** del 50% al 150% de las cantidades no declaradas
- ⏱️ **Recargos por presentación fuera de plazo** del 5% al 20%
- 📈 **Intereses de demora** calculados desde la fecha límite de presentación
- ⚖️ **Posibles delitos fiscales** si la cuota defraudada supera los 120.000€

> **💡 Nota importante:** Más allá de evitar problemas, declarar correctamente te permite **optimizar fiscalmente** y asegurarte de que pagas lo justo, ni más ni menos.

---

## 🎯 Los tres escenarios fiscales principales con criptomonedas

### 1️⃣ Ganancias y Pérdidas Patrimoniales (Modelo 100 - IRPF)

Este es el escenario más común. Se produce cuando:

✅ Vendes criptomonedas por euros u otra moneda fiat
✅ Intercambias una criptomoneda por otra (ej: BTC → ETH)
✅ Utilizas criptomonedas para comprar bienes o servicios
✅ Recibes criptomonedas como pago por tu trabajo

#### 🔢 ¿Cómo se calcula la ganancia o pérdida?

La AEAT exige aplicar el método **FIFO** (First In, First Out - Primero en Entrar, Primero en Salir):

**Fórmula básica:**
\`\`\`
Ganancia/Pérdida = Precio de Venta - Precio de Adquisición (FIFO)
\`\`\`

#### 📝 Ejemplo práctico paso a paso:

\`\`\`
Compras:
- Enero 2023: 0.5 BTC a 20.000€ (coste: 10.000€)
- Marzo 2023: 0.3 BTC a 25.000€ (coste: 7.500€)

Venta:
- Junio 2023: 0.6 BTC a 30.000€ (ingreso: 18.000€)

Cálculo FIFO:
- Se venden primero los 0.5 BTC de enero: 0.5 × 30.000€ = 15.000€
- Coste de esos 0.5 BTC: 10.000€
- Ganancia parcial: 15.000€ - 10.000€ = 5.000€

- Se venden 0.1 BTC de los de marzo: 0.1 × 30.000€ = 3.000€
- Coste de esos 0.1 BTC: 0.1 × 25.000€ = 2.500€
- Ganancia parcial: 3.000€ - 2.500€ = 500€

Ganancia patrimonial total: 5.000€ + 500€ = 5.500€
\`\`\`

#### 📊 Escalas de tributación 2025:

| Base imponible | Tipo aplicable | Ejemplo de impuesto |
|----------------|----------------|---------------------|
| Hasta 6.000€ | 19% | 6.000€ → 1.140€ |
| De 6.000€ a 50.000€ | 21% | 20.000€ → 4.200€ |
| De 50.000€ a 200.000€ | 23% | 100.000€ → 23.000€ |
| De 200.000€ a 300.000€ | 27% | 250.000€ → 67.500€ |
| Más de 300.000€ | 28% | 400.000€ → 112.000€ |

> **💰 En nuestro ejemplo:** Con una ganancia de 5.500€, pagarías: 5.500€ × 21% = **1.155€** de impuestos.

---

### 2️⃣ Rendimientos de Capital Mobiliario (Staking, Lending, Intereses)

Cuando obtienes rendimientos pasivos con tus criptomonedas:

**Tipos de rendimientos:**
- 🔐 **Staking**: Validación de transacciones en blockchains PoS (Ethereum, Cardano, Polkadot...)
- 💸 **Lending**: Préstamos de criptomonedas en plataformas DeFi o CeFi (Aave, Compound, Nexo...)
- 🏦 **Intereses**: Cuentas de ahorro cripto en exchanges (Binance Earn, Crypto.com...)

Estos rendimientos se declaran como **rendimientos de capital mobiliario** en la Base del Ahorro, tributando a los mismos tipos que las ganancias patrimoniales (19%-28%).

#### ⏰ Momento de tributación:

La AEAT considera que tributas cuando **dispones efectivamente** de los tokens recibidos:

✔️ Cuando retiras las recompensas de staking a tu wallet
✔️ Cuando finalizas un período de lending y recibes los intereses
✔️ Cuando las recompensas quedan disponibles para su uso

#### 📝 Ejemplo práctico de staking:

\`\`\`
Tienes 10 ETH en staking durante 2023.
Recibes 0.5 ETH como recompensa.
Valor de mercado al momento de recibirla: 1.800€/ETH

Rendimiento de capital mobiliario: 0.5 × 1.800€ = 900€
Tributación: 900€ × 19% = 171€
\`\`\`

### 3️⃣ Otros Incrementos Patrimoniales (Airdrops, Forks, Mining)

#### 🎁 Airdrops

Tokens gratuitos recibidos por campañas promocionales o participación en proyectos.

**Tratamiento fiscal:** Tributan como ganancia patrimonial al **valor de mercado** en el momento de recibirlos.

#### 🔱 Hard Forks

Si tienes BTC y se produce un fork (ejemplo: Bitcoin Cash en 2017), recibes nuevos tokens automáticamente.

**Tratamiento fiscal:** Los nuevos tokens tributan cuando los **vendes o intercambias**, no al recibirlos.

#### ⛏️ Mining (Minería)

El tratamiento depende de la frecuencia y profesionalidad:

| Tipo de minería | Tratamiento fiscal |
|-----------------|-------------------|
| **Actividad económica** (profesional, habitual) | Rendimiento de actividad económica (IRPF) |
| **Ocasional** (hobby, esporádico) | Ganancia patrimonial cuando vendes |

---

## 🌍 El Modelo 720: Declaración de Bienes en el Extranjero

#### 📋 ¿Cuándo estás obligado a presentarlo?

Debes presentar el Modelo 720 si el **valor conjunto** de tus criptomonedas en exchanges extranjeros supera **50.000€** a 31 de diciembre.

#### 🌐 ¿Qué se considera "extranjero"?

Exchanges y wallets custodiadas fuera de España:

| Plataforma | ¿Modelo 720? |
|------------|--------------|
| Binance, Coinbase, Kraken, Crypto.com | ✅ SÍ |
| Bitpanda, Bitstamp, Gemini | ✅ SÍ |
| Wallets no custodiadas (Ledger, Trezor, MetaMask) | ❌ NO |
| Exchanges españoles | ❌ NO |

#### 📅 Información clave:

- **Plazo de presentación:** Del 1 de enero al 31 de marzo del año siguiente
- **Naturaleza:** Declaración meramente **informativa** (no genera tributación directa)
- **Sanciones:** Muy graves - mínimo 10.000€ por no presentarlo o hacerlo incorrectamente

> ⚠️ **Importante:** Aunque no pagues impuestos por presentar el 720, las sanciones por omisión son severas. No te la juegues.

---

## 📝 El Modelo 721: Información sobre Monedas Virtuales

Nuevo en 2023, este modelo es obligatorio para:

**¿Quién debe presentarlo?**
- 🏢 Personas y entidades que proporcionen servicios de custodia de monedas virtuales
- 🏦 Exchanges españoles o con presencia en España
- 🔐 Proveedores de servicios de cambio entre monedas virtuales y fiat

> **👤 Usuarios particulares:** Este modelo **NO aplica** a inversores individuales, solo a proveedores de servicios.

---

## ❓ Casos Especiales y Dudas Frecuentes

### 🤔 ¿Y si solo he comprado y mantengo (HODL)?

**Respuesta:** Si solo has comprado y no has vendido nada, **no tienes que declarar ganancias**.

Únicamente deberás:
- ✅ Informar en el Modelo 720 si superas 50.000€ en exchanges extranjeros
- ❌ No declarar en el IRPF (no hay ganancia ni pérdida realizada)

> 💡 **Estrategia HODL:** Mantener sin vender es una forma de diferir el impuesto. Solo tributas cuando vendes.

### 🔄 ¿Las transferencias entre mis wallets tributan?

**Respuesta:** **NO.** Mover criptomonedas de un wallet a otro que tú controlas no genera hecho imponible.

Es equivalente a mover dinero de una cuenta bancaria a otra tuya.

**Ejemplos que NO tributan:**
- Transferir BTC de Binance a tu Ledger
- Mover ETH de MetaMask a tu Trezor
- Consolidar fondos de varios wallets en uno

### ⚖️ ¿Puedo compensar pérdidas con ganancias?

**Sí.** Las pérdidas patrimoniales se pueden compensar con ganancias patrimoniales del mismo año. Si te sobran pérdidas, puedes compensarlas en los **4 años siguientes**.

**Ejemplo:**
\`\`\`
2023:
- Ganancias vendiendo ETH: +8.000€
- Pérdidas vendiendo SOL: -3.000€
- Base imponible: 5.000€

2024:
- Ganancias: +2.000€
- Sin pérdidas
- Pero arrastras 0€ porque ya compensaste todo en 2023
\`\`\`

### 🖼️ ¿Y los NFTs?

Los NFTs (tokens no fungibles) tributan de forma similar a las criptomonedas:

| Actividad | Tratamiento fiscal |
|-----------|-------------------|
| Compra y venta ocasional | Ganancia/pérdida patrimonial (19%-28%) |
| Creación y venta recurrente | Rendimiento de actividad económica (si eres artista profesional) |
| Intercambio NFT por crypto | Permuta - genera ganancia/pérdida |
| Recibir NFT como pago | Rendimiento de trabajo o actividad económica |

### 📈 Trading intradia y alto volumen

Si haces trading activo con cientos o miles de operaciones, ten en cuenta:

**⚠️ Posible cambio de régimen fiscal:**
- La AEAT podría considerar que es una **actividad económica habitual**
- Esto implica darte de alta como autónomo
- Tributar como rendimiento de actividad económica (no ganancia patrimonial)
- Pagar cotizaciones a la Seguridad Social

**Criterios que evalúa la AEAT:**
- 🔢 Volumen de operaciones (>500 anuales puede ser indicativo)
- ⏱️ Frecuencia (¿trades diarios? ¿intradia?)
- 💰 Ingresos generados (¿es tu fuente principal de ingresos?)
- 🏢 Infraestructura (¿oficina? ¿herramientas profesionales?)

> 💡 **Recomendación:** Si haces más de 100 operaciones al mes, consulta con un asesor fiscal para evaluar tu situación.

---

## 🎯 Estrategias de Optimización Fiscal Legal

### 1️⃣ Tax-Loss Harvesting (Cosecha de Pérdidas Fiscales)

Vender activos con pérdidas antes de fin de año para compensar ganancias:

**Ejemplo práctico:**
\`\`\`
Situación a 15 de diciembre 2025:
- Ganancias realizadas vendiendo BTC: +15.000€
- Portfolio actual:
  · ETH con pérdida latente: -4.000€
  · SOL con pérdida latente: -2.000€

Estrategia Tax-Loss Harvesting:
1. Vendes ETH antes del 31/12 → Cristalizas pérdida de -4.000€
2. Base imponible final: 15.000€ - 4.000€ = 11.000€
3. Ahorro fiscal: 4.000€ × 21% = 840€

Opcional:
- Recompras ETH en enero 2026 si sigues creyendo en el proyecto
- La pérdida queda validada fiscalmente en 2025
\`\`\`

> **⚠️ Importante:** Espera al menos unos días antes de recomprar el mismo activo. Aunque en España no existe la "wash sale rule" de USA, evitar recompras inmediatas previene cuestionamientos de la AEAT sobre operaciones ficticias.

### 2️⃣ Fraccionamiento de Ventas entre Años Fiscales

Si tienes grandes ganancias acumuladas, considera fraccionar ventas entre diferentes años fiscales para evitar saltar a tramos superiores:

\`\`\`
Opción A (todo en un año):
- Ganancia: 55.000€
- Tributación: 6.000€×19% + 44.000€×21% + 5.000€×23% = 11.530€

Opción B (fraccionado en 2 años):
- Año 1: 27.500€ → 6.000€×19% + 21.500€×21% = 5.655€
- Año 2: 27.500€ → Igual = 5.655€
- Total: 11.310€

Ahorro: 220€
\`\`\`

### 3️⃣ Estructuración Societaria

Para grandes patrimonios cripto (>100.000€), estructurar a través de una sociedad puede ofrecer ventajas:

**Ventajas potenciales:**
- 📉 Tipo impositivo del Impuesto de Sociedades (23-25%) vs IRPF (hasta 28%)
- 💼 Posibilidad de reinvertir beneficios sin tributación personal
- 🔄 Mejor gestión de flujos de caja empresariales

**Desventajas a considerar:**
- 📋 Obligaciones contables y de auditoría
- 💰 Costes de constitución y mantenimiento
- 🏦 Doble imposición al retirar dividendos

> 💡 **Recomendación:** Solo tiene sentido para patrimonios significativos y operativa profesional. Requiere análisis personalizado con asesor fiscal especializado.

---

## 🛠️ Herramientas y Proceso Práctico

### Paso 1️⃣: Recopila toda la información

Necesitas exportar de cada exchange/wallet:

| Dato necesario | Formato |
|----------------|---------|
| ✅ Historial completo de transacciones | CSV, Excel, API |
| ✅ Fechas exactas de compra/venta | DD/MM/AAAA HH:MM |
| ✅ Importes en euros en el momento de cada operación | Precio histórico |
| ✅ Comisiones pagadas | Por transacción |
| ✅ Tipo de operación | Compra/Venta/Intercambio/Staking |

**Plataformas principales:**
Binance, Coinbase, Kraken, Bitfinex, Bitstamp, Crypto.com, etc.

### Paso 2️⃣: Consolida y limpia datos

El proceso más tedioso pero crítico:

- 🔄 Unifica todos los CSVs de diferentes plataformas
- 🗑️ Elimina duplicados
- 🔗 Concilia transferencias entre plataformas (lo que sale de una debe entrar en otra)
- 💰 Verifica que los saldos finales coinciden con los reales
- 📊 Convierte todo a formato uniforme

> **💡 Tip profesional:** Plataformas como **Cleriontax** automatizan completamente este proceso, ahorrándote decenas de horas de trabajo manual.

### Paso 3️⃣: Aplica metodología FIFO

Calcula el coste de adquisición de cada venta aplicando el método FIFO (primeras compras son las primeras vendidas).

**Esto requiere:**
- 📋 Mantener registro ordenado cronológicamente
- 🧮 Calcular base de coste para cada venta
- 📊 Rastrear saldo de cada activo en todo momento

### Paso 4️⃣: Genera anexos para la declaración

Documentos que debes preparar:

- ✅ Listado detallado de operaciones con ganancia/pérdida individual
- ✅ Resumen agregado de ganancias/pérdidas patrimoniales
- ✅ Resumen de rendimientos de capital mobiliario (staking, lending)
- ✅ Documentación de soporte para Modelo 720 (si superas 50.000€)
- ✅ Capturas de pantalla o PDFs de exchanges como justificantes

### Paso 5️⃣: Presenta la declaración

**Plazos oficiales:**

| Modelo | Plazo de presentación | Método |
|--------|----------------------|--------|
| **Modelo 100 (IRPF)** | 11 de abril - 30 de junio | Certificado digital, Cl@ve PIN, presencial |
| **Modelo 720** | 1 de enero - 31 de marzo | Solo telemático (certificado o Cl@ve) |

**Métodos de presentación:**
- 💻 Online con certificado digital
- 📱 Online con Cl@ve PIN
- 🏢 Presencial en oficina AEAT (solo IRPF)

---

## 📰 Cambios Normativos Recientes y Futuro

### 🇪🇺 Reglamento MiCA (Markets in Crypto-Assets)

La UE ha aprobado MiCA, que entró en vigor progresivamente en 2024-2025:

**Principales cambios:**
- 🏦 Mayor regulación de exchanges y proveedores de servicios
- 🛡️ Mejoras en protección al consumidor
- 📊 Estandarización de reporting fiscal automático
- 💰 Requisitos de capital para proveedores
- 🔍 Mayor transparencia en stablecoins

### 📋 Directiva DAC8 (Intercambio Automático de Información)

La UE está implementando intercambio automático de información fiscal sobre criptoactivos entre países miembros, similar al CRS bancario.

**¿Qué significa para ti?**
- 🌐 Los exchanges reportarán automáticamente tus operaciones a las autoridades fiscales
- 🔄 Intercambio de información entre países de la UE
- ❌ Casi imposible ocultar operaciones cripto
- ✅ Mayor transparencia = mayor seguridad jurídica

> **💡 Conclusión:** La era de "la AEAT no lo sabrá" ha terminado. La transparencia es total. Declarar correctamente es la única opción segura.

---

## ✅ Checklist Final: ¿Estás listo para declarar?

- ☐ He exportado el historial completo de todas mis plataformas
- ☐ Tengo identificadas todas mis compras con fecha y precio
- ☐ Tengo identificadas todas mis ventas con fecha y precio
- ☐ He calculado las ganancias/pérdidas con metodología FIFO
- ☐ He cuantificado mis rendimientos de staking/lending
- ☐ Sé si debo presentar Modelo 720 (>50.000€ en extranjero)
- ☐ Tengo los justificantes de todas las operaciones
- ☐ He considerado estrategias de optimización fiscal legal

---

## 🤝 ¿Necesitas ayuda profesional?

La declaración de criptomonedas puede ser compleja, especialmente si:

✔️ Tienes más de 100 operaciones al año
✔️ Has operado en múltiples exchanges y DEXs
✔️ Has participado en DeFi, staking, lending o protocolos complejos
✔️ Tienes dudas sobre la correcta aplicación de FIFO
✔️ Quieres optimizar fiscalmente dentro del marco legal
✔️ También inviertes en mercado de acciones y necesitas consolidar todo

En **Cleriontax** nos especializamos en:
- 📊 **Análisis y estructuración de datos** financieros complejos
- 💹 **Fiscalidad de criptomonedas e inversiones** en mercados tradicionales
- 🔍 **Limpieza y procesamiento automático** de miles de transacciones
- ✅ **Aplicación correcta de FIFO** y generación de informes para la AEAT
- 🎯 **Optimización fiscal** dentro del marco legal

Procesamos automáticamente todos tus datos, independientemente de su complejidad o volumen, y generamos informes listos para presentar ante la AEAT.

**[Solicita un análisis gratuito de tu caso →](/es/contacto)**

---

**⚖️ Descargo de responsabilidad:** Este artículo tiene fines informativos y educativos. No constituye asesoramiento fiscal personalizado. La normativa fiscal puede cambiar y cada situación personal es única. Consulta con un asesor fiscal profesional para tu caso específico.

---

*Última actualización: Octubre 2025*
*Publicado por: Equipo Cleriontax - Expertos en Fiscalidad Crypto/Investor y Análisis de Datos*
`,
    author: {
      name: "Equipo Cleriontax",
      role: "Expertos en Fiscalidad Crypto/Investor y Análisis de Datos",
      avatar: "/images/team/cleriontax-team.jpg"
    },
    publishedAt: "2025-10-05T09:00:00Z",
    updatedAt: "2025-10-08T14:30:00Z",
    readingTime: 10,
    category: "Fiscalidad e Inversión",
    tags: [
      "Declaración IRPF",
      "Fiscalidad Crypto",
      "Fiscalidad Inversiones",
      "Modelo 100",
      "Modelo 720",
      "FIFO",
      "Ganancias Patrimoniales",
      "Staking",
      "AEAT",
      "Análisis de Datos",
      "Guía Fiscal 2025"
    ],
    image: {
      url: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=1200&h=630&fit=crop",
      alt: "Guía completa de declaración fiscal de criptomonedas e inversiones en España 2025"
    },
    seo: {
      metaTitle: "Guía Completa Declaración Fiscal Criptomonedas e Inversiones España 2025 | IRPF, FIFO",
      metaDescription: "Guía definitiva para declarar criptomonedas e inversiones ante la AEAT en 2025. Aprende a calcular ganancias con FIFO, modelo 100, 720, staking y optimización fiscal. Incluye ejemplos prácticos y casos resueltos por expertos en análisis de datos.",
      keywords: [
        "declaración fiscal criptomonedas 2025",
        "fiscalidad crypto inversiones",
        "criptomonedas IRPF 2025",
        "modelo 100 criptomonedas",
        "modelo 720 criptomonedas",
        "FIFO criptomonedas",
        "ganancias patrimoniales crypto",
        "declarar bitcoin españa",
        "impuestos criptomonedas AEAT",
        "staking fiscalidad",
        "análisis datos fiscales",
        "fiscalidad mercado acciones",
        "optimización fiscal inversiones"
      ],
      ogImage: "https://images.unsplash.com/photo-1621504450181-5d356f61d307?w=1200&h=630&fit=crop"
    },
    featured: true
  }
};

// Utilidades para trabajar con blogs
export function getAllBlogPosts(): BlogPost[] {
  return Object.values(blogPosts).sort((a, b) =>
    new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
  );
}

export function getFeaturedBlogPosts(): BlogPost[] {
  return getAllBlogPosts().filter(post => post.featured);
}

export function getBlogPostBySlug(slug: string, locale: string = 'es'): BlogPost | null {
  // Buscar por slug directo o por traducción
  const post = Object.values(blogPosts).find(post =>
    post.slug === slug ||
    post.slugTranslations[locale as keyof typeof post.slugTranslations] === slug
  );

  return post || null;
}

export function getBlogPostsByCategory(category: string): BlogPost[] {
  return getAllBlogPosts().filter(post => post.category === category);
}

export function getBlogPostsByTag(tag: string): BlogPost[] {
  return getAllBlogPosts().filter(post => post.tags.includes(tag));
}

export function getAllCategories(): string[] {
  const categories = new Set<string>();
  getAllBlogPosts().forEach(post => categories.add(post.category));
  return Array.from(categories);
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  getAllBlogPosts().forEach(post => post.tags.forEach(tag => tags.add(tag)));
  return Array.from(tags);
}
