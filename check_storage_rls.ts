import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function main() {
  const file = new Blob(['test'], { type: 'text/plain' });
  const { data, error } = await supabase.storage.from('post-uploads').upload('test.txt', file);
  console.log('Upload error:', error);
}

main();
