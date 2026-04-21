# Germany Resume

> A resume builder designed for job seekers targeting Germany and the DACH region. Built with German HR expectations in mind — professional layout, photo support, A4 PDF export, and full German language support.

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![GitHub Pages](https://img.shields.io/badge/Deploy-GitHub%20Pages-brightgreen)

[中文文档](./README_CN.md)

---

## 📖 About

When I started applying for jobs in Germany, I quickly realized that German CVs follow a very specific format — one that's quite different from what I was used to. German recruiters expect:

- A professional photo in the top corner
- Personal details like nationality and date of birth
- A clean, structured layout (often with a sidebar)
- Concise content that fits on 1-2 pages

After struggling with generic resume builders that didn't understand these requirements, I built Germany Resume. It's a tool designed specifically for the German job market, with:

- **Localized field names** in German (Vorname, Nachname, Anschrift, etc.)
- **A4 format** by default — no more US Letter confusion
- **Photo upload with crop** — because German CVs need that photo
- **Trilingual support** — write once in Chinese, generate English and German versions

This project is open source and free to use. I hope it helps others on their journey to work in Germany! 🇩🇪

---

## 🎯 Why This Project

When applying for jobs in Germany, a resume that matches local expectations makes a big difference:

- 📄 **German-standard layout** — Clean, structured single-column design that German recruiters expect
- 🖼️ **Photo support** — German CVs typically include a professional photo; upload and crop with one click
- 🇩🇪 **German language** — Built-in German labels and field names; generate a full German Lebenslauf
- 📐 **A4 format** — European standard paper size; exported PDFs are print-ready
- 🌍 **Trilingual** — Chinese / English / German — write once, generate all three versions

---

## ✨ Features

| | |
|---|---|
| 🎨 **Live Editor** | Split-pane layout: edit on the left, preview on the right |
| 🔀 **Drag & Drop** | Reorder sections by dragging in the sidebar |
| 📤 **One-click PDF** | Clean print styles, A4-ready export |
| 💾 **JSON Import/Export** | Backup your data or migrate easily |
| 🌍 **Multi-language** | Interface in Chinese / English / German; field labels auto-adapt |
| 📝 **Trilingual Content** | Write your content once, switch languages to generate different versions |

---

## 🚀 Quick Start

### Install & Run

```bash
git clone https://github.com/aoda-zhang/germany-resume.git
cd germany-resume
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to start editing.

### Build for Production

```bash
npm run build
npm run preview
```

### Use Online

```
https://aoda-zhang.github.io/germany-resume/
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── Editor/              # Main editor (split-pane)
│   │   ├── ResumeWorkspace.tsx
│   │   ├── SectionEditor.tsx
│   │   └── MarkdownEditor.tsx
│   ├── Sections/            # Sidebar editing panels
│   │   ├── SummarySection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── LanguagesSection.tsx
│   │   └── InterestsSection.tsx
│   └── Templates/           # Resume rendering
│       ├── SingleColumnTemplate/
│       ├── shared/
│       │   ├── SectionRenderers.tsx
│       │   ├── templateStyles.ts
│       │   └── useTemplateData.ts
│       └── EditableComponents.tsx
├── store/
│   └── resumeStore.ts       # Zustand state
├── types/
│   └── resume.ts            # TypeScript types
├── i18n/
│   └── locales/             # zh.json · en.json · de.json
└── utils/
    └── exportPdf.ts         # PDF export (window.print)
```

---

## 🛠 Tech Stack

| | |
|---|---|
| React 19 | UI framework |
| TypeScript 6 | Type safety |
| Vite 5 | Build tool |
| Tailwind CSS 4 | Styling |
| Zustand 5 | State management |
| dnd-kit | Drag and drop |

---

## 📋 Data Format

Resume data is stored as JSON, supporting import/export for backup:

```typescript
interface ResumeData {
  personalInfo: {
    fullName: string;
    title?: string;
    email: string;
    phone: string;
    address: string;
    linkedin?: string;
    website?: string;
    github?: string;
    photo?: string;
    nationality?: string;
  };
  summary: string;
  interests: string;
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
    address?: string;
    techStack?: string;
    country?: string;
    workMode?: string;
  }>;
  education: Array<{
    id: string;
    school: string;
    degree: string;
    field: string;
    startDate: string;
    endDate?: string;
    current: boolean;
  }>;
  skills: Array<{ id: string; name: string }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string[];
  }>;
  languages: Array<{
    id: string;
    name: string;
    level: string;
  }>;
}
```

---

## 📜 License

MIT
