import { supabase } from './lib/supabase.ts';

async function run() {
  const names = ['form_responses', 'briefing_responses', 'client_briefings', 'strategic_briefing_forms', 'onboarding_forms'];
  for (const name of names) {
    const { data, error } = await supabase.from(name).select('*').limit(1);
    if (!error) {
      console.log(`Found table: ${name}`);
    }
  }
}

run();
