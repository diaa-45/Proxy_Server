const http = require('http');
const httpProxy = require('http-proxy');
require("dotenv");
// Create a proxy server instance
const proxy = httpProxy.createProxyServer({});

// Create a basic HTTP server
const server = http.createServer((req, res) => {
  // Log the incoming request
  console.log(`Received request for: ${req.url}`);

  // Proxy the request to the target server
  proxy.web(req, res, { target: process.env.TARGET }, (err) => {
    // Handle proxy errors
    console.error('Proxy error:', err);
    res.writeHead(500, { 'Content-Type': 'text/plain' });
    res.end('Proxy error occurred.');
  });
});

// Handle errors on the HTTP server
server.on('error', (err) => {
  console.error('Server error:', err);
});

// Listen on a specific port
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Proxy server is running on port ${PORT}`);
});