import type { Language } from '../../types/resume';
import { Plus, Trash2 } from 'lucide-react';

interface Props {
  data: Language[];
  onChange: (data: Language[]) => void;
}

const levelOptions = [
  { value: 'A1', label: 'A1 Beginner' },
  { value: 'A2', label: 'A2 Basic' },
  { value: 'B1', label: 'B1 Intermediate' },
  { value: 'B2', label: 'B2 Upper-Intermediate' },
  { value: 'C1', label: 'C1 Advanced' },
  { value: 'C2', label: 'C2 Expert' },
  { value: 'Native', label: 'Native' },
];

export function LanguagesSection({ data, onChange }: Props) {
  const addItem = () => {
    const newItem: Language = {
      id: `lang_${Date.now()}`,
      name: '',
      level: 'B2',
    };
    onChange([...data, newItem]);
  };

  const updateItem = (id: string, field: keyof Language, value: any) => {
    onChange(data.map(item =>
      item.id === id ? { ...item, [field]: value } : item
    ));
  };

  const removeItem = (id: string) => {
    onChange(data.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-700">LanguagesSkills</h3>
        <button onClick={addItem} className="flex items-center gap-1 px-3 py-1.5 text-sm bg-indigo-600 text-white rounded-lg hover:bg-indigo-700">
          <Plus className="w-4 h-4" />Add
        </button>
      </div>

      <div className="space-y-3">
        {data.map((item) => (
          <div key={item.id} className="flex items-center gap-3">
            <input
              type="text"
              value={item.name}
              onChange={(e) => updateItem(item.id, 'name', e.target.value)}
              className="flex-1 px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
              placeholder="LanguagesName（e.g.：English、German）"
            />
            <select
              value={item.level}
              onChange={(e) => updateItem(item.id, 'level', e.target.value)}
              className="px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-indigo-500"
            >
              {levelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            <button onClick={() => removeItem(item.id)} className="p-2 text-red-400 hover:text-red-600">
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        ))}

        {data.length === 0 && (
          <div className="text-center py-6 text-slate-400">
            <p>NoneLanguages</p>
            <button onClick={addItem} className="mt-2 text-indigo-600 hover:text-indigo-700">+ Add</button>
          </div>
        )}
      </div>
    </div>
  );
}
