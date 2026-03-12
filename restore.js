const { execSync } = require('child_process');
try {
  execSync('git checkout src/components/BriefingOnboarding.tsx src/components/OnboardingView.tsx');
  console.log('Restored files');
} catch (e) {
  console.error('Error:', e.message);
}
