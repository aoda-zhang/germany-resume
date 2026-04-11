# Super Resume

A modern, open-source resume builder with real-time visual editing, multiple professional templates, and export capabilities.

## Features

- **Visual Editor** - Edit resume content directly with an intuitive interface
- **Drag & Drop** - Reorder sections by dragging
- **Multiple Templates** - Modern, Classic, Minimal, and German-style layouts
- **Multi-language** - Supports Chinese, English, and German
- **Real-time Preview** - See changes instantly
- **Export Options** - Export to PDF or image
- **JSON Import/Export** - Paste or edit raw JSON data

## Templates

### Modern
Clean, professional design with a colored header and skills badges.

### Classic
Traditional serif typography with centered header.

### Minimal
Lightweight layout with subtle typography.

### German
Two-column timeline style with section underlines - ideal for European CVs.

## Getting Started

### Prerequisites

- Node.js 18+
- npm or pnpm

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Editor/           # Main workspace components
│   │   ├── ResumeWorkspace.tsx
│   │   ├── SectionEditor.tsx
│   │   └── MarkdownEditor.tsx
│   ├── Sections/         # Editable section components
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   └── ...
│   └── Templates/        # Resume template components
│       ├── ModernTemplate.tsx
│       ├── ClassicTemplate.tsx
│       ├── MinimalTemplate.tsx
│       ├── GermanTemplate.tsx
│       └── EditableComponents.tsx
├── store/
│   └── resumeStore.ts    # Zustand state management
├── types/
│   └── resume.ts         # TypeScript interfaces
├── utils/
│   ├── exportPdf.ts      # PDF generation
│   └── exportImage.ts     # Image export
└── i18n/
    └── index.ts          # Internationalization
```

## Data Format

Resume data is stored in JSON format with the following structure:

```typescript
interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    title?: string;
    linkedin?: string;
    website?: string;
    github?: string;
    summary?: string;
    nationality?: string;
  };
  experience: Array<{
    id: string;
    company: string;
    position: string;
    startDate: string;
    endDate: string;
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
    endDate: string;
    current: boolean;
  }>;
  skills: Array<{
    id: string;
    name: string;
  }>;
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

## Tech Stack

- **React 19** - UI framework
- **TypeScript** - Type safety
- **Vite** - Build tool
- **Tailwind CSS** - Styling
- **Zustand** - State management
- **dnd-kit** - Drag and drop
- **html2canvas + jsPDF** - PDF export

## License

MIT
