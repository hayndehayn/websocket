import React from "react";
import { Link, Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      <header className="bg-gradient-to-r from-gray-900 to-gray-800 shadow-lg border-b border-gray-700">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Crypto
            </span>
            Socket
          </div>
          <nav className="hidden md:flex space-x-6">
            <Link to="/" className="transition-colors hover:text-purple-400">
              Home
            </Link>
            <Link
              to="/about"
              className="transition-colors hover:text-purple-400"
            >
              About
            </Link>
          </nav>
          <button className="bg-gradient-to-r from-green-500 to-emerald-600 text-black px-6 py-2 rounded-full font-semibold hover:from-green-400 hover:to-emerald-500 transition-all duration-300 shadow-lg hover:shadow-green-500/25">
            Sign In
          </button>
        </div>
      </header>

      <div className="flex-1">
        <Outlet />
      </div>

      <footer className="bg-gradient-to-r from-gray-900 to-gray-800 py-8 border-t border-gray-700">
        <div className="container mx-auto px-4 text-center">
          <div className="text-2xl font-bold mb-4">
            <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
              Crypto
            </span>
            Socket
          </div>
          <p className="text-gray-300 mb-4">
            &copy; 2025 Crypto Inc. All rights reserved.
          </p>
          <div className="space-x-4">
            <a
              href="#"
              className="font-light transition-colors hover:text-green-400"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="font-light transition-colors hover:text-green-400"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="font-light transition-colors hover:text-green-400"
            >
              Support
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
