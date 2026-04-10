import { EditableText, EditableLabel, useResumeEditing } from './EditableComponents';

export function GermanTemplate() {
  const { resumeData, visibleSections } = useResumeEditing();
  const { personalInfo, experience, education, skills, projects, languages } = resumeData;

  // Helper to format date range
  const formatDate = (start: string, end: string, current: boolean) => {
    if (!start && !end && !current) return '';
    const endText = current ? 'Jetzt' : end || '';
    if (!start) return endText;
    if (!endText) return start;
    return `${start} – ${endText}`;
  };

  return (
    <div className="flex min-h-[1123px] bg-white font-sans" data-resume-preview>
      {/* === 左侧边栏 === */}
      <aside className="w-[280px] flex-shrink-0 bg-[#1a2744] text-white p-6">
        {/* 照片 */}
        <div className="mb-6">
          {personalInfo.photo ? (
            <div className="w-32 h-32 mx-auto rounded-full overflow-hidden border-4 border-white/20">
              <img 
                src={personalInfo.photo} 
                alt={personalInfo.fullName}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div className="w-32 h-32 mx-auto rounded-full bg-[#2d3a5c] border-4 border-white/20 flex items-center justify-center">
              <span className="text-4xl text-white/40">{personalInfo.fullName?.[0] || '?'}</span>
            </div>
          )}
        </div>

        {/* 姓名 & 职位 */}
        <div className="text-center mb-6">
          <EditableText 
            value={personalInfo.fullName} 
            onChange={() => {}} 
            placeholder="姓名"
            className="text-xl font-bold text-white block mb-1" 
          />
          <EditableText 
            value={personalInfo.location} 
            onChange={() => {}} 
            placeholder="职位 / 城市"
            className="text-sm text-white/70 block" 
          />
        </div>

        {/* 联系方式 */}
        <div className="mb-6">
          <EditableLabel 
            sectionType="personal" 
            defaultLabel="KONTAKT" 
            className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 block" 
          />
          <div className="space-y-2">
            {personalInfo.email && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">✉</span>
                <EditableText value={personalInfo.email} onChange={() => {}} placeholder="email" className="text-xs text-white/90" />
              </div>
            )}
            {personalInfo.phone && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">☎</span>
                <EditableText value={personalInfo.phone} onChange={() => {}} placeholder="电话" className="text-xs text-white/90" />
              </div>
            )}
            {personalInfo.location && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">⌖</span>
                <EditableText value={personalInfo.location} onChange={() => {}} placeholder="地址" className="text-xs text-white/90" />
              </div>
            )}
            {personalInfo.linkedin && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">🔗</span>
                <EditableText value={personalInfo.linkedin} onChange={() => {}} placeholder="LinkedIn" className="text-xs text-white/90" />
              </div>
            )}
            {personalInfo.github && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">⌥</span>
                <EditableText value={personalInfo.github} onChange={() => {}} placeholder="GitHub" className="text-xs text-white/90" />
              </div>
            )}
            {personalInfo.website && (
              <div className="flex items-start gap-2">
                <span className="text-white/40 text-xs mt-0.5">⊛</span>
                <EditableText value={personalInfo.website} onChange={() => {}} placeholder="网站" className="text-xs text-white/90" />
              </div>
            )}
          </div>
        </div>

        {/* 专业技能 */}
        {skills.length > 0 && visibleSections.find(s => s.type === 'skills') && (
          <div className="mb-6">
            <EditableLabel 
              sectionType="skills" 
              defaultLabel="FÄHIGKEITEN" 
              className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 block" 
            />
            <div className="space-y-2">
              {skills.map((skill) => (
                <div key={skill.id} className="flex items-center gap-2">
                  <div className="flex-1">
                    <EditableText 
                      value={skill.name} 
                      onChange={() => {}} 
                      placeholder="技能"
                      className="text-xs text-white/90" 
                    />
                  </div>
                  {/* 技能等级条 */}
                  <div className="flex gap-0.5">
                    {[1, 2, 3, 4].map((level) => (
                      <div
                        key={level}
                        className={`w-1.5 h-3 rounded-sm ${
                          (skill.level === 'expert' && level <= 4) ||
                          (skill.level === 'advanced' && level <= 3) ||
                          (skill.level === 'intermediate' && level <= 2) ||
                          (skill.level === 'beginner' && level <= 1)
                            ? 'bg-blue-400'
                            : 'bg-white/20'
                        }`}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 语言能力 */}
        {languages.length > 0 && visibleSections.find(s => s.type === 'languages') && (
          <div className="mb-6">
            <EditableLabel 
              sectionType="languages" 
              defaultLabel="SPRACHEN" 
              className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 block" 
            />
            <div className="space-y-2">
              {languages.map((lang) => (
                <div key={lang.id} className="flex items-center justify-between">
                  <EditableText 
                    value={lang.name} 
                    onChange={() => {}} 
                    placeholder="语言"
                    className="text-xs text-white/90" 
                  />
                  <EditableText 
                    value={lang.level} 
                    onChange={() => {}} 
                    placeholder="水平"
                    className="text-xs text-white/50" 
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 兴趣爱好 */}
        {personalInfo.interests && (
          <div className="mb-6">
            <span className="text-xs font-bold text-white/50 uppercase tracking-widest mb-3 block">
              INTERESSEN
            </span>
            <EditableText 
              value={personalInfo.interests} 
              onChange={() => {}} 
              multiline
              placeholder="兴趣爱好..."
              className="text-xs text-white/70 leading-relaxed" 
            />
          </div>
        )}
      </aside>

      {/* === 右侧主内容 === */}
      <main className="flex-1 bg-white p-8">
        {/* 个人简介 */}
        {personalInfo.summary && visibleSections.find(s => s.type === 'summary') && (
          <section className="mb-8">
            <EditableLabel 
              sectionType="summary" 
              defaultLabel="PROFIL" 
              className="text-sm font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-4 block" 
            />
            <EditableText 
              value={personalInfo.summary} 
              onChange={() => {}} 
              multiline
              placeholder="个人简介..."
              className="text-sm text-slate-600 leading-relaxed" 
            />
          </section>
        )}

        {/* 工作经历 */}
        {experience.length > 0 && visibleSections.find(s => s.type === 'experience') && (
          <section className="mb-8">
            <EditableLabel 
              sectionType="experience" 
              defaultLabel="BERUFSERFAHRUNG" 
              className="text-sm font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-4 block" 
            />
            <div className="space-y-6">
              {experience.map((exp) => (
                <div key={exp.id} className="flex gap-4">
                  {/* 日期 */}
                  <div className="w-28 flex-shrink-0">
                    <EditableText 
                      value={formatDate(exp.startDate, exp.endDate, exp.current)} 
                      onChange={() => {}}
                      placeholder="时间"
                      className="text-xs text-slate-500 leading-tight" 
                    />
                  </div>
                  {/* 内容 */}
                  <div className="flex-1 border-l-2 border-slate-200 pl-4">
                    <h3 className="font-semibold text-slate-800 mb-0.5">
                      <EditableText value={exp.position} onChange={() => {}} placeholder="职位" className="font-semibold text-slate-800" />
                    </h3>
                    <div className="flex items-center gap-2 mb-2">
                      <span className="text-sm text-[#1a2744] font-medium">
                        <EditableText value={exp.company} onChange={() => {}} placeholder="公司" className="text-[#1a2744] font-medium" />
                      </span>
                      {exp.location && (
                        <span className="text-xs text-slate-400">
                          · <EditableText value={exp.location} onChange={() => {}} placeholder="地点" className="text-slate-400 text-xs" />
                        </span>
                      )}
                    </div>
                    {exp.techStack && (
                      <div className="mb-2">
                        <EditableText 
                          value={exp.techStack} 
                          onChange={() => {}} 
                          placeholder="技术栈"
                          className="text-xs text-slate-400" 
                        />
                      </div>
                    )}
                    <EditableText 
                      value={exp.description} 
                      onChange={() => {}} 
                      multiline
                      placeholder="工作描述..."
                      className="text-sm text-slate-600 leading-relaxed whitespace-pre-line" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 项目经历 */}
        {projects.length > 0 && visibleSections.find(s => s.type === 'projects') && (
          <section className="mb-8">
            <EditableLabel 
              sectionType="projects" 
              defaultLabel="PROJEKTE" 
              className="text-sm font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-4 block" 
            />
            <div className="space-y-5">
              {projects.map((proj) => (
                <div key={proj.id} className="flex gap-4">
                  <div className="w-28 flex-shrink-0">
                    {proj.technologies && proj.technologies.length > 0 && (
                      <div className="text-xs text-slate-400 leading-tight">
                        {proj.technologies.slice(0, 3).join(', ')}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 border-l-2 border-slate-200 pl-4">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className="font-semibold text-slate-800">
                        <EditableText value={proj.name} onChange={() => {}} placeholder="项目名称" className="font-semibold text-slate-800" />
                      </h3>
                      {proj.link && (
                        <EditableText 
                          value={proj.link} 
                          onChange={() => {}} 
                          placeholder="链接"
                          className="text-xs text-[#1a2744] ml-2" 
                        />
                      )}
                    </div>
                    <EditableText 
                      value={proj.description} 
                      onChange={() => {}} 
                      multiline
                      placeholder="项目描述..."
                      className="text-sm text-slate-600 leading-relaxed" 
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* 教育背景 */}
        {education.length > 0 && visibleSections.find(s => s.type === 'education') && (
          <section className="mb-8">
            <EditableLabel 
              sectionType="education" 
              defaultLabel="AUSBILDUNG" 
              className="text-sm font-bold text-[#1a2744] border-b-2 border-[#1a2744] pb-1 mb-4 block" 
            />
            <div className="space-y-5">
              {education.map((edu) => (
                <div key={edu.id} className="flex gap-4">
                  <div className="w-28 flex-shrink-0">
                    <EditableText 
                      value={formatDate(edu.startDate, edu.endDate, edu.current)} 
                      onChange={() => {}}
                      placeholder="时间"
                      className="text-xs text-slate-500 leading-tight" 
                    />
                  </div>
                  <div className="flex-1 border-l-2 border-slate-200 pl-4">
                    <h3 className="font-semibold text-slate-800 mb-0.5">
                      <EditableText value={edu.school} onChange={() => {}} placeholder="学校" className="font-semibold text-slate-800" />
                    </h3>
                    {(edu.degree || edu.field) && (
                      <p className="text-sm text-slate-600">
                        <EditableText value={edu.degree} onChange={() => {}} placeholder="学位" className="text-slate-600" />
                        {edu.degree && edu.field && ' · '}
                        <EditableText value={edu.field} onChange={() => {}} placeholder="专业" className="text-slate-600" />
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
