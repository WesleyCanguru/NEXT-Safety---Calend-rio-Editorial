import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  // 1. Create a post
  const testKey = 'test-move-123';
  await supabase.from('posts').upsert({
      date_key: testKey,
      client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
      status: 'draft',
      theme: 'Test Theme',
      type: 'Test Type'
  }, { onConflict: 'date_key' });

  // 2. Try to mark it as deleted using the exact payload from PostModal
  const { error: delErr, data } = await supabase.from('posts').upsert({
      date_key: testKey,
      client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
      status: 'deleted',
      last_updated: new Date().toISOString()
  }, { onConflict: 'date_key' }).select();

  console.log("Delete Error:", delErr);
  console.log("Data after delete:", data);

  // Clean up
  await supabase.from('posts').delete().eq('date_key', testKey);
}

run();
