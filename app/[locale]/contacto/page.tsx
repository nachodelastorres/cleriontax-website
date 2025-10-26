import { getTranslations } from 'next-intl/server';
import Container from "@/components/ui/Container";
import ContactForm from "@/components/contact/ContactForm";
import ContactInfo from "@/components/contact/ContactInfo";

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'seo.contact' });

  return {
    title: t('title'),
    description: t('description'),
    alternates: {
      canonical: `/${locale}/contacto`,
      languages: {
        'es': '/es/contacto',
        'en': '/en/contacto',
        'ca': '/ca/contacto',
      },
    },
  };
}

export default async function ContactoPage({ params }: Props) {
  const { locale } = await params;
  const t = await getTranslations('contact');

  return (
    <>
      {/* Hero Section */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-24 bg-gradient-to-b from-neutral-50 to-white">
        <Container>
          <div className="space-y-6 text-center max-w-3xl mx-auto">
            <h1 className="text-4xl font-bold text-primary md:text-5xl lg:text-6xl">
              {t('title')}
            </h1>
            <p className="text-lg text-neutral-600 md:text-xl">
              {t('subtitle')}
            </p>
          </div>
        </Container>
      </section>

      {/* Contact Form and Info */}
      <section className="py-16 md:py-24 bg-white">
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
