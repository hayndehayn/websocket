import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end('Hello World\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
     console.log('✅ - Client connected');

     ws.on('message', (message: Buffer) => {
          const text = message.toString();
          ws.send(`✉️ - Server received your message: ${text}`);
     });

     ws.on('close', () => {
          console.log('❌ - Client disconnected');
     });
});

server.listen(8080, () => {
     console.log(`📦 - Server is listening on port 8080`);
});