import express from 'express';
import cors from 'cors';
import * as http from 'http';
import { WebSocketServer } from 'ws';
import axios from 'axios';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/auth.routes.js';
import cookieParser from 'cookie-parser';
import { MONGO_URI, JWT_SECRET, FRONTEND_ORIGIN, DEFAULT_PORT, JWT_COOKIE_NAME, } from './config.js';
dotenv.config();
if (!MONGO_URI) {
    console.error('MONGO_URI is not set');
    process.exit(1);
}
// mask uri
const maskedUri = MONGO_URI.replace(/(:\/\/[^:]+:)([^@]+)(@)/, '$1****$3');
console.log('Using MONGO_URI:', maskedUri);
const PORT = DEFAULT_PORT;
const COINS = process.env.COINS_CONFIG
    ? JSON.parse(process.env.COINS_CONFIG)
    : [
        { id: 'bitcoin', apiName: 'Bitcoin', address: '0x0000000000000000000000000000000000000000' },
        { id: 'ethereum', apiName: 'Ethereum', address: '0x0000000000000000000000000000000000000000' },
        { id: 'litecoin', apiName: 'Litecoin', address: '0x0000000000000000000000000000000000000000' }
    ];
const PRICE_INTERVAL = Number(process.env.PRICE_INTERVAL_MS ?? 10000);
const MAX_HISTORY = Number(process.env.MAX_HISTORY ?? 200);
const app = express();
// ? CORS with specific origin for credentials
app.use(cors({
    origin: FRONTEND_ORIGIN,
    credentials: true,
}));
app.use(express.json());
app.use(cookieParser());
// ? Mount auth routes ONLY
app.use('/api/auth', authRoutes);
// in-memory store
let latestPrices = [];
const history = new Map();
COINS.forEach((c) => history.set(c.id, []));
const buildDiadataUrl = (apiName, address) => `https://api.diadata.org/v1/assetQuotation/${encodeURIComponent(apiName)}/${encodeURIComponent(address)}`;
async function fetchPricesOnce() {
    const now = Date.now();
    const results = [];
    await Promise.all(COINS.map(async (coin) => {
        try {
            const url = buildDiadataUrl(coin.apiName, coin.address);
            const resp = await axios.get(url, { timeout: 8000 });
            const data = resp.data;
            const rawPrice = Number(data?.Price ?? data?.price ?? NaN);
            const rawOld = Number(data?.PriceYesterday ?? data?.priceYesterday ?? NaN);
            const price = Number.isFinite(rawPrice) ? Math.trunc(rawPrice) : NaN;
            const priceYesterday = Number.isFinite(rawOld) ? Math.trunc(rawOld) : undefined;
            const item = {
                id: coin.id,
                price,
                ...(priceYesterday !== undefined && { priceYesterday }),
                ts: now
            };
            results.push(item);
            const hist = history.get(coin.id);
            if (hist) {
                hist.push({ ts: now, price });
                if (hist.length > MAX_HISTORY)
                    hist.shift();
            }
        }
        catch (err) {
            console.error(`fetch ${coin.id} error`, err?.response?.status ?? err?.message ?? err);
        }
    }));
    if (results.length) {
        latestPrices = results;
    }
}
fetchPricesOnce();
setInterval(fetchPricesOnce, PRICE_INTERVAL);
const server = http.createServer(app);
const wss = new WebSocketServer({ server });
wss.on('connection', (ws) => {
    console.log('WS client connected');
    if (latestPrices.length)
        ws.send(JSON.stringify({ type: 'prices', data: latestPrices }));
    ws.on('error', (e) => console.warn('ws error', e));
    ws.on('close', () => console.log('ws closed'));
});
let lastBroadcastTs = 0;
setInterval(() => {
    if (!latestPrices.length)
        return;
    const newestTs = Math.max(...latestPrices.map((p) => p.ts));
    if (newestTs === lastBroadcastTs)
        return;
    lastBroadcastTs = newestTs;
    const payload = JSON.stringify({ type: 'prices', data: latestPrices });
    wss.clients.forEach((client) => {
        if (client.readyState === 1)
            client.send(payload);
    });
}, Math.max(1000, PRICE_INTERVAL));
// ? HTTP API for frontend
app.get('/api/prices', (req, res) => {
    res.json({ data: latestPrices });
});
app.get('/api/coins/:id', async (req, res) => {
    const id = req.params.id;
    const item = latestPrices.find((p) => p.id === id);
    if (item)
        return res.json({ data: item });
    const coin = COINS.find((c) => c.id === id);
    if (!coin)
        return res.status(404).json({ error: 'Not found' });
    try {
        const url = buildDiadataUrl(coin.apiName, coin.address);
        const r = await axios.get(url, { timeout: 5000 });
        const data = r.data;
        const rawPrice = Number(data?.Price ?? data?.price ?? NaN);
        const price = Number.isFinite(rawPrice) ? Math.trunc(rawPrice) : NaN;
        const itemFresh = { id: coin.id, price, ts: Date.now() };
        res.json({ data: itemFresh });
    }
    catch (err) {
        console.error('Proxy /api/coins error', err?.response?.status ?? err?.message);
        const status = err?.response?.status ?? 502;
        res.status(status).json({ error: 'Failed to fetch coin detail', code: status });
    }
});
app.get('/api/coins/:id/chart', async (req, res) => {
    const id = req.params.id;
    const hist = history.get(id) ?? [];
    if (hist.length)
        return res.json({ data: hist });
    const coin = COINS.find((c) => c.id === id);
    if (!coin)
        return res.status(404).json({ error: 'Not found' });
    try {
        const url = buildDiadataUrl(coin.apiName, coin.address);
        const r = await axios.get(url, { timeout: 5000 });
        const data = r.data;
        const rawPrice = Number(data?.Price ?? data?.price ?? NaN);
        const price = Number.isFinite(rawPrice) ? Math.trunc(rawPrice) : NaN;
        const singlePoint = { ts: Date.now(), price };
        res.json({ data: [singlePoint] });
    }
    catch (err) {
        console.error('Proxy /api/coins/:id/chart error', err?.response?.status ?? err?.message);
        const status = err?.response?.status ?? 502;
        res.status(status).json({ error: 'Failed to fetch chart', code: status });
    }
});
async function startServer() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('MongoDB connected');
        server.listen(PORT, () => {
            console.log(`Backend listening on ${PORT}`);
        });
    }
    catch (err) {
        console.error('Mongo connection error', err);
        process.exit(1);
    }
}
startServer();
//# sourceMappingURL=server.js.map