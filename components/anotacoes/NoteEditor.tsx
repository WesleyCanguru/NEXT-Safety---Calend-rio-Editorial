import React, { useEffect, useCallback, useState } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Color from '@tiptap/extension-color';
import { TextStyle } from '@tiptap/extension-text-style';
import Underline from '@tiptap/extension-underline';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import TextAlign from '@tiptap/extension-text-align';
import Highlight from '@tiptap/extension-highlight';
import { Note } from '../../hooks/useNotes';
import { Bold, Italic, Underline as UnderlineIcon, Strikethrough, Heading1, Heading2, Heading3, List, ListOrdered, Quote, Link as LinkIcon, Image as ImageIcon, AlignLeft, AlignCenter, AlignRight, AlignJustify, Undo, Redo, Type } from 'lucide-react';
import { supabase } from '../../lib/supabase';

interface NoteEditorProps {
  note: Note | null;
  onUpdate: (id: string, updates: Partial<Note>) => void;
}

export function NoteEditor({ note, onUpdate }: NoteEditorProps) {
  const [title, setTitle] = useState(note?.title || '');
  const [isSaving, setIsSaving] = useState(false);

  // Debounced auto-save for title
  useEffect(() => {
    if (!note) return;
    setTitle(note.title);
  }, [note?.id]);

  useEffect(() => {
    if (!note) return;
    const timer = setTimeout(() => {
      if (title !== note.title) {
        setIsSaving(true);
        onUpdate(note.id, { title });
        setTimeout(() => setIsSaving(false), 500);
      }
    }, 1000);
    return () => clearTimeout(timer);
  }, [title, note, onUpdate]);

  const handleUpdateContent = useCallback((content: string) => {
    if (!note) return;
    setIsSaving(true);
    onUpdate(note.id, { content });
    setTimeout(() => setIsSaving(false), 500);
  }, [note, onUpdate]);

  const editor = useEditor({
    extensions: [
      StarterKit,
      TextStyle,
      Color,
      Underline,
      Highlight,
      Image,
      Link.configure({ openOnClick: false }),
      TextAlign.configure({ types: ['heading', 'paragraph'] }),
    ],
    content: note?.content || '',
    onUpdate: ({ editor }) => {
      // For debouncing editor update, you use a setTimeout. But tiptap handles memory state well.
      // We will perform debounce here.
    },
    editorProps: {
      attributes: {
        class: 'prose prose-sm sm:prose-base focus:outline-none max-w-none min-h-[500px]',
      },
    },
  });

  useEffect(() => {
    if (editor && note && editor.getHTML() !== note.content) {
      // Only set content if the note ID changed to prevent cursor jumps
      queueMicrotask(() => {
         const currentPos = editor.state.selection.$anchor.pos;
         // Very crude way to not overwrite if we are editing
      });
    }
  }, [note?.id, editor]);
  
  // Actually, standard way to handle tiptap content switch:
  useEffect(() => {
    if (editor && note) {
       if (editor.getHTML() !== note.content) {
         editor.commands.setContent(note.content, { emitUpdate: false });
       }
    } else if (editor && !note) {
      editor.commands.setContent('', { emitUpdate: false });
    }
  }, [note?.id]);

  useEffect(() => {
    let timer: any;
    if (editor) {
      const handleTransaction = () => {
        clearTimeout(timer);
        timer = setTimeout(() => {
          if (note && editor.getHTML() !== note.content) {
            handleUpdateContent(editor.getHTML());
          }
        }, 1000);
      };
      editor.on('transaction', handleTransaction);
      return () => {
        editor.off('transaction', handleTransaction);
        clearTimeout(timer);
      };
    }
  }, [editor, note, handleUpdateContent]);

  const addImage = async () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = async (e: any) => {
      const file = e.target.files?.[0];
      if (file) {
        setIsSaving(true);
        const fileName = `${Date.now()}_${file.name}`;
        const { data, error } = await supabase.storage.from('notes-images').upload(fileName, file);
        if (!error && data) {
          const { data: { publicUrl } } = supabase.storage.from('notes-images').getPublicUrl(data.path);
          editor?.chain().focus().setImage({ src: publicUrl }).run();
        }
        setIsSaving(false);
      }
    };
    input.click();
  };

  if (!note) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center text-gray-400 bg-white/50">
        <div className="w-16 h-16 mb-4 bg-gray-100 rounded-2xl flex items-center justify-center">
          <Type size={32} className="opacity-50" />
        </div>
        <p>Selecione ou crie uma nota para começar</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden">
      {/* Head & Toolbar */}
      <div className="border-b border-gray-100 bg-white sticky top-0 z-10 shrink-0">
        <div className="px-8 py-5">
          <input
            type="text"
            className="w-full text-3xl font-bold bg-transparent outline-none placeholder-gray-300 text-brand-dark"
            placeholder="Título da nota"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        
        {editor && (
          <div className="px-6 py-2 border-t border-gray-50 flex items-center gap-1 overflow-x-auto no-scrollbar text-gray-500">
            {/* Formatação Básica */}
            <div className="flex items-center gap-1 pr-2 border-r border-gray-100">
              <button onClick={() => editor.chain().focus().toggleBold().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('bold') ? 'bg-gray-100 text-brand-dark' : ''}`}><Bold size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleItalic().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('italic') ? 'bg-gray-100 text-brand-dark' : ''}`}><Italic size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleUnderline().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('underline') ? 'bg-gray-100 text-brand-dark' : ''}`}><UnderlineIcon size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleStrike().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('strike') ? 'bg-gray-100 text-brand-dark' : ''}`}><Strikethrough size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleHighlight().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('highlight') ? 'bg-yellow-100 text-yellow-600' : ''}`}><Type size={16} /></button>
            </div>

            {/* Cabeçalhos */}
            <div className="flex items-center gap-1 px-2 border-r border-gray-100">
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('heading', { level: 1 }) ? 'bg-gray-100 text-brand-dark' : ''}`}><Heading1 size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('heading', { level: 2 }) ? 'bg-gray-100 text-brand-dark' : ''}`}><Heading2 size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('heading', { level: 3 }) ? 'bg-gray-100 text-brand-dark' : ''}`}><Heading3 size={16} /></button>
            </div>

            {/* Listas e Citação */}
            <div className="flex items-center gap-1 px-2 border-r border-gray-100">
              <button onClick={() => editor.chain().focus().toggleBulletList().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('bulletList') ? 'bg-gray-100 text-brand-dark' : ''}`}><List size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleOrderedList().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('orderedList') ? 'bg-gray-100 text-brand-dark' : ''}`}><ListOrdered size={16} /></button>
              <button onClick={() => editor.chain().focus().toggleBlockquote().run()} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('blockquote') ? 'bg-gray-100 text-brand-dark' : ''}`}><Quote size={16} /></button>
            </div>

            {/* Mídia */}
            <div className="flex items-center gap-1 px-2 border-r border-gray-100">
              <button onClick={() => {
                const url = window.prompt('URL do Link');
                if (url) editor.chain().focus().setLink({ href: url }).run();
              }} className={`p-1.5 rounded-lg hover:bg-gray-100 ${editor.isActive('link') ? 'bg-gray-100 text-brand-dark' : ''}`}><LinkIcon size={16} /></button>
              <button onClick={addImage} className="p-1.5 rounded-lg hover:bg-gray-100"><ImageIcon size={16} /></button>
            </div>

            {/* Histórico */}
            <div className="flex items-center gap-1 pl-2">
              <button onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"><Undo size={16} /></button>
              <button onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()} className="p-1.5 rounded-lg hover:bg-gray-100 disabled:opacity-30"><Redo size={16} /></button>
            </div>
            
            <div className="ml-auto text-xs text-gray-400 px-2 flex items-center h-full">
              {isSaving ? 'Salvando...' : 'Salvo'}
            </div>
          </div>
        )}
      </div>

      {/* Editor Content Area */}
      <div className="flex-1 overflow-y-auto px-8 py-6 cursor-text" onClick={() => editor?.commands.focus()}>
        <EditorContent editor={editor} />
      </div>
    </div>
  );
}
