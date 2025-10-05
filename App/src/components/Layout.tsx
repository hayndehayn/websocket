import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { logout } from "../store/authSlice";

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();
  const token = useSelector((s: RootState) => s.auth.token);
  if (!token) {
    return (
      <button onClick={() => navigate("/auth")} className="sign-in-btn">
        Sign In
      </button>
    );
  }
  return (
    <div className="flex items-center gap-3">
      <button onClick={() => navigate("/dashboard")} className="sign-in-btn">
        Dashboard
      </button>
      <button onClick={() => dispatch(logout())} className="sign-in-btn">
        Logout
      </button>
    </div>
  );
};

const Layout: React.FC = () => {
  return (
    <div className="layout-container">
      <header className="header">
        <div className="header-inner">
          <div className="logo">
            <span className="logo-gradient">Crypto</span>
            Socket
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="nav-link">
              Home
            </Link>
            <Link to="/about" className="nav-link">
              About
            </Link>
            <Link to="/dashboard" className="nav-link">
              Dashboard
            </Link>
          </nav>
          <div className="header-actions">
            <AuthButtons />
            <ThemeToggle />
          </div>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="logo-gradient">Crypto</span>
            Socket
          </div>
          <p className="footer-text">
            &copy; 2025 Crypto Inc. All rights reserved.
          </p>
          <div className="footer-links">
            <a href="#" className="footer-link">
              Privacy Policy
            </a>
            <a href="#" className="footer-link">
              Terms of Service
            </a>
            <a href="#" className="footer-link">
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
