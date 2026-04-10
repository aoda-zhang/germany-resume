import { Mail, Phone, MapPin } from 'lucide-react';
import { EditableText, EditableLabel, useResumeEditing } from './EditableComponents';

export function ClassicTemplate() {
  const { resumeData, visibleSections, updatePersonalInfo, updateExperience, updateEducation, updateSkill, updateProject, updateLanguage } = useResumeEditing();
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  const renderSection = (section: typeof visibleSections[0]) => {
    switch (section.type) {
      case 'personal':
        return (
          <header className="text-center border-b border-slate-800 pb-4 mb-5">
            <h1 className="font-serif font-bold text-slate-900 mb-3" style={{ fontSize: '22pt' }}>
              <EditableText
                value={personalInfo.fullName}
                onChange={(v) => updatePersonalInfo({ fullName: v })}
                placeholder="姓名"
                className="font-serif font-bold"
              />
            </h1>
            <div className="flex justify-center flex-wrap gap-4 text-slate-600" style={{ fontSize: '9.5pt' }}>
              {personalInfo.email && (
                <span className="flex items-center gap-1">
                  <Mail className="w-3.5 h-3.5" />
                  <EditableText value={personalInfo.email} onChange={(v) => updatePersonalInfo({ email: v })} placeholder="邮箱" />
                </span>
              )}
              {personalInfo.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" />
                  <EditableText value={personalInfo.phone} onChange={(v) => updatePersonalInfo({ phone: v })} placeholder="电话" />
                </span>
              )}
              {personalInfo.location && (
                <span className="flex items-center gap-1">
                  <MapPin className="w-3.5 h-3.5" />
                  <EditableText value={personalInfo.location} onChange={(v) => updatePersonalInfo({ location: v })} placeholder="地址" />
                </span>
              )}
            </div>
          </header>
        );

      case 'summary':
        if (!personalInfo.summary) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="summary" defaultLabel="个人简介" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <p className="text-slate-700 leading-relaxed" style={{ fontSize: '10pt' }}>
              <EditableText value={personalInfo.summary} onChange={(v) => updatePersonalInfo({ summary: v })} placeholder="个人简介..." multiline className="w-full" />
            </p>
          </section>
        );

      case 'experience':
        if (experience.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="experience" defaultLabel="工作经验" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <div className="space-y-3">
              {experience.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800" style={{ fontSize: '10.5pt' }}>
                      <EditableText value={exp.position} onChange={(v) => updateExperience(exp.id, { position: v })} placeholder="职位" className="font-bold" />
                    </h3>
                    <span className="text-slate-600 italic" style={{ fontSize: '9pt' }}>
                      <EditableText value={`${exp.startDate} - ${exp.current ? '至今' : exp.endDate}`} onChange={(v) => {
                        const dates = v.split('-').map(s => s.trim());
                        updateExperience(exp.id, { startDate: dates[0] || '', endDate: dates[1] || '', current: dates[1]?.includes('至今') || false });
                      }} placeholder="时间" className="italic" />
                    </span>
                  </div>
                  <div className="text-slate-700 italic" style={{ fontSize: '10pt' }}>
                    <EditableText value={exp.company} onChange={(v) => updateExperience(exp.id, { company: v })} placeholder="公司" className="italic" />
                  </div>
                  <p className="mt-1 text-slate-700 whitespace-pre-line" style={{ fontSize: '9.5pt' }}>
                    <EditableText value={exp.description} onChange={(v) => updateExperience(exp.id, { description: v })} placeholder="工作描述..." multiline className="w-full" />
                  </p>
                  {exp.techStack && (
                    <div className="mt-1.5 text-slate-600 italic" style={{ fontSize: '9pt' }}>
                      技术栈: {exp.techStack}
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
            <EditableLabel sectionType="education" defaultLabel="教育背景" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <div className="space-y-2">
              {education.map((edu) => (
                <div key={edu.id}>
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-slate-800" style={{ fontSize: '10.5pt' }}>
                      <EditableText value={edu.school} onChange={(v) => updateEducation(edu.id, { school: v })} placeholder="学校" className="font-bold" />
                    </h3>
                    <span className="text-slate-600 italic" style={{ fontSize: '9pt' }}>
                      <EditableText value={`${edu.startDate} - ${edu.current ? '至今' : edu.endDate}`} onChange={(v) => {
                        const dates = v.split('-').map(s => s.trim());
                        updateEducation(edu.id, { startDate: dates[0] || '', endDate: dates[1] || '', current: dates[1]?.includes('至今') || false });
                      }} placeholder="时间" className="italic" />
                    </span>
                  </div>
                  <div className="text-slate-700" style={{ fontSize: '10pt' }}>
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
            <EditableLabel sectionType="projects" defaultLabel="项目经历" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <div className="space-y-3">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="font-bold text-slate-800" style={{ fontSize: '10.5pt' }}>
                    <EditableText value={proj.name} onChange={(v) => updateProject(proj.id, { name: v })} placeholder="项目名称" className="font-bold" />
                  </h3>
                  <p className="mt-1 text-slate-700 whitespace-pre-line" style={{ fontSize: '9.5pt' }}>
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
            <EditableLabel sectionType="skills" defaultLabel="技能" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <p className="text-slate-700" style={{ fontSize: '10pt' }}>
              {skills.map((skill, idx) => (
                <span key={skill.id}>
                  <EditableText value={skill.name} onChange={(v) => updateSkill(skill.id, { name: v })} placeholder="技能" />
                  {idx < skills.length - 1 && ' · '}
                </span>
              ))}
            </p>
          </section>
        );

      case 'languages':
        if (languages.length === 0) return null;
        return (
          <section className="mb-5">
            <EditableLabel sectionType="languages" defaultLabel="语言能力" className="font-serif font-bold text-slate-900 border-b border-slate-300 pb-1 block mb-2" style={{ fontSize: '13pt' }} />
            <div className="space-y-0.5">
              {languages.map((lang) => (
                <div key={lang.id} className="text-slate-700" style={{ fontSize: '10pt' }}>
                  <EditableText value={`${lang.name}: ${lang.level}`} onChange={(v) => {
                    const parts = v.split(':').map(s => s.trim());
                    updateLanguage(lang.id, { name: parts[0] || '', level: parts[1] || '' });
                  }} placeholder="语言: 水平" />
                </div>
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
      className="bg-white shadow-lg font-serif"
      style={{ padding: '20mm', minHeight: '297mm', boxSizing: 'border-box', width: '100%' }}
    >
      {visibleSections.map((section) => (
        <div key={section.id}>{renderSection(section)}</div>
      ))}
    </div>
  );
}
