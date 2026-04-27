import * as fs from 'fs';
import * as path from 'path';

function findFiles(dir: string, pattern: RegExp, fileList: string[] = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      findFiles(fullPath, pattern, fileList);
    } else if (pattern.test(fullPath)) {
      fileList.push(fullPath);
    }
  }
  return fileList;
}

const allTsFiles = findFiles(path.join(process.cwd(), 'components'), /\.(ts|tsx)$/)
  .concat(findFiles(path.join(process.cwd(), 'hooks'), /\.(ts|tsx)$/));

allTsFiles.forEach(file => {
  if (file.includes('useSupabaseWithAgency.ts')) return;

  let content = fs.readFileSync(file, 'utf8');

  // Check if it imports supabase
  if (content.includes("import { supabase } from") || content.includes("import { supabase }")) {
    
    // Replace import
    // Need to find relative path to hooks/useSupabaseWithAgency
    const relativeDepth = file.replace(process.cwd(), '').split(path.sep).length - 2;
    const prefix = relativeDepth > 0 ? '../'.repeat(relativeDepth) : './';
    const hookPath = `${prefix}hooks/useSupabaseWithAgency`;

    content = content.replace(
      /import\s+{\s*supabase\s*}\s+from\s+['"][^'"]+supabase['"];?/,
      `import { useSupabaseWithAgency } from '${hookPath}';`
    );

    // Now inject `const supabase = useSupabaseWithAgency();` into the top-level functions or hooks.
    // This is tricky for files with multiple components, or outside components.
    console.log(`Needs manual/semi-manual patching: ${file}`);

    // Since regex replacement of `function XYZ() {` is hard, let's just make `supabase` a getter instead!
    // Wait, hooks can only be called inside React functions!
  }
});
