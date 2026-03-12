import { useState, useEffect, useCallback } from 'react';
import { supabase } from '../lib/supabase';
import CryptoJS from 'crypto-js';

export interface Credential {
  id: string;
  client_id: string;
  platform: string;
  label: string;
  username: string;
  password_encrypted: string;
  url?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export type NewCredential = Omit<Credential, 'id' | 'created_at' | 'updated_at'>;

export const usePasswordVault = (clientId: string | undefined) => {
  const [credentials, setCredentials] = useState<Credential[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const encryptionKey = (import.meta as any).env.VITE_ENCRYPTION_KEY;

  const fetchCredentials = useCallback(async () => {
    if (!clientId) return;
    setLoading(true);
    setError(null);
    try {
      const { data, error: fetchError } = await supabase
        .from('client_credentials')
        .select('*')
        .eq('client_id', clientId)
        .order('platform', { ascending: true });

      if (fetchError) throw fetchError;
      setCredentials(data || []);
    } catch (err: any) {
      console.error('Error fetching credentials:', err);
      setError(err.message || 'Erro ao carregar credenciais.');
    } finally {
      setLoading(false);
    }
  }, [clientId]);

  useEffect(() => {
    fetchCredentials();
  }, [fetchCredentials]);

  const encryptPassword = (password: string): string => {
    if (!encryptionKey) {
      throw new Error('VITE_ENCRYPTION_KEY não configurada.');
    }
    return CryptoJS.AES.encrypt(password, encryptionKey).toString();
  };

  const decryptPassword = (encryptedPassword: string): string => {
    if (!encryptionKey) {
      throw new Error('VITE_ENCRYPTION_KEY não configurada.');
    }
    const bytes = CryptoJS.AES.decrypt(encryptedPassword, encryptionKey);
    return bytes.toString(CryptoJS.enc.Utf8);
  };

  const addCredential = async (cred: Omit<NewCredential, 'client_id' | 'password_encrypted'> & { password_raw: string }) => {
    if (!clientId) throw new Error('Client ID is required');
    try {
      const password_encrypted = encryptPassword(cred.password_raw);
      const newCred = {
        client_id: clientId,
        platform: cred.platform,
        label: cred.label,
        username: cred.username,
        password_encrypted,
        url: cred.url || null,
        notes: cred.notes || null,
      };

      const { data, error } = await supabase
        .from('client_credentials')
        .insert([newCred])
        .select()
        .single();

      if (error) throw error;
      setCredentials(prev => [...prev, data]);
      return data;
    } catch (err: any) {
      console.error('Error adding credential:', err);
      throw err;
    }
  };

  const updateCredential = async (id: string, updates: Partial<Omit<NewCredential, 'client_id' | 'password_encrypted'>> & { password_raw?: string }) => {
    try {
      const payload: any = { ...updates };
      delete payload.password_raw;

      if (updates.password_raw) {
        payload.password_encrypted = encryptPassword(updates.password_raw);
      }

      const { data, error } = await supabase
        .from('client_credentials')
        .update(payload)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      setCredentials(prev => prev.map(c => c.id === id ? data : c));
      return data;
    } catch (err: any) {
      console.error('Error updating credential:', err);
      throw err;
    }
  };

  const deleteCredential = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_credentials')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setCredentials(prev => prev.filter(c => c.id !== id));
    } catch (err: any) {
      console.error('Error deleting credential:', err);
      throw err;
    }
  };

  return {
    credentials,
    loading,
    error,
    addCredential,
    updateCredential,
    deleteCredential,
    decryptPassword,
    fetchCredentials,
    hasEncryptionKey: !!encryptionKey
  };
};
