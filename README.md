# Super Resume

> A modern, open-source resume builder with real-time visual editing, multiple professional templates, and one-click PDF export.

![Preview](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![License](https://img.shields.io/badge/License-MIT-green)

## ✨ Features

- 🎨 **Visual Editor** — Edit resume content directly with a live split-pane preview
- 🔀 **Drag & Drop** — Reorder any section by dragging it in the sidebar
- 🌍 **Multi-language** — Full support for Chinese, English, and German resumes
- 📄 **Multiple Templates** — Single-column and two-column professional layouts
- 📱 **Real-time Preview** — See every keystroke reflected instantly on the right
- 📤 **One-click Export** — Export polished PDF with clean print styles
- 💾 **JSON Import/Export** — Paste or download raw JSON data for backup/integration

## 🎯 Templates

### Single Column
Classic two-row layout: photo and contact on top, flowing content sections below.

### Two Column
Left sidebar with personal info, photo, and skills; right main area with experience timeline — ideal for European CVs.

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Install & Run

```bash
git clone https://github.com/aoda-zhang/super-resume.git
cd super-resume
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build for Production

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
src/
├── components/
│   ├── Editor/              # Main workspace (split-pane layout)
│   │   ├── ResumeWorkspace.tsx
│   │   ├── SectionEditor.tsx   # Sidebar section list & controls
│   │   └── MarkdownEditor.tsx
│   ├── Sections/            # Editable section components (sidebar)
│   │   ├── SummarySection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── LanguagesSection.tsx
│   │   └── InterestsSection.tsx
│   └── Templates/           # Resume rendering templates
│       ├── SingleColumnTemplate/
│       │   ├── PersonalSection.tsx
│       │   ├── SummarySection.tsx
│       │   ├── ExperienceSection.tsx
│       │   ├── EducationSection.tsx
│       │   ├── SkillsSection.tsx
│       │   ├── ProjectsSection.tsx
│       │   ├── LanguagesSection.tsx
│       │   └── InterestsSection.tsx
│       ├── shared/
│       │   ├── SectionRenderers.tsx   # Reusable entry components
│       │   └── templateStyles.ts      # Shared style constants
│       └── EditableComponents.tsx     # Editable text wrapper
├── store/
│   └── resumeStore.ts       # Zustand global state
├── types/
│   └── resume.ts            # TypeScript interfaces
├── i18n/
│   └── locales/             # zh.json · en.json · de.json
└── utils/
    └── exportPdf.ts         # window.print() based PDF export
```

## 📋 Data Format

All resume data is stored as a single JSON object. You can export it for backup or import it elsewhere.

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
    summary?: string;
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

## 🛠 Tech Stack

| | |
|---|---|
| **React 19** | UI framework |
| **TypeScript 6** | Type safety |
| **Vite 5** | Build tool |
| **Tailwind CSS 4** | Styling |
| **Zustand 5** | State management |
| **dnd-kit** | Drag and drop |
| **window.print() + CSS @media print** | PDF export (zero bundle bloat) |

## 🌐 Deployment

This project is deployed via GitHub Actions to **GitHub Pages**:

```
https://aoda-zhang.github.io/super-resume/
```

## 📜 License

MIT
