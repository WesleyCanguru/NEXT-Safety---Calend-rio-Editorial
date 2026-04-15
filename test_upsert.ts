import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase.from('posts').upsert({
      date_key: 'test-key-123',
      client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
      status: 'deleted',
      last_updated: new Date().toISOString()
  }, { onConflict: 'date_key' });
  
  console.log("Error:", error);
}

run();
