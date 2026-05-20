import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_KEY = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const currentBriefings = [
    { briefing_type: 'publico_alvo' },
    { briefing_type: 'tom_voz' },
    { briefing_type: 'posicionamento' },
    { briefing_type: 'persona' },
  ];
  
  const requiredTypes = new Set(['persona', 'posicionamento', 'publico_alvo', 'tom_voz', 'conteudo_bastidores']);
  
  let neededToCreate = [];
  for (const bType of requiredTypes) {
    const exists = currentBriefings.find((b: any) => b.briefing_type === bType);
    if (!exists) {
      neededToCreate.push({
        client_id: '1729ed0e-a91d-4054-80ff-446b31c9643c',
        agency_id: 2,
        briefing_type: bType,
        responses: {},
        is_completed: false
      });
    }
  }
  
  console.log("Needed to create:", neededToCreate);
  
  const { data, error } = await supabase
    .from('client_briefings')
    .insert(neededToCreate)
    .select();
    
  console.log("Insert result:", data, error);
}
main();
