// A very simple local test feed server
// Uses only Node's built-in modules (no npm install needed)

const http = require('http');
const url = require('url');

const PORT = 3000;
const VALID_API_KEY = 'mytest123';

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  // Route: /
  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Feed is working');
    return;
  }

  // Route: /unique-code
  if (pathname === '/unique-code') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (query.apiKey === VALID_API_KEY) {
      res.end(JSON.stringify({
        code: '<div><p>Hello from my safe test feed</p></div>'
      }));
    } else {
      res.end(JSON.stringify({ error: 'Invalid apiKey' }));
    }
    return;
  }

  // Anything else
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log('Press Ctrl + C to stop the server.');
});
