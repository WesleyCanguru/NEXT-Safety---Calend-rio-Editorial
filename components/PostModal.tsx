
import React, { useState, useEffect, useRef } from 'react';
import { DailyContent, PostData, PostComment, PostStatus } from '../types';
import { useAuth, supabase } from '../lib/supabase';
import { X, Send, Image as ImageIcon, CheckCircle2, AlertTriangle, MessageCircle, Clock, Save, Eye, UploadCloud, Trash2, History, Lock, Globe, Edit3, RefreshCw, FileVideo, Heart, Bookmark, MoreHorizontal, Share2, Link, Copy, Check } from 'lucide-react';
import { InstagramView, LinkedInView } from './PlatformViews';

interface PostModalProps {
  dayContent: DailyContent;
  dateKey: string;
  onClose: () => void;
}

export const PostModal: React.FC<PostModalProps> = ({ dayContent, dateKey, onClose }) => {
  const { userRole } = useAuth();
  const commentsEndRef = useRef<HTMLDivElement>(null);
  
  // Data States
  const [post, setPost] = useState<PostData | null>(null);
  const [comments, setComments] = useState<PostComment[]>([]);
  
  // UI States
  const [loading, setLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  
  // Form States
  const [caption, setCaption] = useState('');
  const [imageUrl, setImageUrl] = useState(dayContent.initialImageUrl || '');
  const [newComment, setNewComment] = useState('');

  // Scroll to bottom of comments
  const scrollToBottom = () => {
    commentsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [comments]);

  // --- 1. BUSCAR DADOS REAIS DO SUPABASE (POST + COMENTÁRIOS) ---
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      
      const { data: postData } = await supabase
        .from('posts')
        .select('*')
        .eq('date_key', dateKey)
        .single();

      if (postData) {
        setPost(postData);
        setCaption(postData.caption || '');
        setImageUrl(postData.image_url || dayContent.initialImageUrl || '');
        
        if (userRole === 'admin' && (!postData.caption && !postData.image_url)) {
          setIsEditing(true);
        } else {
          setIsEditing(false);
        }
      } else {
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
        if (userRole === 'admin') setIsEditing(true);
      }

      const { data: commentsData } = await supabase
        .from('comments')
        .select('*')
        .eq('post_id', dateKey)
        .order('created_at', { ascending: true });

      if (commentsData) {
        setComments(commentsData as PostComment[]);
      }

      setLoading(false);
    };

    fetchData();
  }, [dateKey, dayContent, userRole]);

  // --- 2. UPLOAD DE IMAGEM/VÍDEO ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const fileExt = file.name.split('.').pop();
      const fileName = `${dateKey.replace(/\//g, '-')}-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('post-uploads')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('post-uploads')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (error) {
      console.error('Erro no upload:', error);
      alert('Erro ao fazer upload. Verifique se o bucket "post-uploads" existe e é público.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSavePost = async () => {
    try {
      setLoading(true);
      const statusToSave: PostStatus = 'pending_approval'; 
      const payload = {
        date_key: dateKey,
        image_url: imageUrl,
        caption: caption,
        status: statusToSave,
        last_updated: new Date().toISOString()
      };

      const { error } = await supabase
        .from('posts')
        .upsert(payload, { onConflict: 'date_key' });

      if (error) throw error;

      setPost(prev => ({ ...prev!, ...payload }));
      setIsEditing(false); 
      
    } catch (error) {
      console.error('Erro ao salvar:', error);
      alert('Erro ao salvar publicação.');
    } finally {
      setLoading(false);
    }
  };

  const handleSendComment = async () => {
    if (!newComment.trim()) return;

    const commentContent = newComment;
    setNewComment('');

    const newCommentObj = {
      post_id: dateKey,
      author_role: userRole,
      author_name: userRole === 'admin' ? 'Canguru' : userRole === 'approver' ? 'Viviane' : 'Equipe Next',
      content: commentContent,
      visible_to_admin: true 
    };

    try {
      const { data: savedComment, error } = await supabase
        .from('comments')
        .insert(newCommentObj)
        .select()
        .single();

      if (error) throw error;
      if (savedComment) {
        setComments(prev => [...prev, savedComment as PostComment]);
      }

      if (userRole === 'approver') {
        await supabase
          .from('posts')
          .update({ status: 'changes_requested' })
          .eq('date_key', dateKey);
          
        setPost(prev => prev ? ({ ...prev, status: 'changes_requested' }) : null);
      }

    } catch (err) {
      console.error('Erro ao comentar:', err);
      alert('Erro ao enviar comentário.');
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
    if (!confirm('Deseja marcar esta publicação como PUBLICADA oficialmente? Isso mudará o status para Verde.')) return;
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

  const handleCopyLink = () => {
     // Generate Public Link
     const url = `${window.location.origin}/?mode=public&id=${dateKey}`;
     navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2000);
     });
  };

  // --- HELPERS VISUAIS ---
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

  const isVideo = imageUrl?.match(/\.(mp4|webm|ogg)$/i);
  const isLinkedin = dayContent.platform === 'linkedin';

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-2 sm:p-4">
      <div className="absolute inset-0 bg-black/80 backdrop-blur-sm" onClick={onClose}></div>
      
      {/* Modal Container */}
      <div className="bg-white w-full max-w-[95%] xl:max-w-7xl h-[95vh] rounded-xl shadow-2xl relative z-10 flex flex-col md:flex-row overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button onClick={onClose} className="absolute top-3 right-3 z-50 p-2 bg-white rounded-full text-gray-500 hover:text-red-500 shadow-md border border-gray-100 transition-colors">
          <X size={20} />
        </button>

        {/* --- LEFT: PREVIEW AREA (70%) --- */}
        <div className="w-full md:w-[70%] bg-gray-100 flex flex-col border-r border-gray-200 overflow-y-auto custom-scrollbar relative">
          
          {/* Status Bar Floating */}
          <div className="sticky top-0 z-20 w-full p-4 flex justify-between items-start pointer-events-none">
             <div className="flex gap-2">
                <span className={`pointer-events-auto px-4 py-1.5 rounded-full text-xs font-bold border uppercase tracking-wide shadow-sm bg-white ${getStatusColor(post?.status || 'draft').replace('bg-', 'text-')}`}>
                    {getStatusLabel(post?.status || 'draft')}
                </span>
                {isVideo && (
                    <span className="pointer-events-auto flex items-center gap-1 text-xs font-bold text-gray-500 bg-white px-2 py-1 rounded border shadow-sm">
                    <FileVideo size={12} /> Vídeo
                    </span>
                )}
             </div>
             
             {/* Admin: Share Link Button */}
             {userRole === 'admin' && (
               <button 
                  onClick={handleCopyLink}
                  className="pointer-events-auto flex items-center gap-2 bg-white px-3 py-1.5 rounded-full text-xs font-bold text-gray-600 border border-gray-200 shadow-sm hover:text-blue-600 hover:border-blue-300 transition-all"
               >
                  {copiedLink ? <Check size={14} className="text-green-500" /> : <Link size={14} />}
                  {copiedLink ? 'Link Copiado!' : 'Link de Aprovação'}
               </button>
             )}
          </div>

          <div className="flex-grow p-6 sm:p-10 flex items-start justify-center">
             <div className="w-full max-w-lg">
                {isLinkedin ? (
                  <LinkedInView 
                     dayContent={dayContent} 
                     caption={caption} 
                     imageUrl={imageUrl} 
                     isVideo={!!isVideo} 
                     isUploading={isUploading}
                  />
                ) : (
                  <InstagramView 
                     dayContent={dayContent} 
                     caption={caption} 
                     imageUrl={imageUrl} 
                     isVideo={!!isVideo} 
                     isUploading={isUploading}
                  />
                )}
             </div>
          </div>
          
          <div className="p-4 text-center text-xs text-gray-400 font-medium">
             Visualização simulada ({isLinkedin ? 'LinkedIn' : 'Instagram'})
          </div>
        </div>

        {/* --- RIGHT: ACTIONS & CHAT (30%) --- */}
        <div className="w-full md:w-[30%] flex flex-col h-full bg-white relative border-l border-gray-200">
          
          {/* Header Actions */}
          <div className="p-4 border-b border-gray-100 flex flex-col gap-3 bg-gray-50/50">
             <div className="flex justify-between items-start">
                <div>
                  <h2 className="font-bold text-gray-900 text-base">{dayContent.day}</h2>
                  <span className="text-xs text-gray-500 uppercase font-medium">{dayContent.platform}</span>
                </div>
                {userRole === 'admin' && (
                     <button 
                       onClick={() => setIsEditing(!isEditing)}
                       className={`text-[10px] font-bold px-3 py-1.5 rounded border flex items-center gap-1 transition-colors ${isEditing ? 'bg-blue-600 text-white border-blue-600' : 'bg-white text-gray-500 border-gray-200 hover:bg-gray-50'}`}
                     >
                       <Edit3 size={12} /> {isEditing ? 'Fech. Edição' : 'Editar'}
                     </button>
                   )}
             </div>

             <div className="flex gap-2">
                {userRole === 'approver' && post?.status === 'pending_approval' && (
                    <button onClick={handleApprove} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all">
                       <CheckCircle2 size={14} /> Aprovar
                    </button>
                )}
                
                {userRole === 'admin' && post?.status === 'approved' && (
                    <button onClick={handlePublish} className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-bold text-xs shadow-sm transition-all">
                       <Globe size={14} /> Marcar Publicado
                    </button>
                )}
             </div>
          </div>

          <div className="flex-grow flex flex-col overflow-hidden">
            
            {/* 1. ADMIN EDITING AREA */}
            {userRole === 'admin' && isEditing && (
              <div className="p-4 border-b border-gray-100 bg-blue-50/30 animate-in slide-in-from-top-2 shrink-0">
                 <div className="flex flex-col gap-3">
                    {/* Image Upload */}
                    <label className={`h-20 border-2 border-dashed border-blue-200 bg-white hover:bg-blue-50 rounded-lg flex flex-row items-center justify-center gap-3 cursor-pointer transition-colors group ${isUploading ? 'opacity-50 cursor-not-allowed' : ''}`}>
                          <input 
                            type="file" 
                            accept="image/*,video/*" 
                            onChange={handleImageUpload} 
                            className="hidden" 
                            disabled={isUploading}
                          />
                          {isUploading ? (
                            <RefreshCw size={20} className="text-blue-400 animate-spin" />
                          ) : (
                            <UploadCloud size={20} className="text-blue-400 group-hover:scale-110 transition-transform" />
                          )}
                          <span className="text-xs text-blue-800 font-bold">{isUploading ? 'Enviando...' : 'Trocar Imagem/Vídeo'}</span>
                    </label>

                    {/* Caption Edit */}
                    <textarea 
                        placeholder="Escreva a legenda aqui..."
                        value={caption}
                        onChange={e => setCaption(e.target.value)}
                        className="w-full h-32 px-3 py-2 border border-gray-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                    />
                    <button 
                        onClick={handleSavePost} 
                        disabled={loading || isUploading}
                        className={`w-full text-xs font-bold bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 shadow-sm flex items-center justify-center gap-2 transition-all ${loading ? 'opacity-70 cursor-wait' : ''}`}
                        >
                        {loading ? <RefreshCw size={14} className="animate-spin" /> : <Save size={14} />}
                        Salvar Alterações
                    </button>
                 </div>
              </div>
            )}

            {/* 2. CHAT / HISTORY AREA */}
            <div className="flex-grow overflow-y-auto p-4 bg-gray-50 custom-scrollbar flex flex-col gap-3">
               <div className="text-[10px] text-center text-gray-400 font-medium uppercase tracking-widest mb-2 border-b border-gray-100 pb-2">Histórico de Comentários</div>
               
               {comments.length === 0 ? (
                  <div className="flex flex-col items-center justify-center h-full text-gray-400 opacity-60">
                     <MessageCircle size={32} className="mb-2" />
                     <p className="text-xs font-medium">Sem comentários.</p>
                  </div>
               ) : (
                 comments.map((comment) => (
                    <div key={comment.id} className={`flex gap-2 max-w-[90%] ${comment.author_role === 'admin' ? 'self-end flex-row-reverse' : 'self-start'}`}>
                       
                       <div className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 shadow-sm border border-white ${
                          comment.author_role === 'admin' ? 'bg-brand-dark text-white' : 
                          comment.author_role === 'approver' ? 'bg-green-600 text-white' :
                          'bg-purple-600 text-white'
                       }`}>
                          {comment.author_name.charAt(0)}
                       </div>

                       <div className={`p-2.5 rounded-xl text-xs shadow-sm relative group ${
                          comment.author_role === 'admin' ? 'bg-white text-gray-800 rounded-tr-none' : 
                          comment.author_role === 'approver' ? 'bg-green-100 text-green-900 rounded-tl-none' :
                          'bg-purple-100 text-purple-900 rounded-tl-none'
                       }`}>
                          <div className="flex items-center gap-2 mb-1 opacity-70">
                             <span className="font-bold text-[9px] uppercase tracking-wide">{comment.author_name}</span>
                          </div>
                          <p className="leading-relaxed whitespace-pre-wrap">{comment.content}</p>
                       </div>
                    </div>
                 ))
               )}
               <div ref={commentsEndRef} />
            </div>

            {/* 3. INPUT AREA */}
            <div className="p-3 bg-white border-t border-gray-100 shrink-0">
               <div className="relative flex items-center gap-2">
                  <input 
                    type="text"
                    value={newComment}
                    onChange={e => setNewComment(e.target.value)}
                    placeholder={userRole === 'approver' ? "Comentar e Solicitar Ajuste..." : "Escreva um comentário..."}
                    className="flex-grow pl-3 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-dark outline-none transition-all text-xs"
                    onKeyDown={e => e.key === 'Enter' && handleSendComment()}
                  />
                  <button 
                    onClick={handleSendComment}
                    disabled={!newComment.trim()}
                    className="absolute right-1.5 p-1.5 bg-brand-dark text-white rounded-md hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                     <Send size={14} />
                  </button>
               </div>
               {userRole === 'approver' && (
                 <p className="text-[9px] text-red-500 mt-1.5 text-center flex items-center justify-center gap-1 opacity-80">
                    <AlertTriangle size={10} />
                    Comentar altera status para "Ajustes"
                 </p>
               )}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};
