import { useEffect, useState } from "react";
import {
  ArrowRight,
  Award,
  ChevronRight,
  FileText,
  Globe,
  Heart,
  Menu,
  PlayCircle,
  Share2,
  Star,
  Users,
  Check as CheckCircle,
  X,
  Goal,
  CircleCheckBig,
  Home,
  ShoppingBag,
  ShoppingBagIcon,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
// import { Separator } from '@/components/ui/separator'
// import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
// import Image from 'next/image'
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// import { toast } from '@/components/ui/use-toast'
import { toast } from "sonner";
import Footer from "@/Components/base/Footer";
import Header from "@/Components/base/Header";
import CourseContainer from "@/Components/base/CourseContainer";
import CallForTutor from "@/Components/base/CallForTutor";
import { useParams } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";

export default function CourseDetails() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [isWishlist, setIsWishlist] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [courses, setCourses] = useState([]);
  const [CourseLessons, setCourseLessons] = useState([]);
  const [objectives, setObjectives] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [targetAudience, setTargetAudience] = useState([]);
  const [reviews, setReviews] = useState([]);
  const { id } = useParams();
  console.log(id);

  const get_course_by_id = async (req, res) => {
    try {
      const resposne = await axios_instance.get(`api/get_course/${id}`);
      const { success, course, message } = resposne?.data;
      if (success) {
        console.log(resposne);
        setCourses(course);
        setCourseLessons(course?.lessons);
        setObjectives(course.objectives);
        setRequirements(course.requirements);
        setTargetAudience(course.target_students);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToCart = async () => {
    try {
      const response = await axios_instance.put("api/add_to_cart", {
        student_id: student_id,
        course_id: courses._id,
        price: courses.actual_price,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        console.log(response);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_review = async () => {
    try {
      const response = await axios_instance.get("api/get_reviews");
      const { success, message, reviews } = response?.data;
      console.log("Review : ",reviews);
      
      if(success){
        setReviews(reviews)
        // setUpdated(!updated)
      }
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data?.message)
    }
  };

  useEffect(() => {
    get_course_by_id();
  }, [id]);

  useEffect(()=>{
    get_review()
  },[])

  const courseProgress = 50; // Example progress

  const toggleWishlist = () => {
    setIsWishlist(!isWishlist);
    toast.success(isWishlist ? "Removed from wishlist" : "Added to wishlist");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <Header />

      <main className="container mx-auto xl:px-16 px-4 py-8 ">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="flex items-center space-x-2 text-sm text-muted-foreground"
              >
                <Link to="/" className="hover:underline">
                  <Home className="h-4 w-4" />
                </Link>
                <ChevronRight className="h-4 w-4" />
                <Link
                  to={`/category/${courses?.category?._id}`}
                  className="hover:underline"
                >
                  {courses.category?.title
                    ? courses.category?.title
                    : "Development"}
                </Link>
              </motion.div>
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl h-auto font-extrabold tracking-tight lg:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
              >
                {courses.title
                  ? courses.title
                  : "Complete Full Stack Development Course 2024"}
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-xl text-muted-foreground"
              >
                {courses.subtitle
                  ? courses.subtitle
                  : "Master the art of building modern web applications from front to back"}
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="flex flex-wrap items-center gap-4"
              >
                <div className="flex items-center">
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
                  <span className="ml-2 font-medium">
                    {courses.rating ? courses.rating : "4.7"}
                  </span>
                  <span className="ml-2 text-muted-foreground">
                    {courses.review ? courses.review : "(3,245 reviews)"}
                  </span>
                </div>
                <Badge
                  variant="secondary"
                  className="bg-primary/10 text-primary"
                >
                  {courses.difficulty
                    ? courses.difficulty.charAt(0).toUpperCase() +
                      courses.difficulty.slice(1)
                    : "Beginner"}
                </Badge>
                <span className="text-muted-foreground">
                  {courses.enrolled_count
                    ? `${courses.enrolled_count} students enrolled`
                    : `12,345 students enrolled`}
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex items-center space-x-2"
              >
                <Avatar className="h-10 w-10 border-2 border-primary">
                  <AvatarImage
                    src={
                      courses.instructor_id?.profile
                        ? courses.instructor_id?.profile
                        : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730571309/openart-image_z-cDRKP9_1730556373858_raw_rpgts8.jpg"
                    }
                    alt="Instructor Profile"
                  />
                  <AvatarFallback>AS</AvatarFallback>
                </Avatar>
                <span className="text-sm">
                  Created by{" "}
                  <Link
                    href="#instructor"
                    className="font-medium text-primary hover:underline"
                  >
                    {courses.instructor_id?.name
                      ? courses.instructor_id?.name
                      : "Abhay Suri"}
                  </Link>
                </span>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="flex items-center justify-between p-4 bg-primary/5 rounded-lg"
              >
                <div>
                  <span className="text-3xl font-bold">
                    {courses?.actual_price
                      ? `Rs. ${courses?.actual_price?.$numberDecimal}`
                      : "₹7,999"}
                  </span>
                  <Badge
                    variant="secondary"
                    className="ml-2 bg-green-100 text-green-800"
                  >
                    50% off
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">
                  30-Day Money-Back Guarantee
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-wrap gap-4"
              >
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-primary to-purple-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                >
                  Add To Cart
                  <ShoppingBagIcon className="ml-2 h-4 w-4" />
                </Button>
                <Dialog open={showVideoModal} onOpenChange={setShowVideoModal}>
                  <DialogTrigger asChild>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10"
                    >
                      <PlayCircle className="mr-2 h-4 w-4" />
                      Preview Course
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px]">
                    <DialogHeader>
                      <DialogTitle>Course Preview</DialogTitle>
                      <DialogDescription>
                        Get a sneak peek of what you'll learn in this course.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="aspect-video mt-4">
                      <iframe
                        width="100%"
                        height="100%"
                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                        title="Course Preview"
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                      ></iframe>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="flex justify-between items-center"
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                  onClick={toggleWishlist}
                >
                  <Heart
                    className={`h-5 w-5 mr-2 ${
                      isWishlist ? "fill-primary" : ""
                    }`}
                  />
                  Wishlist
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-primary hover:bg-primary/10"
                >
                  <Share2 className="h-5 w-5 mr-2" />
                  Share
                </Button>
              </motion.div>
            </div>
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, type: "spring", stiffness: 100 }}
              className="relative aspect-video rounded-lg overflow-hidden shadow-2xl group"
            >
              <img
                src={
                  courses?.thumbnail
                    ? courses?.thumbnail
                    : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg"
                }
                alt="Course preview"
                layout="fill"
                objectFit="cover"
                className="transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <PlayCircle
                  className="h-16 w-16 text-white cursor-pointer"
                  onClick={() => setShowVideoModal(true)}
                />
              </div>
            </motion.div>
          </div>
        </motion.section>

        {/* Main Content */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-16 space-y-16"
        >
          {/* What You'll Learn */}
          <div className="p-10 rounded-lg shadow shadow-purple-300">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900">
              What You'll Learn
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {console.log(courses.objectives)}
              {objectives.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Goal className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className=" bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-900">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Course Content */}
          <div className="p-10 rounded-lg shadow-sm border-t border-l border-purple-400 shadow-purple-200">
            <h2 className="text-3xl  font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-900 to-primary">
              Course Content
            </h2>
            <Accordion type="single" collapsible className="w-full">
              {CourseLessons.map((lesson) => (
                <AccordionItem key={lesson._id} value={lesson._id}>
                  <AccordionTrigger className="border px-4 rounded-lg">
                    <div className="flex items-center justify-between w-full">
                      <span className="font-semibold text-left bg-clip-text text-transparent bg-gradient-to-r to-purple-800 from-primary">
                        {lesson.title ? lesson.title : "Sample"}
                      </span>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-muted-foreground">
                          {lesson.durationhr ? lesson.duration : "1.5hr"}
                        </span>
                      </div>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="p-4 border rounded-t-none rounded-lg">
                      {lesson.description ? lesson.description : "Somthing"}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>

          {/* Requirements */}
          <div className="p-10 rounded-lg text-white bg-gradient-to-r from-primary to-purple-600  shadow shadow-purple-200">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-600">
              Requirements
            </h2>
            <ul className="list-disc text-white  pl-5 space-y-2  bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-600">
              {requirements.map((requirement, index) => (
                <li key={index}>{requirement}</li>
              ))}
            </ul>
          </div>

          {/* Target Audience Display */}
          <div className="p-10 rounded-lg shadow shadow-purple-300">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900">
              Who Else Can Learn
            </h2>
            <ul className="grid gap-4 sm:grid-cols-2">
              {console.log(courses.objectives)}
              {targetAudience.map((item, index) => (
                <motion.li
                  key={index}
                  className="flex items-center space-x-2"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <CircleCheckBig className="h-5 w-5 flex-shrink-0 text-primary" />
                  <span className=" bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-900">
                    {item}
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="p-10 rounded-lg shadow-sm border-t border-l border-purple-400 shadow-purple-200">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900">
              Description
            </h2>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-base">{courses.description}</p>
            </div>
          </div>

          {/* Instructor */}
          <div
            id="instructor"
            className="p-10 rounded-lg shadow shadow-purple-300"
          >
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900">
              Your Instructor
            </h2>
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              <Avatar className="h-32 w-32 border-4  border-purple-50">
                <AvatarImage
                  src={
                    courses.instructor_id?.profile
                      ? courses.instructor_id?.profile
                      : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730571309/openart-image_z-cDRKP9_1730556373858_raw_rpgts8.jpg"
                  }
                  alt="Instructor profile"
                />
                <AvatarFallback>AS</AvatarFallback>
              </Avatar>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold">
                    {courses.instructor_id?.name
                      ? courses.instructor_id?.name
                      : "Abhay Suri"}
                  </h3>
                  <p className="text-muted-foreground">
                    {courses.instructor_id?.proffession
                      ? courses.instructor_id?.proffession
                      : "Educator"}
                  </p>
                </div>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  <div className="flex items-center">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span className="ml-1 font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                      4.8 Instructor Rating
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <span className="ml-1">23,456 Students</span>
                  </div>
                  <div className="flex items-center">
                    <PlayCircle className="h-4 w-4 text-muted-foreground" />
                    <span className="ml-1">15 Courses</span>
                  </div>
                </div>
                <p className="text-muted-foreground">
                  {courses.instructor_id?.about
                    ? courses.instructor_id?.about
                    : ""}
                </p>
              </div>
            </div>
          </div>

          {/* Reviews */}
          <div className="p-10 rounded-lg shadow shadow-purple-200 px-16">
            <h2 className="text-3xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900">
              Reviews & Rating
            </h2>
            <div className="flex flex-col md:flex-row gap-8 mb-4 py-12">
              <div className="flex-1 flex flex-col items-center justify-between">
                <div className="text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 ">
                  {courses?.rating ? courses?.rating.toFixed(1) : "4.7"}
                </div>
                <div className="flex my-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-5 w-5 text-yellow-400 ${star < courses.rating ? "fill-yellow-400" : "fill-white"}`}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Course Rating
                </div>
              </div>
              <div className="flex-[2]">
                {[5, 4, 3, 2, 1].map((rating) => (
                  <div key={rating} className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium w-3">{rating}</span>
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <Progress
                      value={rating === 5 ? 70 : rating === 4 ? 20 : 5}
                      className="h-2 flex-1"
                    />
                    <span className="text-sm text-muted-foreground w-8">
                      {rating === 5 ? "70%" : rating === 4 ? "20%" : "5%"}
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-6">
              {reviews.map((review, index) => (
                <motion.div
                  key={index}
                  className="pb-4 border-b last:border-b-0"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <div className="flex items-center gap-2 mb-2">
                    <Avatar>
                      <AvatarFallback>{review?.student_id?.name[0]}</AvatarFallback>
                      <AvatarImage src={review?.student_id?.profile || ""}/>
                    </Avatar>
                    <div>
                      <div className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                        {review?.student_id?.name}
                      </div>
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-4 w-4 ${
                              star <= review.rating
                                ? "text-yellow-400 fill-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">{review.feedback}</p>
                </motion.div>
              ))}
            </div>
            <Button
              variant="outline"
              className="w-40 mt-4 hover:bg-primary hover:text-white transition-colors duration-300"
            >
              Load More Reviews
            </Button>
          </div>
        </motion.section>
      </main>
      {/* Call For tutors */}
      <CallForTutor />

      {/* Related Courses */}
      <CourseContainer title={"Related Courses"} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
