#!/usr/bin/env node

const { spawn } = require('child_process');

const processes = [];
let shuttingDown = false;
const npmCommand = process.platform === 'win32' ? 'npm.cmd' : 'npm';
const GRACEFUL_SIGNALS = new Set(['SIGINT', 'SIGTERM']);

function isProcessActive(child) {
  return child.exitCode === null && child.signalCode === null;
}

function startProcess(args, label) {
  const child = spawn(npmCommand, args, {
    stdio: 'inherit',
    env: process.env
  });

  child.on('exit', (code, signal) => {
    if (shuttingDown) {
      return;
    }

    if (signal) {
      if (GRACEFUL_SIGNALS.has(signal)) {
        console.log(`\n${label} received ${signal}. Initiating shutdown.`);
        shutdown(0);
      } else {
        console.warn(`\n${label} terminated with signal ${signal}.`);
        shutdown(1);
      }
      return;
    }

    if (code !== 0) {
      console.error(`\n${label} exited with code ${code}. Shutting down remaining processes.`);
      shutdown(code);
      return;
    }

    console.log(`\n${label} exited. Shutting down remaining processes.`);
    shutdown(0);
  });

  child.on('error', (error) => {
    if (shuttingDown) {
      return;
    }

    console.error(`\nFailed to start ${label}:`, error);
    shutdown(1);
  });

  processes.push({ child, label });
}

function shutdown(code = 0) {
  if (shuttingDown) {
    return;
  }
  shuttingDown = true;
  processes.forEach(({ child, label }) => {
    if (isProcessActive(child)) {
      try {
        child.kill();
        console.log(`Sent termination signal to ${label}.`);
      } catch (error) {
        console.warn(`Failed to terminate ${label}:`, error.message);
      }
    }
  });

  setTimeout(() => process.exit(code), 200);
}

process.on('SIGINT', () => {
  console.log('\nReceived SIGINT. Cleaning up child processes...');
  shutdown(0);
});

process.on('SIGTERM', () => {
  console.log('\nReceived SIGTERM. Cleaning up child processes...');
  shutdown(0);
});

startProcess(['run', 'start:dev', '--workspace', 'apps/backend'], 'Backend');
startProcess(['run', 'dev', '--workspace', 'apps/frontend'], 'Frontend');

console.log('Development servers for backend and frontend are starting...');
