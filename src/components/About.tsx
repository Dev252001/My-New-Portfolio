import FadeUp from './shared/FadeUp';
import type { SiteData } from '../data/site';

interface Props {
  about: SiteData['about'];
}

export default function About({ about }: Props) {
  return (
    <div className="px-[clamp(20px,4vw,50px)] pt-16 pb-[clamp(80px,12vw,160px)]">
      {/* 1px hairline above about */}
      <div className="w-full h-px bg-line mb-12" aria-hidden="true" />

      {/* Statement paragraph */}
      <FadeUp className="max-w-[860px]">
        <p
          className="font-sans font-normal text-ink leading-[1.1]
            text-[clamp(1.4rem,2.2vw,2.4rem)]"
        >
          {about.statement}
        </p>
      </FadeUp>
    </div>
  );
}
