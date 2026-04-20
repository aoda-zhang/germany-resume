/**
 * Single-column layout: languages section (inline, comma-separated).
 */
import { EditableText } from "../EditableComponents";
import { singleColumnStyles as s } from "../shared/templateStyles";

interface Language {
  id: string;
  name: string;
  level: string;
}

interface LanguagesSectionProps {
  languages: Language[];
  onUpdate: (id: string, data: Partial<Language>) => void;
}

/** Checks if a level is a "mother tongue" type label (no CEFR code) */
function isMotherTongue(level: string): boolean {
  const noParens = ["mother tongue", "native", "native speaker", "native language"];
  return noParens.some((l) => level.toLowerCase().includes(l.toLowerCase()));
}

export function LanguagesSection({
  languages,
  onUpdate,
}: LanguagesSectionProps) {
  if (languages.length === 0) return null;

  return (
    <div className="text-slate-900" style={s.body}>
      {languages.map((lang, idx) => {
        const isMT = isMotherTongue(lang.level);
        const showComma = idx < languages.length - 1;

        return (
          <span key={lang.id}>
            <EditableText
              value={lang.name}
              onChange={(v) => onUpdate(lang.id, { name: v })}
              placeholder="Language"
              className="font-medium"
            />
            <span>&nbsp;(</span>
            <EditableText
              value={isMT ? "Mother Tongue" : lang.level}
              onChange={(v) => onUpdate(lang.id, { level: v })}
              placeholder="Level"
            />
            <span>)</span>
            {showComma && <span>,&nbsp;</span>}
          </span>
        );
      })}
    </div>
  );
}
