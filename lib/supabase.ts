
import { createClient } from '@supabase/supabase-js';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole, Client } from '../types';

// =================================================================
// ⚠️ PASSO FINAL: COLE SUAS CHAVES DO SUPABASE AQUI
// =================================================================

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

// =================================================================

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

interface AuthContextType {
  userRole: UserRole | null;
  activeClient: Client | null;
  login: (role: UserRole) => void;
  logout: () => void;
  setActiveClient: (client: Client | null) => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
  userRole: null,
  activeClient: null,
  login: () => {},
  logout: () => {},
  setActiveClient: () => {},
  isAuthenticated: false,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [userRole, setUserRole] = useState<UserRole | null>(() =>
    localStorage.getItem('next_app_role') as UserRole | null
  );
  const [activeClient, setActiveClientState] = useState<Client | null>(() => {
    const stored = localStorage.getItem('next_app_client');
    return stored ? JSON.parse(stored) : null;
  });

  const login = (role: UserRole) => {
    setUserRole(role);
    localStorage.setItem('next_app_role', role);
    // approver e team ficam sempre na NEXT Safety automaticamente
    if (role !== 'admin') {
      const nextSafety: Client = {
        id: '75b00b27-61ee-4b23-8721-70748ccb0789',
        name: 'NEXT Safety',
        segment: 'EPI / Segurança do Trabalho',
        responsible: 'Viviane',
        email: null,
        instagram: null,
        color: '#1e40af',
        initials: 'NS',
        logo_url: null,
        is_active: true,
      };
      setActiveClientState(nextSafety);
      localStorage.setItem('next_app_client', JSON.stringify(nextSafety));
    }
  };

  const logout = () => {
    setUserRole(null);
    setActiveClientState(null);
    localStorage.removeItem('next_app_role');
    localStorage.removeItem('next_app_client');
  };

  const setActiveClient = (client: Client | null) => {
    setActiveClientState(client);
    if (client) {
      localStorage.setItem('next_app_client', JSON.stringify(client));
    } else {
      localStorage.removeItem('next_app_client');
    }
  };

  return React.createElement(
    AuthContext.Provider,
    { value: { userRole, activeClient, login, logout, setActiveClient, isAuthenticated: !!userRole } },
    children
  );
};

export const useAuth = () => useContext(AuthContext);

export const parseImageUrl = (url: string | string[] | null): string | string[] | null => {
  if (!url) return null;
  if (Array.isArray(url)) return url;
  try {
    // Check if it's a JSON array string
    if (typeof url === 'string' && url.trim().startsWith('[') && url.trim().endsWith(']')) {
      const parsed = JSON.parse(url);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch (e) {
    // Ignore error, return as string
  }
  return url;
};

export const stringifyImageUrl = (url: string | string[] | null): string | null => {
  if (!url) return null;
  if (Array.isArray(url)) return JSON.stringify(url);
  return url;
};
