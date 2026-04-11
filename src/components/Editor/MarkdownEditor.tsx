import { useResumeStore } from '../../store/resumeStore';
import { useEffect, useCallback } from 'react';
import { translations } from '../../i18n';

export function MarkdownEditor() {
  const { markdownContent, updateMarkdown, syncFromMarkdown, language } = useResumeStore();
  const t = translations[language].header;

  useEffect(() => {
    const timer = setTimeout(() => {
      syncFromMarkdown();
    }, 500);
    return () => clearTimeout(timer);
  }, [markdownContent, syncFromMarkdown]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateMarkdown(e.target.value);
  }, [updateMarkdown]);

  const tPlaceholder = `# Name

Email | Phone | Address

## Summary

Brief description of your professional background and strengths...

## Experience

### Position
**Company** | 2020-01 - Present

Description of your role and achievements...

## Education

### Degree
**School** | Major | 2016-09 - 2020-06

## Skills

- **React**: Expert
- **TypeScript**: Proficient

## Projects

### Project Name
Description and your contributions...

Tech Stack: React, TypeScript

## Languages

- English: Fluent
- Chinese: Native`;

  return (
    <div className="h-full flex flex-col bg-slate-50">
      <div className="px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-slate-700">{t.markdown}</h2>
          <span className="text-xs text-slate-500">{t.visual}</span>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-auto">
        <textarea
          value={markdownContent}
          onChange={handleChange}
          className="w-full h-full min-h-[500px] p-4 font-mono text-sm bg-white border border-slate-200 rounded-lg resize-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder={tPlaceholder}
          spellCheck={false}
        />
      </div>

      <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 text-xs text-slate-500">
        Supports standard Markdown syntax · Changes sync to preview automatically
      </div>
    </div>
  );
}
