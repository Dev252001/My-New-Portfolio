import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import ScrollProgress from './ScrollProgress';
import { useActiveSection } from '../hooks/useActiveSection';
import type { SiteData } from '../data/site';

interface Props {
  nav: SiteData['nav'];
  theme: 'light' | 'dark';
  onToggleTheme: (x: number, y: number) => void;
}

const SECTION_IDS = ['about', 'projects', 'experience', 'skills', 'github', 'contact'];

export default function Nav({ nav, theme, onToggleTheme }: Props) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const active = useActiveSection(SECTION_IDS);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileOpen(false);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    // Small delay to allow overlay to close before scrolling
    setTimeout(() => {
      const id = href.replace('#', '');
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <>
      <ScrollProgress />

      {/* ── Desktop / Tablet Nav ─────────────────────── */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 h-24 flex items-center
          px-[clamp(20px,4vw,50px)]
          transition-all duration-300
          ${scrolled
            ? 'backdrop-blur-md bg-[rgba(244,244,244,0.7)] dark:bg-[rgba(12,12,12,0.7)] border-b border-line'
            : 'bg-transparent'
          }`}
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        role="banner"
      >
        {/* Name */}
        <a
          href="#"
          onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="text-[15px] font-medium text-ink no-underline whitespace-nowrap link-underline"
        >
          {nav.name}
        </a>

        {/* Desktop links — spread between name and toggle */}
        <nav
          aria-label="Main navigation"
          className="hidden md:flex flex-1 items-center justify-center gap-10 lg:gap-16"
        >
          {nav.links.map(({ label, href }) => (
            <a
              key={href}
              href={href}
              onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
              className={`text-[15px] font-medium text-ink relative transition-colors duration-150
                after:absolute after:bottom-[-3px] after:left-0 after:h-[1px] after:bg-ink
                after:transition-[width] after:duration-200
                ${active === href.replace('#', '') ? 'after:w-full' : 'after:w-0 hover:after:w-full'}`}
            >
              {label}
            </a>
          ))}
        </nav>

        {/* Right: theme toggle (desktop) + hamburger (mobile) */}
        <div className="ml-auto flex items-center gap-2">
          <ThemeToggle theme={theme} onToggle={onToggleTheme} />
          <button
            className="md:hidden w-9 h-9 flex items-center justify-center text-ink"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
            aria-expanded={mobileOpen}
          >
            <Menu size={22} />
          </button>
        </div>
      </motion.header>

      {/* ── Mobile full-screen overlay ────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-bg flex flex-col px-6 py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            role="dialog"
            aria-modal="true"
            aria-label="Navigation menu"
          >
            {/* Close button */}
            <div className="flex justify-between items-center mb-12">
              <span className="text-[15px] font-medium text-ink">{nav.name}</span>
              <button
                onClick={() => setMobileOpen(false)}
                aria-label="Close menu"
                className="w-9 h-9 flex items-center justify-center text-ink"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile links */}
            <nav aria-label="Mobile navigation" className="flex flex-col gap-6">
              {nav.links.map(({ label, href }, i) => (
                <motion.a
                  key={href}
                  href={href}
                  onClick={(e) => { e.preventDefault(); handleNavClick(href); }}
                  className="text-[2.5rem] font-medium text-ink no-underline leading-none"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06, duration: 0.3 }}
                >
                  {label}
                </motion.a>
              ))}
            </nav>

            {/* Mobile theme toggle */}
            <div className="mt-auto">
              <ThemeToggle theme={theme} onToggle={onToggleTheme} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
