import http from 'http';
import * as dotenv from 'dotenv';

dotenv.config();

const port = process.env.PORT || 3000;
const server = http.createServer((req, res) => {
  try {
    console.log('== url', req.url);
    console.log('== method', req.method);
    if (req.url === '/users' && req.method === 'GET') {
      res.writeHead(200, { 'Content-Type': 'application/json' });

      res.end('Test !!');
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });

      res.end(1);
    }
  } catch (err) {
    // res.writeHead(500, { 'Content-Type': 'application/json' });
    res.writeHead(500);
    res.write('Server Error');
    res.end();
  }
});
server.listen(port);
console.log(`Server is working on Port: ${port}`);

export { server, port };

// dotenv.config();

// const port = process.env.PORT || 3000;
