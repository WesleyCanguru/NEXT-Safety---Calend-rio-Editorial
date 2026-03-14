import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const { data, error } = await supabase.from('posts').insert({
    client_id: '75b00b27-61ee-4b23-8721-70748ccb0789',
    date_key: 'test_ai_photo_interested',
    status: 'interested'
  }).select();
  console.log(data, error);
}

main();
