"use client";

import {
  InformationCircleIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  XCircleIcon,
  LightBulbIcon,
} from '@heroicons/react/24/outline';

type AlertType = 'info' | 'warning' | 'success' | 'error' | 'tip';

interface AlertBoxProps {
  type?: AlertType;
  title?: string;
  children: React.ReactNode;
}

const alertStyles = {
  info: {
    container: 'bg-blue-50 border-blue-400',
    icon: 'text-blue-600',
    title: 'text-blue-900',
    text: 'text-blue-800',
    iconComponent: InformationCircleIcon,
  },
  warning: {
    container: 'bg-amber-50 border-amber-400',
    icon: 'text-amber-600',
    title: 'text-amber-900',
    text: 'text-amber-800',
    iconComponent: ExclamationTriangleIcon,
  },
  success: {
    container: 'bg-green-50 border-green-400',
    icon: 'text-green-600',
    title: 'text-green-900',
    text: 'text-green-800',
    iconComponent: CheckCircleIcon,
  },
  error: {
    container: 'bg-red-50 border-red-400',
    icon: 'text-red-600',
    title: 'text-red-900',
    text: 'text-red-800',
    iconComponent: XCircleIcon,
  },
  tip: {
    container: 'bg-purple-50 border-purple-400',
    icon: 'text-purple-600',
    title: 'text-purple-900',
    text: 'text-purple-800',
    iconComponent: LightBulbIcon,
  },
};

export default function AlertBox({ type = 'info', title, children }: AlertBoxProps) {
  const styles = alertStyles[type];
  const IconComponent = styles.iconComponent;

  return (
    <div className={`flex gap-4 ${styles.container} border-l-4 rounded-r-xl p-6 my-6 shadow-md`}>
      <div className={`flex-shrink-0 ${styles.icon}`}>
        <IconComponent className="w-6 h-6" />
      </div>
      <div className="flex-1">
        {title && (
          <h4 className={`font-bold text-base mb-2 ${styles.title}`}>
            {title}
          </h4>
        )}
        <div className={`text-sm leading-relaxed ${styles.text}`}>
          {children}
        </div>
      </div>
    </div>
  );
}
