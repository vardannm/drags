import { spawnSync } from 'node:child_process';

const vitestCheck = spawnSync('npx', ['--no-install', 'vitest', '--version'], { stdio: 'ignore' });

if (vitestCheck.status === 0) {
  const run = spawnSync('npx', ['--no-install', 'vitest', 'run'], { stdio: 'inherit' });
  process.exit(run.status ?? 1);
}

console.warn('Vitest is not installed in this environment. Running fallback Node.js smoke tests instead.');
const fallback = spawnSync('node', ['--test', 'tests/**/*.test.js'], { stdio: 'inherit', shell: true });
process.exit(fallback.status ?? 1);
