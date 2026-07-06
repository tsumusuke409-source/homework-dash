// 宿題ダッシュ！ 静的配信用の最小サーバー
const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 5260;
const ROOT = __dirname;
const MIME = { '.html':'text/html; charset=utf-8', '.js':'text/javascript', '.css':'text/css' };

http.createServer((req, res) => {
  let p = decodeURIComponent(req.url.split('?')[0]);
  if (p === '/' || p === '') p = '/index.html';
  const file = path.join(ROOT, p);
  if (!file.startsWith(ROOT)) { res.writeHead(403); res.end('forbidden'); return; }
  fs.readFile(file, (err, data) => {
    if (err) { res.writeHead(404); res.end('not found'); return; }
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    res.end(data);
  });
}).listen(PORT, () => console.log('homework-dash on http://localhost:' + PORT));
