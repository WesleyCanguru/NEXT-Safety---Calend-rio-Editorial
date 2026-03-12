import { supabase } from './lib/supabase.ts';

async function run() {
  const { data: phases } = await supabase.from('onboarding_phases').select('*').limit(5);
  console.log('Phases:', phases);

  const { data: steps } = await supabase.from('onboarding_steps').select('*').limit(5);
  console.log('Steps:', steps);
}

run();
