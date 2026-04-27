
import { createClient } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Client } from '../types';
import { useAgency } from '../contexts/AgencyContext';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const customFetch = async (input: RequestInfo | URL, init?: RequestInit) => {
  let url = input as string;
  let options = init || {};

  if (typeof input === 'object' && 'url' in input) {
    url = input.url;
    options = {
      method: input.method,
      headers: input.headers,
      body: input.body,
      signal: input.signal,
      ...options
    };
  } else if (input instanceof URL) {
    url = input.toString();
  }

  const plainHeaders: Record<string, string> = {};
  if (options.headers) {
    if (options.headers instanceof Headers) {
       options.headers.forEach((value, key) => { plainHeaders[key] = value; });
    } else if (Array.isArray(options.headers)) {
       options.headers.forEach(([key, value]) => { plainHeaders[key] = value; });
    } else {
       Object.assign(plainHeaders, options.headers);
    }
  }

  const safeInit: RequestInit = {
    method: options.method || 'GET',
    headers: plainHeaders,
  };
  
  if (options.body) safeInit.body = options.body;

  return window.fetch(url, safeInit);
};

export const supabaseBase = createClient(SUPABASE_URL, SUPABASE_KEY, {
  auth: {
    persistSession: false,
    autoRefreshToken: false,
    detectSessionInUrl: false
  },
  global: {
    fetch: customFetch
  }
});

const TABLES_WITH_AGENCY_ID = [
  'clients', 'client_users', 'agency_tasks', 'agency_billing', 
  'agency_expenses', 'agency_crms', 'agency_leads', 'agency_settings', 
  'posts', 'leads'
];

export const supabase = {
  ...supabaseBase,
  from: (table: string) => {
    const qb = (supabaseBase as any).from(table);
    
    if (!TABLES_WITH_AGENCY_ID.includes(table)) {
      return qb;
    }

    const agencyIdStr = typeof window !== 'undefined' ? localStorage.getItem('current_agency_slug_id') : null;
    const agencyId = agencyIdStr ? parseInt(agencyIdStr, 10) : null;

    if (!agencyId) {
      return qb;
    }

    return new Proxy(qb, {
        get: (target: any, prop: string) => {
            if (prop === 'select' || prop === 'update' || prop === 'delete') {
                return (...args: any[]) => {
                    const res = target[prop](...args);
                    return res.eq('agency_id', agencyId);
                };
            }
            if (prop === 'insert' || prop === 'upsert') {
                return (data: any, ...args: any[]) => {
                    const inject = (item: any) => ({ ...item, agency_id: agencyId });
                    const mod = Array.isArray(data) ? data.map(inject) : inject(data);
                    return target[prop](mod, ...args);
                };
            }
            return target[prop];
        }
    });
  }
} as any;

export const hashPassword = async (password: string): Promise<string> => {
  const msgBuffer = new TextEncoder().encode(password);
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
};

interface AuthContextType {
  userRole: UserRole | null;
  activeClient: Client | null;
  userData: any | null; // For agency_user or client_user data
  login: (role: UserRole) => void;
  loginByPassword: (password: string, emailOrUsername?: string, isAgencyLogin?: boolean) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  setActiveClient: (client: Client | null) => void;
  refreshActiveClient: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  activeClient: null,
  userData: null,
  login: () => {},
  loginByPassword: async () => ({ success: false }),
  logout: () => {},
  setActiveClient: () => {},
  refreshActiveClient: async () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { agency } = useAgency();
  
