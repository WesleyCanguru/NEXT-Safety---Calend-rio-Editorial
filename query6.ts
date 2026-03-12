import { supabase } from './lib/supabase.ts';

async function run() {
  const { data, error } = await supabase.from('client_briefings').select('*').limit(10);
  console.log(JSON.stringify(data, null, 2));
}

run();
