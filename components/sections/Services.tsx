// components/sections/Services.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ClipboardCheck, Bot, Brain, Gauge } from 'lucide-react';

const icons = [ClipboardCheck, Bot, Brain, Gauge];
const serviceKeys = ['manual', 'automation', 'consulting', 'performance'] as const;

export default function Services() {
  const t = useTranslations('services');

  return (
    <section id="services" className="bg-[#F1F5F9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#1E293B] mb-4"
          >
            {t('title')}
          </motion.h2>
          <p className="text-slate-500 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceKeys.map((key, i) => {
            const Icon = icons[i];
            return (
              <motion.div
                key={key}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-sm border border-transparent hover:border-[#2563EB] hover:shadow-md transition-all group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#2563EB]/10 to-[#06B6D4]/10 flex items-center justify-center mb-4 group-hover:from-[#2563EB]/20 group-hover:to-[#06B6D4]/20 transition-all">
                  <Icon className="text-[#2563EB]" size={24} />
                </div>
                <h3 className="font-semibold text-[#1E293B] text-lg mb-2">
                  {t(`${key}.title`)}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
