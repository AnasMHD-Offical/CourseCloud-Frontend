import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Course_Preview: null,
};

export const course_Preview = createSlice({
  name: "Course_Preview",
  initialState,
  reducers: {
    set_Course_Preview: (state, action) => {
      state.Course_Preview = action.payload;
    },
    remove_Course_Preview: (state, action) => {
      state.Course_Preview = null;
    },
  },
});

export const { set_Course_Preview, remove_Course_Preview } = course_Preview.actions;

export default course_Preview.reducer;
