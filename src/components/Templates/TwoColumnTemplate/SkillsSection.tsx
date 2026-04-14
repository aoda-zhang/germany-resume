/**
 * Two-column layout sidebar: skills list with category grouping.
 */
import { SectionTitle, SkillEntry } from "../shared/SectionRenderers";
import { twoColumnStyles as s } from "../shared/templateStyles";
import type { Skill } from "../../../types/resume";

interface SkillsSectionProps {
  skills: Skill[];
  tEditor: Record<string, string>;
  onUpdate: (id: string, data: Partial<Skill>) => void;
}

export function SkillsSection({ skills, tEditor, onUpdate }: SkillsSectionProps) {
  if (skills.length === 0) return null;

  const grouped: Record<string, Skill[]> = {};
  skills.forEach(sk => {
    const cat = sk.category?.trim() || '__none__';
    if (!grouped[cat]) grouped[cat] = [];
    grouped[cat].push(sk);
  });

  return (
    <div className="mt-4">
      <SectionTitle
        label={tEditor.skills}
        sectionType="skills"
        className={s.label}
        style={s.sectionTitle}
      />
      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} className="mb-2 last:mb-0">
          {cat !== '__none__' && (
            <div className="text-slate-400 text-xs mb-0.5 uppercase tracking-wide">{cat}</div>
          )}
          <div className="space-y-0.5 text-slate-900" style={s.body}>
            {catSkills.map(skill => (
              <SkillEntry key={skill.id} skill={skill} onUpdate={onUpdate} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
