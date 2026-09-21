import type { SiteData } from '../data/site';

interface Props {
  name: SiteData['footer']['name'];
}

export default function Footer({ name }: Props) {
  const year = new Date().getFullYear();

  return (
    <footer
      className="border-t border-line px-[clamp(20px,4vw,50px)] py-8
        flex flex-col sm:flex-row items-center justify-between gap-4"
    >
      {/* Copyright */}
      <p className="font-mono text-[12px] text-muted uppercase tracking-[0.1em]">
        © {year} {name}
      </p>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="font-mono font-bold text-[12px] text-ink uppercase tracking-[0.12em]
          link-underline after:h-px after:bg-ink"
        aria-label="Back to top of page"
      >
        Back to top ↑
      </button>
    </footer>
  );
}
