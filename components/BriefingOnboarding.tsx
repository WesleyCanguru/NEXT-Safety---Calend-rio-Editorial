import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../lib/supabase';
import { CheckCircle, AlertCircle, ChevronRight, FileText, Save, Send } from 'lucide-react';

interface ClientBriefing {
  id: string;
  client_id: string;
  briefing_type: string;
  responses: Record<string, any>;
  is_completed: boolean;
}

const BRIEFING_TITLES: Record<string, string> = {
  publico_alvo: 'Público-Alvo',
  tom_voz: 'Tom de Voz',
  posicionamento: 'Posicionamento',
  site: 'Site',
  trafego_pago: 'Tráfego Pago',
  persona: 'Persona'
};

export const BriefingOnboarding: React.FC<{ isDashboardView?: boolean }> = ({ isDashboardView }) => {
  const { activeClient, refreshActiveClient } = useAuth();
  const [briefings, setBriefings] = useState<ClientBriefing[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedBriefing, setSelectedBriefing] = useState<ClientBriefing | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (activeClient) {
      fetchBriefings();
    }
  }, [activeClient]);

  const fetchBriefings = async () => {
    if (!activeClient) return;
    setLoading(true);
    const { data, error } = await supabase
      .from('client_briefings')
      .select('*')
      .eq('client_id', activeClient.id)
      .order('created_at', { ascending: true });
    
    if (!error && data) {
      setBriefings(data);
      
      // If no briefings are assigned, automatically complete onboarding to prevent blocking
      if (data.length === 0 && !activeClient.onboarding_completed) {
        await supabase
          .from('clients')
          .update({ onboarding_completed: true })
          .eq('id', activeClient.id);
        
        await refreshActiveClient();
      }
    }
    setLoading(false);
  };

  const handleSelectBriefing = (briefing: ClientBriefing) => {
    setSelectedBriefing(briefing);
    setFormData(briefing.responses || {});
    setError(null);
  };

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (complete: boolean) => {
    if (!selectedBriefing || !activeClient) return;
    setSaving(true);
    setError(null);

    const { error } = await supabase
      .from('client_briefings')
      .update({
        responses: formData,
        is_completed: complete,
        completed_at: complete ? new Date().toISOString() : null
      })
      .eq('id', selectedBriefing.id);

    if (error) {
      setError('Erro ao salvar formulário.');
      setSaving(false);
      return;
    }

    // Refresh briefings
    const { data: updatedBriefings } = await supabase
      .from('client_briefings')
      .select('*')
      .eq('client_id', activeClient.id);

    if (updatedBriefings) {
      setBriefings(updatedBriefings);
      
      // Check if all are completed
      const allCompleted = updatedBriefings.every(b => b.is_completed);
      if (allCompleted && !activeClient.onboarding_completed) {
        await supabase
          .from('clients')
          .update({ onboarding_completed: true })
          .eq('id', activeClient.id);
        
        await refreshActiveClient();
      }
    }

    setSelectedBriefing(null);
    setSaving(false);
  };

  const renderField = (key: string, value: any) => {
    const label = key.split('_').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
    
    if (Array.isArray(value)) {
      return (
        <div key={key} className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
          <textarea
            value={formData[key] ? (Array.isArray(formData[key]) ? formData[key].join(', ') : formData[key]) : ''}
            onChange={(e) => handleFieldChange(key, e.target.value.split(',').map(s => s.trim()))}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark resize-none"
            rows={3}
            placeholder="Separe os itens por vírgula"
          />
        </div>
      );
    }

    if (typeof value === 'object' && value !== null) {
      return (
        <div key={key} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
          <label className="block text-sm font-bold text-gray-800 mb-3">{label}</label>
          {Object.entries(value).map(([subKey, subValue]) => (
            <div key={subKey} className="mb-3 last:mb-0">
              <label className="block text-xs font-medium text-gray-600 mb-1">{subKey}</label>
              <input
                type="text"
                value={formData[key]?.[subKey] || ''}
                onChange={(e) => handleFieldChange(key, { ...formData[key], [subKey]: e.target.value })}
                className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark"
              />
            </div>
          ))}
        </div>
      );
    }

    return (
      <div key={key} className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">{label}</label>
        {typeof value === 'string' && value.length > 50 ? (
          <textarea
            value={formData[key] || ''}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark resize-none"
            rows={4}
          />
        ) : (
          <input
            type="text"
            value={formData[key] || ''}
            onChange={(e) => handleFieldChange(key, e.target.value)}
            className="w-full border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-dark"
          />
        )}
      </div>
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="w-8 h-8 border-4 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin" />
      </div>
    );
  }

  if (briefings.length === 0) {
    return (
      <div className="p-8 text-center">
        <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-gray-400" />
        </div>
        <h3 className="text-lg font-bold text-gray-800 mb-2">Nenhum briefing encontrado</h3>
        <p className="text-gray-500">Não há formulários estratégicos configurados para este cliente.</p>
      </div>
    );
  }

  if (selectedBriefing) {
    return (
      <div className="p-6 max-w-3xl mx-auto">
        <div className="flex items-center gap-3 mb-6">
          <button
            onClick={() => setSelectedBriefing(null)}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-gray-500 rotate-180" />
          </button>
          <div>
            <h2 className="text-xl font-bold text-gray-900">
              {BRIEFING_TITLES[selectedBriefing.briefing_type] || selectedBriefing.briefing_type}
            </h2>
            <p className="text-sm text-gray-500">Preencha as informações abaixo</p>
          </div>
        </div>

        {error && (
          <div className="mb-6 flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700">
            <AlertCircle className="w-4 h-4 shrink-0" />
            {error}
          </div>
        )}

        <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm">
          {Object.entries(selectedBriefing.responses || {}).map(([key, value]) => renderField(key, value))}
          
          <div className="mt-8 flex gap-3 pt-6 border-t border-gray-100">
            <button
              onClick={() => handleSave(false)}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-medium disabled:opacity-50"
            >
              <Save className="w-4 h-4" />
              {saving ? 'Salvando...' : 'Salvar Rascunho'}
            </button>
            <button
              onClick={() => handleSave(true)}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 px-5 py-3 bg-brand-dark text-white rounded-xl hover:bg-black transition-colors font-medium disabled:opacity-50"
            >
              <CheckCircle className="w-4 h-4" />
              {saving ? 'Concluindo...' : 'Concluir Formulário'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const allCompleted = briefings.every(b => b.is_completed);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      {!isDashboardView && (
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Briefings Estratégicos</h1>
          <p className="text-gray-500">
            Para começarmos, precisamos que você preencha os formulários abaixo. 
            Eles são essenciais para entendermos o seu negócio.
          </p>
        </div>
      )}

      {allCompleted && !isDashboardView && (
        <div className="mb-8 p-6 bg-green-50 border border-green-200 rounded-2xl text-center">
          <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
            <CheckCircle className="w-6 h-6 text-green-600" />
          </div>
          <h3 className="text-lg font-bold text-green-800 mb-2">Tudo pronto!</h3>
          <p className="text-green-700 mb-4">Você concluiu todos os briefings estratégicos.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-colors font-medium"
          >
            Acessar Dashboard
          </button>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2">
        {briefings.map((briefing) => (
          <div
            key={briefing.id}
            onClick={() => handleSelectBriefing(briefing)}
            className={`p-5 rounded-2xl border cursor-pointer transition-all hover:shadow-md ${
              briefing.is_completed 
                ? 'bg-gray-50 border-gray-200' 
                : 'bg-white border-brand-dark/20 hover:border-brand-dark'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                briefing.is_completed ? 'bg-green-100' : 'bg-brand-dark/5'
              }`}>
                {briefing.is_completed ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <FileText className="w-5 h-5 text-brand-dark" />
                )}
              </div>
              <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                briefing.is_completed 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-orange-100 text-orange-700'
              }`}>
                {briefing.is_completed ? 'Concluído' : 'Pendente'}
              </span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-1">
              {BRIEFING_TITLES[briefing.briefing_type] || briefing.briefing_type}
            </h3>
            <p className="text-sm text-gray-500 line-clamp-2">
              {briefing.is_completed 
                ? 'Formulário preenchido e salvo.' 
                : 'Clique para preencher as informações necessárias.'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
