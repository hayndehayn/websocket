import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Line } from "react-chartjs-2";
import "chart.js/auto";
import { subscribe } from "../ws/websocket"; // ? singleton WS

type Params = { id?: string };
type HistPoint = { ts: number; price: number };

const base =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:8080";
const MAX_HISTORY = 200;

const CoinDetail: React.FC = () => {
  const { id } = useParams<Params>();
  const [points, setPoints] = useState<HistPoint[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentPrice, setCurrentPrice] = useState<number | null>(null);

  // ? prevent duplicate points with the same timestamp
  const lastTsRef = useRef<number | null>(null);

  useEffect(() => {
    if (!id) return;
    let cancelled = false;

    const fetchDetail = async () => {
      setLoading(true);
      try {
        const [dResp, cResp] = await Promise.all([
          axios.get(`${base}/api/coins/${id}`),
          axios.get(`${base}/api/coins/${id}/chart`),
        ]);
        if (cancelled) return;
        const hist: HistPoint[] = Array.isArray(cResp.data?.data)
          ? cResp.data.data
          : [];
        setPoints(hist);
        if (hist.length) lastTsRef.current = hist[hist.length - 1].ts;
        setCurrentPrice(dResp.data?.data?.price ?? null);
      } catch (err: any) {
        console.error("fetchDetail error", err?.response?.data ?? err?.message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchDetail();

    // ? subscribe to live updates via the global WebSocket
    const unsubscribe = subscribe((ev: MessageEvent) => {
      try {
        const msg = JSON.parse(ev.data);
        if (msg.type === "prices" && Array.isArray(msg.data)) {
          const item = msg.data.find((p: any) => p.id === id);
          if (!item) return;
          const ts: number = item.ts ?? Date.now();
          const price: number = item.price ?? item?.price ?? null;
          if (price == null) return;

          // ? if a point with the same ts already exists — skip
          if (lastTsRef.current === ts) return;

          lastTsRef.current = ts;
          setCurrentPrice(price);
          setPoints((prev) => {
            const next = prev.concat({ ts, price });
            if (next.length > MAX_HISTORY)
              next.splice(0, next.length - MAX_HISTORY);
            return next;
          });
        }
      } catch (e) {
        // ? ignore parse errors
        console.warn("ws parse error in CoinDetail", e);
      }
    });

    return () => {
      cancelled = true;
      unsubscribe();
    };
  }, [id]);

  if (!id) return <div>No coin selected</div>;

  const labels = points.map((p) => {
    const d = new Date(p.ts);
    return `${d.getMonth() + 1}/${d.getDate()} ${d.getHours()}:${String(
      d.getMinutes()
    ).padStart(2, "0")}`;
  });
  const data = points.map((p) => p.price);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">{id.toUpperCase()}</h1>
      {loading && <p>Loading...</p>}
      {currentPrice !== null && (
        <p className="mb-4">Current: ${currentPrice}</p>
      )}
      <div style={{ maxWidth: 900 }}>
        <Line
          data={{
            labels,
            datasets: [
              {
                label: `${id} history`,
                data,
                borderColor: "#3b82f6",
                backgroundColor: "rgba(59,130,246,0.2)",
                fill: true,
              },
            ],
          }}
        />
      </div>
    </div>
  );
};

export default CoinDetail;
