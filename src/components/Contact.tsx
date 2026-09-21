import SectionTitle from './shared/SectionTitle';
import FadeUp from './shared/FadeUp';
import ContactAnimation from './shared/ContactAnimation';
import type { SiteData } from '../data/site';

interface Props {
  contact: SiteData['contact'];
}

export default function Contact({ contact }: Props) {
  const isPlaceholder = (v: string) => v.startsWith('[');

  return (
    <section
      id="contact"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      <div className="flex flex-col md:flex-row gap-16 lg:gap-24 items-start">

        {/* ── Left column: title + intentional whitespace ── */}
        <div className="flex-1 min-w-0">
          <SectionTitle>CONTACT</SectionTitle>
        </div>

        {/* ── Right column: image + details ──────────────── */}
        <FadeUp className="w-full md:w-[400px] flex-shrink-0 flex flex-col gap-6">

          {/* Animated contact visual */}
          <ContactAnimation />

          {/* City */}
          <p className="font-mono font-bold uppercase tracking-[0.14em] text-[13px] text-ink">
            {contact.city}
          </p>

          {/* Get in touch label */}
          <p className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink">
            GET IN TOUCH:
          </p>

          {/* Email */}
          <div className="flex flex-col gap-1">
            <span className="font-mono font-bold uppercase tracking-[0.12em] text-[11px] text-muted">
              EMAIL:
            </span>
            {isPlaceholder(contact.email) ? (
              <span className="font-mono font-bold uppercase tracking-[0.1em] text-[13px] text-ink">
                {contact.email}
              </span>
            ) : (
              <a
                href={`mailto:${contact.email}`}
                className="font-mono font-bold uppercase tracking-[0.1em] text-[13px] text-ink
                  border-b border-ink pb-px link-underline inline-block"
              >
                {contact.email}
              </a>
            )}
          </div>

          {/* Social links */}
          <div className="flex flex-col gap-3 mt-2">
            {!isPlaceholder(contact.linkedin) && (
              <a
                href={contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink
                  link-underline inline-block w-fit"
              >
                LINKEDIN
              </a>
            )}
            {isPlaceholder(contact.linkedin) && (
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink">
                LINKEDIN
              </span>
            )}

            {!isPlaceholder(contact.github) && (
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink
                  link-underline inline-block w-fit"
              >
                GITHUB
              </a>
            )}
            {isPlaceholder(contact.github) && (
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink">
                GITHUB
              </span>
            )}

            {contact.x && !isPlaceholder(contact.x) && (
              <a
                href={contact.x}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink
                  link-underline inline-block w-fit"
              >
                X
              </a>
            )}
            {contact.x && isPlaceholder(contact.x) && (
              <span className="font-mono font-bold uppercase tracking-[0.12em] text-[13px] text-ink">
                X
              </span>
            )}
          </div>
        </FadeUp>
      </div>
    </section>
  );
}
