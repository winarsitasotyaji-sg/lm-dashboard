/**
 * proxy.js — Local CORS proxy for Shopee SMART API
 *
 * Run this on your machine while connected to Shopee VPN:
 *   node proxy.js
 *
 * Then open the dashboard — the chatbot will route through localhost:3001.
 * Stop with Ctrl+C when done.
 */

const http  = require('http');
const https = require('https');

const PORT        = 3001;
const SMART_HOST  = 'smart.shopee.io';
const SMART_PATH  = '/apis/smart/v1/orchestrator/deployments/invoke';

const CORS_HEADERS = {
  'Access-Control-Allow-Origin':  '*',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type'
};

const server = http.createServer((req, res) => {
  // Handle CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, CORS_HEADERS);
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.writeHead(405, CORS_HEADERS);
    res.end('Method not allowed');
    return;
  }

  let body = '';
  req.on('data', chunk => body += chunk);
  req.on('end', () => {
    const options = {
      hostname: SMART_HOST,
      path:     SMART_PATH,
      method:   'POST',
      headers:  { 'Content-Type': 'application/json', 'Content-Length': Buffer.byteLength(body) }
    };

    const proxyReq = https.request(options, proxyRes => {
      let data = '';
      proxyRes.on('data', chunk => data += chunk);
      proxyRes.on('end', () => {
        res.writeHead(proxyRes.statusCode, { ...CORS_HEADERS, 'Content-Type': 'application/json' });
        res.end(data);
      });
    });

    proxyReq.on('error', err => {
      console.error('Proxy error:', err.message);
      res.writeHead(502, CORS_HEADERS);
      res.end(JSON.stringify({ error: 'Proxy error: ' + err.message }));
    });

    proxyReq.write(body);
    proxyReq.end();
  });
});

server.listen(PORT, () => {
  console.log(`✓ SMART proxy running at http://localhost:${PORT}`);
  console.log('  Dashboard chatbot will route through this proxy.');
  console.log('  Make sure you are connected to Shopee VPN.');
  console.log('  Press Ctrl+C to stop.\n');
});
