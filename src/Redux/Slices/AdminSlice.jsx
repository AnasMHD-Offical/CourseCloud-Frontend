import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
const initialState = {
  admin_data: localStorage.getItem("admin_data")
    ? JSON.parse(localStorage.getItem("admin_data"))
    : null,
};

export const admin_slice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    set_admin_data: (state, action) => {
      state.admin_data = action.payload;
      localStorage.setItem("admin_data", JSON.stringify(action.payload));
    },
    admin_logout: (state, action) => {
      state.admin_data = null;
      localStorage.removeItem("admin_data");
    },
  },
});

export const { set_admin_data, admin_logout } = admin_slice.actions;

export default admin_slice.reducer
