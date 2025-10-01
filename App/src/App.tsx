import { useState, useEffect } from "react";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";

import "./App.css";

interface WebSocketData {
  price?: number;
  price_old?: number;
}

function App() {
  const [price, setPrice] = useState<number | null>(null);
  const [oldPrice, setOldPrice] = useState<number | null>(null);
  // const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    ws.onopen = () => {
      console.log("✅ - Connected to WebSocket server");
    };
    ws.onmessage = (event: MessageEvent) => {
      try {
        const data: WebSocketData = JSON.parse(event.data);
        if (data.price !== undefined) setPrice(data.price);
        if (data.price_old !== undefined) setOldPrice(data.price_old);
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };
    ws.onerror = (err: Event) => {
      console.error("WebSocket error:", err);
      // setError(`WebSocket connection error: ${(err as ErrorEvent).message || 'Unknown error'}`);
    };
    ws.onclose = () => {
      console.log("❌ - WebSocket connection closed");
    };
    return () => {
      if (
        ws.readyState === WebSocket.OPEN ||
        ws.readyState === WebSocket.CONNECTING
      ) {
        ws.close();
      }
    };
  }, []);

  return (
    <>
      <nav>
        <Link to="/">Главная</Link> | <Link to="/about">О нас</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <header className="App-header">
        <p>
          Current Price:{" "}
          {price !== null ? `$${price.toFixed(2)}` : "Loading..."}
        </p>
        <p>
          Old Price: {oldPrice !== null ? `$${oldPrice.toFixed(2)}` : "N/A"}
        </p>
      </header>
    </>
  );
}

export default App;
