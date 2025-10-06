import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { subscribe } from "../ws/websocket";

type CoinInfo = { id: string; price: number; change24h?: number; ts?: number };

const Dashboard: React.FC = () => {
  const [coins, setCoins] = useState<CoinInfo[]>([]);

  useEffect(() => {
    // ? Subscribe to global WebSocket updates
    const handle = (e: MessageEvent) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "prices" && Array.isArray(msg.data)) {
          setCoins(msg.data);
        }
      } catch (err) {
        console.warn("WS parse error", err);
      }
    };

    const unsubscribe = subscribe(handle);
    // ? On unmount: unsubscribe, do not close global socket
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-extrabold tracking-tight">
          Market Dashboard
        </h1>
        <p className="text-sm text-gray-500">
          Live prices updated from backend
        </p>
      </div>

      <div className="grid gap-5 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {coins.length === 0 && (
          <div className="col-span-full rounded-lg border border-dashed border-gray-200 p-8 text-center text-gray-500">
            Loading market data...
          </div>
        )}

        {coins.map((c) => (
          <Link
            to={`/coin/${c.id}`}
            key={c.id}
            className="group relative block rounded-xl border border-gray-200 bg-white p-5 shadow-sm hover:shadow-lg transition-shadow duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-400"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  {/* ? Placeholder for coin logo */}
                  <div className="h-10 w-10 flex items-center justify-center rounded-full bg-indigo-50 text-indigo-600 font-semibold">
                    {c.id.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900">
                      {c.id.toUpperCase()}
                    </h3>
                    <p className="text-xs text-gray-500">Price preview</p>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="text-xl font-bold text-gray-900">
                  ${c.price}
                </div>
                <div
                  className={`mt-2 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium ${
                    (c.change24h ?? 0) >= 0
                      ? "bg-green-50 text-green-700"
                      : "bg-red-50 text-red-700"
                  }`}
                >
                  <span>{(c.change24h ?? 0).toFixed(2)}%</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
              <div>
                {c.ts ? (
                  <span>
                    Updated{" "}
                    {new Date(c.ts).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                ) : (
                  <span>—</span>
                )}
              </div>
              <div>
                <span className="text-xs text-gray-400 group-hover:text-gray-600">
                  Open details →
                </span>
              </div>
            </div>

            <div className="pointer-events-none absolute inset-0 rounded-xl ring-0 transition-opacity opacity-0 group-hover:opacity-5" />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
