import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  instructor_data: localStorage.getItem("instructor_data")
    ? JSON.parse(localStorage.getItem("instructor_data"))
    : null,
};

export const Instructor_Slice = createSlice({
  name: "instructor",
  initialState,
  reducers: {
    set_instructor_data: (state, action) => {
      state.instructor_data = action.payload;
      localStorage.setItem("instructor_data", JSON.stringify(action.payload));
    },
    instructor_logout: (state, action) => {
      state.instructor_data = null;
      localStorage.removeItem("instructor_data");
    },
  },
});

export const { set_instructor_data, instructor_logout } = Instructor_Slice.actions;

export default Instructor_Slice.reducer;
