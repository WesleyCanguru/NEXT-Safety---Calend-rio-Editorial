import { supabase } from './lib/supabase.ts';

async function run() {
  const { data, error } = await supabase.from('client_briefings').select('*').limit(2);
  console.log('client_briefings:', data);
}

run();
