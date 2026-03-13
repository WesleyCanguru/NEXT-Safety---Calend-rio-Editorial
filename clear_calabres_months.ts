import { supabase } from './lib/supabase.ts';

async function run() {
  const clientId = 'e817fbf9-0985-4453-b710-34623af870d6'; // Calabres & Lima
  
  // Clear months 1, 2, and 4-12
  const monthsToClear = [1, 2, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  
  for (const month of monthsToClear) {
    const { error } = await supabase
      .from('client_monthly_plans')
      .update({ theme: null, objectives: [] })
      .eq('client_id', clientId)
      .eq('month', month);
      
    if (error) {
      console.error(`Error updating month ${month}:`, error);
    } else {
      console.log(`Cleared month ${month}`);
    }
  }
}

run();
