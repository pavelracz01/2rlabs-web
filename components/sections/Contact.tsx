// components/sections/Contact.tsx
'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Mail, Linkedin } from 'lucide-react';

export default function Contact() {
  const t = useTranslations('contact');
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    try {
      const res = await fetch('https://formspree.io/f/YOUR_FORM_ID', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({ name: form.name, email: form.email, message: form.message })
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  return (
    <section id="contact" className="bg-[#0A0F1E] py-24 px-4">
      <div className="max-w-3xl mx-auto text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl font-bold text-white mb-2"
        >
          {t('title')}
        </motion.h2>
        <p className="text-slate-400 mb-12">{t('subtitle')}</p>

        {status === 'success' ? (
          <div className="bg-[#06B6D4]/10 border border-[#06B6D4]/30 rounded-2xl p-8 text-[#06B6D4]">
            {t('success')}
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 text-left">
            <input
              required
              type="text"
              placeholder={t('name')}
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB]"
            />
            <input
              required
              type="email"
              placeholder={t('email')}
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB]"
            />
            <textarea
              required
              rows={5}
              placeholder={t('message')}
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-slate-500 focus:outline-none focus:border-[#2563EB] resize-none"
            />
            {status === 'error' && (
              <p className="text-red-400 text-sm">{t('error')}</p>
            )}
            <Button
              type="submit"
              disabled={status === 'sending'}
              className="w-full bg-gradient-to-r from-[#2563EB] to-[#06B6D4] text-white py-3 rounded-xl hover:opacity-90"
            >
              {status === 'sending' ? t('sending') : t('send')}
            </Button>
          </form>
        )}

        <div className="flex justify-center gap-6 mt-10 text-slate-400">
          <a href="mailto:info@testarconsulting.cz" className="flex items-center gap-2 hover:text-white transition-colors">
            <Mail size={18} /> info@testarconsulting.cz
          </a>
          <a href="https://linkedin.com/company/testar-consulting" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-white transition-colors">
            <Linkedin size={18} /> LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
