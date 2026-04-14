
/**
 * Two-column layout main column: education section.
 */
import { EducationEntry, SectionTitle } from "../shared/SectionRenderers";
import { twoColumnStyles as s } from "../shared/templateStyles";

interface Education {
  id: string;
  school: string;
  field?: string;
  degree?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  address?: string;
}

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
    <section className="mb-4">
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
