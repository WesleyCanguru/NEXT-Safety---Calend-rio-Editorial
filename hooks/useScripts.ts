import { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';

export interface Script {
  id: string;
  client_id: string;
  agency_id: string;
  title: string;
  content: { html: string } | null;
  status: 'active' | 'recorded';
  recorded_at: string | null;
  recorded_by: 'agency' | 'client' | null;
  created_at: string;
  updated_at: string;
}

export function useScripts(clientId: string | null) {
  const { agencyId } = useAuth();
  const [scripts, setScripts] = useState<Script[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (clientId) {
      fetchScripts();
    } else {
      setScripts([]);
    }
  }, [clientId, agencyId]);

  const fetchScripts = async () => {
    if (!clientId) return;
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('scripts')
        .select('*')
        .eq('client_id', clientId)
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      setScripts(data || []);
    } catch (err) {
      console.error('Erro ao buscar roteiros:', err);
    } finally {
      setLoading(false);
    }
  };

  const createScript = async (title: string) => {
    if (!clientId || !agencyId) return null;
    try {
      const { data, error } = await supabase
        .from('scripts')
        .insert([{ 
          client_id: clientId, 
          agency_id: agencyId, 
          title: title, 
          content: { html: '' },
          status: 'active',
          recorded_at: null,
          recorded_by: null
        }])
        .select()
        .single();
      
      if (error) throw error;
      setScripts(current => [data, ...current]);
      return data as Script;
    } catch (err) {
      console.error('Erro ao criar roteiro:', err);
      return null;
    }
  };

  const updateScript = async (id: string, updates: Partial<Script>) => {
    try {
      // Atualização otimista na interface local
      setScripts(current => current.map(s => s.id === id ? { ...s, ...updates, updated_at: new Date().toISOString() } : s));
      
      const { error } = await supabase
        .from('scripts')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', id);
      
      if (error) throw error;
    } catch (err) {
      console.error('Erro ao atualizar roteiro:', err);
    }
  };
  
  const deleteScript = async (id: string) => {
    try {
      // Atualização otimista na interface local
      setScripts(current => current.filter(s => s.id !== id));
      
      const { error } = await supabase
        .from('scripts')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
    } catch (err) {
      console.error('Erro ao deletar roteiro:', err);
    }
  };

  return { scripts, loading, fetchScripts, createScript, updateScript, deleteScript };
}
