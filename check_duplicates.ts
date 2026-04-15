import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wtzphiyybitcucwkfpgv.supabase.co';
const SUPABASE_KEY = 'sb_publishable_uLQGmz7lWazPN1Uqb4_4vQ_HggVpMz9';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

async function run() {
  const { data, error } = await supabase
    .from('posts')
    .select('id, date_key, status, theme, type')
    .eq('client_id', '75b00b27-61ee-4b23-8721-70748ccb0789')
    .neq('status', 'deleted');

  if (error) {
    console.error(error);
    return;
  }

  const themeMap = new Map<string, any[]>();
  data.forEach(p => {
    if (!themeMap.has(p.theme)) themeMap.set(p.theme, []);
    themeMap.get(p.theme)!.push(p);
  });

  for (const [theme, posts] of themeMap.entries()) {
    if (posts.length > 1) {
      console.log(`Theme: ${theme}`);
      posts.forEach(p => console.log(`  ${p.date_key} - ${p.status}`));
    }
  }
}

run();
