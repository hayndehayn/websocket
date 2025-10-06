import express from 'express';
import cors from 'cors';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();

type LatestItem = { id: string; price: number; priceYesterday?: number | undefined; ts: number };

const PORT = process.env.DEFAULT_PORT ? Number(process.env.DEFAULT_PORT) : 8080;
const COINS: { id: string; apiName: string; address: string }[] =
     process.env.COINS_CONFIG
          ? JSON.parse(process.env.COINS_CONFIG)
          : [
               { id: 'bitcoin', apiName: 'Bitcoin', address: '0x0000000000000000000000000000000000000000' },
               { id: 'ethereum', apiName: 'Ethereum', address: '0x0000000000000000000000000000000000000000' },
               { id: 'litecoin', apiName: 'Litecoin', address: '0x0000000000000000000000000000000000000000' }
          ];

const PRICE_INTERVAL = Number(process.env.PRICE_INTERVAL_MS ?? 10000);
const MAX_HISTORY = Number(process.env.MAX_HISTORY ?? 200);
const BACKOFF_MS = Number(process.env.BACKOFF_MS ?? 60_000);

const app = express();
app.use(cors());
app.use(express.json());

// ? in-memory store
let latestPrices: LatestItem[] = [];
const history = new Map<string, { ts: number; price: number }[]>();
COINS.forEach((c) => history.set(c.id, []));

let isBackingOff = false;
let backoffUntil = 0;

const buildDiadataUrl = (apiName: string, address: string) =>
     `https://api.diadata.org/v1/assetQuotation/${encodeURIComponent(apiName)}/${encodeURIComponent(address)}`;

async function fetchPricesOnce() {
     if (isBackingOff && Date.now() < backoffUntil) return;
     const now = Date.now();
     const results: LatestItem[] = [];

     await Promise.all(
          COINS.map(async (coin) => {
               try {
                    const url = buildDiadataUrl(coin.apiName, coin.address);
                    const resp = await axios.get(url, { timeout: 8000 });
                    const data = resp.data as any;
                    const rawPrice = Number(data?.Price ?? data?.price ?? NaN);
                    const rawOld = Number(data?.PriceYesterday ?? data?.priceYesterday ?? NaN);
                    const price = Number.isFinite(rawPrice) ? Math.trunc(rawPrice) : NaN;
                    const priceYesterday = Number.isFinite(rawOld) ? Math.trunc(rawOld) : undefined;

                    const item: LatestItem = { id: coin.id, price, priceYesterday, ts: now };
                    results.push(item);

                    //  push to history
                    const hist = history.get(coin.id);
                    if (hist) {
                         hist.push({ ts: now, price });
                         if (hist.length > MAX_HISTORY) hist.shift();
                    }
               } catch (err: any) {
                    const status = err?.response?.status;
                    console.error(`fetch ${coin.id} error`, status ?? err?.message ?? err);
                    if (status === 429) {
                         isBackingOff = true;
                         backoffUntil = Date.now() + BACKOFF_MS;
                         console.warn(`Backoff due to 429 for ${BACKOFF_MS}ms`);
                    }
               }
          })
     );

     if (results.length) {
          latestPrices = results;
     }
}

// ? initial fetch + periodic
fetchPricesOnce();
setInterval(fetchPricesOnce, PRICE_INTERVAL);

// ? WebSocket server
const server = http.createServer(app);
const wss = new WebSocketServer({ server });

wss.on('connection', (ws) => {
     console.log('WS client connected');
     // send latest immediately if available
     if (latestPrices.length) ws.send(JSON.stringify({ type: 'prices', data: latestPrices }));
     ws.on('error', (e) => console.warn('ws error', e));
     ws.on('close', () => console.log('ws closed'));
});

// ? broadcast loop:
let lastBroadcastTs = 0;
setInterval(() => {
     if (!latestPrices.length) return;
     const newestTs = Math.max(...latestPrices.map((p) => p.ts));
     if (newestTs === lastBroadcastTs) return;
     lastBroadcastTs = newestTs;
     const payload = JSON.stringify({ type: 'prices', data: latestPrices });
     wss.clients.forEach((client) => {
          if (client.readyState === 1) client.send(payload);
     });
}, Math.max(1000, PRICE_INTERVAL));

app.get('/api/prices', (req, res) => {
     res.json({ data: latestPrices });
});

app.get('/api/coins/:id', (req, res) => {
     const id = req.params.id;
     const item = latestPrices.find((p) => p.id === id);
     if (!item) return res.status(404).json({ error: 'Not found' });
     res.json({ data: item });
});

// ? return history array
app.get('/api/coins/:id/chart', (req, res) => {
     const id = req.params.id;
     const hist = history.get(id) ?? [];
     res.json({ data: hist });
});

server.listen(PORT, () => {
     console.log(`Backend listening on ${PORT}`);
});