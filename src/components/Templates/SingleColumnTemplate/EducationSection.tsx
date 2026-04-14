/**
 * Single-column layout: education section.
 */
import { EducationEntry, SectionTitle } from "../shared/SectionRenderers";
import { singleColumnStyles as s } from "../shared/templateStyles";
import type { Education } from "../../../types/resume";

interface EducationSectionProps {
  education: Education[];
  t: Record<string, string>;
  tEditor: Record<string, string>;
  present: string;
  onUpdate: (id: string, data: Partial<Education>) => void;
}

export function EducationSection({
  education,
  t,
  tEditor,
  present,
  onUpdate,
}: EducationSectionProps) {
  if (education.length === 0) return null;

  return (
    <section className="mb-5">
      <SectionTitle
        label={tEditor.education}
        sectionType="education"
        className={s.label}
        style={s.sectionTitle}
      />
      {education.map((edu) => (
        <EducationEntry
          key={edu.id}
          edu={edu}
          t={t}
          present={present}
          onUpdate={onUpdate}
          styles={{ field: s.body }}
        />
      ))}
    </section>
  );
}
