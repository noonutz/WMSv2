#!/usr/bin/env node

const { spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

function runNextLint() {
  try {
    const nextBin = require.resolve('next/dist/bin/next', { paths: [projectRoot] });
    const result = spawnSync('node', [nextBin, 'lint'], {
      cwd: projectRoot,
      stdio: 'inherit',
      env: process.env,
    });

    if (result.error) {
      throw result.error;
    }

    if (typeof result.status === 'number') {
      return result.status;
    }

    return 1;
  } catch (error) {
    if (error.code !== 'MODULE_NOT_FOUND') {
      console.warn('[frontend:lint] Falling back to offline checks. Reason:', error.message);
    }
    return null;
  }
}

function collectSourceFiles(startDir, files) {
  if (!fs.existsSync(startDir)) {
    return;
  }

  const entries = fs.readdirSync(startDir, { withFileTypes: true });
  entries.forEach((entry) => {
    const fullPath = path.join(startDir, entry.name);
    if (entry.isDirectory()) {
      collectSourceFiles(fullPath, files);
    } else if (/\.(tsx?|jsx?)$/i.test(entry.name)) {
      files.push(fullPath);
    }
  });
}

function runOfflineChecks() {
  console.log('⚠️  Next.js CLI not installed – running lightweight offline lint checks.');

  const sourceDirs = ['app'];
  const files = [];
  sourceDirs.forEach((dir) => {
    collectSourceFiles(path.join(projectRoot, dir), files);
  });

  if (files.length === 0) {
    console.log('[frontend:lint] No source files found.');
    return 0;
  }

  const disallowedPatterns = [
    {
      regex: /\bconsole\.(log|debug|info|warn|error)\b/,
      message: 'Avoid console.* statements in frontend source files.',
    },
    {
      regex: /@ts-ignore/,
      message: 'Avoid @ts-ignore directives in frontend source files.',
    },
  ];

  let warnings = 0;
  files.forEach((filePath) => {
    const content = fs.readFileSync(filePath, 'utf8');
    disallowedPatterns.forEach((rule) => {
      if (rule.regex.test(content)) {
        warnings += 1;
        const relativePath = path.relative(projectRoot, filePath).replace(/\\/g, '/');
        console.warn(`[frontend:lint] ${relativePath}: ${rule.message}`);
      }
    });
  });

  if (warnings > 0) {
    console.error(`[frontend:lint] Offline checks failed with ${warnings} issue(s).`);
    return 1;
  }

  console.log(`[frontend:lint] Offline checks passed for ${files.length} file(s).`);
  return 0;
}

const nextResult = runNextLint();
if (nextResult !== null) {
  process.exit(nextResult);
}

const exitCode = runOfflineChecks();
process.exit(exitCode);
