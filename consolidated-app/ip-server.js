import http from 'http';

// Create server explicitly on 127.0.0.1 rather than 'localhost'
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>IP Direct Test</title>
      </head>
      <body>
        <h1>Success! Server is working on 127.0.0.1</h1>
        <p>If you can see this message, your browser can reach the direct IP (127.0.0.1).</p>
        <p>This suggests that there might be an issue with the 'localhost' hostname resolution.</p>
      </body>
    </html>
  `);
});

const IP = '127.0.0.1';
const PORT = 7777;

server.listen(PORT, IP, () => {
  console.log(`Server running at http://${IP}:${PORT}/`);
});