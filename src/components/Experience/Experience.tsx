import SectionTitle from '../shared/SectionTitle';
import FadeUp from '../shared/FadeUp';
import ExperienceRow from './ExperienceRow';
import experience from '../../data/experience';

export default function Experience() {
  return (
    <section
      id="experience"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      {/* Giant title */}
      <SectionTitle>EXPERIENCE</SectionTitle>

      {/* Statement heading */}
      <FadeUp delay={0.1}>
        <h3
          className="font-sans font-normal text-ink leading-[1.1] mt-8 mb-14
            text-[clamp(2.5rem,4vw,5rem)]"
        >
          Learning by Building
        </h3>
      </FadeUp>

      {/* Two-column layout */}
      <div className="flex flex-col md:flex-row gap-12 lg:gap-20 items-start">

        {/* Left: image — full width on mobile, ~38% on md+ */}
        <FadeUp className="w-full md:w-[38%] md:sticky md:top-28 flex-shrink-0">
          <img
            src="/images/experience-photo.png"
            alt="Devashish Pandey working on a laptop"
            className="w-full aspect-[4/5] max-h-[400px] md:max-h-none object-cover object-top"
          />
        </FadeUp>

        {/* Right: experience rows */}
        <div className="flex-1 min-w-0">
          {experience.map((item, i) => (
            <ExperienceRow key={item.id} item={item} index={i} />
          ))}
          {/* Closing hairline */}
          <div className="w-full h-px bg-line" aria-hidden="true" />
        </div>

      </div>
    </section>
  );
}
