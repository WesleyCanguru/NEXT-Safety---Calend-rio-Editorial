import React from 'react';
import { Note } from '../../hooks/useNotes';
import { Notebook } from '../../hooks/useNotebooks';
import { Plus, Pin } from 'lucide-react';
import dayjs from 'dayjs';

interface NoteListProps {
  notebook: Notebook | null;
  notes: Note[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export function NoteList({ notebook, notes, selectedId, onSelect, onCreate }: NoteListProps) {
  
  const extractPreview = (htmlStr: string) => {
    if (!htmlStr) return 'Sem conteúdo adicional';
    const tmp = document.createElement('div');
    tmp.innerHTML = htmlStr;
    const text = tmp.textContent || tmp.innerText || '';
    return text.substring(0, 60) + (text.length > 60 ? '...' : '');
  };

  return (
    <div className="w-full sm:w-80 bg-white border-r border-gray-100 flex flex-col h-full shrink-0">
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center gap-3 mb-4">
          {notebook ? (
            <>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${notebook.color}20`, color: notebook.color }}>
                <span className="text-xl">{notebook.emoji || '📔'}</span>
              </div>
              <h2 className="text-xl font-bold text-brand-dark truncate">{notebook.title}</h2>
            </>
          ) : (
            <h2 className="text-xl font-bold text-brand-dark">Anotações</h2>
          )}
        </div>
        <button 
          onClick={onCreate}
          disabled={!notebook}
          className="w-full flex items-center justify-center gap-2 py-2.5 bg-brand-dark text-white rounded-xl font-bold text-xs uppercase tracking-widest hover:bg-brand-dark/90 transition-colors disabled:opacity-50"
        >
          <Plus size={16} /> Nova Nota
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {notes.length === 0 ? (
          <div className="p-8 text-center bg-gray-50/30 h-full flex flex-col justify-center items-center">
            <span className="text-4xl mb-4 opacity-50">✍️</span>
            <p className="text-sm text-gray-500 font-medium">Nenhuma nota encontrada.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {notes.map(note => (
              <button
                key={note.id}
                onClick={() => onSelect(note.id)}
                className={`w-full text-left p-5 transition-colors block ${selectedId === note.id ? 'bg-blue-50/50' : 'hover:bg-gray-50'}`}
              >
                <div className="flex items-start justify-between mb-1">
                  <h3 className="font-bold text-brand-dark truncate pr-2">{note.title || 'Sem título'}</h3>
                  {note.is_pinned && <Pin size={14} className="text-brand-dark mt-1 shrink-0" />}
                </div>
                <p className="text-sm text-gray-500 line-clamp-2 mb-2 leading-relaxed">
                  {extractPreview(note.content)}
                </p>
                <span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                  {dayjs(note.updated_at).format('DD MMM YYYY')}
                </span>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
