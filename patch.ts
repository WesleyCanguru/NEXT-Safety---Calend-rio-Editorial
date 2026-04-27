import * as fs from 'fs';
import * as path from 'path';

const files = [
  'hooks/useClientOnboarding.ts',
  'hooks/useAgencyCRM.ts',
  'hooks/useClientesOverview.ts',
  'hooks/useTutorialCenter.ts',
  'hooks/useLeads.ts',
  'hooks/usePasswordVault.ts',
  'hooks/useEditorialData.ts',
  'hooks/useAgencyFinanceiro.ts',
  'hooks/useLeadTracker.ts',
  'components/agency/HomeTab.tsx',
  'components/agency/AgencyTasksTab.tsx',
  'components/agency/MaintenanceTab.tsx',
  'components/ClientHome.tsx',
  'components/PostIdeasModal.tsx',
  'components/AnnualOverview.tsx',
  'components/MonthDetail.tsx',
  'components/PaidTrafficView.tsx',
  'components/BriefingOnboarding.tsx',
  'components/ClientManager.tsx',
  'components/PublicApprovalScreen.tsx',
  'components/WebsiteFeedbackPanel.tsx',
  'components/ClientSelectorScreen.tsx',
  'components/PostModal.tsx',
  'components/AiPhotosView.tsx',
  'components/ImportPdfModal.tsx',
  'components/AdminView.tsx',
  'components/BriefingsView.tsx',
  'components/PublicationIdeasModal.tsx'
];

const tablesWithAgency = [
  'clients', 'client_users', 'agency_tasks', 'agency_billing', 
  'agency_expenses', 'agency_crms', 'agency_leads', 'agency_settings', 
  'posts', 'leads'
];

for (const file of files) {
  const fullPath = path.join(process.cwd(), file);
  if (!fs.existsSync(fullPath)) continue;

  let content = fs.readFileSync(fullPath, 'utf8');
  let changed = false;

  const getAgencyImportPath = () => {
    const depth = file.split('/').length - 1;
    return depth > 0 ? '../'.repeat(depth) + 'contexts/AgencyContext' : './contexts/AgencyContext';
  };

  // If the file uses .from('tableName') where tableName is in the list, we patch it
  const hasTargetTable = tablesWithAgency.some(t => content.includes(`from('${t}')`));
  if (!hasTargetTable && !content.includes('agency_id')) continue;

  // 1. Ensure useAgency is imported
  if (!content.includes('useAgency')) {
    const importPath = getAgencyImportPath();
    const importMatch = content.match(/import .* from ['"].*['"];/g);
    if (importMatch) {
      const lastImport = importMatch[importMatch.length - 1];
      content = content.replace(lastImport, `${lastImport}\nimport { useAgency } from '${importPath}';`);
    } else {
      content = `import { useAgency } from '${importPath}';\n` + content;
    }
    changed = true;
  }

  // 2. Ensure useAgency is called in the functional bodies.
  // We'll look for `export function use` or `export const Name: React.FC` or `export const Name = () =>`
  const functionRegex = /(?:export\s+(?:function\s+|const\s+\w+\s*[:=]\s*(?:React\.FC(?:<[^>]+>)?\s*=)?\s*(?:async\s*)?\([^)]*\)\s*=>\s*){)([^}]*)/g;
  
  content = content.replace(/((?:export\s+(?:default\s+)?(?:function\s+\w+|const\s+\w+\s*[:=]\s*(?:React\.FC(?:<[^>]+>)?\s*=)?\s*(?:async\s*)?\([^)]*\)\s*=>)))\s*{/g, (match, prefix) => {
    return `${match}\n  const { agency } = useAgency();\n`;
  });

  // Also replace simple non-export functions if they have `.from` inside? Better to trust the user's manual patching for complex nested scopes.
  // Actually, I'll just do manual replacements for the .eq('agency_id', agency.id)

  for (const table of tablesWithAgency) {
    // Basic select replacement: target .from('tableName') followed by .select
    const selectRegex = new RegExp(`\\.from\\('${table}'\\)\\s*\\.select`, 'g');
    if (selectRegex.test(content)) {
      content = content.replace(selectRegex, `.from('${table}').select('*, current_agency_id_injected')`); // placeholder
      // Then we replace the '*, current_agency_id_injected' with normal select, and add `.eq('agency_id', agency.id)` right after
      content = content.replace(/\.select\('\*\s*,\s*current_agency_id_injected'\)/g, `.select('*').eq('agency_id', agency?.id)`);
      content = content.replace(/\.select\('([^']+)'\s*,\s*current_agency_id_injected'\)/g, `.select('$1').eq('agency_id', agency?.id)`);
      // It's getting too sketchy.
    }
  }

  if (changed) {
    fs.writeFileSync(fullPath + '.patched', content);
  }
}
