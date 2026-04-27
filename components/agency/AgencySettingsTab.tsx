import React, { useState, useEffect } from 'react';
import { useAgency } from '../../contexts/AgencyContext';
import { supabase } from '../../lib/supabase';
import { Save, Loader } from 'lucide-react';

export const AgencySettingsTab: React.FC = () => {
  const { agency } = useAgency();
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [logoUrl, setLogoUrl] = useState('');
  const [primaryColor, setPrimaryColor] = useState('#000000');
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    if (agency) {
      setName(agency.name || '');
      setSlug(agency.slug || '');
      setLogoUrl(agency.logo_url || '');
      setPrimaryColor(agency.primary_color || '#000000');
    }
  }, [agency]);

  const handleSave = async () => {
    if (!agency) return;
    setLoading(true);
    setSuccessMsg('');
    setErrorMsg('');

    try {
      // NOTE: agency table doesn't need agency_id injected because it's the root agency table
      const { error } = await supabase
        .from('agencies')
        .update({
          name,
          slug,
          logo_url: logoUrl,
          primary_color: primaryColor,
        })
        .eq('id', agency.id);

      if (error) throw error;
      setSuccessMsg('Configurações salvas com sucesso. Recarregue a página para ver todas as alterações.');
      
      // Update local CSS variable immediately
      document.documentElement.style.setProperty('--brand-color', primaryColor);
    } catch (err: any) {
      console.error(err);
      setErrorMsg(err.message || 'Erro ao salvar configurações.');
    } finally {
      setLoading(false);
    }
  };

  if (!agency) return null;

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-sm border border-gray-100">
      <h2 className="text-2xl font-bold text-brand-dark mb-6">Configurações da Agência</h2>
      
      {successMsg && (
        <div className="mb-6 p-4 bg-green-50 text-green-700 rounded-xl text-sm font-medium">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium">
          {errorMsg}
        </div>
      )}

      <div className="max-w-2xl space-y-6">
        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome da Agência</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-dark transition-colors"
            placeholder="Minha Agência"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Slug (Subdomínio)</label>
          <input
            type="text"
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-dark transition-colors bg-gray-50 text-gray-500"
            disabled
            title="O slug não pode ser alterado por aqui"
          />
          <p className="text-xs text-gray-400 mt-2">Usado para acessar: {slug}.seusite.com</p>
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">URL da Logo</label>
          <input
            type="text"
            value={logoUrl}
            onChange={(e) => setLogoUrl(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-dark transition-colors"
            placeholder="https://exemplo.com/logo.png"
          />
          {logoUrl && (
            <div className="mt-4 p-4 border border-gray-100 rounded-xl bg-gray-50 inline-block">
              <img src={logoUrl} alt="Preview Logo" className="h-12 object-contain" />
            </div>
          )}
        </div>

        <div>
           <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Cor Principal</label>
           <div className="flex items-center gap-4">
             <input
               type="color"
               value={primaryColor}
               onChange={(e) => setPrimaryColor(e.target.value)}
               className="h-12 w-24 rounded-xl border border-gray-200 cursor-pointer"
             />
             <input
               type="text"
               value={primaryColor}
               onChange={(e) => setPrimaryColor(e.target.value)}
               className="flex-1 px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:border-brand-dark transition-colors font-mono uppercase"
             />
           </div>
        </div>

        <div className="pt-6 border-t border-gray-100">
          <button
            onClick={handleSave}
            disabled={loading}
            className="flex items-center justify-center gap-2 w-full sm:w-auto px-8 py-3 bg-brand-dark text-white rounded-xl font-bold uppercase tracking-widest text-xs hover:bg-black transition-colors disabled:opacity-50"
          >
            {loading ? <Loader className="animate-spin" size={16} /> : <Save size={16} />}
            Salvar Configurações
          </button>
        </div>
      </div>
    </div>
  );
};
