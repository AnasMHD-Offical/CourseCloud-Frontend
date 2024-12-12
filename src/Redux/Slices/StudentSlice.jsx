import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  student_data: localStorage.getItem("student_data")
    ? JSON.parse(localStorage.getItem("student_data"))
    : null,
};

export const Student_Slice = createSlice({
  name: "student",
  initialState,
  reducers: {
    set_student_data: (state, action) => {
      state.student_data = action.payload;
      localStorage.setItem("student_data", JSON.stringify(action.payload));
    },
    student_logout: (state, action) => {
      state.student_data = null;
      localStorage.removeItem("student_data");
    },
  },
});

export const { set_student_data, student_logout } = Student_Slice.actions;

export default Student_Slice.reducer;
