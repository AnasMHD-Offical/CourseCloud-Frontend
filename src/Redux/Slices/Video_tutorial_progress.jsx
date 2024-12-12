import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video_tutorial_progress: 0,
};

export const Video_tutorial_progress = createSlice({
  name: "video_tutorial_progress",
  initialState,
  reducers: {
    set_video_tutorial_progress: (state, action) => {
      state.video_tutorial_progress = action.payload;
    },
  },
});

export const { set_video_tutorial_progress } = Video_tutorial_progress.actions;

export default Video_tutorial_progress.reducer;
