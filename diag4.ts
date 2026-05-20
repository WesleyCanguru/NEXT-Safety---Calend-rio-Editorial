import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data: errorLog, error } = await supabase
    .from('client_briefings')
    .insert([
      {
        client_id: '1729ed0e-a91d-4054-80ff-446b31c9643c',
        agency_id: 2,
        briefing_type: 'conteudo_bastidores',
        responses: {},
        is_completed: false
      }
    ])
    .select();
  
  if (error) {
     console.error("Test insert error (ANON/SERVICE):", error);
  } else {
     console.log("Test insert success (ANON/SERVICE):", errorLog);
  }
}

run();
