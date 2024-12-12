import Breadcrumb from "./Components/Breadcrumb";
import CourseDetail from "./Components/CourseDetails";
import CourseCurriculum from "./Components/CourseCurriculum";
import RevenueStats from "./Components/RevenueStats";
import { axios_instance } from "@/Config/axios_instance";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import ReviewStats from "./Components/ReviewStats";

const courseData = {
  courseTitle: "Complete Full Stack Development Course 2024",
  rating: 4.7,
  reviews: "8,376 reviews",
  enrolledStudents: "12,346 Students enrolled this course",
  inclusions: [
    "35+ hours of content",
    "Certificate of Completion",
    "5+ Live Sessions",
  ],
  requirements: ["Basic coding knowledge", "Access to a computer and internet"],
  description:
    "Comprehensive course on frontend and backend development using MERN stack...",
  curriculum: [
    { module: "Introduction and Setup", progress: 40 },
    { module: "Frontend Development", progress: 60 },
    { module: "Backend Development", progress: 70 },
    { module: "Deployment", progress: 90 },
    { module: "Bonus Topic", progress: 100 },
  ],
  revenueStats: {
    enrolledStudents: 200,
    purchasedCourses: 150,
    revenuePerCourse: 1000,
    totalRevenue: 150000,
  },
};

export default function InstructorCourseOverview() {
  const [courseData, setCourseData] = useState([]);
  const [revenueStats, setRevenueStats] = useState({});
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const { id } = useParams();
  console.log(id);

  const getCourse = async () => {
    try {
      console.log("Hello here");

      const response = await axios_instance.get(
        `api/instructor/get_course/${id}`
      );
      const { success, message, courses } = response?.data;
      if (success) {
        setCourseData(courses);
        setRevenueStats({
          enrolledStudents: courses?.enrolled_count,
          CourseRating: courses?.rating,
          revenuePerCourse: courses?.actual_price?.$numberDecimal,
          totalRevenue:
            courses?.actual_price?.$numberDecimal * courses?.enrolled_count,
        });
        setIsLoading(false);
        console.log(courses);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_review = async () => {
    try {
      const response = await axios_instance.get(
        `api/instructor/get_reviews/${id}`
      );
      const { success, message, reviews } = response?.data;
      console.log("Review : ", reviews);

      if (success) {
        setReviews(reviews);
        // setUpdated(!updated)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    getCourse();
    // get_review();
  }, []);

  console.log(courseData);

  return (
    <main className="flex-1">
      <div className="container grid gap-6 p-4 md:gap-8 md:p-6">
        <Breadcrumb
          homeRoute={"/instructor/course_management"}
          pageRoute={"Course overview"}
        />
        <h3 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Course Overview
        </h3>
        <div className="grid gap-6">
          {!isLoading && <CourseDetail course={courseData} />}
          <div className="grid gap-6 md:grid-cols-2">
            {!isLoading && <ReviewStats course_id={id} />}
            {!isLoading && <RevenueStats stats={revenueStats} />}
            {!isLoading && (
              <CourseCurriculum
                CourseLessons={courseData?.lessons}
                thumbnail={courseData?.thumbnail}
              />
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
