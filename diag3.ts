import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function run() {
  const { data } = await supabase.from('clients').select('id, agency_id, name').in('name', ['Alessandra Zanesco', 'Stephanie Carbone']);
  console.log(data);
}
run();
