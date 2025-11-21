import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import HeroContact from "@/components/contact/HeroContact";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";
import { generateBreadcrumbSchema } from "@/lib/schemas";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `${baseUrl}/${locale}/contacto`,
      languages: {
        'es': `${baseUrl}/es/contacto`,
        'en': `${baseUrl}/en/contacto`,
        'ca': `${baseUrl}/ca/contacto`,
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale,
      url: `${baseUrl}/${locale}/contacto`,
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('contact');
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://cleriontax.com';

  // Breadcrumb Schema
  const breadcrumbSchema = generateBreadcrumbSchema({
    locale: locale as 'es' | 'en' | 'ca',
    path: `/${locale}/contacto`,
    baseUrl
  });

  // ContactPage Schema
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": t('hero.title'),
    "description": t('hero.subtitle'),
    "url": `${baseUrl}/${locale}/contacto`,
    "breadcrumb": breadcrumbSchema,
    "mainEntity": {
      "@type": "ProfessionalService",
      "@id": `${baseUrl}/#organization`
    }
  };

  return (
    <>
      {/* Breadcrumb Schema */}
      <script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* ContactPage Schema */}
      <script
        id="contact-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />

      {/* Hero Section */}
      <HeroContact />

      {/* Contact Form and Info */}
      <section id="contact-form" className="py-16 md:py-24 bg-white">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Form - 2/3 width */}
            <div className="lg:col-span-2">
              <div className="bg-white border border-neutral-200 rounded-2xl p-8 shadow-lg">
                <ContactForm />
              </div>
            </div>

            {/* Info - 1/3 width */}
            <div className="lg:col-span-1">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
