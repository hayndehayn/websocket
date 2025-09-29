import WebSocket from 'ws';
const ws = new WebSocket('ws://localhost:8080');
ws.on('open', () => {
    console.log('❗- Connected to the server');
    ws.send('Wazzup Server!');
});
ws.on('message', (message) => {
    const text = message.toString();
    console.log(`📨 - Received: ${text}`);
});
ws.on('error', (error) => {
    console.log(`⚠️ - Error occurred: ${error}`);
});
ws.on('close', () => {
    console.log('Disconnected from the server');
});
//# sourceMappingURL=client.js.map