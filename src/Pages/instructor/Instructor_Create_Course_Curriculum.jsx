import React, { useRef, useState } from "react";
import { ArrowRight, CircleCheckBig, ArrowLeft } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Textarea } from "@/Components/ui/textarea";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import CloudinaryUploadWidget_Videos from "@/Utils/CloudinaryVideoUpload";
import CloudinaryUploadWidget_Files from "@/Utils/CloudinaryFileUpload";
import { set_Course_Curriculum } from "@/Redux/Slices/CourseCuriculum";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { motion } from "framer-motion";

const validation_form = yup.object({
  title: yup
    .string()
    .matches(
      /^[a-zA-Z0-9: ]+$/,
      "Title should only contain alphabet,numbers , colen or whitespace"
    )
    .matches(/^\s*\S[\s\S]*$/, "Enter valid title")
    .required("Title is required"),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!%@&#?."';:, ]+$/,
      `Description should only contain alphabet, numbers, speacials characters (@,!,#,&,?,.,",',;,:,) or whitespace `
    )
    .matches(/^\s*\S[\s\S]*$/, "Enter valid description")
    .required("Description is required"),
  video_tutorial: yup
    .string()
    .required("Video tutorial of the lesson is required"),
  assignment: yup.string().required("assignment for the lesson is required"),
});

