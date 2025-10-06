import { Provider } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { store } from "./store";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import CoinDetail from "./pages/CoinDetail";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="auth" element={<Auth />} />
          <Route
            path="dashboard"
            element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            }
          />
          <Route path="coin/:id" element={<CoinDetail />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
