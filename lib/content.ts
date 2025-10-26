// Contenido centralizado para Cleriontax

export const siteContent = {
  company: {
    name: "Cleriontax",
    tagline: "Transformamos tus datos en informes fiscales listos para Hacienda",
    description:
      "Especialistas en análisis de datos y asesoramiento fiscal para inversores con carteras de activos y criptoactivos.",
    email: "info@cleriontax.com",
    phone: "+34 900 000 000",
  },

  hero: {
    badge: "Especialistas en fiscalidad de criptoactivos",
    title: "Transformamos tus datos en informes fiscales listos para Hacienda",
    subtitle:
      "Análisis de datos profesional y asesoramiento fiscal especializado para inversores con carteras de activos y criptoactivos.",
    primaryCTA: "Solicita tu informe fiscal",
    secondaryCTA: "Ver servicios",
    stats: [
      { value: "500+", label: "Clientes satisfechos" },
      { value: "10K+", label: "Transacciones procesadas" },
      { value: "99%", label: "Precisión fiscal" },
    ],
  },

  benefits: {
    title: "¿Por qué elegir Cleriontax?",
    subtitle:
      "Combinamos tecnología de análisis de datos con experiencia fiscal para ofrecerte el mejor servicio del mercado.",
    items: [
      {
        title: "Precisión fiscal garantizada",
        description:
          "Análisis exhaustivo de todas tus operaciones aplicando la normativa fiscal española más actualizada. Cumplimiento total con los requisitos de la AEAT.",
      },
      {
        title: "Ahorra tiempo y esfuerzo",
        description:
          "Olvídate de cálculos complejos y hojas de cálculo interminables. Nosotros nos encargamos de todo el proceso de principio a fin.",
      },
      {
        title: "Optimización fiscal",
        description:
          "Identificamos oportunidades legales de optimización para reducir tu carga fiscal, aplicando correctamente deducciones y exenciones.",
      },
      {
        title: "Soporte personalizado",
        description:
          "Asesor fiscal dedicado para resolver todas tus dudas durante todo el proceso. Comunicación directa y respuestas claras.",
      },
    ],
  },

  process: {
    title: "¿Cómo funciona nuestro servicio?",
    subtitle:
      "Un proceso simple y transparente en 4 pasos para obtener tu declaración fiscal sin complicaciones.",
    steps: [
      {
        number: "01",
        title: "Diagnóstico inicial",
        description:
          "Analizamos tu caso particular: exchanges utilizados, tipo de operaciones, volumen de transacciones y objetivos fiscales.",
      },
      {
        number: "02",
        title: "Limpieza de datos",
        description:
          "Procesamos y limpiamos todos tus archivos CSV, corrigiendo errores, identificando duplicados y unificando formatos de diferentes plataformas.",
      },
      {
        number: "03",
        title: "Cálculo fiscal",
        description:
          "Aplicamos la metodología FIFO, calculamos ganancias y pérdidas patrimoniales, y determinamos la base imponible según normativa AEAT.",
      },
      {
        number: "04",
        title: "Entrega y soporte",
        description:
          "Recibes un informe completo con todos los anexos necesarios para tu declaración, más una sesión de revisión con nuestro asesor fiscal.",
      },
    ],
  },

  services: {
    title: "Nuestros Servicios",
    subtitle:
      "Planes diseñados para adaptarse a tu volumen de operaciones y necesidades específicas.",
    plans: [
      {
        name: "Plan Básico",
        price: "Desde 600€",
        description: "Ideal para inversores ocasionales con operativa simple",
        popular: false,
        features: [
          "Hasta 500 transacciones",
          "1-2 exchanges o plataformas",
          "Informe fiscal básico",
          "Cálculo de ganancias/pérdidas",
          "Anexo para modelo 100 (IRPF)",
          "1 revisión con asesor",
          "Soporte por email",
        ],
        notIncluded: [
          "Staking y rendimientos",
          "DeFi y operaciones complejas",
          "Optimización fiscal avanzada",
        ],
      },
      {
        name: "Plan Avanzado",
        price: "Desde 1.500€",
        description: "Para traders activos con múltiples plataformas",
        popular: true,
        features: [
          "Hasta 2.000 transacciones",
          "3-5 exchanges o plataformas",
          "Informe fiscal completo",
          "Cálculo ganancias/pérdidas + rendimientos",
          "Staking, lending y airdrops",
          "Modelo 100 + Modelo 720 (si aplica)",
          "2 revisiones con asesor",
          "Soporte prioritario",
          "Recomendaciones de optimización",
        ],
        notIncluded: ["DeFi complejo (yield farming, LP tokens)", "NFTs"],
      },
      {
        name: "Plan Premium",
        price: "Desde 3.500€",
        description: "Solución integral para portfolios complejos",
        popular: false,
        features: [
          "Transacciones ilimitadas",
          "Exchanges y wallets ilimitados",
          "Informe fiscal premium",
          "Todos los tipos de operaciones",
          "DeFi: yield farming, liquidity pools, NFTs",
          "Modelos 100, 720, y otros si aplica",
          "Revisiones ilimitadas",
          "Asesor fiscal dedicado",
          "Plan de optimización personalizado",
          "Soporte 24/7 durante campaña",
          "Seguimiento anual incluido",
        ],
        notIncluded: [],
      },
    ],
    comparison: {
      features: [
        "Número de transacciones",
        "Exchanges / Plataformas",
        "Trading básico (compra/venta)",
        "Staking y lending",
        "DeFi (yield farming, LP)",
        "NFTs",
        "Modelo 100 (IRPF)",
        "Modelo 720 (internacional)",
        "Revisiones con asesor",
        "Optimización fiscal",
        "Soporte",
      ],
      values: [
        ["Hasta 500", "Hasta 2.000", "Ilimitadas"],
        ["1-2", "3-5", "Ilimitadas"],
        ["included", "included", "included"],
        ["not_included", "included", "included"],
        ["not_included", "not_included", "included"],
        ["not_included", "not_included", "included"],
        ["included", "included", "included"],
        ["not_included", "included", "included"],
        ["1", "2", "Ilimitadas"],
        ["Básica", "Avanzada", "Premium"],
        ["Email", "Prioritario", "24/7"],
      ],
    },
  },

  about: {
    title: "Sobre Cleriontax",
    subtitle: "Experiencia en datos + expertise fiscal = Tu tranquilidad",
    mission: {
      title: "Nuestra misión",
      content:
        "Hacer que la fiscalidad de criptoactivos sea accesible, comprensible y eficiente para todos los inversores españoles. Creemos que la complejidad técnica no debería ser una barrera para cumplir correctamente con tus obligaciones fiscales.",
    },
    story: {
      title: "¿Quiénes somos?",
      content:
        "Cleriontax nace de la colaboración entre profesionales del análisis de datos y asesores fiscales especializados en criptoactivos. Con más de 10 años de experiencia combinada en análisis de datos financieros y asesoramiento fiscal, hemos desarrollado una metodología única que combina automatización tecnológica con revisión humana experta.",
    },
    partnership: {
      title: "Colaboración con asesoría fiscal",
      content:
        "Trabajamos en estrecha colaboración con un despacho fiscal especializado en nuevas tecnologías y activos digitales. Todos nuestros informes son revisados y validados por asesores fiscales colegiados, garantizando el cumplimiento total con la normativa de la AEAT.",
    },
    expertise: {
      title: "Experiencia en análisis de datos",
      content:
        "Nuestro equipo técnico cuenta con amplia experiencia en procesamiento de grandes volúmenes de datos financieros. Hemos desarrollado algoritmos propios para la limpieza, conciliación y cálculo fiscal de operaciones con criptoactivos, compatibles con más de 50 exchanges y plataformas diferentes.",
    },
    values: [
      {
        title: "Transparencia",
        description:
          "Precios claros, procesos explicados, sin costes ocultos ni sorpresas.",
      },
      {
        title: "Precisión",
        description:
          "Cada transacción cuenta. Nuestro compromiso es el 100% de exactitud.",
      },
      {
        title: "Confianza",
        description:
          "Tratamos tus datos con máxima seguridad y confidencialidad absoluta.",
      },
    ],
  },

  contact: {
    title: "Solicita tu presupuesto",
    subtitle:
      "Cuéntanos tu caso y te enviaremos un presupuesto personalizado en pocas horas.",
    form: {
      name: "Nombre completo",
      email: "Email",
      phone: "Teléfono (opcional)",
      service: "Tipo de servicio",
      message: "Cuéntanos sobre tu caso",
      file: "Adjuntar archivo (opcional)",
      submit: "Enviar solicitud",
      submitting: "Enviando...",
    },
    info: {
      title: "¿Prefieres contactarnos directamente?",
      email: "info@cleriontax.com",
      phone: "+34 900 000 000",
      schedule: "Lunes a Viernes, 9:00 - 18:00",
    },
  },

  cta: {
    title: "¿Listo para simplificar tu declaración fiscal?",
    subtitle:
      "Miles de inversores ya confían en Cleriontax para gestionar sus obligaciones fiscales. Únete a ellos y olvídate de las complicaciones.",
    primary: "Solicitar presupuesto gratuito",
    secondary: "Ver planes y precios",
    badges: [
      "Sin compromiso",
      "Respuesta en 24h",
      "100% seguro y confidencial",
    ],
  },

  footer: {
    description:
      "Especialistas en análisis de datos y asesoramiento fiscal para inversores.",
    links: {
      company: [
        { name: "Sobre nosotros", href: "/sobre-nosotros" },
        { name: "Servicios", href: "/servicios" },
        { name: "Contacto", href: "/contacto" },
      ],
      legal: [
        { name: "Política de privacidad", href: "/privacidad" },
        { name: "Aviso legal", href: "/aviso-legal" },
      ],
    },
    contact: {
      email: "info@cleriontax.com",
      phone: "+34 900 000 000",
    },
    social: {
      linkedin: "https://linkedin.com/company/cleriontax",
    },
  },
};