export default function Instructor_Create_Course_Curriculum() {
  const course_plan = useSelector(
    (state) => state?.course_plan?.Course_plan?.data
  );
  console.log(course_plan);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formResetRef = useRef();

  const [LessionMinRequiredErrorFound, SetLessionMinRequiredErrorFound] =
    useState(false);
  const [lessons, setLessons] = useState([]);
  const [form_initial_value, setForm_initial_value] = useState({
    title: "",
    description: "",
    video_tutorial: "",
    assignment: "",
  });

  //Function to add lessions to the lessons array
  const addLesson = (values) => {
    // e.preventDefault();
    console.log("Submitted");
    setLessons([...lessons, values]);
    formResetRef.current.resetForm();
  };
  //Fucntion to validate the instructor added the minimum lession requirements
  const validation = () => {
    let isErrorFound = false;
    if (lessons.length < 1) {
      isErrorFound = true;
      SetLessionMinRequiredErrorFound(true);
    }
    return isErrorFound;
  };
  const remove_lessions = (index) => {
    console.log(index);

    //Removing one of the lession based on the instructor action
    const removed = lessons.splice(index, 1);
    setLessons((prev) => [...prev]);
    console.log(`removed : ${removed}`);
  };
  //Function to navigate to the next page and add the data to the redux store
  const handleNavigateCoursePreview = () => {
    if (!validation()) {
      dispatch(set_Course_Curriculum({ data: lessons }));
      navigate("/instructor/create_course/3");
    }
  };
  console.log(lessons);

  return (
    // <div className="min-h-screen flex flex-col">
    // <div className="flex-1 flex">

    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
      className="max-w-5xl mx-auto sm:mx-2"
    >
      {/* Course navigation highlighter */}
      <div className="flex justify-between mb-8">
        <div className="text-center flex sm:flex flex-col sm:flex-row  items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            1
          </div>
          <span className="ml-2 font-semibold">Course plan</span>
        </div>
        <div className="flex text-center sm:flex flex-col sm:flex-row  items-center">
          <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
            2
          </div>
          <span className="ml-2 font-semibold">Course curriculum</span>
        </div>
        <div className="flex text-center sm:flex flex-col sm:flex-row  items-center text-gray-400">
          <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
            3
          </div>
          <span className="ml-2">Course preview</span>
        </div>
      </div>

      <div className="space-y-6 ">
        {/* Course curriculum heading */}
        <div>
          <h3 className="text-xl font-semibold mb-1">Course Curriculum</h3>
          <p className="text-sm font-normal">
            {
              "Add course in the proper manner (First to last manner). Minimum 5 lessions should be in your course"
            }
          </p>
        </div>
        {/* Lesson Adding */}
        <Formik
          innerRef={formResetRef}
          initialValues={form_initial_value}
          validationSchema={validation_form}
          onSubmit={(values) => addLesson(values)}
          enableReinitialize={true}
        >
          {({ errors, touched, setFieldValue, isSubmitting, resetForm }) => (
            <Form className="space-y-4 sm:shadow-sm sm:border p-2 sm:p-4 rounded-lg bg-white">
              <div>
                <label htmlFor="title" className="text-lg font-medium">
                  Enter lession no & title :{" "}
                </label>

                <Field
                  as={Input}
                  id="title"
                  name="title"
                  placeholder="Enter lesson no. : Enter lesson title"
                  className="h-11"
                  // value={newLesson.title}
                  // onChange={(e) =>
                  //   setNewLesson({ ...newLesson, title: e.target.value })
                  // }
                />
                {errors.title && touched.title && (
                  <div className="text-sm text-red-500">{errors.title}</div>
                )}
                <p className="text-xs ms-1 mt-1 text-neutral-600">
                  {
                    "Follow the proper format that shown in the input eg: '<lesson_number> : <lesson_title>'"
                  }
                </p>
              </div>
              <div>
                <label htmlFor="course_title" className="text-lg font-medium">
                  Enter Lesson description :{" "}
                </label>
                <Field
                  as={Textarea}
                  id="description"
                  name="description"
                  placeholder="Lesson description"
                  // value={newLesson.description}
                  // onChange={(e) =>
                  //   setNewLesson({ ...newLesson, description: e.target.value })
                  // }
                  rows={4}
                />
                {errors.description && touched.description && (
                  <div className="text-sm text-red-500">
                    {errors.description}
                  </div>
                )}
                <p className="text-xs ms-1 mt-1 text-neutral-600">
                  {
                    "Give a proper description about the lession. Student should understand, what are you trying to teach in this purticular lession"
                  }
                </p>
              </div>
              <div className="max-w-5xl flex flex-col gap-2 lg:flex-row justify-between">
                <div className="flex space-x-1 md:space-x-5">
                  {/* Cloudinary upload widget component for tutorial uploads */}
                  <div className="flex flex-col">
                    <CloudinaryUploadWidget_Videos
                      onUploadComplete={(url) =>
                        setFieldValue("video_tutorial", url)
                      }
                    />
                    {errors.video_tutorial && touched.video_tutorial && (
                      <span className="text-sm text-red-500">
                        {errors.video_tutorial}
                      </span>
                    )}
                  </div>
                  <div className="flex flex-col">
                    {/* Cloudinary upload widget component for Assignments file uploads */}
                    <CloudinaryUploadWidget_Files
                      onUploadComplete={(url) =>
                        setFieldValue("assignment", url)
                      }
                    />
                    {errors.assignment && touched.assignment && (
                      <span className="text-sm text-red-500">
                        {errors.assignment}
                      </span>
                    )}
                  </div>
                </div>
                <Button type="submit" className="bg-black text-white">
                  Add Lesson
                </Button>
              </div>
            </Form>
          )}
        </Formik>
        {/* Added lession display */}
        <div className="space-y-4 ">
          <h3 className="text-2xl font-bold ms-1 ">Added Lessions</h3>
          {lessons.map((lesson, index) => (
            <div
              key={index}
              className="flex justify-between border rounded-md p-4 shadow bg-white"
            >
              <div>
                <h4 className="font-semibold">{lesson.title}</h4>
                <p className="text-gray-600">{lesson.description}</p>
                <div className="flex gap-4 mt-2">
                  {lesson.video_tutorial && (
                    <button className="border p-2 rounded-lg flex gap-2 border-neutral-400">
                      <CircleCheckBig />
                      <p className="text-sm">Video tutorial uploaded</p>
                    </button>
                  )}
                  {lesson.assignment && (
                    <button className="border p-2 rounded-lg flex gap-2 border-neutral-400">
                      <CircleCheckBig />
                      <p className="text-sm">Assignment uploaded</p>
                    </button>
                  )}
                </div>
              </div>
              <div>
                <Button
                  onClick={remove_lessions}
                  className="bg-white hover:bg-neutral-50 border text-black"
                >
                  Remove
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
      {LessionMinRequiredErrorFound && (
        <div className="text-sm text-red-500">
          Minimum lession requirement must be followed . Add minimum 5 lessions
        </div>
      )}
      {/* Navigating to course preview component */}
      <div className="mt-8 flex justify-between">
        <Button
          className="bg-black text-white px-4"
          onClick={() => navigate("/instructor/create_course")}
        >
          <ArrowLeft className="ml-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          onClick={handleNavigateCoursePreview}
          className="bg-black text-white px-8"
        >
          Next <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
      {/* </div> */}
      {/* </div> */}

      {/* Footer */}
      {/* <footer className="bg-black text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">CourseCloud</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Teach in Company</a></li>
                <li><a href="#" className="hover:underline">About us</a></li>
                <li><a href="#" className="hover:underline">Contact us</a></li>
                <li><a href="#" className="hover:underline">Ratings</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Help & Support</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Help Center</a></li>
                <li><a href="#" className="hover:underline">Career</a></li>
                <li><a href="#" className="hover:underline">Blog</a></li>
                <li><a href="#" className="hover:underline">More</a></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Term & Conditions</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline">Cookie settings</a></li>
                <li><a href="#" className="hover:underline">Privacy policy</a></li>
                <li><a href="#" className="hover:underline">Sitemap</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>All copyright are reserved by LMS company</p>
            <p>lmscompany.com</p>
          </div>
        </div>
      </footer> */}
    </motion.div>
  );
}
