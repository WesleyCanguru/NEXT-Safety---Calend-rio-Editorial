
import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { DETAILED_MONTHLY_PLANS } from '../constants';
import { PostData, PostStatus } from '../types';
import { InstagramView, LinkedInView } from './PlatformViews';
import { Logo } from './Logo';
import { CheckCircle2, AlertTriangle, Send, User, Loader2, XCircle } from 'lucide-react';

export const PublicApprovalScreen: React.FC = () => {
  const [loading, setLoading] = useState(true);
  const [postData, setPostData] = useState<PostData | null>(null);
  const [dayContent, setDayContent] = useState<any>(null);
  const [error, setError] = useState('');
  
  // Interaction State
  const [userName, setUserName] = useState('');
  const [showNamePrompt, setShowNamePrompt] = useState(false);
  const [pendingAction, setPendingAction] = useState<'approve' | 'request_changes' | null>(null);
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');

  // Get ID from URL
  const queryParams = new URLSearchParams(window.location.search);
  const dateKey = queryParams.get('id');

  useEffect(() => {
    if (!dateKey) {
      setError('Link inválido ou expirado.');
      setLoading(false);
      return;
    }

    const loadData = async () => {
      try {
        // 1. Find Static Content from Constants
        let foundContent = null;
        // Logic to reverse lookup content from DETAILED_MONTHLY_PLANS based on dateKey (format: DD-MM-YYYY)
        // dateKey example: 03-02-2026
        const [day, month, year] = dateKey.split('-');
        const searchKey = `${day}/${month}`;
        
        for (const plan of DETAILED_MONTHLY_PLANS) {
           for (const week of plan.weeks) {
              for (const d of week.days) {
                 if (d.day.includes(searchKey)) {
                    foundContent = d;
                    break;
                 }
              }
           }
        }

        if (!foundContent) {
           setError('Conteúdo não encontrado no planejamento.');
           setLoading(false);
           return;
        }
        setDayContent(foundContent);

        // 2. Fetch Live Data from Supabase
        const { data } = await supabase
          .from('posts')
          .select('*')
          .eq('date_key', dateKey)
          .single();

        if (data) {
           setPostData(data);
        } else {
           // If no post record exists, create a dummy one based on static content
           setPostData({
              date_key: dateKey,
              status: foundContent.exclusive ? 'approved' : 'draft',
              image_url: foundContent.initialImageUrl || null,
              caption: null,
              last_updated: new Date().toISOString()
           });
        }

      } catch (err) {
        console.error(err);
        setError('Erro ao carregar publicação.');
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [dateKey]);

  const handleActionClick = (action: 'approve' | 'request_changes') => {
    setPendingAction(action);
    if (!userName) {
       setShowNamePrompt(true);
    } else {
       executeAction(action, userName);
    }
  };

  const handleNameSubmit = () => {
     if (!userName.trim()) return;
     setShowNamePrompt(false);
     if (pendingAction) {
        executeAction(pendingAction, userName);
     }
  };

  const executeAction = (action: 'approve' | 'request_changes', name: string) => {
     if (action === 'request_changes') {
        setShowCommentBox(true); // Open comment box only for changes
     } else {
        submitApproval(name);
     }
  };

  const submitApproval = async (name: string) => {
     if (!dateKey) return;
     setSubmitting(true);
     try {
        // 1. Update Status
        await supabase
           .from('posts')
           .upsert({
              date_key: dateKey,
              status: 'approved',
              image_url: postData?.image_url, // Ensure we don't lose data if upserting new
              caption: postData?.caption,
              last_updated: new Date().toISOString()
           }, { onConflict: 'date_key' });

        // 2. Add System Comment
        await supabase.from('comments').insert({
           post_id: dateKey,
           author_role: 'approver',
           author_name: name,
           content: `✅ APROVOU a publicação.`,
           visible_to_admin: true
        });

        setPostData(prev => prev ? ({...prev, status: 'approved'}) : null);
        setSuccessMessage('Publicação aprovada com sucesso!');
        setPendingAction(null);
     } catch (err) {
        alert('Erro ao aprovar.');
     } finally {
        setSubmitting(false);
     }
  };

  const submitChanges = async () => {
     if (!dateKey || !comment.trim()) return;
     setSubmitting(true);
     try {
        // 1. Update Status
        await supabase
           .from('posts')
           .upsert({
              date_key: dateKey,
              status: 'changes_requested',
              image_url: postData?.image_url,
              caption: postData?.caption,
              last_updated: new Date().toISOString()
           }, { onConflict: 'date_key' });

        // 2. Add Comment
        await supabase.from('comments').insert({
           post_id: dateKey,
           author_role: 'approver',
           author_name: userName,
           content: comment,
           visible_to_admin: true
        });

        setPostData(prev => prev ? ({...prev, status: 'changes_requested'}) : null);
        setSuccessMessage('Solicitação de ajuste enviada!');
        setShowCommentBox(false);
        setComment('');
        setPendingAction(null);

     } catch (err) {
        alert('Erro ao enviar solicitação.');
     } finally {
        setSubmitting(false);
     }
  };

  if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50"><Loader2 className="animate-spin text-blue-600" size={40} /></div>;
  if (error) return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-red-600 font-bold">{error}</div>;

  const isVideo = postData?.image_url?.match(/\.(mp4|webm|ogg)$/i);
  const isLinkedin = dayContent?.platform === 'linkedin';

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
       {/* Header Public */}
       <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-20">
          <div className="max-w-3xl mx-auto px-4 flex justify-between items-center">
             <Logo size="small" />
             <div className="text-right">
                <span className="block text-[10px] text-gray-400 uppercase tracking-widest font-bold">Ambiente de Aprovação</span>
                {userName && <span className="text-xs font-bold text-blue-600">Olá, {userName}</span>}
             </div>
          </div>
       </header>

       <main className="flex-grow flex flex-col items-center p-4 sm:p-8">
          
          {successMessage ? (
             <div className="w-full max-w-lg bg-green-50 border border-green-200 rounded-xl p-8 text-center animate-in zoom-in-95">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                   <CheckCircle2 size={32} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-2">Sucesso!</h2>
                <p className="text-gray-600">{successMessage}</p>
                <button 
                  onClick={() => setSuccessMessage('')}
                  className="mt-6 text-sm text-green-700 font-bold underline"
                >
                   Voltar para visualização
                </button>
             </div>
          ) : (
             <div className="w-full max-w-4xl flex flex-col md:flex-row gap-8 items-start">
                
                {/* Preview Column */}
                <div className="w-full md:w-1/2 flex flex-col">
                   <div className="bg-white p-2 rounded-xl shadow-sm border border-gray-200 mb-4">
                      {isLinkedin ? (
                         <LinkedInView 
                           dayContent={dayContent} 
                           caption={postData?.caption || ''} 
                           imageUrl={postData?.image_url || ''} 
                           isVideo={!!isVideo} 
                         />
                      ) : (
                         <InstagramView 
                           dayContent={dayContent} 
                           caption={postData?.caption || ''} 
                           imageUrl={postData?.image_url || ''} 
                           isVideo={!!isVideo} 
                         />
                      )}
                   </div>
                   
                   <div className="text-center">
                      <span className={`inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide border 
                         ${postData?.status === 'approved' ? 'bg-green-100 text-green-700 border-green-200' : 
                           postData?.status === 'changes_requested' ? 'bg-red-100 text-red-700 border-red-200' : 
                           'bg-gray-100 text-gray-600 border-gray-200'
                         }`}>
                         Status Atual: {postData?.status === 'approved' ? 'Aprovado' : postData?.status === 'changes_requested' ? 'Ajustes Solicitados' : 'Em Análise'}
                      </span>
                   </div>
                </div>

                {/* Actions Column */}
                <div className="w-full md:w-1/2 flex flex-col gap-4 sticky top-24">
                   
                   {/* Context Box */}
                   <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-200">
                      <h2 className="text-lg font-bold text-gray-900 mb-1">{dayContent.day}</h2>
                      <p className="text-sm text-gray-500 mb-6">{dayContent.theme}</p>

                      {!showCommentBox && !showNamePrompt && (
                         <div className="flex flex-col gap-3">
                            <button 
                              onClick={() => handleActionClick('approve')}
                              className="w-full py-4 bg-green-600 hover:bg-green-700 text-white rounded-xl font-bold shadow-sm transition-all flex items-center justify-center gap-2"
                            >
                               <CheckCircle2 size={20} /> Aprovar Publicação
                            </button>
                            <button 
                              onClick={() => handleActionClick('request_changes')}
                              className="w-full py-4 bg-white hover:bg-red-50 text-red-600 border border-red-200 rounded-xl font-bold transition-all flex items-center justify-center gap-2"
                            >
                               <AlertTriangle size={20} /> Solicitar Ajuste
                            </button>
                         </div>
                      )}

                      {/* Name Prompt */}
                      {showNamePrompt && (
                         <div className="animate-in fade-in slide-in-from-bottom-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">Para continuar, qual seu nome?</label>
                            <input 
                              autoFocus
                              type="text" 
                              value={userName}
                              onChange={e => setUserName(e.target.value)}
                              placeholder="Ex: Steven, Viviane..."
                              className="w-full p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-blue-500 outline-none"
                            />
                            <div className="flex gap-2">
                               <button onClick={handleNameSubmit} disabled={!userName.trim()} className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-bold disabled:opacity-50">Continuar</button>
                               <button onClick={() => setShowNamePrompt(false)} className="px-4 text-gray-500">Cancelar</button>
                            </div>
                         </div>
                      )}

                      {/* Comment Box */}
                      {showCommentBox && (
                         <div className="animate-in fade-in slide-in-from-bottom-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">O que precisa ser ajustado?</label>
                            <textarea 
                              autoFocus
                              value={comment}
                              onChange={e => setComment(e.target.value)}
                              placeholder="Descreva o que gostaria de alterar..."
                              className="w-full h-32 p-3 border border-gray-300 rounded-lg mb-4 focus:ring-2 focus:ring-red-500 outline-none resize-none text-sm"
                            />
                            <div className="flex gap-2">
                               <button 
                                 onClick={submitChanges} 
                                 disabled={!comment.trim() || submitting} 
                                 className="flex-1 bg-red-600 text-white py-2 rounded-lg font-bold disabled:opacity-50 flex items-center justify-center gap-2"
                               >
                                  {submitting ? <Loader2 className="animate-spin" size={16} /> : <Send size={16} />}
                                  Enviar Solicitação
                               </button>
                               <button onClick={() => setShowCommentBox(false)} disabled={submitting} className="px-4 text-gray-500 font-medium">Cancelar</button>
                            </div>
                         </div>
                      )}
                   </div>

                   <p className="text-xs text-gray-400 text-center leading-relaxed">
                      Ao aprovar, a publicação entrará na fila de agendamento.<br/>
                      Ao solicitar ajustes, a equipe será notificada imediatamente.
                   </p>
                </div>
             </div>
          )}
       </main>
    </div>
  );
};
