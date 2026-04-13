/**
 * Shared style constants for templates.
 * Keeps typography and spacing in one place so all templates stay consistent.
 */

export const baseFontFamily = "font-sans";

export const defaultFontSizes = {
  name: "20pt",
  title: "13pt",
  sectionTitle: "12pt",
  body: "10pt",
  caption: "9pt",
  xs: "8pt",
} as const;

export const defaultColors = {
  name: "text-slate-900",
  title: "text-slate-800",
  sectionBorder: "border-sky-600",
  sectionBorderSubtle: "border-slate-300",
  muted: "text-slate-600",
  mutedLight: "text-slate-500",
} as const;

// ---------------------------------------------------------------------------
// Single-column template styles
// ---------------------------------------------------------------------------
export const singleColumnStyles = {
  padding: "80px",
  name: { fontSize: "20pt" },
  title: { fontSize: "13pt" },
  sectionTitle: { fontSize: "12pt" },
  contact: { fontSize: "10pt" },
  date: { fontSize: "10pt" },
  position: { fontSize: "11pt" },
  company: { fontSize: "10pt" },
  body: { fontSize: "10pt" },
  school: { fontSize: "11pt" },
  field: { fontSize: "10pt" },
  projectName: { fontSize: "11pt" },
  language: { fontSize: "11pt" },
  label: "font-bold text-slate-900 border-b-2 border-sky-600 pb-1 block mb-3",
};

// ---------------------------------------------------------------------------
// Two-column template styles (sidebar + main)
// ---------------------------------------------------------------------------
export const twoColumnStyles = {
  sidebarWidth: "30%",
  mainWidth: "70%",
  sidebarPadding: "40px 24px",
  mainPadding: "40px 32px",
  photoSize: 100,
  name: { fontSize: "18pt" },
  title: { fontSize: "12pt" },
  sectionTitle: { fontSize: "11pt" },
  contactLabel: { fontSize: "8pt", fontWeight: 600 as const },
  contactValue: { fontSize: "9pt" },
  date: { fontSize: "9pt" },
  position: { fontSize: "10pt" },
  company: { fontSize: "9pt" },
  body: { fontSize: "9pt" },
  school: { fontSize: "9pt" },
  field: { fontSize: "10pt" },
  projectName: { fontSize: "10pt" },
  language: { fontSize: "10pt" },
  label: "font-bold text-slate-900 border-b border-slate-300 pb-1 mb-2 block",
};
