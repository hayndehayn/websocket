import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

interface ThemeState {
     isDark: boolean;
}

const getInitialTheme = (): boolean => {
     if (typeof window !== 'undefined') {
          const saved = localStorage.getItem('theme');
          return saved ? JSON.parse(saved) : false; // ? Light Theme deflt
     }
     return false;
};

const initialState: ThemeState = {
     isDark: getInitialTheme(),
};

const themeSlice = createSlice({
     name: 'theme',
     initialState,
     reducers: {
          toggleTheme: (state) => {
               state.isDark = !state.isDark;
               // Сохраняем в localStorage
               localStorage.setItem('theme', JSON.stringify(state.isDark));
               // Применяем класс к <html>
               document.documentElement.classList.toggle('dark', state.isDark);
          },
          setTheme: (state, action: PayloadAction<boolean>) => {
               state.isDark = action.payload;
               localStorage.setItem('theme', JSON.stringify(action.payload));
               document.documentElement.classList.toggle('dark', action.payload);
          },
     },
});

export const { toggleTheme, setTheme } = themeSlice.actions;
export default themeSlice.reducer;