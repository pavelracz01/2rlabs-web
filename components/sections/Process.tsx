// components/sections/Process.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';

export default function Process() {
  const t = useTranslations('process');
  const steps = t.raw('steps') as { title: string; desc: string }[];

  return (
    <section id="process" className="bg-[#F1F5F9] py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl font-bold text-[#1E293B]"
          >
            {t('title')}
          </motion.h2>
        </div>

        <div className="flex flex-col md:flex-row gap-4 relative">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex-1 bg-white rounded-2xl p-6 shadow-sm relative"
            >
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#2563EB] to-[#06B6D4] text-white flex items-center justify-center font-bold mb-4">
                {i + 1}
              </div>
              <h3 className="font-semibold text-[#1E293B] text-lg mb-2">{step.title}</h3>
              <p className="text-slate-500 text-sm">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
