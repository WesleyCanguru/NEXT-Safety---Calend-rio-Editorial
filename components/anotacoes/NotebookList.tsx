import React, { useEffect, useState } from 'react';
import { Notebook } from '../../hooks/useNotebooks';
import { Plus, Book } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NotebookListProps {
  notebooks: Notebook[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export function NotebookList({ notebooks, selectedId, onSelect, onCreate }: NotebookListProps) {
  const [counts, setCounts] = useState<Record<string, number>>({});

  useEffect(() => {
    if (notebooks.length > 0) {
      const fetchCounts = async () => {
        const { data } = await supabase.from('notes').select('notebook_id');
        if (data) {
          const newCounts: Record<string, number> = {};
          data.forEach((note: any) => {
            newCounts[note.notebook_id] = (newCounts[note.notebook_id] || 0) + 1;
          });
          setCounts(newCounts);
        }
      };
      fetchCounts();
    }
  }, [notebooks]);

  return (
    <div className="w-full sm:w-64 bg-gray-50/50 border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-100 flex items-center justify-between">
        <h2 className="text-lg font-bold text-brand-dark">Cadernos</h2>
        <button onClick={onCreate} className="p-1 hover:bg-gray-200 rounded-md transition-colors text-gray-500">
          <Plus size={18} />
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
        {notebooks.map(nb => (
          <button
            key={nb.id}
            onClick={() => onSelect(nb.id)}
            className={`w-full flex items-center gap-3 px-3 py-2 rounded-xl transition-all text-left ${selectedId === nb.id ? 'bg-white shadow-sm border border-gray-100' : 'hover:bg-gray-100 border border-transparent'}`}
          >
            <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: `${nb.color}20`, color: nb.color }}>
              <span className="text-sm">{nb.emoji || '📔'}</span>
            </div>
            <div className="flex-1 min-w-0">
              <span className="text-sm font-medium text-gray-700 block truncate">{nb.title}</span>
            </div>
            <span className="text-xs text-gray-400 font-medium">{counts[nb.id] || 0}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
