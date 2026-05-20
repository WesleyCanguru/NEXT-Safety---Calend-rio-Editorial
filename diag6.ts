import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config();

const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_SERVICE_ROLE_KEY || process.env.VITE_SUPABASE_ANON_KEY);

async function run() {
  const { data, error } = await supabase
    .from('client_briefings')
    .delete()
    .eq('client_id', '1729ed0e-a91d-4054-80ff-446b31c9643c')
    .eq('briefing_type', 'conteudo_bastidores')
    .select();
    
   console.log('Deleted Alessandra:', data, error);

   const { data: d2, error: e2 } = await supabase
    .from('client_briefings')
    .delete()
    .eq('client_id', '7fd5ff9f-2dc8-4e62-8a82-cdce19b31b3e') // Stephanie
    .eq('briefing_type', 'conteudo_bastidores')
    .select();
    
   console.log('Deleted Stephanie:', d2, e2);
}

run();
