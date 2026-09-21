import SectionTitle from '../shared/SectionTitle';
import FadeUp from '../shared/FadeUp';
import SkillTile from './SkillTile';
import skills from '../../data/skills';

export default function Skills() {
  return (
    <section
      id="skills"
      className="px-[clamp(20px,4vw,50px)] pt-[clamp(80px,12vw,160px)] pb-[clamp(80px,12vw,160px)]"
    >
      {/* Giant title */}
      <SectionTitle>SKILLS</SectionTitle>

      {/* Grid */}
      <FadeUp delay={0.05} className="mt-12">
        <div
          className="grid gap-5
            grid-cols-2
            sm:grid-cols-3
            lg:grid-cols-5"
        >
          {skills.map((skill, i) => (
            <SkillTile key={skill.id} skill={skill} index={i} />
          ))}
        </div>
      </FadeUp>
    </section>
  );
}
