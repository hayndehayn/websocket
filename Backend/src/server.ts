import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import axios from 'axios';
import type { PriceResponce } from './interface/priceResponce.ts';

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
     res.writeHead(200, { 'Content-Type': 'text/plain' });
     res.end('Hello World\n');
});

const wss = new WebSocketServer({ server });

wss.on('connection', (ws: WebSocket) => {
     console.log('✅ - Client connected');
     const sendPrice = async () => {
          try {
               const response = await axios.get<PriceResponce>('https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000')
               const rawPrice: number = response.data.Price;
               const rawOldPrice: number = response.data.PriceYesterday;

               // * Delete nums after dot
               const price = Math.trunc(rawPrice);
               const oldPrice = Math.trunc(rawOldPrice);
               // console.log(`Actual price: ${price}, Old price: ${oldPrice}`);

               if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify({ currency: 'BTC', price }));
                    ws.send(JSON.stringify({ price_old: oldPrice }));
               }
          } catch (error) {
               console.error('Error fetching price:', error);
          }
     };

     // ws.on('message', (price: number) => {
     //      ws.send(`✉️ - Server received your message: ${price.toString()}`);
     // });

     const interval = setInterval(sendPrice, 2000);

     ws.on('close', () => {
          clearInterval(interval);
          console.log('❌ - Client disconnected');
     });
});

server.listen(8080, () => {
     console.log(`📦 - Server is listening on port 8080`);
});