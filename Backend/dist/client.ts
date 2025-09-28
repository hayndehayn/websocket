import WebSocket from 'ws';

const ws = new WebSocket('ws://localhost:8080');

ws.on('open', () => {
     console.log('❗Connected to the server');
     ws.send('Wazzup Server!');
});

ws.on('message', (message: WebSocket.RawData) => {
     const text = message.toString();
     console.log(`📨 - Sended: ${text}`);
});

ws.on('error', (error: Error) => {
     console.log(`⚠️ - Error occurred: ${error}`);
});

ws.on('close', () => {
     console.log('Disconnected from the server');
});