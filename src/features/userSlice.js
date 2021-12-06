import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "idle",
  user: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { login, logout } = userSlice.actions;

// Selectors = Getters typ
export const selectUser = (state) => state.user.user;

export default userSlice.reducer;
