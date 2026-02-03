
import React, { useState, useEffect } from 'react';
import { DailyContent, PostData, PostComment, PostStatus, AdFormat } from '../types';
import { useAuth, supabase } from '../lib/supabase';
import { X, Send, Image as ImageIcon, CheckCircle2, AlertTriangle, MessageCircle, Clock, Save, Eye, UploadCloud, Trash2, History, Lock, Globe, Edit3, RefreshCw } from 'lucide-react';
import { FeedMockup } from './mockups/FeedMockup';
import { StoryMockup } from './mockups/StoryMockup';

interface PostModalProps {
  dayContent: DailyContent;
  dateKey: string;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ dayContent, dateKey, onClose }) => {
  const { userRole } = useAuth();
  
  // Data States
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  
  // Form States
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState(dayContent.initialImageUrl || '');
  const [newComment, setNewComment] = useState('');

  // --- 1. BUSCAR DADOS REAIS DO SUPABASE ---
  useEffect(() => {
    const fetchPostData = async () => {
      setLoading(true);
      
      // Busca o Post
      const { data: postData, error: postError } = await supabase
        .from('posts') // Certifique-se que a tabela 'posts' existe
        .select('*')
        .eq('date_key', dateKey)
        .single();

      if (postData) {
        setPost(postData);
        setCaption(postData.caption || '');
        setImageUrl(postData.image_url || dayContent.initialImageUrl || '');
        
        // Se já existe conteúdo salvo, não começa editando
        if (postData.caption || postData.image_url) {
          setIsEditing(false);
        } else {
          setIsEditing(true);
        }
      } else {
        // Se não existe no banco, inicializa com padrão
        const initialStatus = dayContent.exclusive ? 'approved' : 'draft';
        const newPost = {
          date_key: dateKey,
          status: initialStatus as PostStatus,
          image_url: dayContent.initialImageUrl || null,
          caption: null,
          last_updated: new Date().toISOString()
        };
        setPost(newPost as PostData);
        setImageUrl(dayContent.initialImageUrl || '');
        setIsEditing(true); // Começa editando
      }

      // Busca Comentários (Simulado/Real)
      // Aqui você implementaria: supabase.from('comments').select('*').eq('post_id', dateKey)...
      // Por enquanto mantendo estado local para comentários conforme pedido anterior, mas estrutura pronta
      setLoading(false);
    };

    fetchPostData();
  }, [dateKey, dayContent]);

  // --- 2. UPLOAD DE IMAGEM ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      
      // Nome único para o arquivo
      const fileExt = file.name.split('.').pop();
      const fileName = `${dateKey.replace(/\//g, '-')}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      // Upload para o Bucket 'post-uploads'
      // ATENÇÃO: Crie um bucket público chamado 'post-uploads' no seu Supabase Storage
      const { error: uploadError } = await supabase.storage
        .from('post-uploads')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      // Pegar URL Pública
      const { data: { publicUrl } } = supabase.storage
        .from('post-uploads')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload da imagem. Verifique se o bucket "post-uploads" existe no Supabase.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveImage = () => {
    setImageUrl('');
  };

  // --- 3. SALVAR POST (UPSERT) ---
  const handleSavePost = async () => {
    if (!caption && !imageUrl) return;

    try {
      setLoading(true);
      
      const statusToSave: PostStatus = 'pending_approval'; // Força status laranja
      
      const payload = {
        date_key: dateKey,
        image_url: imageUrl,
        caption: caption,
        status: statusToSave,
        last_updated: new Date().toISOString()
      };

      // Upsert: Cria ou Atualiza
      const { error } = await supabase
        .from('posts')
        .upsert(payload, { onConflict: 'date_key' });

      if (error) throw error;

      // Atualiza estado local
      setPost(prev => ({ ...prev!, ...payload }));
      setIsEditing(false); // Trava a edição
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar publicação.');
    } finally {
      setLoading(false);
    }
  };

  // --- AÇÕES DE FLUXO ---
  const handleEditClick = () => {
    setIsEditing(true);
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
    
    // Lógica simples de atualização de status baseada em comentário
    if (userRole === 'approver' && visibilityToAdmin) {
       // Se Viviane comenta, pode indicar ajuste solicitado
       // Em app real, seria um botão explícito "Solicitar Ajustes"
    }
  };

  const handleApprove = async () => {
    try {
      const { error } = await supabase
        .from('posts')
        .update({ status: 'approved' })
        .eq('date_key', dateKey);

      if (!error) {
        setPost(prev => ({ ...prev!, status: 'approved' }));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePublish = async () => {
    try {
        const { error } = await supabase
          .from('posts')
          .update({ status: 'published' })
          .eq('date_key', dateKey);
  
        if (!error) {
          setPost(prev => ({ ...prev!, status: 'published' }));
        }
      } catch (err) {
        console.error(err);
      }
  };

  // --- RENDER HELPERS ---
  const visibleComments = comments.filter(c => {
    if (userRole === 'admin') return c.visible_to_admin;
    return true;
  });

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
    mainImage: imageUrl || undefined, // Preview esquerdo sempre usa o estado atual
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
                 {isUploading ? (
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-dark mb-4"></div>
                 ) : (
                    <ImageIcon size={48} className="mb-4 opacity-30" />
                 )}
                 <span className="text-sm font-medium">{isUploading ? 'Enviando...' : 'Nenhuma imagem definida'}</span>
                 <span className="text-xs opacity-60 mt-1">{isUploading ? 'Aguarde um momento' : 'Faça o upload ao lado'}</span>
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
          <div className="p-6 pr-14 border-b border-gray-100 flex justify-between items-center bg-gray-50/50">
             <div>
                <h2 className="font-bold text-gray-900 text-lg">{dayContent.day}</h2>
                <span className="text-xs text-gray-500 uppercase font-medium">{dayContent.platform}</span>
             </div>
             
             <div className="flex gap-2">
                {userRole === 'approver' && post?.status === 'pending_approval' && (
                    <button onClick={handleApprove} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all">
                       <CheckCircle2 size={16} /> Aprovar
                    </button>
                )}
                
                {userRole === 'admin' && post?.status === 'approved' && (
                    <button onClick={handlePublish} className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-sm shadow-sm transition-all">
                       <Globe size={16} /> Publicar
                    </button>
                )}
             </div>
          </div>

          {/* Chat / Content Area */}
          <div className="flex-grow overflow-y-auto p-6 space-y-6">
             
             {/* --- ÁREA DE CONTEÚDO (EDITÁVEL OU LEITURA) --- */}
             <div className="bg-blue-50/50 p-5 rounded-xl border border-blue-100 relative">
                <div className="flex justify-between items-center mb-3">
                   <h3 className="text-xs font-bold text-blue-800 uppercase tracking-wide flex items-center gap-2">
                      <Clock size={14} /> Conteúdo da Publicação
                   </h3>
                   {/* Botão de Editar para Admin quando estiver travado */}
                   {userRole === 'admin' && !isEditing && (
                      <button 
                        onClick={handleEditClick}
                        className="text-xs flex items-center gap-1 font-bold text-blue-600 hover:text-blue-800 bg-white px-2 py-1 rounded border border-blue-200 shadow-sm"
                      >
                         <Edit3 size={12} /> Editar Conteúdo
                      </button>
                   )}
                </div>
                
                {isEditing && userRole === 'admin' ? (
                   // --- MODO EDIÇÃO ---
                   <div className="space-y-4 animate-in fade-in slide-in-from-top-2">
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
                           <label className={`border-2 border-dashed border-blue-200 bg-blue-50/50 hover:bg-blue-50 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors group ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                              <input 
                                type="file" 
                                accept="image/*" 
                                onChange={handleImageUpload} 
                                className="hidden" 
                                disabled={isUploading}
                              />
                              {isUploading ? (
                                <RefreshCw size={24} className="text-blue-400 mb-2 animate-spin" />
                              ) : (
                                <UploadCloud size={24} className="text-blue-400 mb-2 group-hover:scale-110 transition-transform" />
                              )}
                              <span className="text-sm text-blue-800 font-bold">{isUploading ? 'Enviando...' : 'Clique para enviar imagem'}</span>
                              <span className="text-xs text-blue-400 mt-1">PNG, JPG</span>
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
                      <div className="flex justify-end gap-2">
                         <button 
                            onClick={() => setIsEditing(false)} 
                            className="text-xs font-bold text-gray-500 hover:text-gray-700 px-3 py-2"
                         >
                            Cancelar
                         </button>
                         <button 
                            onClick={handleSavePost} 
                            disabled={loading || isUploading}
                            className={`text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center gap-2 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}
                         >
                            {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                            Salvar e Enviar
                         </button>
                      </div>
                   </div>
                ) : (
                   // --- MODO LEITURA ---
                   <div className="space-y-3">
                      {imageUrl && (
                        <div className="relative h-24 w-full rounded-lg overflow-hidden border border-blue-100">
                           <img src={imageUrl} className="w-full h-full object-cover" alt="Post content" />
                           <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-end p-2">
                              <span className="text-[10px] text-white font-bold flex items-center gap-1">
                                <ImageIcon size={10} /> Imagem salva
                              </span>
                           </div>
                        </div>
                      )}
                      <p className="text-sm text-gray-700 whitespace-pre-line leading-relaxed bg-white p-3 rounded border border-blue-100">
                         {caption || <span className="text-gray-400 italic">Nenhuma legenda definida.</span>}
                      </p>
                      {userRole !== 'admin' && (
                         <div className="flex justify-end">
                            <span className="text-[10px] text-blue-400 font-medium flex items-center gap-1">
                               <Lock size={10} /> Conteúdo travado para aprovação
                            </span>
                         </div>
                      )}
                   </div>
                )}
             </div>

             {/* Comments Feed - Permanent History */}
             <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-gray-100 pb-2 mb-4">
                   <div className="flex items-center gap-2">
                      <History size={16} className="text-gray-400" />
                      <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                         Histórico Permanente
                      </h3>
                   </div>
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
                               <span className="text-[10px] opacity-50 ml-auto">
                                  {new Date(comment.created_at).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                               </span>
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
          </div>

        </div>
      </div>
    </div>
  );
};
