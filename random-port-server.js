import http from 'http';

// Use a very high random port that's unlikely to be in use
const PORT = 41234;

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Random Port Test</title>
      </head>
      <body>
        <h1>Success! Server is running on port ${PORT}</h1>
        <p>If you can see this message, you can access servers on non-standard ports.</p>
      </body>
    </html>
  `);
});

server.on('error', (e) => {
  console.error(`Failed to start server: ${e.message}`);
  if (e.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Try a different port.`);
  }
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
  console.log(`Also try: http://127.0.0.1:${PORT}/`);
});