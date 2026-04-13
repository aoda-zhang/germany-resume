import {
  EditableText,
  EditableLabel,
  useResumeEditing,
} from "./EditableComponents";
import { useResumeStore } from "../../store/resumeStore";
import { translations } from "../../i18n";
import type { PersonalInfoFieldType } from "../../store/resumeStore";

export function TwoColumnTemplate() {
  const language = useResumeStore((s) => s.language);
  const t = translations[language].form;
  const tEditor = translations[language].editor;
  const present = translations[language].form.current;
  const {
    resumeData,
    visibleSections,
    personalInfoFields,
    updatePersonalInfo,
    updateExperience,
    updateEducation,
    updateSkill,
    updateProject,
    updateLanguage,
  } = useResumeEditing();
  const { personalInfo, experience, education, skills, projects, languages } =
    resumeData;

  // Fields shown in the contact section
  const contactFields = personalInfoFields.filter((f) => {
    if (f === "fullName" || f === "title") return false;
    const v = personalInfo[f as keyof typeof personalInfo];
    return typeof v === "string" && v.trim() !== "";
  });

  const fieldLabels: Record<PersonalInfoFieldType, string> = {
    fullName: t.name,
    title: t.title,
    email: t.email,
    phone: t.phone,
    address: t.address,
    nationality: t.nationality,
    birthDate: t.birthDate,
    workPermit: t.workPermit,
    blueCard: t.blueCard,
    linkedin: t.linkedin,
    github: t.github,
    website: t.website,
  };

  const renderSection = (section: (typeof visibleSections)[0]) => {
    switch (section.type) {
      case "personal":
        return (
          <div className="mb-4">
            {/* Name */}
            {personalInfoFields.includes("fullName") && personalInfo.fullName && (
              <h1 className="font-bold text-slate-900 mb-1" style={{ fontSize: "18pt" }}>
                <EditableText
                  value={personalInfo.fullName || ""}
                  onChange={(v) => updatePersonalInfo({ fullName: v })}
                  placeholder={t.name}
                  className="font-bold"
                />
              </h1>
            )}
            {/* Title */}
            {personalInfoFields.includes("title") && personalInfo.title && (
              <p className="font-medium text-slate-700 mb-3" style={{ fontSize: "12pt" }}>
                <EditableText
                  value={personalInfo.title || ""}
                  onChange={(v) => updatePersonalInfo({ title: v })}
                  placeholder={t.title}
                />
              </p>
            )}
            {/* Contact info */}
            <div className="space-y-0.5 text-slate-600" style={{ fontSize: "9pt" }}>
              {contactFields.map((f) => (
                <div key={f} className="flex items-center gap-2">
                  <span className="font-semibold w-16">{fieldLabels[f]}:</span>
                  <EditableText
                    value={(personalInfo[f as keyof typeof personalInfo] as string) || ""}
                    onChange={(v) => updatePersonalInfo({ [f]: v } as any)}
                    placeholder={fieldLabels[f]}
                  />
                </div>
              ))}
            </div>
          </div>
        );

      case "summary":
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="summary"
              defaultLabel={tEditor.summary}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <p className="leading-relaxed" style={{ fontSize: "10pt" }}>
              <EditableText
                value={personalInfo.summary || ""}
                onChange={(v) => updatePersonalInfo({ summary: v })}
                placeholder={t.summaryPlaceholder}
                multiline
                className="w-full"
              />
            </p>
          </section>
        );

      case "experience":
        if (experience.length === 0) return null;
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="experience"
              defaultLabel={tEditor.experience}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline gap-2 mb-0.5">
                    <h3 className="font-bold text-slate-900" style={{ fontSize: "10pt" }}>
                      <EditableText
                        value={exp.position}
                        onChange={(v) => updateExperience(exp.id, { position: v })}
                        placeholder={t.position}
                        className="font-bold"
                      />
                    </h3>
                    <span className="text-slate-500 flex-shrink-0" style={{ fontSize: "9pt" }}>
                      <EditableText
                        value={`${exp.startDate} - ${exp.current ? present : exp.endDate}`}
                        onChange={(v) => {
                          const dates = v.split("-").map((s) => s.trim());
                          updateExperience(exp.id, {
                            startDate: dates[0] || "",
                            endDate: dates[1] || "",
                            current: dates[1]?.includes(present) || false,
                          });
                        }}
                        placeholder={t.startDate}
                      />
                    </span>
                  </div>
                  <div className="text-slate-700" style={{ fontSize: "9pt" }}>
                    <EditableText
                      value={exp.company}
                      onChange={(v) => updateExperience(exp.id, { company: v })}
                      placeholder={t.company}
                    />
                    {exp.address && (
                      <span>
                        {" · "}
                        <EditableText
                          value={exp.address}
                          onChange={(v) => updateExperience(exp.id, { address: v })}
                          placeholder={t.address}
                        />
                      </span>
                    )}
                  </div>
                  {exp.techStack && (
                    <div className="mt-0.5">
                      <span className="text-slate-400 text-xs mr-1">Tech:</span>
                      <div className="inline-flex flex-wrap gap-0.5">
                        {exp.techStack.split(",").map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-1 py-0.5 bg-slate-100 text-slate-600 rounded text-xs"
                          >
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                  <p className="mt-1 text-slate-700 whitespace-pre-line" style={{ fontSize: "9pt" }}>
                    <EditableText
                      value={exp.description}
                      onChange={(v) => updateExperience(exp.id, { description: v })}
                      placeholder={t.description}
                      multiline
                      className="w-full"
                    />
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case "education":
        if (education.length === 0) return null;
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="education"
              defaultLabel={tEditor.education}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <div className="space-y-1">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="font-medium text-slate-800" style={{ fontSize: "10pt" }}>
                      <EditableText
                        value={edu.field || ""}
                        onChange={(v) => updateEducation(edu.id, { field: v })}
                        placeholder={t.major}
                      />
                    </span>
                    <span className="text-slate-500" style={{ fontSize: "9pt" }}>
                      <EditableText
                        value={`${edu.startDate}${edu.startDate ? " - " : ""}${edu.current ? present : edu.endDate}`}
                        onChange={(v) => {
                          const dashIdx = v.indexOf("-");
                          const s1 = dashIdx >= 0 ? v.slice(0, dashIdx).trim() : v.trim();
                          const s2 = dashIdx >= 0 ? v.slice(dashIdx + 1).trim() : "";
                          updateEducation(edu.id, {
                            startDate: s1,
                            endDate: s2,
                            current: s2.toLowerCase().includes(present.toLowerCase()),
                          });
                        }}
                        placeholder={t.startDate}
                      />
                    </span>
                  </div>
                  <div className="flex justify-between items-baseline gap-2">
                    <span className="text-slate-700" style={{ fontSize: "9pt" }}>
                      <EditableText
                        value={edu.school || ""}
                        onChange={(v) => updateEducation(edu.id, { school: v })}
                        placeholder={t.school}
                      />
                    </span>
                    {edu.address && (
                      <span className="text-slate-500" style={{ fontSize: "9pt" }}>
                        <EditableText
                          value={edu.address}
                          onChange={(v) => updateEducation(edu.id, { address: v })}
                          placeholder={t.address}
                        />
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case "projects":
        if (projects.length === 0) return null;
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="projects"
              defaultLabel={tEditor.projects}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <div className="space-y-2">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-slate-900" style={{ fontSize: "10pt" }}>
                    <EditableText
                      value={proj.name}
                      onChange={(v) => updateProject(proj.id, { name: v })}
                      placeholder={t.projectName}
                      className="font-bold"
                    />
                  </h3>
                  <p className="mt-0.5 text-slate-700 whitespace-pre-line" style={{ fontSize: "9pt" }}>
                    <EditableText
                      value={proj.description}
                      onChange={(v) => updateProject(proj.id, { description: v })}
                      placeholder={t.description}
                      multiline
                      className="w-full"
                    />
                  </p>
                  {proj.technologies.length > 0 && (
                    <div className="mt-0.5 text-slate-600" style={{ fontSize: "9pt" }}>
                      <span className="font-medium">Tech: </span>
                      {proj.technologies.map((tech, idx) => (
                        <span key={idx}>
                          <EditableText
                            value={tech}
                            onChange={(v) => {
                              const newTechs = [...proj.technologies];
                              newTechs[idx] = v;
                              updateProject(proj.id, { technologies: newTechs });
                            }}
                            placeholder={t.skills}
                          />
                          {idx < proj.technologies.length - 1 && " · "}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case "skills":
        if (skills.length === 0) return null;
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="skills"
              defaultLabel={tEditor.skills}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <div className="space-y-0.5" style={{ fontSize: "10pt" }}>
              {skills.map((skill) => (
                <div key={skill.id}>
                  <EditableText
                    value={skill.name}
                    onChange={(v) => updateSkill(skill.id, { name: v })}
                    placeholder={!skill.name ? t.skills : ""}
                  />
                </div>
              ))}
            </div>
          </section>
        );

      case "languages":
        if (languages.length === 0) return null;
        return (
          <section className="mb-4">
            <EditableLabel
              sectionType="languages"
              defaultLabel={tEditor.languages}
              className="font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block"
              style={{ fontSize: "11pt" }}
            />
            <div className="space-y-0.5" style={{ fontSize: "10pt" }}>
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-baseline gap-1">
                  <EditableText
                    value={lang.name}
                    onChange={(v) => updateLanguage(lang.id, { name: v })}
                    placeholder={t.language}
                    className="font-medium text-slate-800"
                  />
                  <span className="text-slate-400">-</span>
                  <EditableText
                    value={lang.level}
                    onChange={(v) => updateLanguage(lang.id, { level: v })}
                    placeholder="Level"
                    className="text-slate-500"
                  />
                </div>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  // Separate sections for left and right columns
  const leftColumnTypes = ["personal", "skills", "languages"];
  const leftSections = visibleSections.filter((s) => leftColumnTypes.includes(s.type));
  const rightSections = visibleSections.filter((s) => !leftColumnTypes.includes(s.type));

  return (
    <div
      className="bg-white font-sans flex"
      style={{
        minHeight: "297mm",
        boxSizing: "border-box",
        width: "100%",
      }}
    >
      {/* Left column - sidebar */}
      <div
        className="flex-shrink-0 bg-slate-50 border-r border-slate-200"
        style={{
          width: "30%",
          padding: "60px 30px",
        }}
      >
        {/* Photo */}
        {personalInfo.photo && (
          <div className="mb-4 flex justify-center">
            <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-slate-300">
              <img
                src={personalInfo.photo}
                alt="Photo"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}
        
        {leftSections.map((section) => (
          <div key={section.id}>{renderSection(section)}</div>
        ))}
      </div>

      {/* Right column - main content */}
      <div
        className="flex-1"
        style={{
          width: "70%",
          padding: "60px 40px",
        }}
      >
        {rightSections.map((section) => (
          <div key={section.id}>{renderSection(section)}</div>
        ))}
      </div>
    </div>
  );
}
