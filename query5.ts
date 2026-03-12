import { supabase } from './lib/supabase.ts';

async function run() {
  const { data, error } = await supabase.from('client_briefings').select('briefing_type').limit(100);
  console.log('types:', [...new Set(data.map(d => d.briefing_type))]);
}

run();
