import http from 'http';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/html');
  res.end(`
    <!DOCTYPE html>
    <html>
      <head>
        <title>Test Server</title>
      </head>
      <body>
        <h1>Hello from Simple HTTP Server</h1>
        <p>If you can see this, the server is working correctly.</p>
      </body>
    </html>
  `);
});

server.listen(8080, () => {
  console.log('Server running at http://localhost:8080/');
});