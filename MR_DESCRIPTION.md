# Merge Request Description

## Title
Improve project onboarding docs and add Vitest starter test scaffolding

## Overview
This MR updates the repository documentation and introduces a starter testing setup so the project is easier to migrate and run in a new/empty target branch in a different repository.

## What was changed
- Replaced the default template README with full project-specific documentation.
- Added detailed dependency documentation (runtime + development dependencies).
- Added explicit setup/run/build/lint instructions.
- Added API/environment configuration guidance.
- Added test strategy notes and CI pipeline recommendations.
- Added Vitest starter configuration in Vite config.
- Added initial test setup and one baseline app test.
- Added this standalone MR description file for reuse during cross-repo merge.

## Files changed
- `README.md`
- `package.json`
- `vite.config.js`
- `src/test/setupTests.js`
- `src/test/App.test.jsx`
- `MR_DESCRIPTION.md`

## Pipeline recommendation
Suggested CI steps:
1. `npm ci`
2. `npm run lint`
3. `npm run test`
4. `npm run build`

## Important note
Dependency installation for test tooling may fail in restricted environments due to package registry policy/network controls. The configuration and test files are included so installation can be completed later in CI or in a network-permitted environment.
