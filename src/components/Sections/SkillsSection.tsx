import type { Skill } from '../../types/resume';
import { Plus, Trash2, GripVertical } from 'lucide-react';
import { useState, useRef } from 'react';
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

  // Track the last used category for new items
  const [lastCategory, setLastCategory] = useState<string>('');

  // Group skills by category, use stable IDs as keys (first skill's id in each group)
  const groups: { id: string; cat: string; skills: Skill[] }[] = [];
  const catMap: Record<string, number> = {};
  data.forEach(skill => {
    const cat = skill.category?.trim() || t.uncategorized || 'Other';
    if (catMap[cat] === undefined) {
      catMap[cat] = groups.length;
      groups.push({ id: skill.id, cat, skills: [skill] });
    } else {
      groups[catMap[cat]].skills.push(skill);
    }
  });

  const addItem = (category?: string) => {
    const targetCat = category || lastCategory || t.uncategorized || 'Other';
    const newItem: Skill = {
      id: `skill_${Date.now()}`,
      name: '',
      level: 'intermediate',
      category: targetCat,
    };
    onChange([...data, newItem]);
    setLastCategory(targetCat);
  };

  const updateItem = (id: string, field: keyof Skill, value: any) => {
    if (field === 'category') setLastCategory(value);
    onChange(data.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  // Drag and drop reordering within each group
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);
  const dragItemRef = useRef<{ group: string; index: number } | null>(null);

  const handleDragStart = (e: React.DragEvent, groupId: string, index: number) => {
    setDraggedId((e.target as HTMLElement).closest('[data-skill-id]')?.getAttribute('data-skill-id'));
    dragItemRef.current = { groupId, index };
    e.dataTransfer.effectAllowed = 'move';
  };

  const handleDragOver = (e: React.DragEvent, skillId: string) => {
    e.preventDefault();
    setDragOverId(skillId);
  };

  const handleDrop = (e: React.DragEvent, targetGroupId: string, targetIndex: number) => {
    e.preventDefault();
    if (!dragItemRef.current) return;

    const { groupId: srcGroupId, index: srcIndex } = dragItemRef.current;
    const srcGroup = groups.find(g => g.id === srcGroupId);
    const tgtGroup = groups.find(g => g.id === targetGroupId);
    if (!srcGroup || !tgtGroup) return;

    const [movedItem] = srcGroup.skills.splice(srcIndex, 1);
    tgtGroup.skills.splice(targetIndex, 0, movedItem);

    // Rebuild data from groups preserving order
    const newData: Skill[] = groups.flatMap(g => g.skills);
    onChange(newData);

    setDraggedId(null);
    setDragOverId(null);
    dragItemRef.current = null;
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
    dragItemRef.current = null;
  };

  const uncategorizedLabel = t.uncategorized || 'Other';

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">{tEditor.skills}</h3>
        <button
          onClick={() => addItem()}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          {t.add}
        </button>
      </div>

      {data.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <p>{tEditor.add}</p>
          <button onClick={() => addItem()} className="mt-2 text-indigo-600 hover:text-indigo-700">+ {t.add}</button>
        </div>
      ) : (
        <div className="space-y-6">
          {groups.map((group) => {
            const isUncategorized = group.cat === uncategorizedLabel;
            return (
              <div key={group.id}>
                {/* Category header */}
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wide">
                    {isUncategorized ? tEditor.skills : group.cat}
                  </h4>
                  <span className="text-slate-400 text-xs">({group.skills.length})</span>
                </div>

                {/* Skills in this group */}
                <div className="space-y-2">
                  {group.skills.map((item, idx) => (
                    <div
                      key={item.id}
                      data-skill-id={item.id}
                      draggable
                      onDragStart={(e) => handleDragStart(e, group.id, idx)}
                      onDragOver={(e) => handleDragOver(e, item.id)}
                      onDrop={(e) => handleDrop(e, group.id, idx)}
                      onDragEnd={handleDragEnd}
                      className={`flex items-center gap-2 p-2 bg-white border rounded-lg ${
                        draggedId === item.id ? 'opacity-50' : ''
                      } ${dragOverId === item.id ? 'border-indigo-500 bg-indigo-50' : 'border-slate-200'}`}
                    >
                      <GripVertical className="w-4 h-4 text-slate-300 cursor-grab" />
                      <input
                        type="text"
                        value={item.category || ''}
                        onChange={(e) => updateItem(item.id, 'category', e.target.value)}
                        className="w-40 px-2 py-1.5 text-sm border border-slate-300 rounded focus:ring-1 focus:ring-indigo-500"
                        placeholder={t.category}
                      />
                      <input
                        type="text"
                        value={item.name}
                        onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                        className="flex-1 px-3 py-1.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 text-sm"
                        placeholder={t.skillName}
                      />
                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-1.5 text-red-400 hover:text-red-600"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Add to this group */}
                <button
                  onClick={() => addItem(group.cat)}
                  className="mt-2 w-full py-1 text-xs text-indigo-500 hover:text-indigo-700 border border-dashed border-indigo-200 rounded"
                >
                  + {t.add} {isUncategorized ? tEditor.skills : group.cat}
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}