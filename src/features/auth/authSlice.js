import { createSlice } from '@reduxjs/toolkit';

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: JSON.parse(localStorage.getItem('authUser')) || null,
    error: null
  },
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem('authUser', JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem('authUser');
    }
  }
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer; 