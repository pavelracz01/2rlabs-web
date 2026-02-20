// components/sections/References.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

const clients = ['Acme Corp', 'TechStart', 'FinPro', 'DataVault', 'CloudSys', 'SwiftDev'];

export default function References() {
  const t = useTranslations('references');

  return (
    <section id="references" className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-[#1E293B] mb-2"
        >
          {t('title')}
        </motion.h2>
        <p className="text-slate-500 mb-12">{t('subtitle')}</p>

        <div className="flex flex-wrap justify-center gap-8">
          {clients.map((name, i) => (
            <motion.div
              key={name}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="px-8 py-4 bg-[#F1F5F9] rounded-xl text-slate-400 font-semibold text-lg hover:text-[#2563EB] transition-colors"
            >
              {name}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
