import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data, error } = await supabase.from('client_briefings').insert([
    {
       client_id: '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e',
       agency_id: 2,
       briefing_type: 'conteudo_bastidores',
       responses: {},
       is_completed: false
    }
  ]).select();

  console.log('Result:', data, error);
}
main();
