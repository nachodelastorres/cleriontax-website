"use client";

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { FileText, TrendingUp, ArrowRight, Sparkles } from 'lucide-react';
import Container from '@/components/ui/Container';
import ButtonLink from '@/components/ui/ButtonLink';
import Image from 'next/image';

export default function BlogCTASection() {
  const t = useTranslations('blogCTA');
  const locale = useLocale();

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(27, 32, 66, 0.15) 1px, transparent 0)',
          backgroundSize: '32px 32px'
        }}></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-accent/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/10 rounded-full blur-3xl"></div>

      <Container>
        <div className="relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20">
                <Sparkles className="w-4 h-4 text-accent" />
                <span className="text-sm font-semibold text-accent">{t('badge')}</span>
              </div>

              {/* Title */}
              <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
                {t('title')}
              </h2>

              {/* Description */}
              <p className="text-lg text-neutral-600 leading-relaxed">
                {t('description')}
              </p>

              {/* Stats */}
              <div className="flex flex-wrap gap-8 pt-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-600 flex items-center justify-center shadow-lg">
                    <FileText className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-primary">{t('stats.articles')}</div>
                    <div className="text-sm text-neutral-600">{t('stats.articlesLabel')}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-600 flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-accent">{t('stats.updates')}</div>
                    <div className="text-sm text-neutral-600">{t('stats.updatesLabel')}</div>
                  </div>
                </div>
              </div>

              {/* CTA Button */}
              <div className="pt-6">
                <ButtonLink
                  variant="primary"
                  size="lg"
                  href={`/${locale}/blog`}
                  className="group shadow-xl hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300"
                >
                  {t('cta')}
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </ButtonLink>
              </div>
            </motion.div>

            {/* Right Column - Visual */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="relative">
                {/* Main Card */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-8 border border-neutral-100">
                  <div className="absolute -top-3 -right-3 w-24 h-24 bg-gradient-to-br from-accent to-accent-600 rounded-2xl opacity-20 blur-2xl"></div>
                  <div className="absolute -bottom-3 -left-3 w-32 h-32 bg-gradient-to-br from-primary to-primary-600 rounded-2xl opacity-20 blur-2xl"></div>

                  <div className="relative space-y-6">
                    {/* Featured Article Preview */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                        <span className="text-xs font-bold text-accent uppercase tracking-wide">{t('featured')}</span>
                      </div>
                      <h3 className="text-xl font-bold text-primary leading-tight">
                        {t('articleExample.title')}
                      </h3>
                      <p className="text-sm text-neutral-600 leading-relaxed">
                        {t('articleExample.excerpt')}
                      </p>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2">
                      {t.raw('articleExample.tags').map((tag: string, index: number) => (
                        <span
                          key={index}
                          className="px-3 py-1 rounded-full bg-primary/5 text-primary text-xs font-medium"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Decorative Lines */}
                    <div className="space-y-2 pt-4">
                      <div className="h-2 bg-neutral-100 rounded-full w-full"></div>
                      <div className="h-2 bg-neutral-100 rounded-full w-4/5"></div>
                      <div className="h-2 bg-neutral-100 rounded-full w-3/5"></div>
                    </div>
                  </div>
                </div>

                {/* Floating Elements */}
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                  className="absolute -top-6 -left-6 bg-white rounded-xl shadow-xl p-4 border border-neutral-100"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    <span className="text-xs font-semibold text-neutral-700">{t('updates')}</span>
                  </div>
                </motion.div>

                <motion.div
                  animate={{ y: [0, 10, 0] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                  className="absolute -bottom-6 -right-6 bg-gradient-to-br from-accent to-accent-600 rounded-xl shadow-xl p-4"
                >
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-white" />
                    <span className="text-xs font-bold text-white">{t('expert')}</span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </Container>
    </section>
  );
}
