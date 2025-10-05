import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleTheme } from "../store/themeSlice";
import type { RootState } from "../store";

const ThemeToggle: React.FC = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);
  const dispatch = useDispatch();

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="themeToggle"
      aria-label="Toggle theme"
      title={isDark ? "Switch to light" : "Switch to dark"}
    >
      <span aria-hidden>{isDark ? "☀️" : "🌙"}</span>
      <span className="text-xs opacity-80">{isDark ? "Dark" : "Light"}</span>
    </button>
  );
};

export default ThemeToggle;
