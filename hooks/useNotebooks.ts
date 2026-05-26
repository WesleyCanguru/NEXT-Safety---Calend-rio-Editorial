import { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';

export interface Notebook {
  id: string;
  agency_id: string;
  title: string;
  emoji: string;
  color: string;
  position: number;
  is_default: boolean;
  created_at: string;
  updated_at: string;
}

export function useNotebooks() {
  const { agencyId } = useAuth();
  const [notebooks, setNotebooks] = useState<Notebook[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (agencyId) {
      fetchNotebooks();
    }
  }, [agencyId]);

  const fetchNotebooks = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('notebooks')
        .select('*')
        .eq('agency_id', agencyId)
        .order('position');
      
      if (error) throw error;
      setNotebooks(data || []);
    } catch (err) {
      console.error('Error fetching notebooks', err);
    } finally {
      setLoading(false);
    }
  };

  const createNotebook = async (title: string, emoji: string, color: string) => {
    if (!agencyId) return null;
    try {
      const position = notebooks.length > 0 ? Math.max(...notebooks.map(n => n.position)) + 1 : 0;
      const { data, error } = await supabase
        .from('notebooks')
        .insert([{ agency_id: agencyId, title, emoji, color, position, is_default: false }])
        .select()
        .single();
      
      if (error) throw error;
      setNotebooks([...notebooks, data]);
      return data;
    } catch (err) {
      console.error('Error creating notebook', err);
      return null;
    }
  };

  return { notebooks, loading, fetchNotebooks, createNotebook };
}
