//importing ES modules
import { configureStore } from "@reduxjs/toolkit";
import admin_slice from "./Slices/AdminSlice";
import student_slice from "./Slices/StudentSlice";
import instructor_slice from "./Slices/Instructor_Slice";
import course_plan from "./Slices/CoursePlan";
import course_curriculum from "./Slices/CourseCuriculum";
import course_Preview from "./Slices/CoursePreview";
import current_course_details from "./Slices/CourseMetaData";
import Video_tutorial_progress from "./Slices/Video_tutorial_progress";
//Configuring redux store
const store = configureStore({
  reducer: {
    admin: admin_slice,
    student: student_slice,
    instructor: instructor_slice,
    course_plan: course_plan,
    course_curriculum: course_curriculum,
    course_Preview: course_Preview,
    current_course_data: current_course_details,
    Video_tutorial_progress: Video_tutorial_progress,
  },
});

//Exporting store and use it in the main for global access.
export default store;
