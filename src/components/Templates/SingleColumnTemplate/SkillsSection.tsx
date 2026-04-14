/**
 * Single-column layout: skills section.
 */
import { SkillEntry, SectionTitle } from "../shared/SectionRenderers";
import { singleColumnStyles as s } from "../shared/templateStyles";
import type { Skill } from "../../../types/resume";

interface SkillsSectionProps {
  skills: Skill[];
  tEditor: Record<string, string>;
  onUpdate: (id: string, data: Partial<Skill>) => void;
}

export function SkillsSection({
  skills,
  tEditor,
  onUpdate,
}: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <section className="mb-5">
      <SectionTitle
        label={tEditor.skills}
        sectionType="skills"
        className={s.label}
        style={s.sectionTitle}
      />
      <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-900" style={s.body}>
        {skills.map((skill) => (
          <SkillEntry key={skill.id} skill={skill} onUpdate={onUpdate} />
        ))}
      </div>
    </section>
  );
}
