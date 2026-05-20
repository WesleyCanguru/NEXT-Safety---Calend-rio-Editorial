import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data } = await supabase.from('clients').select('services, features_settings').eq('id', '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e').single();
  console.log('Stephanie data:', JSON.stringify(data, null, 2));
}
main();
