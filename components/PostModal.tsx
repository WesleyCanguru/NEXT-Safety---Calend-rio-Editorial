
import React, { useState, useEffect } from 'react';
import { DailyContent, PostData, PostComment, PostStatus, AdFormat } from '../types';
import { useAuth, supabase } from '../lib/supabase';
import { X, Send, Image as ImageIcon, CheckCircle2, AlertTriangle, MessageCircle, Clock, Save, Eye, UploadCloud, Trash2, History, Lock, Globe } from 'lucide-react';
import { FeedMockup } from './mockups/FeedMockup';
import { StoryMockup } from './mockups/StoryMockup';

interface PostModalProps {
  dayContent: DailyContent;
  dateKey: string;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ dayContent, dateKey, onClose }) => {
  const { userRole } = useAuth();
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Form States
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState(dayContent.initialImageUrl || '');
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    // Simulation: In a real app, this would fetch the persistent history from Supabase
    const mockFetch = async () => {
      // Regra padrão: Se não tem imagem (simulada), começa em "Draft" (Em Produção)
      let initialStatus: PostStatus = 'draft';
      
      // Simulações apenas para demonstração (se houver dados)
      if (dayContent.exclusive) initialStatus = 'approved';
      if (!dayContent.initialImageUrl && !imageUrl) initialStatus = 'draft';

      setPost({
        date_key: dateKey,
        status: initialStatus, 
        image_url: dayContent.initialImageUrl || null,
        caption: null,
        last_updated: new Date().toISOString()
      });
      setComments([]); 
      setLoading(false);
    };

    mockFetch();
  }, [dateKey, dayContent]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  const handleSavePost = async () => {
    if (!imageUrl || !caption) return;
    setPost(prev => ({
      ...prev!,
      image_url: imageUrl,
      caption: caption,
      status: 'pending_approval'
    }));
  };

  const handleSendComment = async (visibilityToAdmin: boolean = true) => {
    if (!newComment.trim()) return;

    const newCommentObj: PostComment = {
      id: Math.random().toString(),
      post_id: dateKey,
      author_role: userRole!,
      author_name: userRole === 'admin' ? 'Canguru' : userRole === 'approver' ? 'Viviane' : 'Equipe Next',
      content: newComment,
      created_at: new Date().toISOString(),
      visible_to_admin: visibilityToAdmin
    };

    setComments([...comments, newCommentObj]);
    setNewComment('');

    if (userRole === 'team') {
       setPost(prev => ({ ...prev!, status: 'internal_review' }));
    } else if (userRole === 'approver') {
       if (visibilityToAdmin) {
         setPost(prev => ({ ...prev!, status: 'changes_requested' }));
       }
    }
  };

  const handleApprove = () => {
    setPost(prev => ({ ...prev!, status: 'approved' }));
  };

  const handlePublish = () => {
    setPost(prev => ({ ...prev!, status: 'published' }));
  };

  const visibleComments = comments.filter(c => {
    if (userRole === 'admin') return c.visible_to_admin;
    return true;
  });

  // --- LÓGICA DE CORES (Idêntica ao Calendário) ---
  const getStatusColor = (s: PostStatus) => {
    switch(s) {
      case 'draft': return 'bg-gray-100 text-gray-600 border-gray-200';
      case 'pending_approval': return 'bg-orange-100 text-orange-700 border-orange-200'; 
      case 'changes_requested': return 'bg-red-100 text-red-700 border-red-200'; 
      case 'internal_review': return 'bg-purple-100 text-purple-700 border-purple-200'; 
      case 'approved': return 'bg-blue-100 text-blue-700 border-blue-200'; 
      case 'published': return 'bg-green-100 text-green-700 border-green-200'; 
      default: return 'bg-gray-100 text-gray-500';
    }
  };

  const getStatusLabel = (s: PostStatus) => {
    if (userRole === 'admin' && s === 'internal_review') return 'Aguardando Cliente';
    
    switch(s) {
      case 'draft': return 'Em Produção';
      case 'pending_approval': return 'Em Aprovação';
      case 'changes_requested': return 'Ajustes Solicitados';
      case 'internal_review': return 'Discussão Interna';
      case 'approved': return 'Aprovado / Pronto';
      case 'published': return 'Publicado';
      default: return 'Em Produção';
    }
  };

  const isStory = dayContent.type.toLowerCase().includes('vídeo') || dayContent.type.toLowerCase().includes('story') || dayContent.type.toLowerCase().includes('reel');
  
  const mockupData = {
    type: (isStory ? 'story' : 'feed') as AdFormat,
    mainImage: imageUrl || undefined,
    title: dayContent.theme,
    subtitle: 'Next Safety',
    tagline: 'PREVIEW'
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 sm:p-6">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="bg-white w-full max-w-6xl h-[90vh] rounded-2xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-4 right-4 z-20 p-2 bg-white/80 hover:bg-white rounded-full text-gray-500 hover:text-red-500 transition-colors">
          <X size={24} />
        </button>

        {/* LEFT: Preview */}
        <div className="w-full md:w-1/2 bg-gray-100 p-8 flex flex-col items-center justify-center border-r border-gray-200 overflow-y-auto">
          <div className="mb-6 flex items-center gap-3">
             <span className={`px-4 py-1.5 rounded-full text-sm font-bold border uppercase tracking-wide shadow-sm ${getStatusColor(post?.status || 'draft')}`}>
                {getStatusLabel(post?.status || 'draft')}
             </span>
          </div>

          <div className="transform scale-90 sm:scale-100 origin-center transition-all duration-300">
             {imageUrl ? (
                isStory ? (
                  <StoryMockup data={mockupData} />
                ) : (
                  <FeedMockup data={mockupData} />
                )
             ) : (
               <div className="w-[320px] aspect-square bg-white rounded-xl shadow-xl border border-gray-200 flex flex-col items-center justify-center text-gray-400 p-4 text-center">
                 <ImageIcon size={48} className="mb-4 opacity-30" />
                 <span className="text-sm font-medium">Nenhuma imagem definida</span>
                 <span className="text-xs opacity-60 mt-1">Faça o upload ao lado</span>
               </div>
             )}
          </div>
          
          <div className="mt-8 text-center max-w-md">
             <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">Tema / Pauta</h3>
             <p className="text-gray-800 font-medium">{dayContent.theme}</p>
             {dayContent.bullets && (
                <ul className="mt-3 text-xs text-gray-500 text-left list-disc pl-5 space-y-1">
                  {dayContent.bullets.map((b, i) => <li key={i}>{b}</li>)}
                </ul>
             )}
          </div>
        </div>

        {/* RIGHT: Actions & Chat */}
        <div className="w-full md:w-1/2 flex flex-col h-full bg-white">
          
          {/* Header Actions */}
          {/* Added pr-12 to avoid overlap with absolute close button */}
          <div className="p-6 pr-14 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <div>
                <h2 className="font-bold text-gray-900 text-lg">{dayContent.day}</h2>
                <span className="text-xs text-gray-500 uppercase font-medium">{dayContent.platform}</span>
             </div>
             
             {/* Action Buttons based on Role & Status */}
             <div className="flex gap-2">
                {userRole === 'approver' && post?.status !== 'approved' && post?.status !== 'published' && (
                    // Changed to GREEN button
                    <button onClick={handleApprove} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all">
                       <CheckCircle2 size={16} /> Aprovar
                    </button>
                )}
                
                {/* Admin can publish if approved */}
                {userRole === 'admin' && post?.status === 'approved' && (
                    <button onClick={handlePublish} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all">
                       <Globe size={16} /> Publicar
                    </button>
                )}
             </div>
          </div>

          {/* Chat / Content Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
             
             {/* Admin Input Area */}
             {(userRole === 'admin' || post?.caption) && (
               <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100">
                  <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide mb-3 flex items-center gap-2">
                     <Clock size={14} /> Conteúdo da Publicação
                  </h3>
                  
                  {userRole === 'admin' && post?.status !== 'approved' && post?.status !== 'published' ? (
                     <div className="space-y-4">
                        <div>
                           {imageUrl ? (
                             <div className="relative group rounded-lg overflow-hidden border border-gray-200">
                                <img src={imageUrl} alt="Preview" className="w-full h-32 object-cover opacity-80" />
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity">
                                   <button 
                                     onClick={handleRemoveImage}
                                     className="flex items-center gap-2 px-3 py-1.5 bg-red-600 text-white rounded-md text-xs font-bold hover:bg-red-700"
                                   >
                                      <Trash2 size={14} /> Remover Imagem
                                   </button>
                                </div>
                             </div>
                           ) : (
                             <label className="border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group">
                                <input 
                                  type="file" 
                                  accept="image/*" 
                                  onChange={handleImageUpload} 
                                  className="hidden" 
                                />
                                <UploadCloud size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                                <span className="text-sm text-blue-800 font-bold">Clique para enviar imagem</span>
                                <span className="text-xs text-blue-400 mt-1">PNG, JPG (Preview Imediato)</span>
                             </label>
                           )}
                        </div>

                        <textarea 
                          placeholder="Escreva a legenda aqui..."
                          value={caption}
                          onChange={e => setCaption(e.target.value)}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-200 rounded text-sm focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                        />
                        <div className="flex justify-end">
                           <button onClick={handleSavePost} className="text-xs font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1">
                              <Save size={14} /> Salvar e Enviar
                           </button>
                        </div>
                     </div>
                  ) : (
                     <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed">
                        {post?.caption || caption || "Nenhuma legenda definida."}
                     </p>
                  )}
               </div>
             )}

             {/* Comments Feed - Permanent History */}
             <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                   <div className="flex items-center gap-2">
                      <History size={16} className="text-gray-400" />
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                         Histórico Permanente
                      </h3>
                   </div>
                   <span className="text-[10px] text-gray-300 font-medium bg-gray-50 px-2 py-1 rounded">
                      Os comentários nunca são apagados
                   </span>
                </div>
                
                {visibleComments.length === 0 ? (
                   <div className="text-center py-8 text-gray-400 text-sm italic bg-gray-50 rounded-lg border border-dashed border-gray-200">
                      Nenhum registro histórico para esta data.
                   </div>
                ) : (
                   visibleComments.map((comment) => (
                      <div key={comment.id} className={`flex gap-3 ${comment.author_role === 'admin' ? 'flex-row-reverse' : ''}`}>
                         <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 shadow-sm ${
                            comment.author_role === 'admin' ? 'bg-brand-dark text-white' : 
                            comment.author_role === 'approver' ? 'bg-green-100 text-green-700' :
                            'bg-purple-100 text-purple-700'
                         }`}>
                            {comment.author_name.charAt(0)}
                         </div>
                         <div className={`p-3 rounded-xl max-w-[85%] text-sm shadow-sm ${
                            comment.author_role === 'admin' ? 'bg-white text-gray-800 border border-gray-100 rounded-tr-none' : 
                            comment.author_role === 'approver' ? 'bg-green-50 text-green-900 border border-green-100 rounded-tl-none' :
                            'bg-purple-50 text-purple-900 border border-purple-100 rounded-tl-none'
                         }`}>
                            <div className="flex items-center gap-2 mb-1 border-b border-black/5 pb-1">
                               <span className="font-bold text-xs">{comment.author_name}</span>
                               <span className="text-[10px] opacity-50 ml-auto">10:42 • 02/02/26</span>
                            </div>
                            <p className="leading-relaxed mt-1">{comment.content}</p>
                         </div>
                      </div>
                   ))
                )}
             </div>

          </div>

          {/* Footer Input */}
          <div className="p-4 border-t border-gray-100 bg-white">
             <div className="relative">
                <input 
                  type="text"
                  value={newComment}
                  onChange={e => setNewComment(e.target.value)}
                  placeholder={userRole === 'team' ? "Comentar internamente..." : "Escreva um comentário..."}
                  className="w-full pl-4 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-brand-dark outline-none transition-all"
                  onKeyDown={e => e.key === 'Enter' && handleSendComment(userRole !== 'team')}
                />
                <button 
                  onClick={() => handleSendComment(userRole !== 'team')}
                  className="absolute right-2 top-2 p-1.5 bg-brand-dark text-white rounded-lg hover:bg-gray-800 transition-colors"
                >
                   <Send size={16} />
                </button>
             </div>
             
             {/* Removed purple text link for approver as requested */}
          </div>

        </div>
      </div>
    </div>
  );
};
