// ...existing code...
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store";
import { useNavigate, useLocation, type Location } from "react-router-dom";
import axios from "axios";

type LocationState = {
  from?: { pathname?: string };
};

const base =
  (import.meta.env.VITE_API_BASE as string) || "http://localhost:8080";

type MaybeAuthError = { error?: string };

const hasAuthError = (v: unknown): v is MaybeAuthError =>
  typeof v === "object" && v !== null && "error" in v;

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };

  // use full auth slice object to avoid referencing non-existent fields
  const auth = useSelector((s: RootState) => s.auth);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFormError(null);
    return () => setFormError(null);
  }, [location.pathname]);

  useEffect(() => {
    if (hasAuthError(auth) && typeof auth.error === "string") {
      setFormError(auth.error);
    }
  }, [auth]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFormError(null);
    setLoading(true);
    try {
      const url = `${base}/api/auth/${mode === "login" ? "signin" : "signup"}`;
      const body =
        mode === "register" ? { email, password, name } : { email, password };
      const r = await axios.post(url, body, { withCredentials: true });
      const user = r.data?.data?.user;
      if (user) {
        dispatch(setUser(user));
        // redirect to original page or Dashboard
        const dest = (location.state as any)?.from?.pathname ?? "/dashboard";
        navigate(dest, { replace: true });
      } else {
        setFormError("Unexpected response from server");
      }
    } catch (err: unknown) {
      let msg = "Request failed";
      if (axios.isAxiosError(err)) {
        msg = err.response?.data?.error ?? err.message ?? msg;
      } else if (err instanceof Error) {
        msg = err.message;
      }
      setFormError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="hero-section">
      <div className="hero-content max-w-md mx-auto text-left">
        <h1 className="hero-title">
          {mode === "login" ? "Sign In" : "Sign Up"}
        </h1>
        <p className="hero-subtitle">
          {mode === "login"
            ? "Welcome back! Please sign in to continue."
            : "Create your account to access the dashboard."}
        </p>
        <form onSubmit={onSubmit} className="feature-card">
          <label className="block mb-4">
            <span className="block mb-2">Email</span>
            <input
              type="email"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
            />
          </label>
          <label className="block mb-6">
            <span className="block mb-2">Password</span>
            <input
              type="password"
              className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              minLength={6}
              required
            />
          </label>
          {mode === "register" && (
            <label className="block mb-6">
              <span className="block mb-2">Name</span>
              <input
                type="text"
                className="w-full p-3 rounded border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900"
                value={name}
                onChange={(e) => setName(e.target.value)}
                autoComplete="name"
              />
            </label>
          )}
          {message && <div className={`alert `}>{message}</div>}
          {formError && <div className="alert alert-error">{formError}</div>}
          <button
            type="submit"
            className="btn-primary w-full flex justify-center"
            disabled={loading}
          >
            {loading
              ? "Please wait..."
              : mode === "login"
              ? "Sign In"
              : "Sign Up"}
          </button>
          <div className="mt-4 text-sm">
            {mode === "login" ? (
              <span>
                Don't have an account?{" "}
                <button
                  type="button"
                  className="text-green-600 dark:text-green-400 underline"
                  onClick={() => setMode("register")}
                >
                  Sign Up
                </button>
              </span>
            ) : (
              <span>
                Already have an account?{" "}
                <button
                  type="button"
                  className="text-green-600 dark:text-green-400 underline"
                  onClick={() => setMode("login")}
                >
                  Sign In
                </button>
              </span>
            )}
          </div>
        </form>
      </div>
    </main>
  );
};

export default Auth;