// SEO Content
export const seoContent = {
  home: {
    title: "Cleriontax | Análisis de datos y fiscalidad para inversores",
    description:
      "Especialistas en análisis de datos y asesoramiento fiscal para inversores con carteras de activos y criptoactivos. Transformamos tus datos en informes fiscales listos para Hacienda.",
    keywords: [
      "fiscalidad criptomonedas España",
      "declaración fiscal cripto",
      "asesor fiscal bitcoin",
      "análisis datos fiscales",
      "hacienda criptoactivos",
      "IRPF criptomonedas",
      "modelo 720 cripto",
    ],
  },
  services: {
    title: "Servicios y Precios | Cleriontax",
    description:
      "Planes personalizados desde 600€ para la declaración fiscal de tus criptoactivos. Básico, Avanzado y Premium. Elige el que mejor se adapte a tu volumen de operaciones.",
    keywords: [
      "precio declaración cripto",
      "servicios fiscales criptomonedas",
      "planes fiscalidad cripto",
      "cuánto cuesta declarar bitcoin",
    ],
  },
  about: {
    title: "Sobre Nosotros | Cleriontax",
    description:
      "Equipo especializado en análisis de datos y asesoramiento fiscal. Colaboración directa con asesoría fiscal colegiada para garantizar el cumplimiento con la AEAT.",
    keywords: [
      "equipo cleriontax",
      "asesoría fiscal cripto",
      "expertos fiscalidad criptomonedas",
    ],
  },
  contact: {
    title: "Contacto | Solicita tu Presupuesto | Cleriontax",
    description:
      "Solicita un presupuesto personalizado para la declaración fiscal de tus criptoactivos. Respuesta en menos de 24 horas. Sin compromiso.",
    keywords: [
      "presupuesto fiscal cripto",
      "contacto asesor fiscal bitcoin",
      "solicitar informe fiscal",
    ],
  },
};
