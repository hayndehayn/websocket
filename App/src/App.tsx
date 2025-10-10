import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "./store/authSlice";
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";
import Auth from "./pages/Auth";
import About from "./pages/About";

const App: React.FC = () => {
  const dispatch = useDispatch();

  // ? Check if user is authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await axios.get("/api/auth/me");
        const user = response.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
        }
      } catch (error) {
        // Not authenticated, ignore
      }
    };
    checkAuth();
  }, [dispatch]);

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/about" element={<About />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/coin/:id"
          element={
            <ProtectedRoute>
              <CoinDetail />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Layout>
  );
};

export default App;
