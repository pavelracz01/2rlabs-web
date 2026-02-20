// components/Navbar.tsx
'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { usePathname } from 'next/navigation';
import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const otherLocale = locale === 'cs' ? 'en' : 'cs';
  // Switch locale while keeping the same path (replace only the first segment)
  const segments = pathname.split('/').filter(Boolean);
  segments[0] = otherLocale;
  const switchPath = '/' + segments.join('/');

  const navLinks = [
    { href: `/${locale}`, label: t('home') },
    { href: `/${locale}/blog`, label: t('blog') },
    { href: `/${locale}/case-studies`, label: t('caseStudies') },
    { href: `/${locale}/products`, label: t('products') },
    { href: `/${locale}/about`, label: t('about') },
    { href: '#contact', label: t('contact') },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-[#0A0F1E]/95 backdrop-blur-md shadow-lg' : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link href={`/${locale}`} className="text-white font-bold text-xl tracking-tight">
            Testar <span className="text-[#06B6D4]">Consulting</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-slate-300 hover:text-white text-sm transition-colors"
              >
                {link.label}
              </a>
            ))}
            <Link
              href={switchPath}
              className="ml-4 text-sm font-medium text-[#06B6D4] hover:text-white border border-[#06B6D4]/40 rounded px-3 py-1 transition-colors"
            >
              {otherLocale.toUpperCase()}
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={menuOpen}
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-[#0A0F1E]/98 backdrop-blur-md border-t border-white/10">
          <div className="px-4 py-4 flex flex-col gap-4">
            {navLinks.map((link) => (
              link.href.startsWith('/') ? (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ) : (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-slate-300 hover:text-white text-sm transition-colors"
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </a>
              )
            ))}
            <Link href={switchPath} className="text-sm font-medium text-[#06B6D4] border border-[#06B6D4]/40 rounded px-3 py-1">
              {otherLocale.toUpperCase()}
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
