import http from 'http';

// Create server on all interfaces
const LAN_IP = '0.0.0.0'; // Listen on all interfaces
const PORT = 5000; // Use a different port

const server = http.createServer((req, res) => {
  // Serve a simple status page
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Server Status</title>
        <style>
          body { font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; }
          h1 { color: #0066cc; }
          .status { background: #e6f3ff; border: 1px solid #cce5ff; padding: 15px; border-radius: 4px; }
          .links { margin-top: 20px; }
          .links a { display: block; margin: 10px 0; }
        </style>
      </head>
      <body>
        <h1>Server is running successfully!</h1>
        <div class="status">
          <p>Server is running on port ${PORT}</p>
          <p>Listening on all interfaces (${LAN_IP})</p>
        </div>
        <div class="links">
          <h3>Try these links:</h3>
          <a href="http://localhost:${PORT}/">http://localhost:${PORT}/</a>
          <a href="http://127.0.0.1:${PORT}/">http://127.0.0.1:${PORT}/</a>
        </div>
      </body>
    </html>
  `);
});

server.listen(PORT, LAN_IP, () => {
  console.log(`Server running at http://${LAN_IP}:${PORT}/`);
});