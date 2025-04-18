import http from 'http';

// Create the simplest possible server
const server = http.createServer((req, res) => {
  console.log(`Received request for: ${req.url}`);
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Server is working!\n');
});

// Try multiple ports to see if any of them work
const ports = [3000, 8080, 8000, 9090, 9000, 8888, 7777, 6060, 3333, 4444];

// Try each port in sequence
function tryPort(index) {
  if (index >= ports.length) {
    console.log("Couldn't start server on any port");
    return;
  }
  
  const port = ports[index];
  
  server.once('error', (err) => {
    console.log(`Port ${port} failed: ${err.message}`);
    tryPort(index + 1);
  });
  
  server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
    console.log(`Also accessible at http://127.0.0.1:${port}/`);
    console.log(`Try accessing this URL in your browser.`);
  });
}

tryPort(0);