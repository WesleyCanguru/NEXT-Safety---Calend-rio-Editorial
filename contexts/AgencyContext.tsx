import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabaseBase } from '../lib/supabase';

export interface Agency {
  id: number;
  name: string;
  slug: string;
  logo_url: string | null;
  primary_color: string;
  is_active: boolean;
  plan: string;
}

interface AgencyContextType {
  agency: Agency | null;
  loading: boolean;
  error: string | null;
}

const AgencyContext = createContext<AgencyContextType>({
  agency: null,
  loading: true,
  error: null,
});

export const AgencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [agency, setAgency] = useState<Agency | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAgency = async () => {
      try {
        const hostname = window.location.hostname;
        const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1';
        const isPreview = hostname.includes('ais-dev-') || hostname.includes('ais-pre-') || hostname.includes('run.app');

        let query = supabaseBase.from('agencies').select('*').eq('is_active', true);

        if (isLocalhost || isPreview) {
          // No localhost ou ambiente de preview do AI Studio, buscamos pelo slug padrão
          query = query.eq('slug', 'canguru');
        } else {
          // Em produção, buscamos pelo domínio completo
          query = query.eq('domain', hostname);
        }

        const { data, error } = await query.single();

        if (error || !data) {
          console.error("Agency not found for hostname:", hostname, error);
          setError("Sistema não encontrado");
          localStorage.removeItem('current_agency_slug_id');
        } else {
          setAgency(data);
          localStorage.setItem('current_agency_slug_id', data.id.toString());
          
          if (data.primary_color) {
            document.documentElement.style.setProperty('--brand-color', data.primary_color);
            // Example way to set a globally usable color
          }
        }
      } catch (err) {
        console.error("Error fetching agency:", err);
        setError("Erro ao carregar o sistema");
      } finally {
        setLoading(false);
      }
    };

    fetchAgency();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="w-10 h-10 border-4 border-brand-dark/20 border-t-brand-dark rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !agency) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 text-center px-4">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Sistema indisponível</h1>
        <p className="text-gray-500">{error || "Não foi possível carregar as informações do sistema."}</p>
      </div>
    );
  }

  return (
    <AgencyContext.Provider value={{ agency, loading: false, error: null }}>
      {children}
    </AgencyContext.Provider>
  );
};

export const useAgency = () => useContext(AgencyContext);
