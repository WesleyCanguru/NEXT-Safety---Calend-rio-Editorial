
import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { Client, ClientQuickLink, PostData } from '../types';
import dayjs from 'dayjs';

export function useClientesOverview() {
  const [clients, setClients] = useState<Client[]>([]);
  const [quickLinks, setQuickLinks] = useState<ClientQuickLink[]>([]);
  const [stats, setStats] = useState<Record<string, { publishedToday: number, nextPublication: string | null, totalPublishedMonth: number, changesRequested: number, pendingApproval: number }>>({});
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      // Fetch Clients
      const { data: clientsData } = await supabase
        .from('clients')
        .select('*')
        .eq('is_active', true)
        .order('name');

      const clientList = (clientsData || []) as Client[];
      setClients(clientList);

      // Fetch Quick Links
      const { data: linksData } = await supabase
        .from('client_quick_links')
        .select('*');

      setQuickLinks((linksData || []) as ClientQuickLink[]);

      // Fetch Posts for stats
      const todayStr = dayjs().format('DD-MM-YYYY');
      const currentMonthStr = dayjs().format('-MM-YYYY-');

      const { data: postsData } = await supabase
        .from('posts')
        .select('*');

      const posts = (postsData || []) as PostData[];

      const statsMap: Record<string, { publishedToday: number, nextPublication: string | null, totalPublishedMonth: number, changesRequested: number, pendingApproval: number }> = {};

      clientList.forEach(client => {
        const clientPosts = posts.filter(p => p.client_id === client.id && p.status !== 'deleted');
        
        const publishedToday = clientPosts.filter(p => p.status === 'published' && p.date_key.startsWith(todayStr)).length;
        
        const totalPublishedMonth = clientPosts.filter(p => p.status === 'published' && p.date_key.includes(currentMonthStr)).length;
        
        const changesRequested = clientPosts.filter(p => p.status === 'changes_requested' && p.date_key.includes(currentMonthStr)).length;
        
        const pendingApproval = clientPosts.filter(p => p.status === 'pending_approval' && p.date_key.includes(currentMonthStr)).length;

        const nextPost = clientPosts
          .filter(p => (p.status === 'scheduled' || p.status === 'approved'))
          .map(p => {
            const parts = p.date_key.split('-');
            if (parts.length >= 3) {
              return { ...p, sortDate: dayjs(`${parts[2]}-${parts[1]}-${parts[0]}`).valueOf(), dateStr: `${parts[2]}-${parts[1]}-${parts[0]}` };
            }
            return { ...p, sortDate: 0, dateStr: '' };
          })
          .filter(p => p.sortDate >= dayjs().startOf('day').valueOf())
          .sort((a, b) => a.sortDate - b.sortDate)[0];

        statsMap[client.id] = {
          publishedToday,
          totalPublishedMonth,
          changesRequested,
          pendingApproval,
          nextPublication: nextPost ? nextPost.dateStr : null
        };
      });

      setStats(statsMap);
    } catch (error) {
      console.error('Error fetching clients overview data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const addQuickLink = async (link: Omit<ClientQuickLink, 'id' | 'created_at'>) => {
    try {
      const { data, error } = await supabase
        .from('client_quick_links')
        .insert([link])
        .select()
        .single();

      if (error) throw error;
      setQuickLinks(prev => [...prev, data]);
      return data;
    } catch (error) {
      console.error('Error adding quick link:', error);
      throw error;
    }
  };

  const deleteQuickLink = async (id: string) => {
    try {
      const { error } = await supabase
        .from('client_quick_links')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setQuickLinks(prev => prev.filter(l => l.id !== id));
    } catch (error) {
      console.error('Error deleting quick link:', error);
      throw error;
    }
  };

  return {
    clients,
    quickLinks,
    stats,
    loading,
    addQuickLink,
    deleteQuickLink,
    refresh: fetchData
  };
}
