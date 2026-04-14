/**
 * Single-column layout: experience section.
 */
import { ExperienceEntry } from "../shared/SectionRenderers";
import { SectionTitle } from "../shared/SectionRenderers";
import { singleColumnStyles as s } from "../shared/templateStyles";
import type { Experience } from "../../../types/resume";

interface ExperienceSectionProps {
  experience: Experience[];
  t: Record<string, string>;
  tEditor: Record<string, string>;
  present: string;
  onUpdate: (id: string, data: Partial<Experience>) => void;
}

export function ExperienceSection({
  experience,
  t,
  tEditor,
  present,
  onUpdate,
}: ExperienceSectionProps) {
  if (experience.length === 0) return null;

  return (
    <section className="mb-5">
      <SectionTitle
        label={tEditor.experience}
        sectionType="experience"
        className={s.label}
        style={s.sectionTitle}
      />
      {experience.map((exp) => (
        <div key={exp.id} className="flex mb-3" style={{ gridTemplateColumns: "140px 1fr" }}>
          {/* Left: time */}
          <div className="pr-4 text-slate-900 whitespace-nowrap mr-6">
            {exp.startDate} - {exp.endDate || (present ? present : "")}
            {exp.address && <div>{exp.address}</div>}
          </div>

          {/* Right: content */}
          <div className="min-w-0">
            <ExperienceEntry
              exp={exp}
              t={t}
              present={present}
              onUpdate={onUpdate}
              styles={{ description: s.body }}
            />
          </div>
        </div>
      ))}
    </section>
  );
}
