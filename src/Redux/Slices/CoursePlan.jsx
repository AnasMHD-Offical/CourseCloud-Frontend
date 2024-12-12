import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  Course_plan: null,
};

export const course_plan = createSlice({
  name: "course_plan",
  initialState,
  reducers: {
    set_course_plan: (state,action) => {
        state.Course_plan = action.payload
    },
    remove_course_plan : (state,action)=>{
        state.Course_plan = null
    }
  },
});

export const {set_course_plan,remove_course_plan} = course_plan.actions

export default course_plan.reducer
