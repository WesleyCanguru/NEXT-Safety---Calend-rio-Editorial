import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const tables = [
    'clients', 'client_users', 'agency_tasks', 'agency_billing', 
    'agency_expenses', 'agency_crms', 'agency_leads', 'agency_settings', 
    'posts', 'leads', 'client_onboarding', 'client_credentials', 
    'client_tutorials', 'client_leads', 'client_monthly_plans', 
    'client_weekly_schedules', 'ai_photos', 'publication_ideas', 'comments'
  ];

  for (const table of tables) {
    const { data, error } = await supabase.from(table).select('agency_id').limit(1);
    if (error) {
      console.log(`Table ${table} does NOT have agency_id:`, error.message);
    } else {
      console.log(`Table ${table} HAS agency_id`);
    }
  }
}

run();
