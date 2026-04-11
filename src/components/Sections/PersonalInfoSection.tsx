import { useState } from 'react';
import type { PersonalInfo } from '../../types/resume';
import { Trash2, Upload } from 'lucide-react';
import { useResumeStore } from '../../store/resumeStore';
import { translations } from '../../i18n';

interface Props {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
  isEditing?: boolean;
}

export function PersonalInfoSection({ data, onChange, isEditing = true }: Props) {
  const language = useResumeStore((s) => s.language);
  const t = translations[language].form;
  const tEditor = translations[language].editor;
  const [photoPreview, setPhotoPreview] = useState<string | null>(data.photo || null);

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        setPhotoPreview(base64);
        onChange({ ...data, photo: base64 });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
  };

  if (!isEditing) {
    return (
      <div className="text-slate-400 text-center py-8">
        {tEditor.personalInfo}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">{tEditor.personalInfo}</h3>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.name}</label>
          <input
            type="text"
            value={data.fullName}
            onChange={(e) => handleChange('fullName', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.name}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.title}</label>
          <input
            type="text"
            value={data.title || ''}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.title}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.email}</label>
          <input
            type="email"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.email}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.phone}</label>
          <input
            type="tel"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.phone}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.address}</label>
          <input
            type="text"
            value={data.address}
            onChange={(e) => handleChange('address', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.address}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.github}</label>
          <input
            type="text"
            value={data.github || ''}
            onChange={(e) => handleChange('github', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.github}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.linkedin}</label>
          <input
            type="text"
            value={data.linkedin || ''}
            onChange={(e) => handleChange('linkedin', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.linkedin}
          />
        </div>
        <div>
          <label className="block text-sm text-slate-600 mb-1">{t.website}</label>
          <input
            type="text"
            value={data.website || ''}
            onChange={(e) => handleChange('website', e.target.value)}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            placeholder={t.website}
          />
        </div>
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-1">{tEditor.summary}</label>
        <textarea
          value={data.summary || ''}
          onChange={(e) => handleChange('summary', e.target.value)}
          rows={4}
          className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={t.summaryPlaceholder}
        />
      </div>

      <div>
        <label className="block text-sm text-slate-600 mb-2">{t.avatar}</label>
        <div className="flex items-center gap-4">
          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-slate-200 bg-slate-100">
            {photoPreview ? (
              <img src={photoPreview} alt={t.avatar} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-slate-400">
                <Upload className="w-8 h-8" />
              </div>
            )}
          </div>
          <label className="px-4 py-2 bg-indigo-600 text-white rounded-lg cursor-pointer hover:bg-indigo-700 transition-colors">
            <span className="text-sm">{t.avatar}</span>
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden"
            />
          </label>
          {photoPreview && (
            <button
              onClick={() => {
                setPhotoPreview(null);
                onChange({ ...data, photo: undefined });
              }}
              className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