  const [userRole, setUserRole] = useState<UserRole | null>(() =>
    localStorage.getItem('next_app_role') as UserRole | null
  );
  const [activeClient, setActiveClientState] = useState<Client | null>(() => {
    const stored = localStorage.getItem('next_app_client');
    return stored ? JSON.parse(stored) : null;
  });
  const [userData, setUserData] = useState<any | null>(() => {
    const stored = localStorage.getItem('next_app_user_data');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('next_app_role', role);
  };

  const loginByPassword = async (password: string, emailOrUsername?: string, isAgencyLogin?: boolean): Promise<{ success: boolean; error?: string }> => {
    if (!agency) {
      return { success: false, error: 'Sistema não encontrado.' };
    }

    const cleanPass = password.trim();
    const hashedPassword = await hashPassword(cleanPass);
    
    if (isAgencyLogin) {
      // 1. Agency User Login
      if (!emailOrUsername) {
        return { success: false, error: 'Email inválido.' };
      }

      const { data, error } = await supabase
        .from('agency_users')
        .select('*')
        .eq('agency_id', agency.id)
        .eq('email', emailOrUsername.trim().toLowerCase())
        .eq('password_hash', hashedPassword)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        return { success: false, error: 'Email ou senha inválidos.' };
      }

      const role = data.role as UserRole;
      const userPayload = { type: 'agency_user', id: data.id, name: data.name, agency_id: agency.id, role };
      
      setUserData(userPayload);
      setUserRole(role);
      localStorage.setItem('next_app_user_data', JSON.stringify(userPayload));
      localStorage.setItem('next_app_role', role);

      // Agency users start without activeClient, they select it later in ClientSelectorScreen
      setActiveClientState(null);
      localStorage.removeItem('next_app_client');

      return { success: true };
      
    } else {
      // 2. Client User Login
      if (!emailOrUsername) {
        return { success: false, error: 'Chave de acesso ou usuário inválido.' };
      }

      const { data, error } = await supabase
        .from('client_users')
        .select('*, clients(*)')
        .eq('agency_id', agency.id)
        .eq('username', emailOrUsername.trim().toLowerCase())
        .eq('password_hash', hashedPassword)
        .eq('is_active', true)
        .maybeSingle();

      if (error || !data) {
        return { success: false, error: 'Usuário ou senha inválidos.' };
      }

      const clientResult = data.clients as unknown as Client;
      if (!clientResult) {
        return { success: false, error: 'Cliente não encontrado.' };
      }

      const role = data.role as UserRole;
      const userPayload = { type: 'client_user', id: data.id, name: data.name, agency_id: agency.id, client_id: data.client_id };
      
      setUserData(userPayload);
      setUserRole(role);
      setActiveClientState(clientResult);
      
      localStorage.setItem('next_app_user_data', JSON.stringify(userPayload));
      localStorage.setItem('next_app_role', role);
      localStorage.setItem('next_app_client', JSON.stringify(clientResult));

      return { success: true };
    }
  };

  const logout = () => {
    setUserRole(null);
    setActiveClientState(null);
    setUserData(null);
    localStorage.removeItem('next_app_role');
    localStorage.removeItem('next_app_client');
    localStorage.removeItem('next_app_user_data');
  };

  const setActiveClient = (client: Client | null) => {
    setActiveClientState(client);
    if (client) {
      localStorage.setItem('next_app_client', JSON.stringify(client));
    } else {
      localStorage.removeItem('next_app_client');
    }
  };

  const refreshActiveClient = async () => {
    if (!activeClient?.id || !agency) return;
    const { data, error } = await supabase
      .from('clients')
      .select('*')
      .eq('agency_id', agency.id)
      .eq('id', activeClient.id)
      .single();
    if (!error && data) {
      setActiveClientState(data as Client);
      localStorage.setItem('next_app_client', JSON.stringify(data));
    }
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { userRole, activeClient, userData, login, loginByPassword, logout, setActiveClient, refreshActiveClient, isAuthenticated: !!userRole } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);

export const parseImageUrl = (url: string | string[] | null): string | string[] | null => {
  if (!url) return null;
  if (Array.isArray(url)) return url;
  try {
    if (typeof url === 'string' && url.trim().startsWith('[') && url.trim().endsWith(']')) {
      const parsed = JSON.parse(url);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {}
  return url;
};

export const stringifyImageUrl = (url: string | string[] | null): string | null => {
  if (!url) return null;
  if (Array.isArray(url)) return JSON.stringify(url);
  return url;
};
