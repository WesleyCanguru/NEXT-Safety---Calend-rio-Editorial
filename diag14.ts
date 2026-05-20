import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const currentBriefings: any[] = [];
  const requiredTypes = new Set(['persona', 'posicionamento', 'publico_alvo', 'tom_voz', 'conteudo_bastidores']); // Assuming Social Media
  
  let neededToCreate = [];
  for (const bType of requiredTypes) {
      neededToCreate.push({
        client_id: '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e', // stephanie
        agency_id: 2,
        briefing_type: bType,
        responses: {},
        is_completed: false
      });
  }
  
  console.log("Needed to create steph:", neededToCreate.length);
  
  const { data, error } = await supabase
    .from('client_briefings')
    .insert(neededToCreate)
    .select();
    
  console.log("Insert result steph:", data, error);
}
main();
