import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import DualitySection from "@/components/about/DualitySection";
import WhyDifferent from "@/components/about/WhyDifferent";
import CTASection from "@/components/home/CTASection";
import { TrendingUp, Zap, Users, Lightbulb, Target, Handshake } from "lucide-react";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.about' });

  return {
    title: t('title'),
    description: t('description'),
    keywords: 'asesoría fiscal tecnológica, asesores fiscales colegiados crypto, análisis de datos fiscales, automatización fiscal, tecnología blockchain, procesamiento transacciones cripto, asesoría fiscal innovadora, fiscal + tecnología, expertise fiscal digital',
    alternates: {
      canonical: `/${locale}/sobre-nosotros`,
      languages: {
        'es': '/es/sobre-nosotros',
        'en': '/en/sobre-nosotros',
        'ca': '/ca/sobre-nosotros',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `/${locale}/sobre-nosotros`,
    },
  };
}

export default async function SobreNosotrosPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('about');

  // Structured Data for SEO
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Cleriontax",
    "description": "Asesoría fiscal especializada en criptomonedas que combina experiencia de asesores fiscales colegiados con tecnología de análisis de datos avanzada",
    "url": `https://cleriontax.com/${locale}/sobre-nosotros`,
    "foundingDate": "2020",
    "areaServed": {
      "@type": "Country",
      "name": "España"
    },
    "knowsAbout": [
      "Fiscalidad de criptomonedas",
      "Análisis de datos blockchain",
      "Declaración IRPF crypto",
      "Modelo 100",
      "Modelo 720 y 721",
      "Optimización fiscal",
      "Tecnología financiera"
    ]
  };

  const stats = [
    { value: t('hero.stats.experience.value'), label: t('hero.stats.experience.label'), icon: TrendingUp },
    { value: t('hero.stats.transactions.value'), label: t('hero.stats.transactions.label'), icon: Zap },
    { value: t('hero.stats.accuracy.value'), label: t('hero.stats.accuracy.label'), icon: Users },
  ];

  const valueIcons = [Lightbulb, Target, Handshake];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section - Magazine Style */}
      <section className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-white via-primary-50/30 to-accent-50/20 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>

        <Container className="relative z-10">
          <div className="max-w-5xl mx-auto">
            {/* Tagline */}
            <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border border-accent/20 mb-8">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-accent to-accent-dark animate-pulse"></div>
              <span className="text-sm font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent uppercase tracking-wide">
                {t('hero.tagline')}
              </span>
            </div>

            {/* Main title - Magazine style */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-8">
              <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
                {t('title')}
              </span>
            </h1>

            <p className="text-lg md:text-2xl text-neutral-600 leading-relaxed max-w-4xl mb-12">
              {t('subtitle')}
            </p>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="group relative">
                    <div className="flex items-start gap-4 p-6 rounded-2xl bg-white/50 backdrop-blur-sm border border-neutral-200/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl hover:shadow-accent/10">
                      <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-dark p-0.5 flex-shrink-0">
                        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                          <Icon className="w-6 h-6 text-accent" />
                        </div>
                      </div>
                      <div>
                        <div className="text-3xl md:text-4xl font-black bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-1">
                          {stat.value}
                        </div>
                        <div className="text-sm text-neutral-600 font-medium">
                          {stat.label}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* Duality Section */}
      <DualitySection />

      {/* Why Different */}
      <WhyDifferent />

      {/* Values - Minimalist */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-primary-50/10">
        <Container>
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-center bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent mb-16">
              {t('values.title')}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              {['innovation', 'precision', 'partnership'].map((key, index) => {
                const Icon = valueIcons[index];
                return (
                  <div key={key} className="text-center group">
                    <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br from-accent/10 to-primary/10 mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                      <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent-dark p-0.5 shadow-lg">
                        <div className="w-full h-full rounded-xl bg-white flex items-center justify-center">
                          <Icon className="w-8 h-8 text-accent" strokeWidth={2} />
                        </div>
                      </div>
                    </div>
                    <h3 className="text-2xl font-bold text-primary mb-4">
                      {t(`values.${key}.title`)}
                    </h3>
                    <p className="text-neutral-600 leading-relaxed">
                      {t(`values.${key}.description`)}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </Container>
      </section>

      {/* SEO Content Section - Hidden but crawlable */}
      <section className="sr-only" aria-label="Información adicional sobre Cleriontax">
        <Container>
          <h2>Asesoría Fiscal Tecnológica Especializada en Criptomonedas</h2>
          <p>
            Cleriontax es una firma boutique que combina la experiencia de asesores fiscales colegiados
            especializados en criptoactivos con la innovación tecnológica en análisis de datos blockchain.
            Nuestro equipo multidisciplinar incluye asesores fiscales con años de experiencia en fiscalidad
            de activos digitales e ingenieros de datos especializados en procesamiento masivo de transacciones.
          </p>
          <h3>Tecnología Fiscal Avanzada</h3>
          <p>
            Utilizamos algoritmos propios de conciliación de datos, automatización de cálculos fiscales FIFO
            y validación cruzada de transacciones blockchain. Nuestra infraestructura tecnológica procesa
            millones de transacciones con precisión del 100%, reduciendo errores humanos y acelerando
            el proceso de declaración fiscal.
          </p>
          <h3>Equipo Multidisciplinar</h3>
          <ul>
            <li>Asesores fiscales colegiados especializados en criptomonedas</li>
            <li>Ingenieros de datos con experiencia en blockchain</li>
            <li>Analistas fiscales expertos en normativa AEAT</li>
            <li>Desarrolladores de software fiscal</li>
          </ul>
        </Container>
      </section>

      {/* CTA */}
      <CTASection />
    </>
  );
}
