#!/usr/bin/env node

const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const path = require('path');

const projectRoot = process.cwd();
const isWindows = process.platform === 'win32';
const nextBinary = path.join(
  projectRoot,
  'node_modules',
  '.bin',
  isWindows ? 'next.cmd' : 'next',
);

function runRealNext() {
  const child = spawn(nextBinary, ['dev'], {
    stdio: 'inherit',
    shell: isWindows,
  });

  child.on('close', (code) => {
    process.exit(code ?? 0);
  });
}

function startMockPreview() {
  const previewRoot = path.join(__dirname, '..', 'previews');
  const port = Number(process.env.PREVIEW_PORT || 4100);

  const server = http.createServer(async (req, res) => {
    const urlPath = (req.url || '/').split('?')[0];
    const normalized = urlPath === '/' ? 'index.html' : urlPath.replace(/^\/+/, '');
    const filePath = path.join(previewRoot, normalized);

    if (!filePath.startsWith(previewRoot)) {
      res.statusCode = 403;
      res.end('Forbidden');
      return;
    }

    try {
      const data = await fs.promises.readFile(filePath);
      const ext = path.extname(filePath);
      const contentType =
        ext === '.css'
          ? 'text/css'
          : ext === '.js'
          ? 'text/javascript'
          : ext === '.json'
          ? 'application/json'
          : 'text/html';

      res.setHeader('Content-Type', contentType + '; charset=utf-8');
      res.end(data);
    } catch (error) {
      res.statusCode = 404;
      res.end('Not Found');
    }
  });

  server.listen(port, '0.0.0.0', () => {
    console.log('⚠️  Next.js not found – launching static preview instead.');
    console.log(`   Preview URL: http://localhost:${port}`);
    console.log('   Files served from /apps/frontend/previews');
    console.log('   Install dependencies and rerun for the full developer experience.');
  });
}

if (fs.existsSync(nextBinary)) {
  runRealNext();
} else {
  startMockPreview();
}
