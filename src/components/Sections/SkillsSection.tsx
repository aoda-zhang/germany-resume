import type { Skill } from '../../types/resume';
import { Plus, Trash2, Pencil } from 'lucide-react';
import { useState } from 'react';
import { useResumeStore } from '../../store/resumeStore';
import { translations } from '../../i18n';

interface Props {
  data: Skill[];
  onChange: (data: Skill[]) => void;
}

interface SkillGroup {
  id: string;
  cat: string;
  skillNames: string[]; // comma-separated text, live-editable
}

export function SkillsSection({ data, onChange }: Props) {
  const language = useResumeStore((s) => s.language);
  const t = translations[language].form;
  const tEditor = translations[language].editor;

  const uncategorizedLabel = t.uncategorized || 'Other';

  // Build groups from data, preserving first skill id as stable group id
  const buildGroups = (): SkillGroup[] => {
    const map: Record<string, SkillGroup> = {};
    data.forEach(sk => {
      const cat = sk.category?.trim() || uncategorizedLabel;
      if (!map[cat]) {
        map[cat] = { id: sk.id, cat, skillNames: [] };
      }
      if (sk.name.trim()) map[cat].skillNames.push(sk.name.trim());
    });
    return Object.values(map);
  };

  const groups = buildGroups();

  // When user edits the comma-separated skill text field
  const updateSkillNames = (groupId: string, text: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    const names = text.split(',').map(n => n.trim()).filter(Boolean);
    // Replace: keep skills in this group that are NOT being replaced, add new ones
    const newSkills: Skill[] = [];
    const oldSkills = data.filter(sk =>
      (sk.category?.trim() || uncategorizedLabel) === group.cat &&
      sk.id !== groupId
    );
    // Add old skills that match existing names (preserves id/name if user re-adds)
    names.forEach((name, i) => {
      const existing = data.find(sk =>
        (sk.category?.trim() || uncategorizedLabel) === group.cat &&
        sk.name.trim() === name
      );
      if (existing) {
        newSkills.push(existing);
      } else {
        newSkills.push({
          id: `skill_${Date.now()}_${i}`,
          name,
          level: 'intermediate',
          category: group.cat === uncategorizedLabel ? '' : group.cat,
        });
      }
    });
    onChange([...oldSkills, ...newSkills]);
  };

  // When user renames the category
  const updateCategoryName = (groupId: string, oldCat: string, newCat: string) => {
    const safeNewCat = newCat.trim() || uncategorizedLabel;
    if (oldCat === safeNewCat) return;
    onChange(data.map(sk => ({
      ...sk,
      category: (sk.category?.trim() || uncategorizedLabel) === oldCat
        ? safeNewCat
        : sk.category,
    })));
  };

  // Delete an entire group
  const removeGroup = (groupId: string) => {
    const group = groups.find(g => g.id === groupId);
    if (!group) return;
    onChange(data.filter(sk =>
      (sk.category?.trim() || uncategorizedLabel) !== group.cat
    ));
  };

  // Add a new group
  const addGroup = () => {
    const newCat = uncategorizedLabel;
    const newSkill: Skill = {
      id: `skill_${Date.now()}`,
      name: '',
      level: 'intermediate',
      category: newCat,
    };
    onChange([...data, newSkill]);
  };

  const [editingCatId, setEditingCatId] = useState<string | null>(null);
  const [editingCatName, setEditingCatName] = useState<string>('');

  const startEditCat = (group: SkillGroup) => {
    setEditingCatId(group.id);
    setEditingCatName(group.cat);
  };

  const saveEditCat = (group: SkillGroup) => {
    updateCategoryName(group.id, group.cat, editingCatName);
    setEditingCatId(null);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">{tEditor.skills}</h3>
        <button
          onClick={addGroup}
          className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          <Plus className="w-4 h-4" />
          {t.addGroup || 'Add Group'}
        </button>
      </div>

      {groups.length === 0 ? (
        <div className="text-center py-6 text-slate-400">
          <p>{tEditor.add}</p>
          <button onClick={addGroup} className="mt-2 text-indigo-600 hover:text-indigo-700">
            + {t.addGroup || 'Add Group'}
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <div key={group.id} className="p-3 bg-white border border-slate-200 rounded-lg space-y-2">
              {/* Category header row */}
              <div className="flex items-center gap-2">
                {editingCatId === group.id ? (
                  <input
                    autoFocus
                    value={editingCatName}
                    onChange={(e) => setEditingCatName(e.target.value)}
                    onBlur={() => saveEditCat(group)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') saveEditCat(group);
                      if (e.key === 'Escape') setEditingCatId(null);
                    }}
                    className="flex-1 px-2 py-1 text-sm font-bold border border-indigo-400 rounded focus:ring-1 focus:ring-indigo-500 outline-none"
                  />
                ) : (
                  <>
                    <span className="font-bold text-sm text-slate-700 flex-1">
                      {group.cat}
                    </span>
                    <button
                      onClick={() => startEditCat(group)}
                      className="p-1 text-slate-400 hover:text-indigo-500"
                      title="Rename group"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => removeGroup(group.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                      title="Delete group"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </>
                )}
              </div>

              {/* Skills comma-separated input */}
              <textarea
                value={group.skillNames.join(', ')}
                onChange={(e) => updateSkillNames(group.id, e.target.value)}
                placeholder={tEditor.skillsPlaceholder || 'e.g. JavaScript, TypeScript, React'}
                rows={2}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500 resize-none text-slate-700"
              />
              <p className="text-xs text-slate-400">Separate skills with commas</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}