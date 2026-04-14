/**
 * Single-column layout: skills section with category grouping.
 */
import { SkillEntry, SectionTitle } from "../shared/SectionRenderers";
import { singleColumnStyles as s } from "../shared/templateStyles";
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
    <section className="mb-5">
      <SectionTitle
        label={tEditor.skills}
        sectionType="skills"
        className={s.label}
        style={s.sectionTitle}
      />
      {Object.entries(grouped).map(([cat, catSkills]) => (
        <div key={cat} className="mb-2 last:mb-0">
          {cat !== '__none__' && (
            <div className="text-slate-500 text-xs mb-1 uppercase tracking-wide" style={{ fontSize: '0.7rem' }}>
              {cat}
            </div>
          )}
          <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-900" style={s.body}>
            {catSkills.map(skill => (
              <SkillEntry key={skill.id} skill={skill} onUpdate={onUpdate} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}
