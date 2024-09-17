import { createSlice } from "@reduxjs/toolkit";

// Get user information from local storage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// Initial state
const initialState = {
  userInfo: userInfoFromStorage,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // Update userInfo in state with the payload
      state.userInfo = action.payload;
      // Update userInfo in local storage
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
    },
    logout: (state) => {
      // Clear userInfo in state
      state.userInfo = null;
      // Clear userInfo in local storage
      localStorage.removeItem("userInfo");
    },
  },
});

export const { setCredentials, logout } = authSlice.actions;
export default authSlice.reducer;
