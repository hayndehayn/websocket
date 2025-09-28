import { useState, useEffect } from 'react'
import './App.css'

// ? Fix errs in f12, error-setError

function App() {
  const [price, setPrice] = useState(null);
  const [oldPrice, setOldPrice] = useState(null);
  // const [error, setError] = useState(null);

  useEffect(() => {
    // Подключение к WebSocket-серверу
    const ws = new WebSocket('ws://localhost:8080');

    ws.onopen = () => {
      console.log('✅ - Connected to WebSocket server');
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.price) setPrice(data.price);
        if (data.price_old) setOldPrice(data.price_old);
      } catch (err) {
        console.error('Error parsing WebSocket message:', err);
      }
    };

    ws.onerror = (err) => {
      console.error('WebSocket error:', err);
      // setError(`WebSocket connection error: ${err.message || 'Unknown error'}`);
    };

    ws.onclose = () => {
      console.log('❌ - WebSocket connection closed');
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      <div style={{ fontFamily: 'Arial, sans-serif', padding: '20px' }}>
        <h1>📈 Bitcoin Price Tracker</h1>
        {/* {error && <p style={{ color: 'red' }}>⚠️ {error}</p>} */}
        <p>💰 Current Price: {price ? `$${price}` : 'Loading...'}</p>
        <p>📉 Yesterday's Price: {oldPrice ? `${oldPrice}` : 'Loading...'}</p>
      </div>
    </>
  )
}

export default App
