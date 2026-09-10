"use client";

import { Mail, Phone, Clock } from "lucide-react";
import { useTranslations } from 'next-intl';
import Card from "@/components/ui/Card";

export default function ContactInfo() {
  const t = useTranslations('contact.info');

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-xl font-semibold text-azul mb-6">
          {t('title')}
        </h3>

        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-blue-50 shrink-0">
              <Mail className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-pizarra mb-1">{t('emailLabel')}</p>
              <a
                href={`mailto:${t('email')}`}
                className="text-rojo hover:underline"
              >
                {t('email')}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-green-50 shrink-0">
              <Phone className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-pizarra mb-1">{t('phoneLabel')}</p>
              <a
                href={`https://wa.me/${t('phone').replace(/[^0-9]/g, "")}`}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="text-rojo hover:underline"
              >
                {t('phone')}
              </a>
            </div>
          </div>

          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 items-center justify-center bg-purple-50 shrink-0">
              <Clock className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-pizarra mb-1">{t('scheduleLabel')}</p>
              <p className="text-pizarra">{t('schedule')}</p>
              <p className="text-xs text-rojo mt-1.5 italic">
                {t('offHoursText')}
              </p>
            </div>
          </div>
        </div>
      </Card>

      <Card className="p-6 bg-papel border-niebla">
        <h4 className="font-semibold text-azul mb-3">{t('quickResponseTitle')}</h4>
        <p className="text-sm text-pizarra leading-relaxed">
          {t('quickResponseText')}
        </p>
      </Card>

      <Card className="p-6 bg-rojo/5 border-rojo/20">
        <h4 className="font-semibold text-azul mb-3">{t('infoToIncludeTitle')}</h4>
        <ul className="text-sm text-pizarra space-y-2">
          <li className="flex items-start gap-2">
            <span className="text-rojo shrink-0">•</span>
            <span>{t('infoToInclude.transactions')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rojo shrink-0">•</span>
            <span>{t('infoToInclude.exchanges')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rojo shrink-0">•</span>
            <span>{t('infoToInclude.operations')}</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="text-rojo shrink-0">•</span>
            <span>{t('infoToInclude.year')}</span>
          </li>
        </ul>
      </Card>
    </div>
  );
}
