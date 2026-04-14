
/**
 * Two-column layout main column: experience section.
 */
import { ExperienceEntry, SectionTitle } from "../shared/SectionRenderers";
import { twoColumnStyles as s } from "../shared/templateStyles";

interface Experience {
  id: string;
  position: string;
  company: string;
  address?: string;
  country?: string;
  workMode?: string;
  startDate: string;
  endDate: string;
  current: boolean;
  techStack?: string;
  description: string;
}

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
    <section className="mb-4">
      <SectionTitle
        label={tEditor.experience}
        sectionType="experience"
        className={s.label}
        style={s.sectionTitle}
      />
      {experience.map((exp) => (
        <ExperienceEntry
          key={exp.id}
          exp={exp}
          t={t}
          present={present}
          onUpdate={onUpdate}
          styles={{ description: s.body }}
        />
      ))}
    </section>
  );
}
