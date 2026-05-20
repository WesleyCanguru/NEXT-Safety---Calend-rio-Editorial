import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data } = await supabase.from('client_briefings').select('*').eq('client_id', '1729ed0e-a91d-4054-80ff-446b31c9643c');
  console.log(JSON.stringify(data, null, 2));
}
run();
