import { supabase } from './lib/supabase.ts';

async function run() {
  const names = ['strategic_briefings', 'client_forms', 'forms', 'briefing_forms', 'onboarding_forms', 'onboarding_steps'];
  for (const name of names) {
    const { data, error } = await supabase.from(name).select('*').limit(1);
    if (!error) {
      console.log(`Found table: ${name}`);
    }
  }
}

run();
