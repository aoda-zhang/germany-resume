import type { Skill } from '../../types/resume';
import { Plus, Trash2, ChevronDown, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { translations } from '../../i18n';

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

export function SkillsSection({ data, onChange }: Props) {
  const language = useResumeStore((s) => s.language);
  const t = translations[language].form;
  const tEditor = translations[language].editor;

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set(['__all__']));

  const levelOptions = [
    { value: 'beginner', label: t.beginner },
    { value: 'intermediate', label: t.intermediate },
    { value: 'advanced', label: t.advanced },
    { value: 'expert', label: t.expert },
  ];

  // Group skills by category
  const groups: Record<string, Skill[]> = {};
  data.forEach(skill => {
    const cat = skill.category?.trim() || t.uncategorized || 'Other';
    if (!groups[cat]) groups[cat] = [];
    groups[cat].push(skill);
  });

  const toggleGroup = (cat: string) => {
    setExpandedGroups(prev => {
      const next = new Set(prev);
      if (next.has(cat)) next.delete(cat);
      else next.add(cat);
      return next;
    });
  };

  const addItem = (category?: string) => {
    const newItem: Skill = {
      id: `skill_${Date.now()}`,
      name: '',
      level: 'intermediate',
      category: category || '',
    };
    onChange([...data, newItem]);
    // Auto-expand the group this was added to
    if (category) setExpandedGroups(prev => new Set([...prev, category]));
  };

  const updateItem = (id: string, field: keyof Skill, value: any) => {
    onChange(data.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  const moveItem = (id: string, direction: 'up' | 'down') => {
    const idx = data.findIndex(s => s.id === id);
    if (idx < 0) return;
    const newIdx = direction === 'up' ? idx - 1 : idx + 1;
    if (newIdx < 0 || newIdx >= data.length) return;
    const newData = [...data];
    [newData[idx], newData[newIdx]] = [newData[newIdx], newData[idx]];
    onChange(newData);
  };

  const hasCategories = Object.keys(groups).some(cat => cat !== (t.uncategorized || 'Other'));

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">{tEditor.skills}</h3>
        <div className="flex gap-2">
          <button
            onClick={() => addItem('')}
            className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
          >
            <Plus className="w-4 h-4" />
            {t.add}
          </button>
        </div>
      </div>

      {/* Grouped view */}
      {hasCategories && Object.entries(groups).map(([cat, skills]) => {
        const isExpanded = expandedGroups.has(cat) || expandedGroups.has('__all__');
        const isRealGroup = cat !== (t.uncategorized || 'Other');

        return (
          <div key={cat} className="border border-slate-200 rounded-lg overflow-hidden">
            {/* Group header */}
            <button
              onClick={() => toggleGroup(cat)}
              className="w-full flex items-center gap-2 px-3 py-2 bg-slate-50 hover:bg-slate-100 text-left"
            >
              {isRealGroup ? (
                <>
                  {isExpanded
                    ? <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                    : <ChevronRight className="w-4 h-4 text-slate-400 shrink-0" />
                  }
                  <span className="font-medium text-slate-700 text-sm">{cat}</span>
                  <span className="text-slate-400 text-xs">({skills.length})</span>
                </>
              ) : (
                <span className="text-slate-400 text-sm">{tEditor.skills}</span>
              )}
            </button>

            {/* Group items */}
            {(isExpanded || !isRealGroup) && (
              <div className="p-3 space-y-2">
                {skills.map((item) => (
                  <SkillRow
                    key={item.id}
                    item={item}
                    levelOptions={levelOptions}
                    onUpdate={updateItem}
                    onRemove={removeItem}
                    onMove={moveItem}
                    showCategory={false}
                  />
                ))}
                {isRealGroup && (
                  <button
                    onClick={() => addItem(cat)}
                    className="w-full py-1 text-xs text-indigo-500 hover:text-indigo-700 border border-dashed border-indigo-200 rounded mt-1"
                  >
                    + {t.add} {cat}
                  </button>
                )}
              </div>
            )}
          </div>
        );
      })}

      {/* Flat list for uncategorized / no groups */}
      {!hasCategories && data.length === 0 && (
        <div className="text-center py-6 text-slate-400">
          <p>{tEditor.add}</p>
          <button onClick={() => addItem()} className="mt-2 text-indigo-600 hover:text-indigo-700">+ {t.add}</button>
        </div>
      )}

      {/* Fallback: flat list when no categories used yet */}
      {!hasCategories && data.map((item) => (
        <SkillRow
          key={item.id}
          item={item}
          levelOptions={levelOptions}
          onUpdate={updateItem}
          onRemove={removeItem}
          onMove={moveItem}
          showCategory={true}
        />
      ))}
    </div>
  );
}

// ── Sub-component ──────────────────────────────────────────────────────────────
interface SkillRowProps {
  item: Skill;
  levelOptions: { value: string; label: string }[];
  onUpdate: (id: string, field: keyof Skill, value: any) => void;
  onRemove: (id: string) => void;
  onMove: (id: string, dir: 'up' | 'down') => void;
  showCategory: boolean;
}

function SkillRow({ item, levelOptions, onUpdate, onRemove, onMove, showCategory }: SkillRowProps) {
  const language = useResumeStore((s) => s.language);
  const t = translations[language].form;

  return (
    <div className="flex items-center gap-2">
      {showCategory && (
        <input
          type="text"
          value={item.category || ''}
          onChange={(e) => onUpdate(item.id, 'category', e.target.value)}
          className="w-24 px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
          placeholder={t.category}
        />
      )}
      <input
        type="text"
        value={item.name}
        onChange={(e) => onUpdate(item.id, 'name', e.target.value)}
        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
        placeholder={t.skillName}
      />
      <select
        value={item.level}
        onChange={(e) => onUpdate(item.id, 'level', e.target.value)}
        className="px-2 py-1.5 border border-slate-300 rounded-lg focus:ring-1 focus:ring-indigo-500 text-sm"
      >
        {levelOptions.map(opt => (
          <option key={opt.value} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      <button onClick={() => onMove(item.id, 'up')} className="p-1 text-slate-400 hover:text-slate-600 text-xs">↑</button>
      <button onClick={() => onMove(item.id, 'down')} className="p-1 text-slate-400 hover:text-slate-600 text-xs">↓</button>
      <button onClick={() => onRemove(item.id)} className="p-1.5 text-red-400 hover:text-red-600">
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );
}
