import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const tryPaths = [
     path.resolve(process.cwd(), '.env'),            // Backend/.env
     path.resolve(process.cwd(), 'src', '.env'),    // Backend/src/.env 
     path.resolve(process.cwd(), 'dist', '.env'),   // Backend/dist/.env
     path.resolve(__dirname, '.env'),               // compiled src location
];

for (const p of tryPaths) {
     const r = dotenv.config({ path: p });
     if (!r.error) {
          console.log('Loaded env from', p);
          break;
     }
}

function ensure(v?: string, name?: string): string {
     if (!v || !String(v).trim()) throw new Error(`${name ?? 'ENV'} is not set`);
     return String(v).trim();
}

export const MONGO_URI = ensure(process.env.MONGO_URI, 'MONGO_URI');
export const JWT_SECRET = ensure(process.env.JWT_SECRET, 'JWT_SECRET');
export const FRONTEND_ORIGIN = (process.env.FRONTEND_ORIGIN ?? 'http://localhost:5173').trim();
export const DEFAULT_PORT = Number(process.env.DEFAULT_PORT ?? 8080);
export const JWT_COOKIE_NAME = process.env.JWT_COOKIE_NAME ?? 'token';
export const JWT_EXPIRES_MS = Number(process.env.JWT_EXPIRES_MS ?? 7 * 24 * 60 * 60 * 1000);
export const PRICE_INTERVAL_MS = Number(process.env.PRICE_INTERVAL_MS ?? 10000);
export const MAX_HISTORY = Number(process.env.MAX_HISTORY ?? 200);
export default {
     MONGO_URI,
     JWT_SECRET,
     FRONTEND_ORIGIN,
     DEFAULT_PORT,
     JWT_COOKIE_NAME,
     JWT_EXPIRES_MS,
     PRICE_INTERVAL_MS,
     MAX_HISTORY,
};