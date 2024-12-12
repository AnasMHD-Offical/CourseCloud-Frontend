"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  BookOpen,
  ChevronRight,
  Home,
  Star,
  Goal,
  Dot,
  FileEdit,
  Brain,
  CheckCircleIcon,
  Circle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Link, Outlet, useParams } from "react-router-dom";
import Header from "@/Components/base/Header";
import Footer from "@/Components/base/Footer";
import CourseContainer from "@/Components/base/CourseContainer";
import CallForTutor from "@/Components/base/CallForTutor";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/Components/ui/tabs";
import { axios_instance } from "@/Config/axios_instance";
import QuizConponentOverview from "./Quiz_Component/StudentQuizOverview";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrent_Course_id,
  setCurrent_Lesson_id,
} from "@/Redux/Slices/CourseMetaData";
import AssignmentComponent from "./Student_Assignment";
import { CourseReviews } from "./ReviewAndRatings/course_review";
import Chat from "./AskDoubt_Component/Chat";
import SavedNotes from "./Student_SavedNotes";
import Cloudinary_VideoPlayer from "@/Utils/Cloudinary_VideoPlayer";

export default function Purshased_Course_Overview() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [targetAudience, setTargetAudience] = useState([]);
  const [courses, setCourses] = useState();
  const [selectedNav, setSelectedNav] = useState("Overview");
  const [video_url, setVideo_url] = useState("");
  const [thumbnail, setThumbnail] = useState("kpsd38m8mtl6nxtmujlr.jpg");
  const [currentLesson, setCurrentLesson] = useState({});
  const [reviews, setReviews] = useState([]);
  const [video_progress, setVideo_progress] = useState();
  const [progressMutation, setProgressMutation] = useState(false);
  const [lessonProgresses, setLessonProgresses] = useState([]);
  const [nextVideoData, setNextVideoData] = useState({});
  const [currentTutorialIndex, setCurrentTutorialIndex] = useState(0);
  // const [nextTutorialIndex,setNextTutorialIndex] = useState(1)
  const dispatch = useDispatch();

  const videoRef = useRef();

  const { id } = useParams();

  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );

  const get_course_by_id = async () => {
    try {
      const resposne = await axios_instance.get(`api/get_course/${id}`);
      const { success, course } = resposne?.data;
      if (success) {
        console.log(resposne);
        setCourses(course);
        setCourseLessons(course?.lessons);
        setObjectives(course.objectives);
        setRequirements(course.requirements);
        setTargetAudience(course.target_students);
        setVideo_url(course?.lessons[0].video_tutorial_link);
        setNextVideoData(course?.lessons[1]);
        setCurrentLesson(course?.lessons[0]);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_review = async () => {
    try {
      const response = await axios_instance.get(`api/get_reviews/${id}`);
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
  const get_video_progress = async () => {
    try {
      console.log("ind the fn");

      const response = await axios_instance.get("api/get_video_progress", {
        params: {
          student_id: student_id,
          lesson_id: currentLesson._id,
        },
      });
      const { video_progress } = response?.data;
      if (response?.data?.success) {
        setVideo_progress(video_progress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_lesson_progress = async () => {
    try {
      const response = await axios_instance.get("api/get_lesson_progress", {
        params: {
          student_id: student_id,
          course_id: id,
        },
      });
      const { lesson_progress } = response?.data;
      if (response?.data?.success) {
        setLessonProgresses(lesson_progress);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // const create_lesson_progress = async () => {
  //   try {
  //     if(student_id && id && currentLesson?._id){

  //       const response = await axios_instance.post("api/create_lesson_progress",{
  //         student_id:student_id,
  //         course_id : id,
  //         lesson_id : currentLesson._id
  //       })
  //       console.log("Lesson_progress_created : " , response)
  //     }
  //     } catch (error) {
  //     console.log(error)
  //   }
  // };

  const video_progress_rate = useSelector(
    (state) => state?.Video_tutorial_progress?.video_tutorial_progress
  );

  console.log("video progress rate : ", video_progress_rate);
  console.log("Lesson progress : ", lessonProgresses);

  console.log("Next tutorial : ", nextVideoData);
  console.log("curr tutorial : ", video_url, "index :", currentTutorialIndex);

  useEffect(() => {
    get_course_by_id();
    dispatch(setCurrent_Course_id(id));
  }, [id]);

  useEffect(() => {
    dispatch(setCurrent_Lesson_id(currentLesson?._id));
  }, [currentLesson]);

  useEffect(() => {
    get_review();
  }, []);

  useEffect(() => {
    get_video_progress();
    get_lesson_progress();
    // setVideo_progress(video_progress_rate)
  }, [currentLesson, progressMutation]);

  const NavRoutes = [
    { href: "/", label: "Overview" },
    // { href: "/quiz", label: "Lesson Quiz" },
    { href: "/assignments", label: "Assignments" },
    { href: "/ask_doubt", label: "Ask your doubts" },
    { href: "/notes", label: "Saved Notes" },
    { href: "/reviews", label: "Reviews & Ratings" },
  ];

  console.log("Lesson progresses : ", lessonProgresses);

  const handleSelecetedNav = (val) => {
    setSelectedNav(val);
  };

  const handleTutorialChange = (lesson, currentIndex, nextTutorialIndex) => {
    setCurrentLesson(lesson);
    setVideo_url(lesson.video_tutorial_link);
    setCurrentTutorialIndex(currentIndex);
    setNextVideoData(
      nextTutorialIndex < CourseLessons.length
        ? CourseLessons[nextTutorialIndex]
        : ""
    );
  };

  const handleProgressMutation = (val) => {
    setProgressMutation(val === false ? true : false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Content */}
          <div className="flex-1">
            {/* Breadcrumb */}
            <div className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
              <Link to="/" className="hover:text-purple-600">
                <Home className="h-4 w-4" />
              </Link>
              <ChevronRight className="h-4 w-4" />
              <Link to="/dashboard/courses" className="hover:text-purple-600">
                All courses
              </Link>
              <ChevronRight className="h-4 w-4" />
              <span>{courses?.title}</span>
            </div>

            {/* Video Player */}
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden mb-8">
              <Cloudinary_VideoPlayer
                public_id={video_url}
                handleMutation={handleProgressMutation}
                nextTutorial={nextVideoData}
                currentTutorialIndex={currentTutorialIndex}
                handleLessonChange={handleTutorialChange}
              />
            </div>

            <div>
              {/* Course Title and Info */}
              <div className="mb-8">
                <h1 className="text-3xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  {courses?.title ||
                    "Complete Full-stack development course 2024"}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                  <div className="flex items-center">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          className={`h-5 w-5 ${
                            star <= 4
                              ? "text-yellow-400 fill-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2">
                      {courses?.rating ? courses?.rating.toFixed(1) : "4.7"}{" "}
                      (3,245 reviews)
                    </span>
                  </div>
                  <span>
                    {courses?.enrolled_count || "12,546"} students enrolled
                  </span>
                  <Badge variant="secondary">
                    {courses?.difficulty.charAt(0).toUpperCase() +
                      courses?.difficulty.slice(1) || "Beginner"}
                  </Badge>
                </div>
              </div>

              <div className="hidden lg:block">
                <Tabs
                  defaultValue="Overview"
                  value={selectedNav}
                  onValueChange={(value) => handleSelecetedNav(value)}
                >
                  <TabsList className="flex w-full justify-between  text-white bg-gradient-to-r from-primary to-purple-600 gap-1 h-12 ps-2 rounded-full mb-7">
                    {NavRoutes.map((nav, index) => (
                      <TabsTrigger
                        key={index}
                        className="rounded-full h-9 "
                        value={nav.label}
                      >
                        {nav.label}
                      </TabsTrigger>
                    ))}
                  </TabsList>
                  <TabsContent value="Overview">
                    <div>
                      {/* What You'll Learn */}
                      <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                          What You'll Learn
                        </h2>
                        <div className="grid md:grid-cols-2 gap-4">
                          {objectives.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Requirements */}
                      <div className=" bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4 text-white">
                          Requirements
                        </h2>
                        <ul className="space-y-2">
                          {requirements.map((requirement, index) => (
                            <li key={index} className="flex items-center gap-2">
                              <Dot className="h-5 w-5 text-white" />
                              {requirement}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Who Can Learn */}
                      <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                          Who Can Learn
                        </h2>
                        <div className="space-y-4">
                          {targetAudience.map((item, index) => (
                            <div key={index} className="flex items-start gap-2">
                              <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                              <span>{item}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Description */}
                      <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                          Description
                        </h2>
                        <div className="prose max-w-none">
                          <p>{courses?.description}</p>
                        </div>
                      </div>

                      {/* Instructor */}
                      <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                        <h2 className="text-xl font-semibold mb-4">
                          Your Instructor
                        </h2>
                        <div className="flex items-start gap-4">
                          <Avatar className="h-16 w-16">
                            <AvatarImage
                              src={
                                courses?.instructor_id?.profile || "Instructor"
                              }
                              alt="Instructor"
                            />
                            <AvatarFallback>AS</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold">
                              {courses?.instructor_id?.name || "Akshay Saini"}
                            </h3>
                            <p className="text-sm text-gray-600">
                              {courses?.instructor_id?.proffession ||
                                "Senior Software Engineer at Meta"}
                            </p>
                            <p className="mt-2 text-sm">
                              {courses?.instructor_id?.about || "Description"}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Reviews */}
                      <div className="shadow shadow-purple-300 rounded-lg border p-6">
                        <h2 className="text-xl font-semibold mb-6">
                          Student Reviews
                        </h2>
                        <div className="space-y-6">
                          {reviews.map((review) => (
                            <div
                              key={review._id}
                              className="border-b pb-6 last:border-0"
                            >
                              <div className="flex items-center gap-4 mb-2">
                                <Avatar>
                                  <AvatarImage
                                    src={review?.student_id?.profile}
                                    alt="Student"
                                  />
                                  <AvatarFallback>S</AvatarFallback>
                                </Avatar>
                                <div>
                                  <div className="font-semibold">
                                    {review?.student_id?.name || "Name"}
                                  </div>
                                  <div className="flex">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                      <Star
                                        key={star}
                                        className={`h-4 w-4 text-yellow-400 ${
                                          star <= review.rating
                                            ? "fill-yellow-400"
                                            : "fill-white"
                                        }`}
                                      />
                                    ))}
                                  </div>
                                </div>
                              </div>
                              <p className="text-gray-600">
                                {review?.feedback}
                              </p>
                            </div>
                          ))}
                          <Button variant="outline" className="w-full">
                            Load More Reviews
                          </Button>
                        </div>
                      </div>
                    </div>
                  </TabsContent>
                  {/* <TabsContent value="Lesson Quiz">
                    {console.log(currentLesson.description)}
                    {currentLesson && (
                      <QuizConponentOverview
                        topic={courses?.title}
                        title={courses?.title}
                        For={"tabs"}
                      />
                    )}
                  </TabsContent> */}
                  <TabsContent value="Assignments">
                    <AssignmentComponent assignment={currentLesson} />
                  </TabsContent>
                  <TabsContent value="Ask your doubts">
                    <Chat />
                  </TabsContent>
                  <TabsContent value="Saved Notes">
                    <SavedNotes />
                  </TabsContent>
                  <TabsContent value="Reviews & Ratings">
                    <CourseReviews />
                  </TabsContent>
                </Tabs>
              </div>

              <div className="block lg:hidden">
                <Select
                  defaultValue="Overview"
                  value={selectedNav}
                  onValueChange={(value) => handleSelecetedNav(value)}
                >
                  <SelectTrigger className="w-full rounded-full bg-gradient-to-r from-primary to-purple-600 text-white ">
                    <SelectValue placeholder="Overview" />
                  </SelectTrigger>
                  <SelectContent>
                    {NavRoutes.map((nav, index) => (
                      <SelectItem key={index} value={nav.label}>
                        {nav.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="block lg:hidden mt-8">
                {selectedNav === "Overview" && (
                  <div>
                    {/* What You'll Learn */}
                    <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                      <h2 className="text-xl font-semibold mb-4">
                        What You'll Learn
                      </h2>
                      <div className="grid md:grid-cols-2 gap-4">
                        {objectives.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Requirements */}
                    <div className=" bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-6 mb-8">
                      <h2 className="text-xl font-semibold mb-4 text-white">
                        Requirements
                      </h2>
                      <ul className="space-y-2">
                        {requirements.map((requirement, index) => (
                          <li key={index} className="flex items-center gap-2">
                            <Dot className="h-5 w-5 text-white" />
                            {requirement}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Who Can Learn */}
                    <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                      <h2 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        Who Can Learn
                      </h2>
                      <div className="space-y-4">
                        {targetAudience.map((item, index) => (
                          <div key={index} className="flex items-start gap-2">
                            <Goal className="h-5 w-5 text-purple-800 mt-0.5" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Description
                      </h2>
                      <div className="prose max-w-none">
                        <p>{courses?.description}</p>
                      </div>
                    </div>

                    {/* Instructor */}
                    <div className="shadow shadow-purple-300 rounded-lg border p-6 mb-8">
                      <h2 className="text-xl font-semibold mb-4">
                        Your Instructor
                      </h2>
                      <div className="flex items-start gap-4">
                        <Avatar className="h-16 w-16">
                          <AvatarImage
                            src={
                              courses?.instructor_id?.profile || "Instructor"
                            }
                            alt="Instructor"
                          />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-semibold">
                            {courses?.instructor_id?.name || "Akshay Saini"}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {courses?.instructor_id?.proffession ||
                              "Senior Software Engineer at Meta"}
                          </p>
                          <p className="mt-2 text-sm">
                            {courses?.instructor_id?.about || "Description"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Reviews */}
                    <div className="shadow shadow-purple-300 rounded-lg border p-6">
                      <h2 className="text-xl font-semibold mb-6">
                        Student Reviews
                      </h2>
                      <div className="space-y-6">
                        {[1, 2, 3].map((review) => (
                          <div
                            key={review}
                            className="border-b pb-6 last:border-0"
                          >
                            <div className="flex items-center gap-4 mb-2">
                              <Avatar>
                                <AvatarImage
                                  src="/placeholder.svg"
                                  alt="Student"
                                />
                                <AvatarFallback>S</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-semibold">
                                  Student Name
                                </div>
                                <div className="flex">
                                  {[1, 2, 3, 4, 5].map((star) => (
                                    <Star
                                      key={star}
                                      className="h-4 w-4 text-yellow-400 fill-yellow-400"
                                    />
                                  ))}
                                </div>
                              </div>
                            </div>
                            <p className="text-gray-600">
                              This course exceeded my expectations. The
                              instructor explains complex concepts in a way
                              that's easy to understand, and the projects helped
                              reinforce my learning.
                            </p>
                          </div>
                        ))}
                        <Button variant="outline" className="w-full">
                          Load More Reviews
                        </Button>
                      </div>
                    </div>
                  </div>
                )}
                {/* {selectedNav === "Lesson Quiz" && currentLesson && (
                  <QuizConponentOverview
                    topic={courses.title}
                    title={courses.title}
                    For={"select"}
                    course_id={id}
                    lesson_id={currentLesson._id}
                  />
                )} */}

                {selectedNav === "Assignments" && (
                  <AssignmentComponent assignment={currentLesson} />
                )}
                {selectedNav === "Ask your doubts" && <Chat />}
                {selectedNav === "Saved Notes" && <SavedNotes />}
                {selectedNav === "Reviews & Ratings" && <CourseReviews />}
              </div>
            </div>
          </div>

          {/* Course Content Sidebar */}
          <div className="lg:w-96">
            <div className="sticky top-36">
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 rounded-lg border overflow-hidden">
                <div className="p-4 border-b">
                  <h2 className="font-semibold">Course Content</h2>
                  <p className="text-sm text-gray-600 flex gap-4 mt-2">
                    <span className="flex items-center gap-1">
                      <BookOpen className="w-4 h-4" /> {CourseLessons.length}{" "}
                      Lessons{" "}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      <FileEdit className="w-4 h-4" /> {CourseLessons.length}{" "}
                      Assignments{" "}
                    </span>{" "}
                    <span className="flex items-center gap-1">
                      <Brain className="w-4 h-4" /> {`3 level`} Quizzes{" "}
                    </span>
                  </p>
                </div>
                <ScrollArea className="h-[calc(100vh-200px)]">
                  <Accordion
                    type="single"
                    collapsible
                    defaultValue="1"
                    className="w-full"
                  >
                    {CourseLessons.map((lesson, index) => (
                      <>
                        {}
                        <AccordionItem key={lesson._id} value={lesson._id}>
                          <AccordionTrigger className="px-4 hover:no-underline hover:bg-white">
                            <div className="flex flex-col gap-1">
                              <div className="flex items-center justify-between gap-1">
                                {lessonProgresses[index]
                                  ?.video_tutorial_completed ? (
                                  <CheckCircleIcon className="w-4 h-4" />
                                ) : (
                                  <Circle className="w-4 h-4" />
                                )}
                                <span
                                  className="font-medium"
                                  onClick={() =>
                                    handleTutorialChange(
                                      lesson,
                                      index,
                                      index + 1
                                    )
                                  }
                                >
                                  {lesson.title}
                                </span>
                                {""}
                              </div>
                              <Badge
                                className={
                                  " text-xs text-black bg-purple-300 hover:bg-purple-300 max-w-28"
                                }
                              >
                                {lessonProgresses[index]
                                  ?.video_tutorial_completed
                                  ? "100% completed"
                                  : `${
                                      video_progress_rate?.lesson_id ===
                                      lesson._id
                                        ? video_progress_rate?.progress
                                        : 0
                                    }% completed`}
                              </Badge>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            <div className="space-y-1 p-2">
                              {lesson.description}
                            </div>
                          </AccordionContent>
                        </AccordionItem>
                      </>
                    ))}
                    {/* {console.log("kopjowef",)} */}
                    {lessonProgresses[CourseLessons.length - 1]
                      ?.video_tutorial_completed && (
                      <QuizConponentOverview
                        topic={courses?.title}
                        title={courses?.title}
                        For={"select"}
                        course_id={id}
                        lesson_id={currentLesson?._id}
                      />
                    )}
                  </Accordion>
                </ScrollArea>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Call for Tutors */}
      <CallForTutor />

      {/* Related Courses */}
      <CourseContainer title={"Related Courses"} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
