import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import HeroAbout from "@/components/about/HeroAbout";
import DualitySection from "@/components/about/DualitySection";
import CTASection from "@/components/home/CTASection";
import { Lightbulb, Target, Handshake } from "lucide-react";

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

  const valueIcons = [Lightbulb, Target, Handshake];

  return (
    <>
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />

      {/* Hero Section */}
      <HeroAbout />

      {/* Duality Section */}
      <DualitySection />

      {/* Values Section - SEO Optimized */}
      <section className="py-20 md:py-28 bg-gradient-to-b from-white via-neutral-50 to-white">
        <Container>
          <div className="max-w-6xl mx-auto">
            {/* Header with SEO-rich content */}
            <div className="text-center mb-16 space-y-6">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6">
                {t('values.title')}
              </h2>
              <p className="text-xl md:text-2xl text-gray-blue max-w-4xl mx-auto leading-relaxed">
                En <strong className="text-navy">Cleriontax</strong>, nuestra <strong className="text-navy">asesoría fiscal especializada en criptomonedas</strong> se fundamenta
                en tres pilares que nos distinguen como <strong className="text-navy">asesores fiscales tecnológicos</strong> líderes en el sector de <strong className="text-navy">activos digitales</strong> en España.
              </p>
              <p className="text-base md:text-lg text-neutral-600 max-w-3xl mx-auto leading-relaxed">
                Nuestra combinación única de <strong>experiencia fiscal colegiada</strong> y <strong>tecnología avanzada de análisis de datos blockchain</strong> nos
                permite ofrecer servicios de <strong>declaración IRPF crypto</strong>, <strong>modelo 100 criptomonedas</strong>, y <strong>optimización fiscal de criptoactivos</strong> con
                precisión y transparencia absolutas.
              </p>
            </div>

            {/* Values Grid with SEO-enriched content */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
              {['innovation', 'precision', 'partnership'].map((key, index) => {
                const Icon = valueIcons[index];
                return (
                  <div key={key} className="group">
                    <div className="bg-white rounded-2xl p-8 shadow-md hover:shadow-xl transition-all duration-300 h-full border border-neutral-200 hover:border-accent/30">
                      <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-white shadow-lg mb-6 group-hover:scale-110 transition-transform duration-300">
                        <Icon className="w-8 h-8 text-accent" strokeWidth={2} />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-bold text-navy mb-4">
                        {t(`values.${key}.title`)}
                      </h3>
                      <p className="text-base md:text-lg text-neutral-700 leading-relaxed">
                        {t(`values.${key}.description`)}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Additional SEO-rich paragraph */}
            <div className="bg-navy/5 rounded-2xl p-8 md:p-12 border border-navy/10">
              <p className="text-base md:text-lg text-neutral-700 leading-relaxed text-center max-w-5xl mx-auto">
                Como <strong className="text-navy">asesores fiscales colegiados especializados en blockchain</strong>, procesamos más de un millón de transacciones anuales
                utilizando <strong className="text-navy">algoritmos propios de conciliación fiscal</strong> y <strong className="text-navy">metodología FIFO certificada</strong>.
                Nuestro equipo multidisciplinar combina <strong className="text-navy">expertise en normativa AEAT</strong> con <strong className="text-navy">ingeniería de datos financieros</strong>,
                garantizando <strong className="text-navy">informes fiscales auditables</strong> y 100% compatibles con los requisitos de la <strong className="text-navy">Agencia Tributaria Española</strong> para
                la <strong className="text-navy">declaración de criptoactivos</strong>, <strong className="text-navy">modelo 720</strong>, y <strong className="text-navy">modelo 721</strong>.
              </p>
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
