import http from 'http';
import { fileURLToPath } from 'url';
import path from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = 8080;

// Create a simple test server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Server</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 40px auto; line-height: 1.6; }
          h1 { color: #8065F2; }
          .card { border: 1px solid #ddd; padding: 20px; border-radius: 8px; margin-top: 20px; }
        </style>
      </head>
      <body>
        <h1>Simple Test Server Working!</h1>
        <p>If you can see this page, the server is running correctly on port ${PORT}.</p>
        
        <div class="card">
          <h2>Server Information</h2>
          <ul>
            <li>URL: http://localhost:${PORT}/</li>
            <li>Time: ${new Date().toLocaleString()}</li>
            <li>Directory: ${process.cwd()}</li>
          </ul>
        </div>
        
        <div class="card">
          <h2>Next Steps</h2>
          <p>If this basic server works but Vite doesn't, the issue might be:</p>
          <ul>
            <li>Vite configuration issues</li>
            <li>Node.js compatibility problems</li>
            <li>Dependency conflicts</li>
          </ul>
        </div>
      </body>
    </html>
  `);
});

server.listen(PORT, () => {
  console.log(`Test server running at http://localhost:${PORT}/`);
  console.log(`Also try: http://127.0.0.1:${PORT}/`);
});