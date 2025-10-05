import * as http from 'http';
import WebSocket, { WebSocketServer } from 'ws';
import axios from 'axios';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
// In-memory user store
const users = new Map();
const JWT_SECRET = process.env.JWT_SECRET || '564hgfgdf123';
const JWT_EXPIRES_IN = '2h';
const server = http.createServer(async (req, res) => {
    // CORS headers for development
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    if (req.method === 'OPTIONS') {
        res.writeHead(204);
        res.end();
        return;
    }
    // * Register
    if (req.url === '/api/register' && req.method === 'POST') {
        try {
            const body = await readJsonBody(req);
            if (!body.email || !body.password) {
                return writeJson(res, 400, { message: 'Email and password are required' });
            }
            if (users.has(body.email)) {
                return writeJson(res, 400, { message: 'User already exists' });
            }
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(body.password, salt);
            users.set(body.email, { email: body.email, passwordHash: hash });
            const token = jwt.sign({ email: body.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            return writeJson(res, 200, { token, user: { email: body.email } });
        }
        catch (e) {
            return writeJson(res, 500, { message: e?.message || 'Registration error' });
        }
    }
    // * Login
    if (req.url === '/api/login' && req.method === 'POST') {
        try {
            const body = await readJsonBody(req);
            const user = users.get(body.email);
            if (!user) {
                return writeJson(res, 401, { message: 'Invalid email or password' });
            }
            const ok = bcrypt.compareSync(body.password, user.passwordHash);
            if (!ok) {
                return writeJson(res, 401, { message: 'Invalid email or password' });
            }
            const token = jwt.sign({ email: user.email }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
            return writeJson(res, 200, { token, user: { email: user.email } });
        }
        catch (e) {
            return writeJson(res, 500, { message: e?.message || 'Login error' });
        }
    }
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello World\n');
});
function readJsonBody(req) {
    return new Promise((resolve, reject) => {
        let data = '';
        req.on('data', (chunk) => (data += chunk));
        req.on('end', () => {
            try {
                resolve(JSON.parse(data || '{}'));
            }
            catch (e) {
                reject(new Error('Invalid JSON body'));
            }
        });
        req.on('error', reject);
    });
}
function writeJson(res, status, payload) {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(payload));
}
// * WebSocket Server
const wss = new WebSocketServer({ server });
wss.on('connection', (ws, req) => {
    // Verify JWT token from query string
    const url = new URL(req.url || '', 'http://localhost');
    const token = url.searchParams.get('token');
    if (!token) {
        ws.close(1008, 'Authentication required');
        return;
    }
    try {
        jwt.verify(token, JWT_SECRET);
    }
    catch (e) {
        ws.close(1008, 'Invalid token');
        return;
    }
    console.log('✅ - Client connected');
    const sendPrice = async () => {
        try {
            const response = await axios.get('https://api.diadata.org/v1/assetQuotation/Bitcoin/0x0000000000000000000000000000000000000000');
            const rawPrice = response.data.Price;
            const rawOldPrice = response.data.PriceYesterday;
            const price = Math.trunc(rawPrice);
            const oldPrice = Math.trunc(rawOldPrice);
            if (ws.readyState === WebSocket.OPEN) {
                ws.send(JSON.stringify({ currency: 'BTC', price }));
                ws.send(JSON.stringify({ price_old: oldPrice }));
            }
        }
        catch (error) {
            console.error('Error fetching price:', error);
        }
    };
    const interval = setInterval(sendPrice, 10000);
    ws.on('close', () => {
        clearInterval(interval);
        console.log('❌ - Client disconnected');
    });
});
server.listen(8080, () => {
    console.log(`📦 - Server is listening on port 8080`);
});
//# sourceMappingURL=server.js.map