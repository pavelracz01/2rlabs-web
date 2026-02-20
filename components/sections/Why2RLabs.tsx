// components/sections/Why2RLabs.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { CheckCircle2 } from 'lucide-react';

export default function Why2RLabs() {
  const t = useTranslations('why');
  const points = t.raw('points') as string[];
  const stats = [
    { value: t('stat1.value'), label: t('stat1.label') },
    { value: t('stat2.value'), label: t('stat2.label') },
    { value: t('stat3.value'), label: t('stat3.label') },
  ];

  return (
    <section id="why" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#1E293B] mb-2"
          >
            {t('title')}
          </motion.h2>
          <p className="text-slate-500 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-16">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center"
            >
              <div className="text-5xl font-bold bg-gradient-to-r from-[#2563EB] to-[#06B6D4] bg-clip-text text-transparent">
                {stat.value}
              </div>
              <div className="text-slate-500 mt-1">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-3xl mx-auto">
          {points.map((point, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="flex items-start gap-3"
            >
              <CheckCircle2 className="text-[#06B6D4] shrink-0 mt-0.5" size={20} />
              <span className="text-[#1E293B]">{point}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
