import * as fs from 'fs';
import * as path from 'path';

const filesToPatch = [
  'hooks/useAgencyFinanceiro.ts',
  'hooks/useClientesOverview.ts',
  'hooks/useAgencyCRM.ts',
  'hooks/useLeads.ts',
  'hooks/useLeadTracker.ts',
  'components/agency/HomeTab.tsx',
  'components/agency/MaintenanceTab.tsx',
  'components/MonthDetail.tsx',
  'components/ClientManager.tsx',
  'components/PostModal.tsx',
  'components/ClientHome.tsx',
  'components/LeadTrackerView.tsx'
];

const tablesWithAgencyId = [
  'clients', 'client_users', 'agency_tasks', 'agency_billing', 
  'agency_expenses', 'agency_crms', 'agency_leads', 'agency_settings', 
  'posts', 'leads'
];

function patchFile(filePath: string) {
  const fullPath = path.join(process.cwd(), filePath);
  if (!fs.existsSync(fullPath)) return;
  
  let content = fs.readFileSync(fullPath, 'utf8');
  let originalContent = content;

  // Add import if not exists
  if (!content.includes("useAgency")) {
    // Find the last import
    const lastImportIndex = content.lastIndexOf('import ');
    if (lastImportIndex !== -1) {
      const endOfLastImport = content.indexOf('\n', lastImportIndex);
      // Need to compute relative path to contexts/AgencyContext
      const depth = filePath.split('/').length - 1;
      const relativePath = depth === 1 ? '../contexts/AgencyContext' : '../../contexts/AgencyContext';
      const importStmt = `\nimport { useAgency } from '${relativePath}';`;
      content = content.slice(0, endOfLastImport + 1) + importStmt + content.slice(endOfLastImport + 1);
    }
  }

  // Very naive replacements. It's safer to just let me know if we need it.
  console.log(`Ready to patch ${filePath}`);
}

filesToPatch.forEach(patchFile);
