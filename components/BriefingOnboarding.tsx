import React, { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';
import { CheckCircle, AlertCircle, ChevronRight, FileText, Send, ArrowLeft, Target } from 'lucide-react';

import { Logo } from './Logo';

const BRIEFING_QUESTIONS: Record<string, any[]> = {
  'Social Media': [
    { key: 'objetivo', label: 'Qual o objetivo principal das suas redes sociais?', type: 'textarea', placeholder: 'awareness, engajamento, vendas, retenção' },
    { key: 'publico_alvo', label: 'Descreva seu público-alvo ideal', type: 'textarea', placeholder: 'idade, gênero, localização, interesses' },
    { key: 'tom_voz', label: 'Qual o tom de voz da sua marca?', type: 'text', placeholder: 'formal, descontraído, técnico, inspiracional, divertido' },
    { key: 'concorrentes', label: 'Cite até 3 concorrentes ou marcas que admira nas redes sociais', type: 'textarea'},
    { key: 'produtos_prioridade', label: 'Quais produtos ou serviços devem ser priorizados no conteúdo?', type: 'textarea'},
    { key: 'restricao_conteudo', label: 'Existe alguma restrição de conteúdo?', type: 'textarea', placeholder: 'temas, imagens, palavras que não devem ser usados'}
  ],
  'Tráfego Pago': [
    { key: 'produtos_anuncio', label: 'Quais produtos ou serviços serão anunciados?', type: 'textarea'},
    { key: 'ticket_medio', label: 'Qual o ticket médio do seu produto/serviço principal?', type: 'text'},
    { key: 'objetivo_campanha', label: 'Qual o objetivo das campanhas?', type: 'text', placeholder: 'geração de leads, vendas diretas, tráfego para site, reconhecimento de marca'},
    { key: 'investimento_mensal', label: 'Qual o investimento mensal disponível para anúncios (verba de mídia)?', type: 'text'},
    { key: 'tem_pixel', label: 'Já possui pixel/tag instalado no site? Tem conta de anúncios ativa?', type: 'text'},
    { key: 'diferencial', label: 'Qual o principal diferencial do seu produto/serviço em relação à concorrência?', type: 'textarea'}
  ],
  'Website': [
    { key: 'objetivo', label: 'Qual o objetivo principal do site?', type: 'text', placeholder: 'institucional, e-commerce, landing page, portfólio'},
    { key: 'paginas', label: 'Quais páginas são necessárias?', type: 'text', placeholder: 'ex: home, sobre, serviços, contato, blog'},
    { key: 'referencias', label: 'Tem referências de sites que gosta? (cole as URLs)', type: 'textarea'},
    { key: 'dominio_hospedagem', label: 'Já possui domínio registrado? Tem hospedagem?', type: 'text'},
    { key: 'textos', label: 'Tem textos prontos ou precisaremos criar do zero?', type: 'text'},
    { key: 'identidade_visual', label: 'Já tem identidade visual definida (cores, fontes, logo)?', type: 'text'}
  ],
  'E-mail Marketing': [
    { key: 'base_emails', label: 'Possui base de e-mails? Quantos contatos aproximadamente?', type: 'text'},
    { key: 'ferramenta', label: 'Qual ferramenta de e-mail utiliza atualmente? (ou nenhuma)', type: 'text'},
    { key: 'frequencia', label: 'Qual a frequência desejada de envios por mês?', type: 'text'},
    { key: 'objetivo', label: 'Objetivo principal:', type: 'text', placeholder: 'newsletter, nutrição de leads, promoções, comunicados'}
  ],
  'Identidade Visual': [
    { key: 'logo_atual', label: 'Já possui logo? Quer reformular ou criar do zero?', type: 'text'},
    { key: 'marcas_admira', label: 'Cite marcas cuja identidade visual você admira e por quê', type: 'textarea'},
    { key: 'adjetivos', label: 'Quais adjetivos descrevem sua marca?', type: 'text', placeholder: 'ex: moderno, acolhedor, premium, jovem'},
    { key: 'restricoes', label: 'Tem alguma restrição de cores ou elementos visuais?', type: 'text'}
  ],
  'Papelaria': [
    { key: 'pecas', label: 'Quais peças de papelaria são necessárias?', type: 'textarea', placeholder: 'cartão de visita, papel timbrado, envelope, pasta, apresentação'},
    { key: 'idv_aprovada', label: 'Já possui identidade visual aprovada para aplicar?', type: 'text'},
    { key: 'preferencia_material', label: 'Tem preferência de material/acabamento para impressão?', type: 'text'}
  ],
  'Fotos com IA': [
    { key: 'uso_principal', label: 'Qual o uso principal das fotos?', type: 'text', placeholder: 'redes sociais, site, materiais de marketing'},
    { key: 'fotos_reais', label: 'Tem fotos reais suas ou do produto para usar como referência de estilo?', type: 'text'},
    { key: 'ambientes', label: 'Prefere ambientes:', type: 'text', placeholder: 'estúdio, externo, lifestyle, produto'},
    { key: 'restricoes', label: 'Tem restrições de imagem?', type: 'text', placeholder: 'não quer aparecer, prefere só produto, etc.'}
  ]
};

export const BriefingOnboarding: React.FC<{ isDashboardView?: boolean }> = ({ isDashboardView }) => {
  const { activeClient, refreshActiveClient } = useAuth();
  const [briefings, setBriefings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (activeClient) {
      loadBriefings();
    }
  }, [activeClient]);

  const loadBriefings = async () => {
    setLoading(true);
    try {
      const services = activeClient?.services || [];
      
      const { data: existingBriefings } = await supabase
        .from('client_briefings')
        .select('*')
        .eq('client_id', activeClient!.id);
      
      let currentBriefings = existingBriefings || [];
      let neededToCreate = [];

      for (const service of services) {
        if (!BRIEFING_QUESTIONS[service]) continue; // Only process services we have questions for
        const exists = currentBriefings.find((b: any) => b.service_type === service);
        if (!exists) {
          neededToCreate.push({
            client_id: activeClient!.id,
            agency_id: 1,
            service_type: service,
            answers: {},
            completed: false
          });
        }
      }

      if (neededToCreate.length > 0) {
        const { data: created } = await supabase
          .from('client_briefings')
          .insert(neededToCreate)
          .select();
        
        if (created) {
          currentBriefings = [...currentBriefings, ...created];
        }
      }

      setBriefings(currentBriefings.filter((b: any) => services.includes(b.service_type) && !!BRIEFING_QUESTIONS[b.service_type]));
      
      // Check overall completion
      const applicableServices = services.filter(s => !!BRIEFING_QUESTIONS[s]);
      if (applicableServices.length > 0) {
          const completedCount = currentBriefings.filter((b: any) => b.completed).length;
          if (completedCount === applicableServices.length && !activeClient?.onboarding_completed) {
            await supabase.from('clients').update({ onboarding_completed: true }).eq('id', activeClient!.id);
            await refreshActiveClient();
          }
      } else if (!activeClient?.onboarding_completed) {
         await supabase.from('clients').update({ onboarding_completed: true }).eq('id', activeClient!.id);
         await refreshActiveClient();
      }

    } catch (err) {
      console.error('Error loading briefings', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectBriefing = (briefing: any) => {
    setSelectedService(briefing.service_type);
    setFormData(briefing.answers || {});
  };

  const handleSave = async (complete: boolean) => {
    if (!selectedService || !activeClient) return;
    setSaving(true);
    
    try {
      await supabase
        .from('client_briefings')
        .update({
          answers: formData,
          completed: complete,
          completed_at: complete ? new Date().toISOString() : null
        })
        .eq('client_id', activeClient.id)
        .eq('service_type', selectedService);
      
      await loadBriefings();
      if (complete) setSelectedService(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64 w-full">
        <div className="w-8 h-8 border-4 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin" />
      </div>
    );
  }

  const allCompleted = briefings.length > 0 && briefings.every(b => b.completed);
  const completedCount = briefings.filter(b => b.completed).length;

  if (selectedService) {
    const questions = BRIEFING_QUESTIONS[selectedService] || [];
    return (
      <div className="w-full min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex flex-col items-center justify-center py-10 px-4 relative">
        <div className="absolute top-10 left-10 hidden sm:block">
          <Logo className="w-48" />
        </div>
        
        <div className="w-full max-w-3xl mx-auto p-4 sm:p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03] min-h-[80vh] flex flex-col pt-10">
          <button 
            onClick={() => setSelectedService(null)}
          className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest text-gray-500 hover:text-brand-dark transition-colors mb-8 w-fit"
        >
          <ArrowLeft size={16} /> Voltar para os briefings
        </button>
        
        <h2 className="text-3xl font-black text-brand-dark mb-2 tracking-tight">{selectedService}</h2>
        <p className="text-gray-500 font-medium mb-10">Preencha as informações detalhadas para este serviço.</p>

        <div className="space-y-8 flex-1">
          {questions.map((q) => (
            <div key={q.key}>
              <label className="block text-sm font-bold text-gray-800 mb-3">{q.label}</label>
              {q.type === 'textarea' ? (
                <textarea
                  value={formData[q.key] || ''}
                  onChange={(e) => setFormData({ ...formData, [q.key]: e.target.value })}
                  placeholder={q.placeholder}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark resize-none shadow-sm transition-all bg-gray-50/50"
                  rows={4}
                />
              ) : (
                <input
                  type="text"
                  value={formData[q.key] || ''}
                  onChange={(e) => setFormData({ ...formData, [q.key]: e.target.value })}
                  placeholder={q.placeholder}
                  className="w-full border border-gray-200 rounded-2xl px-5 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark shadow-sm transition-all bg-gray-50/50"
                />
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row gap-4 pt-8 border-t border-gray-100 pb-10">
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 border border-gray-200 text-gray-700 rounded-2xl hover:bg-gray-50 transition-colors font-bold tracking-widest uppercase text-xs disabled:opacity-50"
          >
            Salvar Rascunho
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-brand-dark text-white rounded-2xl hover:opacity-90 transition-opacity font-bold tracking-widest uppercase text-xs shadow-lg disabled:opacity-50"
          >
            {saving ? 'Salvando...' : <><CheckCircle size={16} /> Concluir Briefing</>}
          </button>
        </div>
      </div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-[#FDFDFD] flex flex-col items-center justify-center py-10 px-4 relative">
      <div className="absolute top-10 left-10">
        <Logo className="w-56" />
      </div>
      
      <div className="max-w-4xl w-full p-6 sm:p-10 bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-black/[0.03]">
        <div className="mb-10 text-center">
          <div className="w-20 h-20 bg-brand-dark/5 rounded-[1.5rem] flex items-center justify-center mx-auto mb-6 shrink-0 text-brand-dark">
            <Target size={32} />
          </div>
          <h1 className="text-3xl sm:text-4xl font-black text-brand-dark mb-4 tracking-tight">Bem-vindo!</h1>
          <p className="text-gray-500 font-medium max-w-lg mx-auto text-sm sm:text-base mb-8">
            Antes de começar, precisamos de algumas informações estratégicas. Preencha os formulários dos serviços contratados abaixo.
          </p>
          
          <div className="max-w-lg mx-auto">
            <div className="mb-3 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest text-gray-400">
              <span>Progresso Geral</span>
              <span>{completedCount} de {briefings.length} concluídos</span>
            </div>
            <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
               <div className="h-full bg-brand-dark transition-all duration-500" style={{ width: `${briefings.length ? (completedCount / briefings.length) * 100 : 0}%` }} />
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 mb-10 max-w-2xl mx-auto">
          {briefings.map(b => (
            <div 
              key={b.id} 
              onClick={() => handleSelectBriefing(b)}
              className={`p-6 rounded-[1.5rem] border-2 cursor-pointer transition-all hover:-translate-y-1 ${b.completed ? 'border-green-100 bg-green-50/50' : 'border-gray-100 hover:border-brand-dark bg-white shadow-[0_4px_20px_rgba(0,0,0,0.03)]'}`}
            >
               <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${b.completed ? 'bg-green-100 text-green-600' : 'bg-brand-dark/5 text-brand-dark'}`}>
                    {b.completed ? <CheckCircle size={24} /> : <FileText size={24} />}
                  </div>
                  <div className="flex-1 min-w-0">
                     <h3 className="font-bold text-gray-900 truncate text-lg">{b.service_type}</h3>
                     <span className={`text-[10px] uppercase tracking-widest font-bold mt-1 block ${b.completed ? 'text-green-600' : 'text-gray-400'}`}>
                        {b.completed ? 'Concluído' : 'Pendente'}
                     </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-300 shrink-0" />
               </div>
            </div>
          ))}
        </div>

        {allCompleted && briefings.length > 0 && (
          <div className="flex justify-center border-t border-gray-100 pt-10">
            <button
              onClick={() => window.location.reload()}
              className="flex items-center gap-3 px-8 py-4 bg-brand-dark text-white rounded-2xl font-bold uppercase tracking-widest text-sm hover:opacity-90 transition-all hover:shadow-xl shadow-brand-dark/20 hover:-translate-y-1"
            >
              Acessar minha Bolsa <Send size={18} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
