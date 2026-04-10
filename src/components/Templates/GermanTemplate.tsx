import { EditableText, EditableLabel, useResumeEditing } from './EditableComponents';

// 德国简历 - 待重新设计

export function GermanTemplate() {
  const { resumeData } = useResumeEditing();
  const { personalInfo } = resumeData;

  return (
    <div className="bg-white font-sans p-8" data-resume-preview>
      <div className="text-center text-slate-400 py-20">
        <p>德式简历模板 - 待设计</p>
        <p className="text-sm mt-2">请提供设计要求</p>
      </div>
    </div>
  );
}
