import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/authSlice";
import type { AppDispatch, RootState } from "../store";
import { useNavigate, useLocation, type Location } from "react-router-dom";

type LocationState = {
  from?: { pathname?: string };
};

const Auth: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const location = useLocation() as Location & { state?: LocationState };
  const { status, error: authError } = useSelector((s: RootState) => s.auth);

  const [mode, setMode] = useState<"login" | "register">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState<string | null>(null);
  const [formError, setFormError] = useState<string | null>(null);

  useEffect(() => {
    // clear errors when route changes or component mounts/unmounts
    setFormError(null);
    return () => setFormError(null);
  }, [location.pathname]);

  useEffect(() => {
    if (authError) setFormError(String(authError));
  }, [authError]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage(null);
    setFormError(null);
    if (!email || !password) {
      setMessage("Email and password are required");
      return;
    }
    try {
      if (mode === "register") {
        // ? Auto-login after registration
        await dispatch(registerUser({ email, password })).unwrap();
        await dispatch(loginUser({ email, password })).unwrap();
        const from = location.state?.from?.pathname ?? "/dashboard";
        navigate(from, { replace: true });
      } else {
        await dispatch(loginUser({ email, password })).unwrap();
        const from = location.state?.from?.pathname ?? "/dashboard";
        navigate(from, { replace: true });
      }
    } catch (err: unknown) {
      const msg =
        typeof err === "object" && err !== null && "message" in err
          ? String((err as { message?: unknown }).message)
          : "Request failed";
      setMessage(msg);
      setFormError(String(msg));
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
          {message && <div className={`alert `}>{message}</div>}
          {formError && <div className="alert alert-error">{formError}</div>}
          <button
            type="submit"
            className="btn-primary w-full flex justify-center"
            disabled={status === "loading"}
          >
            {status === "loading"
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
