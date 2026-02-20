// components/Footer.tsx
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'footer' });
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/5 py-8 px-4 text-center text-slate-500 text-sm">
      © {new Date().getFullYear()} Testar Consulting s.r.o. — {t('rights')}
    </footer>
  );
}
