import React, { useState, useEffect } from 'react';
import { supabase, useAuth } from '../lib/supabase';
import { Client } from '../types';
import { AgencyLogo } from './AgencyLogo';
import { Plus, Users, LogOut, ChevronRight, Building2 } from 'lucide-react';

interface ClientSelectorScreenProps {
  onSelectClient: (client: Client) => void;
  onManageClients: () => void;
  onLogout: () => void;
}

export const ClientSelectorScreen: React.FC<ClientSelectorScreenProps> = ({
  onSelectClient,
  onManageClients,
  onLogout,
}) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const { setActiveClient } = useAuth();

  useEffect(() => {
    const fetchClients = async () => {
      const { data, error } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('name');
      if (!error && data) setClients(data as Client[]);
      setLoading(false);
    };
    fetchClients();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 flex flex-col items-center justify-center p-6">
      
      {/* Header */}
      <div className="mb-10 flex flex-col items-center gap-3">
        <AgencyLogo />
        <h1 className="text-white text-2xl font-bold tracking-tight">Painel da Agência</h1>
        <p className="text-blue-300 text-sm">Selecione o cliente para gerenciar</p>
      </div>

      {/* Grid de clientes */}
      <div className="w-full max-w-2xl">
        {loading ? (
          <div className="text-center text-blue-300 py-12">Carregando clientes...</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {clients.map((client) => (
              <button
                key={client.id}
                onClick={() => {
                  setActiveClient(client);
                  onSelectClient(client);
                }}
                className="group flex items-center gap-4 p-5 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/40 rounded-xl text-left transition-all duration-200 hover:scale-[1.02]"
              >
                {/* Avatar do cliente */}
                <div
                  className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold text-lg flex-shrink-0 shadow-lg"
                  style={{ backgroundColor: client.color }}
                >
                  {client.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white font-semibold text-sm truncate">{client.name}</p>
                  {client.segment && (
                    <p className="text-blue-300 text-xs mt-0.5 truncate">{client.segment}</p>
                  )}
                </div>
                <ChevronRight size={16} className="text-white/40 group-hover:text-white/80 transition-colors flex-shrink-0" />
              </button>
            ))}
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onManageClients}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-semibold text-sm transition-all"
          >
            <Plus size={16} />
            Gerenciar Clientes
          </button>
          <button
            onClick={onLogout}
            className="flex items-center justify-center gap-2 py-3 px-4 bg-white/10 hover:bg-white/20 text-white/70 hover:text-white rounded-xl font-semibold text-sm transition-all"
          >
            <LogOut size={16} />
            Sair
          </button>
        </div>
      </div>
    </div>
  );
};
