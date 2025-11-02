"use client";

import { Mail, Phone, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';
import Card from "@/components/ui/Card";

export default function ContactInfo() {
  const t = useTranslations('contact.info');

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-primary mb-6">
          {t('title')}
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 shrink-0">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-1">{t('emailLabel')}</p>
              <a
                href={`mailto:${t('email')}`}
                className="text-accent hover:underline"
              >
                {t('email')}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-50 shrink-0">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-1">{t('phoneLabel')}</p>
              <a
                href={`https://wa.me/${t('phone').replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:underline"
              >
                {t('phone')}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50 shrink-0">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-neutral-700 mb-1">{t('scheduleLabel')}</p>
              <p className="text-neutral-600">{t('schedule')}</p>
              <p className="text-xs text-accent-dark mt-1.5 italic">
                {t('offHoursText')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-neutral-50 border-neutral-200">
        <h4 className="font-semibold text-primary mb-3">{t('quickResponseTitle')}</h4>
        <p className="text-sm text-neutral-600 leading-relaxed">
          {t('quickResponseText')}
        </p>
      </Card>

      <Card className="p-6 bg-accent/5 border-accent/20">
        <h4 className="font-semibold text-primary mb-3">{t('infoToIncludeTitle')}</h4>
        <ul className="text-sm text-neutral-600 space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-accent shrink-0">•</span>
            <span>{t('infoToInclude.transactions')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent shrink-0">•</span>
            <span>{t('infoToInclude.exchanges')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent shrink-0">•</span>
            <span>{t('infoToInclude.operations')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-accent shrink-0">•</span>
            <span>{t('infoToInclude.year')}</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
