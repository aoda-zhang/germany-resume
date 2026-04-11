import type { Language } from '../types/resume';

export interface I18n {
  header: {
    fillSample: string;
    clear: string;
    exportPdf: string;
    exportImage: string;
    template: string;
  };
  template: {
    modern: string;
    classic: string;
    minimal: string;
    german: string;
  };
  sections: {
    personalInfo: string;
    summary: string;
    experience: string;
    education: string;
    skills: string;
    projects: string;
    languages: string;
  };
}

export const translations: Record<Language, I18n> = {
  zh: {
    header: {
      fillSample: '填充示例',
      clear: '清空',
      exportPdf: '导出 PDF',
      exportImage: '导出图片',
      template: '模板',
    },
    template: {
      modern: '现代',
      classic: '经典',
      minimal: '简约',
      german: '德式',
    },
    sections: {
      personalInfo: '个人信息',
      summary: '个人简介',
      experience: '工作经验',
      education: '教育背景',
      skills: '技能',
      projects: '项目',
      languages: '语言',
    },
  },
  en: {
    header: {
      fillSample: 'Fill Sample',
      clear: 'Clear',
      exportPdf: 'Export PDF',
      exportImage: 'Export Image',
      template: 'Template',
    },
    template: {
      modern: 'Modern',
      classic: 'Classic',
      minimal: 'Minimal',
      german: 'German',
    },
    sections: {
      personalInfo: 'Personal Info',
      summary: 'Summary',
      experience: 'Experience',
      education: 'Education',
      skills: 'Skills',
      projects: 'Projects',
      languages: 'Languages',
    },
  },
  de: {
    header: {
      fillSample: 'Beispiel',
      clear: 'Leeren',
      exportPdf: 'PDF Export',
      exportImage: 'Bild Export',
      template: 'Vorlage',
    },
    template: {
      modern: 'Modern',
      classic: 'Klassisch',
      minimal: 'Minimal',
      german: 'Deutsch',
    },
    sections: {
      personalInfo: 'Persönliche Daten',
      summary: 'Zusammenfassung',
      experience: 'Berufserfahrung',
      education: 'Bildung',
      skills: 'Fähigkeiten',
      projects: 'Projekte',
      languages: 'Sprachen',
    },
  },
};
