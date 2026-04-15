import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data: d1, error: e1 } = await supabase.from('posts').insert({
      date_key: 'test-unique-key',
      client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
      status: 'draft'
  });
  
  const { data: d2, error: e2 } = await supabase.from('posts').insert({
      date_key: 'test-unique-key',
      client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
      status: 'published'
  });
  
  console.log("Insert 2 error:", e2);
  
  // Clean up
  await supabase.from('posts').delete().eq('date_key', 'test-unique-key');
}

run();
