import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const env = fs.readFileSync('.env', 'utf8').split('\n').reduce((acc, line) => {
  const [key, ...val] = line.split('=');
  if (key) acc[key] = val.join('=');
  return acc;
}, {});

const supabaseUrl = env.VITE_SUPABASE_URL;
const supabaseKey = env.VITE_SUPABASE_ANON_KEY;

const supabase = createClient(supabaseUrl, supabaseKey);

async function run() {
  const { data: phases } = await supabase.from('onboarding_phases').select('*').limit(1);
  console.log('Phases:', phases);

  const { data: steps } = await supabase.from('onboarding_steps').select('*').limit(1);
  console.log('Steps:', steps);
}

run();
