import { EditableText, EditableLabel, useResumeEditing } from './EditableComponents';

export function MinimalTemplate() {
  const { resumeData, visibleSections, updatePersonalInfo, updateExperience, updateEducation, updateSkill, updateProject, updateLanguage } = useResumeEditing();
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  const renderSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case 'personal':
        return (
          <header className="mb-5">
            <h1 className="font-light text-slate-900 mb-2" style={{ fontSize: '20pt' }}>
              <EditableText value={personalInfo.fullName} onChange={(v) => updatePersonalInfo({ fullName: v })} placeholder="姓名" className="font-light" />
            </h1>
            <div className="text-slate-500 space-x-3" style={{ fontSize: '9pt' }}>
              <EditableText value={personalInfo.email} onChange={(v) => updatePersonalInfo({ email: v })} placeholder="邮箱" />
              {personalInfo.phone && <span>·</span>}
              <EditableText value={personalInfo.phone} onChange={(v) => updatePersonalInfo({ phone: v })} placeholder="电话" />
              {personalInfo.location && <span>·</span>}
              <EditableText value={personalInfo.location} onChange={(v) => updatePersonalInfo({ location: v })} placeholder="地址" />
            </div>
          </header>
        );

      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <section className="mb-5">
            <p className="text-slate-600 leading-relaxed" style={{ fontSize: '10pt' }}>
              <EditableText value={personalInfo.summary} onChange={(v) => updatePersonalInfo({ summary: v })} placeholder="个人简介..." multiline className="w-full" />
            </p>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="experience" defaultLabel="经验" className="font-medium text-slate-400 uppercase tracking-wider block mb-3" style={{ fontSize: '9pt' }} />
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-slate-900" style={{ fontSize: '10.5pt' }}>
                      <EditableText value={exp.position} onChange={(v) => updateExperience(exp.id, { position: v })} placeholder="职位" />
                    </h3>
                    <span className="text-slate-400" style={{ fontSize: '8.5pt' }}>
                      <EditableText value={`${exp.startDate} - ${exp.current ? '至今' : exp.endDate}`} onChange={(v) => {
                        const dates = v.split('-').map(s => s.trim());
                        updateExperience(exp.id, { startDate: dates[0] || '', endDate: dates[1] || '', current: dates[1]?.includes('至今') || false });
                      }} placeholder="时间" className="text-slate-400" />
                    </span>
                  </div>
                  <div className="text-slate-500" style={{ fontSize: '9.5pt' }}>
                    <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} placeholder="公司" />
                  </div>
                  <p className="mt-1 text-slate-600 whitespace-pre-line" style={{ fontSize: '9pt' }}>
                    <EditableText value={exp.description} onChange={(v) => updateExperience(exp.id, { description: v })} placeholder="工作描述..." multiline className="w-full" />
                  </p>
                  {exp.techStack && (
                    <div className="mt-1 text-slate-400" style={{ fontSize: '8.5pt' }}>
                      {exp.techStack}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        );

      case 'education':
        if (education.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="education" defaultLabel="教育" className="font-medium text-slate-400 uppercase tracking-wider block mb-3" style={{ fontSize: '9pt' }} />
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="text-slate-900" style={{ fontSize: '10.5pt' }}>
                      <EditableText value={edu.school} onChange={(v) => updateEducation(edu.id, { school: v })} placeholder="学校" />
                    </h3>
                    <span className="text-slate-400" style={{ fontSize: '8.5pt' }}>
                      <EditableText value={`${edu.startDate} - ${edu.current ? '至今' : edu.endDate}`} onChange={(v) => {
                        const dates = v.split('-').map(s => s.trim());
                        updateEducation(edu.id, { startDate: dates[0] || '', endDate: dates[1] || '', current: dates[1]?.includes('至今') || false });
                      }} placeholder="时间" className="text-slate-400" />
                    </span>
                  </div>
                  <div className="text-slate-500" style={{ fontSize: '9.5pt' }}>
                    <EditableText value={`${edu.degree} · ${edu.field}`} onChange={(v) => {
                      const parts = v.split('·').map(s => s.trim());
                      updateEducation(edu.id, { degree: parts[0] || '', field: parts[1] || '' });
                    }} placeholder="学位 · 专业" />
                  </div>
                </div>
              ))}
            </div>
          </section>
        );

      case 'projects':
        if (projects.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="projects" defaultLabel="项目" className="font-medium text-slate-400 uppercase tracking-wider block mb-3" style={{ fontSize: '9pt' }} />
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-slate-900" style={{ fontSize: '10.5pt' }}>
                    <EditableText value={proj.name} onChange={(v) => updateProject(proj.id, { name: v })} placeholder="项目名称" />
                  </h3>
                  <p className="mt-1 text-slate-600 whitespace-pre-line" style={{ fontSize: '9pt' }}>
                    <EditableText value={proj.description} onChange={(v) => updateProject(proj.id, { description: v })} placeholder="项目描述..." multiline className="w-full" />
                  </p>
                </div>
              ))}
            </div>
          </section>
        );

      case 'skills':
        if (skills.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="skills" defaultLabel="技能" className="font-medium text-slate-400 uppercase tracking-wider block mb-3" style={{ fontSize: '9pt' }} />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600" style={{ fontSize: '9.5pt' }}>
              {skills.map((skill) => (
                <span key={skill.id}>
                  <EditableText value={skill.name} onChange={(v) => updateSkill(skill.id, { name: v })} placeholder="技能" />
                </span>
              ))}
            </div>
          </section>
        );

      case 'languages':
        if (languages.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="languages" defaultLabel="语言" className="font-medium text-slate-400 uppercase tracking-wider block mb-3" style={{ fontSize: '9pt' }} />
            <div className="flex flex-wrap gap-x-4 gap-y-1 text-slate-600" style={{ fontSize: '9.5pt' }}>
              {languages.map((lang) => (
                <span key={lang.id}>
                  <EditableText value={`${lang.name}: ${lang.level}`} onChange={(v) => {
                    const parts = v.split(':').map(s => s.trim());
                    updateLanguage(lang.id, { name: parts[0] || '', level: parts[1] || '' });
                  }} placeholder="语言: 水平" />
                </span>
              ))}
            </div>
          </section>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="bg-white shadow-lg"
      style={{ padding: '12mm 15mm', minHeight: '297mm', boxSizing: 'border-box', width: '100%' }}
    >
      {visibleSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
