import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { logout } from "../store/authSlice";
import axios from "axios";
import ThemeToggle from "./ThemeToggle";

const AuthButtons: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((s: RootState) => s.auth.user);

  const handleLogout = async () => {
    try {
      await axios.post("/api/auth/signout", {}, { withCredentials: true });
    } catch (e) {
      console.error("signout error", e);
    } finally {
      dispatch(logout());
      navigate("/");
    }
  };

  if (user) {
    return (
      <div className="flex items-center gap-4">
        <span className="text-sm text-gray-700 dark:text-gray-300">
          {user.name ?? user.email}
        </span>
        <button
          onClick={handleLogout}
          className="nav-link"
          aria-label="Sign out"
        >
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <Link to="/login" className="sign-in-btn" title="Sign up">
        Sign up
      </Link>
    </div>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
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

      <main>{children}</main>

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
