import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;
const DIST_DIR = path.join(__dirname, 'dist');

// MIME types map
const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

// Create a server to serve the static files
const server = http.createServer((req, res) => {
  console.log(`Received request for: ${req.url}`);
  
  // Default to index.html for SPA routing
  let filePath = path.join(DIST_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // For SPA routing, serve index.html for any path that doesn't have a file extension
  // This is required for client-side routing to work
  if (!path.extname(filePath) && !fs.existsSync(filePath)) {
    filePath = path.join(DIST_DIR, 'index.html');
    console.log(`Serving index.html for SPA route: ${req.url}`);
  }
  
  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';
  
  // Read and serve the file
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
        res.writeHead(404);
        res.end('File not found');
      } else {
        console.error(`Server error: ${err.code}`);
        res.writeHead(500);
        res.end(`Server Error: ${err.code}`);
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
      console.log(`Served: ${filePath} (${contentType})`);
    }
  });
});

server.listen(PORT, () => {
  console.log(`Build server running at http://localhost:${PORT}/`);
  console.log(`Also accessible at http://127.0.0.1:${PORT}/`);
  console.log(`Serving files from: ${DIST_DIR}`);
});