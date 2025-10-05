import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

const Layout: React.FC = () => {
  const navigate = useNavigate();
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
          </nav>
          <div className="header-actions">
            <button onClick={() => navigate("/auth")} className="sign-in-btn">
              Sign In
            </button>
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
