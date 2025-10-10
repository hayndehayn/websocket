import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type User = { id: string; email: string; name?: string } | null;
type State = { user: User };

const initialState: State = { user: null };

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
    },
  },
});

export const { setUser, logout } = slice.actions;
export default slice.reducer;
