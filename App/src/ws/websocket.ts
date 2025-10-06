// ? WebSocket singleton service
const WS_URL = (import.meta.env.VITE_WS_URL as string) ?? 'ws://localhost:8080';

let ws: WebSocket | null = null;
// ? listeners receive MessageEvent from the underlying WebSocket
const listeners = new Set<(ev: MessageEvent) => void>();
let reconnectDelay = 1000;
let shouldReconnect = true;

// ? connect&reconnect
function connect() {
     if (ws && (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING)) return;
     ws = new WebSocket(WS_URL);

     // ? on open reset backoff
     ws.onopen = () => {
          console.log('WS open');
          reconnectDelay = 1000;
     };

     // ? forward incoming messages to subs
     ws.onmessage = (ev) => {
          for (const fn of Array.from(listeners)) {
               try {
                    fn(ev);
               } catch (err) {
                    console.error('ws listener error', err);
               }
          }
     };

     // ? handle close and optionally reconnect with exponential backoff
     ws.onclose = (ev) => {
          console.log('WS closed', ev);
          ws = null;
          if (shouldReconnect) {
               setTimeout(connect, reconnectDelay);
               reconnectDelay = Math.min(30000, reconnectDelay * 2);
          }
     };

     ws.onerror = (err) => {
          console.warn('WS error', err);
     };
}

// ? ensure connection exists
export function ensureConnection() {
     shouldReconnect = true;
     connect();
}

// ? stop reconnecting and close socket
export function closeConnection() {
     shouldReconnect = false;
     if (ws) {
          try {
               ws.close();
          } catch {
               // ignored
          }
          ws = null;
     }
}

// ? subscribe returns unsubscribe function
export function subscribe(fn: (ev: MessageEvent) => void) {
     listeners.add(fn);
     ensureConnection();
     return () => listeners.delete(fn);
}

// ? send helper
export function sendMessage(obj: unknown) {
     if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(typeof obj === 'string' ? obj : JSON.stringify(obj));
     } else {
          console.warn('WS not open — message not sent');
     }
}