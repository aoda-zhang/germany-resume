
/**
 * Two-column layout sidebar: skills list.
 */
import { SectionTitle, SkillEntry } from "../shared/SectionRenderers";
import { twoColumnStyles as s } from "../shared/templateStyles";

interface Skill {
  id: string;
  name: string;
}

interface SkillsSectionProps {
  skills: Skill[];
  tEditor: Record<string, string>;
  onUpdate: (id: string, data: Partial<Skill>) => void;
}

export function SkillsSection({ skills, tEditor, onUpdate }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  return (
    <div className="mt-4">
      <SectionTitle
        label={tEditor.skills}
        sectionType="skills"
        className={s.label}
        style={s.sectionTitle}
      />
      <div className="space-y-0.5 text-slate-900" style={s.body}>
        {skills.map((skill) => (
          <SkillEntry key={skill.id} skill={skill} onUpdate={onUpdate} />
        ))}
      </div>
    </div>
  );
}
