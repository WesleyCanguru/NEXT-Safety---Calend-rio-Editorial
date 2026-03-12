const { execSync } = require('child_process');
try {
  const content = execSync('git show HEAD:src/components/BriefingOnboarding.tsx', { encoding: 'utf8' });
  const fs = require('fs');
  fs.writeFileSync('src/components/BriefingOnboarding.tsx', content);
  console.log('Restored BriefingOnboarding.tsx');
} catch (e) {
  console.error('Error:', e.message);
}
