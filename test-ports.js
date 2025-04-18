import http from 'http';

// Try different ports to see if any work
const ports = [1234, 4321, 8888, 9999];

ports.forEach(port => {
  const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Port Test: ${port}</title>
        </head>
        <body>
          <h1>Success! Server is running on port ${port}</h1>
          <p>If you can see this message, localhost is working on port ${port}.</p>
          <p>Try accessing these other ports as well:</p>
          <ul>
            ${ports.filter(p => p !== port).map(p => `<li><a href="http://localhost:${p}/">http://localhost:${p}/</a></li>`).join('')}
          </ul>
        </body>
      </html>
    `);
  });

  server.on('error', (e) => {
    console.log(`Error starting server on port ${port}: ${e.message}`);
  });

  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
  });
});