
import React, { useState, useEffect } from 'react';
import { supabase } from '../../lib/supabase';
import { Client, PostData } from '../../types';
import { 
  Building2, 
  Instagram, 
  ChevronRight,
  Globe,
  Settings,
  Calendar,
  CheckCircle2,
  Layout,
  ExternalLink,
  MessageSquare,
  TrendingUp,
  BarChart2
} from 'lucide-react';
import { motion } from 'motion/react';
import dayjs from 'dayjs';

interface ActiveClientsSummaryProps {
  onSelectClient: (client: Client) => void;
}

interface ClientStats {
  today: number;
  monthTotal: number;
  inRevision: number;
  inApproval: number;
  drafts: number;
  nextDate: string | null;
}

export const ActiveClientsSummary: React.FC<ActiveClientsSummaryProps> = ({ onSelectClient }) => {
  const [clients, setClients] = useState<Client[]>([]);
  const [clientStats, setClientStats] = useState<Record<string, ClientStats>>({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAllData = async () => {
      setLoading(true);
      
      // 1. Fetch Active Clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (!clientsData) {
        setLoading(false);
        return;
      }

      setClients(clientsData as Client[]);

      // 2. Fetch Posts for all active clients to calculate stats
      // We'll calculate stats in-memory for simplicity given the small data size
      const { data: postsData } = await supabase
        .from('posts')
        .select('*')
        .in('client_id', clientsData.map(c => c.id));

      const stats: Record<string, ClientStats> = {};
      const today = dayjs().format('DD-MM-YYYY');
      const currentMonth = dayjs().format('MM-YYYY');

      clientsData.forEach(client => {
        const clientPosts = (postsData || []).filter(p => p.client_id === client.id);
        
        // Filter out deleted posts logic (date_key test_rls is just noise)
        const validPosts = clientPosts.filter(p => p.date_key !== 'test_rls');

        // Statistics
        const todayPosts = validPosts.filter(p => p.date_key.startsWith(today) && (p.status === 'published' || p.status === 'scheduled' || p.status === 'approved'));
        const monthPosts = validPosts.filter(p => p.date_key.includes(`-${currentMonth}-`));
        const inRevision = validPosts.filter(p => p.status === 'changes_requested');
        const inApproval = validPosts.filter(p => p.status === 'pending_approval');
        const drafts = validPosts.filter(p => p.status === 'draft');

        // Next scheduled
        const futurePosts = validPosts
          .filter(p => {
             const postDateStr = p.date_key.split('-').slice(0, 3).reverse().join('-'); // YYYY-MM-DD
             return dayjs(postDateStr).isAfter(dayjs().subtract(1, 'day')) && (p.status === 'scheduled' || p.status === 'approved');
          })
          .sort((a, b) => {
             const dateA = a.date_key.split('-').slice(0, 3).reverse().join('-');
             const dateB = b.date_key.split('-').slice(0, 3).reverse().join('-');
             return dayjs(dateA).unix() - dayjs(dateB).unix();
          });

        let nextDate = null;
        if (futurePosts.length > 0) {
          const firstFuture = futurePosts[0];
          nextDate = firstFuture.date_key.split('-').slice(0, 2).join('/') + '/' + firstFuture.date_key.split('-')[2];
        }

        stats[client.id] = {
          today: todayPosts.length,
          monthTotal: monthPosts.length,
          inRevision: inRevision.length,
          inApproval: inApproval.length,
          drafts: drafts.length,
          nextDate
        };
      });

      setClientStats(stats);
      setLoading(false);
    };

    fetchAllData();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {[1, 2, 3].map(i => (
          <div key={i} className="h-[600px] bg-white rounded-[3rem] animate-pulse border border-black/[0.03]" />
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between px-2">
        <div>
          <h3 className="text-2xl font-bold flex items-center gap-3 text-brand-dark">
            Operação Canguru
            <span className="px-3 py-1 bg-brand-dark/5 text-brand-dark rounded-full text-xs font-bold">
              {clients.length} Clientes Ativos
            </span>
          </h3>
          <p className="text-sm text-gray-400 mt-1">Visão geral do ecossistema de conteúdo e links estratégicos</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 pb-12">
        {clients.length === 0 ? (
          <div className="col-span-full py-20 bg-white rounded-[3rem] border border-dashed border-gray-200 flex flex-col items-center justify-center text-gray-400">
            <Building2 size={48} className="mb-4 opacity-20" />
            <p className="text-lg font-medium">Nenhum cliente em operação.</p>
          </div>
        ) : (
          clients.map((client) => {
            const stats = clientStats[client.id] || { today: 0, monthTotal: 0, inRevision: 0, inApproval: 0, drafts: 0, nextDate: null };
            
            return (
              <motion.div
                key={client.id}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 300, damping: 25 }}
                className="group bg-white p-8 rounded-[3.5rem] border border-black/[0.03] shadow-[0_8px_30px_rgb(0,0,0,0.02)] flex flex-col relative overflow-hidden"
              >
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-gray-50/50 rounded-bl-[4rem] -z-0 opacity-50 transition-all group-hover:scale-110" />

                {/* Header */}
                <div className="flex items-center justify-between mb-10 relative z-10">
                  <div className="flex items-center gap-5">
                    <div 
                      className="w-16 h-16 rounded-[2rem] flex items-center justify-center text-white font-bold text-2xl shadow-sm overflow-hidden"
                      style={{ backgroundColor: client.color }}
                    >
                      {client.logo_url ? (
                        <img src={client.logo_url} alt={client.name} className="w-full h-full object-contain mix-blend-multiply p-1" />
                      ) : (
                        client.initials
                      )}
                    </div>
                    <div>
                      <h4 className="text-xl font-bold text-brand-dark flex items-center gap-2">
                        {client.name}
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.4)]" />
                      </h4>
                      <p className="text-[10px] text-gray-400 uppercase tracking-[0.25em] font-bold mt-1.5">{client.segment || 'Segmento'}</p>
                    </div>
                  </div>
                </div>

                {/* Publications Stats Grid */}
                <div className="grid grid-cols-2 gap-y-10 gap-x-12 mb-10 relative z-10 px-2">
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Publicações Hoje</p>
                    <div className="flex items-center gap-2">
                      <span className="text-3xl font-bold text-brand-dark">{stats.today}</span>
                      {stats.today > 0 && <CheckCircle2 size={18} className="text-green-500" />}
                    </div>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Total no Mês</p>
                    <span className="text-3xl font-bold text-brand-dark">{stats.monthTotal}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-red-400/80 font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Em Alteração</p>
                    <span className="text-3xl font-bold text-red-500">{stats.inRevision}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-orange-400/80 font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Em Aprovação</p>
                    <span className="text-3xl font-bold text-orange-500">{stats.inApproval}</span>
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-300 font-bold uppercase tracking-widest mb-3 whitespace-nowrap">Rascunho</p>
                    <span className="text-3xl font-bold text-gray-400">{stats.drafts}</span>
                  </div>
                </div>

                {/* Next Publication */}
                <div className="mb-10 relative z-10 px-2">
                   <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-3">Próxima Publicação</p>
                   <div className="flex items-center gap-3 text-brand-dark font-bold">
                     <Calendar size={18} className="text-blue-500" />
                     <span>{stats.nextDate || 'Nenhuma agendada'}</span>
                   </div>
                </div>

                {/* Quick Links Section */}
                <div className="mb-2 relative z-10">
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mb-6 px-2">Links Rápidos</p>
                  <div className="grid grid-cols-2 gap-3">
                    {/* Instagram */}
                    <a 
                      href={client.instagram ? `https://instagram.com/${client.instagram.replace('@', '')}` : '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <Instagram size={16} className="text-pink-500" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Instagram</span>
                    </a>

                    {/* Business Suite */}
                    <a 
                      href="https://business.facebook.com/latest/home" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <Globe size={16} className="text-blue-400" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">B. Suite</span>
                    </a>

                    {/* Google Ads */}
                    <a 
                      href="https://ads.google.com" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <div className="w-4 h-4 rounded-full bg-green-500" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Google Ads</span>
                    </a>

                    {/* Meta Ads */}
                    <a 
                      href="https://business.facebook.com/adsmanager" 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <div className="w-4 h-4 rounded-full bg-blue-600" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Meta Ads</span>
                    </a>

                    {/* Tráfego Orgânico (Reportei) */}
                    <a 
                      href={client.organic_reportei_url || '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <TrendingUp size={16} className="text-indigo-500" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Orgânico</span>
                    </a>

                    {/* Tráfego Pago (Reportei) */}
                    <a 
                      href={client.paid_reportei_url || '#'} 
                      target="_blank" 
                      rel="noreferrer"
                      className="flex items-center gap-3 p-4 bg-gray-50 hover:bg-brand-dark/5 rounded-[1.25rem] transition-all group/link border border-black/[0.02] hover:border-brand-dark/10"
                    >
                      <div className="p-2 bg-white rounded-xl group-hover/link:shadow-sm">
                        <BarChart2 size={16} className="text-blue-500" />
                      </div>
                      <span className="text-[10px] font-bold text-brand-dark uppercase tracking-widest">Pago</span>
                    </a>
                  </div>
                </div>
              </motion.div>
            );
          })
        )}
      </div>
    </div>
  );
};

