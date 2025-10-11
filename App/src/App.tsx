import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";
import axios from "axios";
import api from "./api/axios";
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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await api.get("/api/auth/me");
        const user = response.data?.data?.user;
        if (user) {
          dispatch(setUser(user));
        }
      } catch (error) {
        if (
          axios.isAxiosError &&
          axios.isAxiosError(error) &&
          error.response?.status === 401
        ) {
          return; // if not logged in
        }
        console.error("checkAuth error:", error);
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
