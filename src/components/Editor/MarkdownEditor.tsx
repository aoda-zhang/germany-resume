import { useResumeStore } from '../../store/resumeStore';
import { useEffect, useCallback } from 'react';

export function MarkdownEditor() {
  const { markdownContent, updateMarkdown, syncFromMarkdown } = useResumeStore();

  // Debounced sync
  useEffect(() => {
    const timer = setTimeout(() => {
      syncFromMarkdown();
    }, 500);
    return () => clearTimeout(timer);
  }, [markdownContent, syncFromMarkdown]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMarkdown(e.target.value);
  }, [updateMarkdown]);

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">Markdown Edit</h2>
          <span className="text-xs text-slate-500">In real-time preview</span>
        </div>
      </div>
      
      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={markdownContent}
          onChange={handleChange}
          className="w-full h-full min-h-[500px] p-4 font-mono text-sm bg-white border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={`# Name

Email | Phone | Location

## Summary

BriefDescriptionYour professional backgroundandstrengths...

## Experience

### TitleName
**CompanyName** | 2020-01 - Present

WorkDescription...

## Education

### Degree
**SchoolName** | Field | 2016-09 - 2020-06

## Skills

- **SkillsName**: Expert
- **SkillsName**: Proficient

## ProjectsExperience

### ProjectsName
ProjectsDescription...

Tech Stack: React, TypeScript

## LanguagesSkills

- Chinese: Native
- English: Fluent`}
          spellCheck={false}
        />
      </div>
      
      <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        Supports standard Markdown syntax，Changes will sync to preview automatically
      </div>
    </div>
  );
}
