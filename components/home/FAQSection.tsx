"use client";

import { motion } from "framer-motion";
import { useTranslations, useLocale } from 'next-intl';
import { Plus, Minus, MessageCircle } from "lucide-react";
import { useState } from "react";
import Script from "next/script";
import Container from "@/components/ui/Container";
import ButtonLink from "@/components/ui/ButtonLink";

export default function FAQSection() {
  const t = useTranslations('faq');
  const locale = useLocale();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: t('questions.q1.question'),
      answer: t('questions.q1.answer'),
    },
    {
      question: t('questions.q2.question'),
      answer: t('questions.q2.answer'),
    },
    {
      question: t('questions.q3.question'),
      answer: t('questions.q3.answer'),
    },
    {
      question: t('questions.q4.question'),
      answer: t('questions.q4.answer'),
    },
    {
      question: t('questions.q5.question'),
      answer: t('questions.q5.answer'),
    },
    {
      question: t('questions.q6.question'),
      answer: t('questions.q6.answer'),
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  // Schema JSON-LD para FAQPage (SEO rich snippets)
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <>
      <Script
        id="faq-schema"
        type="application/ld+json"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema),
        }}
      />
      <section id="faq" className="py-24 px-6 bg-[#F8F9FB]">
      <Container>
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16 space-y-4"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-[#2B2D42] leading-tight">
              {t('title')}
            </h2>
            <p className="text-lg md:text-xl text-[#6B7280] max-w-4xl mx-auto">
              {t('subtitle')}
            </p>
          </motion.div>

          {/* FAQ Accordion */}
          <div className="space-y-4 mb-12">
            {faqs.map((faq, index) => {
              const isOpen = openIndex === index;

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                >
                  <div className="bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden">
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 md:px-8 py-6 flex items-start justify-between gap-4 text-left hover:bg-neutral-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-navy/20"
                      aria-expanded={isOpen}
                      aria-controls={`faq-answer-${index}`}
                    >
                      <h3 className="text-lg md:text-xl font-semibold text-[#2B2D42] leading-tight flex-grow pr-4">
                        {faq.question}
                      </h3>
                      <div className="flex-shrink-0 mt-1">
                        {isOpen ? (
                          <Minus className="w-6 h-6 text-navy transition-transform duration-300" />
                        ) : (
                          <Plus className="w-6 h-6 text-navy transition-transform duration-300" />
                        )}
                      </div>
                    </button>

                    <div
                      id={`faq-answer-${index}`}
                      className={`transition-all duration-300 ease-in-out overflow-hidden ${
                        isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 md:px-8 pb-6 pt-2">
                        <p className="text-base text-[#6B7280] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center"
          >
            <div className="inline-flex flex-col items-center gap-4 bg-white rounded-2xl px-8 py-6 shadow-sm border border-neutral-200">
              <div className="flex items-center gap-3">
                <MessageCircle className="w-6 h-6 text-navy" />
                <p className="text-lg font-medium text-[#2B2D42]">
                  {t('cta.text')}
                </p>
              </div>
              <ButtonLink
                variant="primary"
                size="md"
                href={`/${locale}/contacto`}
                className="shadow-md"
              >
                {t('cta.button')}
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
    </>
  );
}
