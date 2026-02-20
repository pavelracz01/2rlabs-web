// components/Footer.tsx
import { getTranslations } from 'next-intl/server';
import { getLocale } from 'next-intl/server';
import Link from 'next/link';

export default async function Footer() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: 'footer' });
  return (
    <footer className="bg-[#0A0F1E] border-t border-white/5 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Company Info */}
          <div>
            <h3 className="text-white font-bold text-lg mb-3">2R Labs</h3>
            <p className="text-slate-400 text-sm">{t('description')}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t('quickLinks')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}`} className="text-slate-400 hover:text-white transition-colors">{t('home')}</Link></li>
              <li><Link href={`/${locale}/blog`} className="text-slate-400 hover:text-white transition-colors">{t('blog')}</Link></li>
              <li><Link href={`/${locale}/case-studies`} className="text-slate-400 hover:text-white transition-colors">{t('caseStudies')}</Link></li>
              <li><Link href={`/${locale}/products`} className="text-slate-400 hover:text-white transition-colors">{t('products')}</Link></li>
              <li><Link href={`/${locale}/about`} className="text-slate-400 hover:text-white transition-colors">{t('about')}</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">{t('legal')}</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href={`/${locale}/privacy`} className="text-slate-400 hover:text-white transition-colors">{t('privacy')}</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-white/5 text-center text-slate-500 text-sm">
          © {new Date().getFullYear()} 2R Labs s.r.o. — {t('rights')}
        </div>
      </div>
    </footer>
  );
}
