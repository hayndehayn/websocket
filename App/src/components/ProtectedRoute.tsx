import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "../store";
import { setUser } from "../store/authSlice";

const ProtectedRoute: React.FC<{ children: JSX.Element }> = ({ children }) => {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((s: RootState) => s.auth.user);
  const location = useLocation();
  const [checked, setChecked] = useState<boolean>(false);

  useEffect(() => {
    let mounted = true;
    // if user already in redux -> ok
    if (user) {
      setChecked(true);
      return;
    }
    // otherwise ask backend (cookie-based)
    axios
      .get("/api/auth/me", { withCredentials: true })
      .then((r) => {
        if (!mounted) return;
        const u = r.data?.data?.user;
        if (u) dispatch(setUser(u));
      })
      .catch(() => {
        // no session
      })
      .finally(() => {
        if (mounted) setChecked(true);
      });
    return () => {
      mounted = false;
    };
  }, [dispatch, user]);

  if (!checked) return <div>Checking auth...</div>;
  if (!user) return <Navigate to="/login" state={{ from: location }} replace />;
  return children;
};

export default ProtectedRoute;
