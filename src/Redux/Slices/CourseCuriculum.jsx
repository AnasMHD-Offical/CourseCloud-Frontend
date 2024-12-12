import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Course_Curriculum: null,
};

export const course_curriculum = createSlice({
  name: "Course_Curriculum",
  initialState,
  reducers: {
    set_Course_Curriculum: (state, action) => {
      state.Course_Curriculum = action.payload;
    },
    remove_Course_Curriculum: (state, action) => {
      state.Course_Curriculum = null;
    },
  },
});

export const { set_Course_Curriculum, remove_Course_Curriculum } = course_curriculum.actions;

export default course_curriculum.reducer;
