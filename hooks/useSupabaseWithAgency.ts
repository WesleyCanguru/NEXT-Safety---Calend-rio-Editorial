import { useMemo } from 'react';
import { supabase } from '../lib/supabase';
import { useAgency } from '../contexts/AgencyContext';

const TABLES_WITH_AGENCY_ID = [
  'clients', 'client_users', 'agency_tasks', 'agency_billing', 
  'agency_expenses', 'agency_crms', 'agency_leads', 'agency_settings', 
  'posts', 'leads'
];

export function useSupabaseWithAgency() {
  const { agency } = useAgency();

  const proxySupabase = useMemo(() => {
    if (!agency?.id) return supabase; // Fallback if no agency context yet

    return {
      ...supabase,
      from: (table: string) => {
        const queryBuilder = supabase.from(table);

        if (!TABLES_WITH_AGENCY_ID.includes(table)) {
          return queryBuilder;
        }

        // We need to proxy select, insert, update, upsert, delete
        const proxyQueryBuilder = {
          ...queryBuilder,
          select: (...args: any[]) => {
            return (queryBuilder.select as any)(...args).eq('agency_id', agency.id);
          },
          insert: (data: any, ...args: any[]) => {
            const injectAgencyId = (item: any) => ({ ...item, agency_id: agency.id });
            const modifiedData = Array.isArray(data) ? data.map(injectAgencyId) : injectAgencyId(data);
            return (queryBuilder.insert as any)(modifiedData, ...args);
          },
          update: (data: any, ...args: any[]) => {
            return (queryBuilder.update as any)(data, ...args).eq('agency_id', agency.id);
          },
          upsert: (data: any, ...args: any[]) => {
            const injectAgencyId = (item: any) => ({ ...item, agency_id: agency.id });
            const modifiedData = Array.isArray(data) ? data.map(injectAgencyId) : injectAgencyId(data);
            return (queryBuilder.upsert as any)(modifiedData, ...args);
          },
          delete: (...args: any[]) => {
            return (queryBuilder.delete as any)(...args).eq('agency_id', agency.id);
          }
        };

        return proxyQueryBuilder;
      }
    };
  }, [agency]);

  return proxySupabase as typeof supabase; // Casting back to original type for TS compatibility
}
