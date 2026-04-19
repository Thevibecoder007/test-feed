const http = require('http');
const url = require('url');

const PORT = process.env.PORT || 3000;
const VALID_API_KEY = 'mytest123';

function encodeForFeed(str) {
  return str
    .replace(/&/g, '\\u0026')
    .replace(/</g, '\\u003c')
    .replace(/>/g, '\\u003e')
    .replace(/"/g, '\\"')
    .replace(/'/g, '\\u0027');
}

const server = http.createServer((req, res) => {
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;
  const query = parsedUrl.query;

  if (pathname === '/') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Feed is working');
    return;
  }

  if (pathname === '/unique-code') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    if (query.apiKey === VALID_API_KEY) {
      const html = '<div class="container"><section><p>Hello from my safe encoded feed</p></section></div>';
      const encoded = encodeForFeed(html);
      res.end('{"code":"' + encoded + '"}');
    } else {
      res.end('{"error":"Invalid apiKey"}');
    }
    return;
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Not found');
});

server.listen(PORT, () => {
  console.log('Server running at http://localhost:' + PORT);
  console.log('Press Ctrl + C to stop the server.');
});
