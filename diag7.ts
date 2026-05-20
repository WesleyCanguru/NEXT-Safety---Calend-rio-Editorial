import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data } = await supabase.from('client_briefings').select('*').eq('client_id', '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e');
  console.log('Stephanie Briefings:', JSON.stringify(data, null, 2));

  const { data: d2 } = await supabase.from('clients').select('features_settings').eq('id', '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e').single();
  console.log('Stephanie Client Settings:', JSON.stringify(d2, null, 2));
}
run();
