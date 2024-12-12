import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  current_course_id: null,
  current_lesson_id: null,
};

export const current_course_details = createSlice({
  name: "current_course_details",
  initialState,
  reducers: {
    setCurrent_Course_id: (state, action) => {
      state.current_course_id = action.payload;
    },
    removeCurrent_Course_id: (state, action) => {
      state.current_course_id = null;
    },
    setCurrent_Lesson_id: (state, action) => {
      state.current_lesson_id = action.payload;
    },
    removeCurrent_Lesson_id: (state, action) => {
      state.current_lesson_id = null;
    },
  },
});

export const {
  setCurrent_Course_id,
  removeCurrent_Course_id,
  setCurrent_Lesson_id,
  removeCurrent_Lesson_id,

} = current_course_details.actions;

export default current_course_details.reducer;
