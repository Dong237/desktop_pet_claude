#!/usr/bin/env node

// Set electron flags before launching
process.env.ELECTRON_EXTRA_LAUNCH_ARGS = '--no-sandbox';

// Launch electron-vite dev
const { spawn } = require('child_process');
const path = require('path');

const electronVite = spawn(
  'electron-vite',
  ['dev', '--', '--no-sandbox'],
  {
    stdio: 'inherit',
    shell: true,
    env: {
      ...process.env,
      ELECTRON_EXTRA_LAUNCH_ARGS: '--no-sandbox'
    }
  }
);

electronVite.on('exit', (code) => {
  process.exit(code);
});

electronVite.on('error', (err) => {
  console.error('Failed to start electron-vite:', err);
  process.exit(1);
});
