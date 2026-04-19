# 德国简历 · Germany Resume

> 专为在德国及德语区找工作设计的简历生成器。符合德国 HR 期望的专业布局，支持证件照、A4 PDF 导出、完整德语支持。

![React](https://img.shields.io/badge/React-19-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-6-blue) ![License](https://img.shields.io/badge/License-MIT-green) ![GitHub Pages](https://img.shields.io/badge/部署-GitHub%20Pages-brightgreen)

[English](./README.md)

---

## 📖 关于项目

刚开始申请德国工作时，我发现德国简历有一个非常特定的格式——和我之前习惯的完全不同。德国招聘方通常期望：

- 右上角有一张专业的证件照
- 包含国籍、出生日期等个人信息
- 简洁、结构化的布局（常有侧边栏）
- 内容精炼，控制在 1-2 页

试过几个通用的简历生成工具后，发现它们都不太理解这些德国特有的要求。所以我做了 Germany Resume——一个专门为德国就业市场设计的工具：

- **德语字段名** — Vorname、Nachname、Anschrift 等本地化标签
- **默认 A4 格式** — 不再被 US Letter 搞混
- **照片上传裁剪** — 因为德国简历一定要有照片
- **三语支持** — 用中文写一份，生成中英德三个版本

项目开源免费，希望能帮助更多想去德国工作的人！🇩🇪

---

## 🎯 解决什么问题

申请德国工作时，一份符合当地习惯的简历至关重要：

- 📄 **德国标准布局** — 简洁、结构化的单栏设计，德国 HR 熟悉的格式
- 🖼️ **证件照支持** — 德国简历通常附照片，一键上传裁剪
- 🇩🇪 **德语简历** — 内置德语字段标签，标题、内容、联系方式全德文
- 📐 **A4 尺寸** — 欧洲标准纸张，导出 PDF 自动适配，不变形
- 🌍 **中英德三语** — 用中文写好内容，切换语言即可生成对应版本

---

## ✨ 功能特点

| | |
|---|---|
| 🎨 **所见即所得编辑器** | 左边编辑、右边实时预览，每一步改动即时反映 |
| 🔀 **拖拽排序** | 用鼠标拖动调整各模块顺序 |
| 📤 **一键导出 PDF** | 打印样式优化，导出一张干净的 A4 PDF |
| 💾 **JSON 导入 / 导出** | 数据以 JSON 存储，方便备份或迁移 |
| 🌍 **三语言支持** | 中文 / English / Deutsch 切换，字段标签自动适配 |
| 📝 **中英德三语简历内容** | 一份基础内容，生成三个语言版本 |

---

## 🚀 快速开始

### 安装

```bash
git clone https://github.com/aoda-zhang/germany-resume.git
cd germany-resume
npm install
npm run dev
```

打开 [http://localhost:5173](http://localhost:5173)，开始编辑简历。

### 构建生产版本

```bash
npm run build
npm run preview
```

### 在线使用

```
https://aoda-zhang.github.io/germany-resume/
```

---

## 📁 项目结构

```
src/
├── components/
│   ├── Editor/              # 编辑器主体（左右分栏）
│   │   ├── ResumeWorkspace.tsx
│   │   ├── SectionEditor.tsx
│   │   └── MarkdownEditor.tsx
│   ├── Sections/            # 左侧编辑面板各模块
│   │   ├── SummarySection.tsx
│   │   ├── ExperienceSection.tsx
│   │   ├── EducationSection.tsx
│   │   ├── SkillsSection.tsx
│   │   ├── ProjectsSection.tsx
│   │   ├── LanguagesSection.tsx
│   │   └── InterestsSection.tsx
│   └── Templates/           # 简历模板渲染
│       ├── SingleColumnTemplate/
│       ├── shared/
│       │   ├── SectionRenderers.tsx  # 各条目渲染组件
│       │   ├── templateStyles.ts      # 共享样式常量
│       │   └── useTemplateData.ts    # i18n 数据 hook
│       └── EditableComponents.tsx
├── store/
│   └── resumeStore.ts       # Zustand 全局状态
├── types/
│   └── resume.ts            # TypeScript 类型定义
├── i18n/
│   └── locales/             # zh.json · en.json · de.json
└── utils/
    └── exportPdf.ts         # PDF 导出（window.print）
```

---

## 🛠 技术栈

| | |
|---|---|
| React 19 | UI 框架 |
| TypeScript 6 | 类型安全 |
| Vite 5 | 构建工具 |
| Tailwind CSS 4 | 样式 |
| Zustand 5 | 状态管理 |
| dnd-kit | 拖拽排序 |

---

## 📋 数据格式

简历数据统一存储为 JSON，支持导入 / 导出备份：

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
