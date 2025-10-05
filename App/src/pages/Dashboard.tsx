import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";

const Dashboard: React.FC = () => {
  const token = useSelector((s: RootState) => s.auth.token);
  const [messages, setMessages] = useState<string[]>([]);
  const [connecting, setConnecting] = useState<boolean>(false);
  const [connected, setConnected] = useState<boolean>(false);
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    if (!token) return;

    setConnecting(true);
    setConnected(false);

    // clear previous logs on new connection ? Optional
    setMessages([]);

    const wsUrl = `ws://localhost:8080?token=${encodeURIComponent(token)}`;
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      setConnected(true);
      setConnecting(false);
      setMessages((prev) => ["Connected to secure WebSocket", ...prev]);
    };
    ws.onmessage = (ev) => {
      setMessages((prev) => [ev.data, ...prev]);
    };
    ws.onerror = () => {
      if (connected) {
        setMessages((prev) => ["WebSocket error", ...prev]);
      }
    };
    ws.onclose = (ev) => {
      if (connected) {
        const info = ev.reason
          ? `Connection closed: ${ev.reason} (${ev.code})`
          : `Connection closed (${ev.code})`;
        setMessages((prev) => [info, ...prev]);
      }
      setConnected(false);
      setConnecting(false);
    };

    return () => {
      ws.onopen = null;
      ws.onmessage = null;
      ws.onerror = null;
      ws.onclose = null;
      ws.close();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <main className="section-wrapper">
      <div className="container mx-auto px-4">
        <h1 className="section-title">Secure Dashboard</h1>
        <p className="feature-text mb-6">
          Live feed from secure WebSocket (BTC prices).
        </p>
        {connecting && (
          <div className="alert alert-success mb-4">Connecting…</div>
        )}
        <div className="feature-card text-left">
          <div className="mb-4 text-sm opacity-70">Latest first</div>
          <div className="space-y-2 max-h-80 overflow-auto">
            {messages.map((m, i) => (
              <div key={i} className="text-sm break-all">
                {m}
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default Dashboard;
