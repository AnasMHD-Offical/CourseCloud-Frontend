import React, { useEffect, useState } from "react";
import {
  BookOpen,
  ChevronRight,
  Home,
  LogOut,
  Star,
  User,
  BarChart,
  BookOpenCheck,
  Zap,
  TrendingUp,
  Award,
  Clock,
  Flame,
  X,
  Library,
  LayoutDashboard,
  Heart,
  Medal,
  GraduationCap,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Tooltip as TooltipUI,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/Components/ui/button";
import { Link } from "react-router-dom";
import PurshacedCourseContainer from "@/Components/base/PurshacedCourseContainer";
import { ScrollArea } from "../../Components/ui/scroll-area";
import { Separator } from "@/Components/ui/separator";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";

const monthlyPerformanceData = [
  { month: "Jan", performance: 65, streak: 15, completionRate: 70 },
  { month: "Feb", performance: 59, streak: 12, completionRate: 65 },
  { month: "Mar", performance: 80, streak: 22, completionRate: 85 },
  { month: "Apr", performance: 81, streak: 25, completionRate: 88 },
  { month: "May", performance: 56, streak: 18, completionRate: 60 },
  { month: "Jun", performance: 55, streak: 20, completionRate: 62 },
  { month: "Jul", performance: 70, streak: 23, completionRate: 75 },
  { month: "Aug", performance: 75, streak: 28, completionRate: 80 },
  { month: "Sep", performance: 68, streak: 19, completionRate: 72 },
  { month: "Oct", performance: 72, streak: 21, completionRate: 78 },
  { month: "Nov", performance: 78, streak: 26, completionRate: 82 },
  { month: "Dec", performance: 85, streak: 30, completionRate: 90 },
];

const overallPerformanceData = [
  { name: "Completed Courses", value: 70 },
  { name: "In Progress Courses", value: 20 },
  { name: "Not Started Courses", value: 10 },
];

const COLORS = ["#4F46E5", "#10B981", "#F59E0B"];

const recentCourses = [
  {
    id: 1,
    title: "Introduction to React",
    price: "Rs. 1999",
    rating: 4.5,
    thumbnail:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1731484857/sspu51xbjbmsxqmgaqlg.jpg",
    progress: 75,
    difficulty: "Beginner",
    duration: "10h 30m",
  },
  {
    id: 2,
    title: "Advanced JavaScript",
    price: "Rs. 2499",
    rating: 4.8,
    thumbnail:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1731484857/sspu51xbjbmsxqmgaqlg.jpg",
    progress: 30,
    difficulty: "Advanced",
    duration: "15h 45m",
  },
  {
    id: 3,
    title: "CSS Mastery",
    price: "Rs. 1499",
    rating: 4.2,
    thumbnail:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1731484857/sspu51xbjbmsxqmgaqlg.jpg",
    progress: 50,
    difficulty: "Intermediate",
    duration: "8h 15m",
  },
  {
    id: 4,
    title: "Node.js Fundamentals",
    price: "Rs. 2999",
    rating: 4.7,
    thumbnail:
      "https://res.cloudinary.com/dtc1xcil8/image/upload/v1731484857/sspu51xbjbmsxqmgaqlg.jpg",
    progress: 10,
    difficulty: "Intermediate",
    duration: "12h 00m",
  },
];

const learningStreak = Array.from({ length: 30 }, (_, i) => ({
  date: new Date(2023, 5, i + 1).toISOString().split("T")[0],
  count: Math.floor(Math.random() * 5),
}));

const navItems = [
  { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
  { href: "/profile", icon: User, label: "Profile" },
  { href: "/courses", icon: BookOpen, label: "All courses" },
  { href: "/wishlist", icon: Heart, label: "Wishlist" },
  { href: "/certificates", icon: Medal, label: "Certificates" },
  { href: "/learning", icon: GraduationCap, label: "Learning" },
];

const skillProgress = [
  { skill: "JavaScript", progress: 75 },
  { skill: "React", progress: 60 },
  { skill: "Node.js", progress: 45 },
  { skill: "CSS", progress: 80 },
];

export default function StudentDashboard() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [isOpen, setIsOpen] = useState(false);
  const [purchasedCourses,setPurchasedCourses] = useState([])
  const [courseMetadata , setCourseMatadata] = useState([])
  const toggleMenu = () => setIsOpen(!isOpen);


  const get_purchased_courses = async () => {
    try {
      const response = await axios_instance.get(
        `api/get_purchased_courses/${student_id}`
      );
      const { message, success, purchased_courses , Courses_duration} = response?.data;
      if(success){
        setPurchasedCourses(purchased_courses?.courses)
        setCourseMatadata(Courses_duration)
        console.log(response?.data);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  useEffect(()=>{
    get_purchased_courses()
  },[])

  return (
    <div className="min-h-screen w-full xl:w-10/12 bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      <main className="flex-1  md:pt-0 pt-1 overflow-auto bg-gradient-to-br to-primary/10 from-purple-50 via-blue-50">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sticky top-0 z-10 bg-transparent border-b"
        >
          <div className="mx-auto px-6 py-4 flex items-center justify-between ">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="xl:hidden"
                onClick={toggleMenu}
              >
                <Library className="h-6 w-6" />
              </Button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Link
                          href="/"
                          className="flex items-center gap-2 font-bold text-2xl"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary" />
                          CourseCloud
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMenu}
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
                      <ScrollArea className="flex-1 px-3 py-4">
                        <div className="space-y-1">
                          {navItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                              onClick={toggleMenu}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={toggleMenu}
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      </ScrollArea>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                  onClick={toggleMenu}
                />
              )}
              <h1 className="text-2xl font-bold">Dashboard</h1>
            </div>
          </div>
        </motion.header>

        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 py-4"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                Dashboard
              </span>
            </li>
          </ol>
        </motion.nav>

        {/* Body */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="px-6 mb-8"
        >
          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-8"
          >
            <Card className="bg-gradient-to-br from-purple-500 to-indigo-600 text-white transform transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Total Courses
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">24</div>
                <p className="text-purple-100">4 in progress</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-green-500 to-emerald-600 text-white transform transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Clock className="mr-2 h-5 w-5" />
                  Hours Learned
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">187</div>
                <p className="text-green-100">+3 this week</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-yellow-500 to-orange-600 text-white transform transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Award className="mr-2 h-5 w-5" />
                  Certificates
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">7</div>
                <p className="text-yellow-100">2 pending</p>
              </CardContent>
            </Card>
            <Card className="bg-gradient-to-br from-pink-500 to-rose-600 text-white transform transition-all duration-300 hover:scale-105">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg font-medium flex items-center">
                  <Flame className="mr-2 h-5 w-5" />
                  Current Streak
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">14 days</div>
                <p className="text-pink-100">Personal best!</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Performance Overview Section */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white">
                <CardTitle className="flex items-center">
                  <PieChart className="mr-2 h-5 w-5" />
                  Overall Course Performance
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={overallPerformanceData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {overallPerformanceData.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={COLORS[index % COLORS.length]}
                        />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="mt-4 flex justify-center space-x-4">
                  {overallPerformanceData.map((entry, index) => (
                    <div key={entry.name} className="flex items-center">
                      <div
                        className="w-4 h-4 mr-2 rounded-sm"
                        style={{
                          backgroundColor: COLORS[index % COLORS.length],
                        }}
                        aria-hidden="true"
                      ></div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {entry.name}
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
              <CardHeader className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
                <CardTitle className="flex items-center">
                  <TrendingUp className="mr-2 h-5 w-5" />
                  Monthly Performance & Streak
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-6">
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyPerformanceData}>
                    <defs>
                      <linearGradient
                        id="colorPerformance"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#8884d8"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#8884d8"
                          stopOpacity={0}
                        />
                      </linearGradient>
                      <linearGradient
                        id="colorStreak"
                        x1="0"
                        y1="0"
                        x2="0"
                        y2="1"
                      >
                        <stop
                          offset="5%"
                          stopColor="#82ca9d"
                          stopOpacity={0.8}
                        />
                        <stop
                          offset="95%"
                          stopColor="#82ca9d"
                          stopOpacity={0}
                        />
                      </linearGradient>
                    </defs>
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Area
                      type="monotone"
                      dataKey="performance"
                      stroke="#8884d8"
                      fillOpacity={1}
                      fill="url(#colorPerformance)"
                      yAxisId="left"
                    />
                    <Area
                      type="monotone"
                      dataKey="streak"
                      stroke="#82ca9d"
                      fillOpacity={1}
                      fill="url(#colorStreak)"
                      yAxisId="right"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Learning Streak Section */}
          <Card className="mb-8 overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <CardTitle className="flex items-center">
                <Zap className="mr-2 h-5 w-5" />
                Learning Streak
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="text-center p-4 bg-indigo-50 dark:bg-indigo-900 rounded-lg">
                  <p className="text-3xl font-bold text-indigo-600 dark:text-indigo-400">
                    14 Days
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Current Streak
                  </p>
                </div>
                <div className="text-center p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    {Math.max(...learningStreak.map((day) => day.count))} Days
                  </p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Longest Streak
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-6 lg:grid-cols-10 xl:grid-cols-12 gap-2">
                {learningStreak.map((day, index) => (
                  <TooltipProvider key={index}>
                    <TooltipUI>
                      <TooltipTrigger asChild>
                        <div className="flex flex-col items-center">
                          <div
                            className={`w-6 aspect-square rounded-sm ${
                              day.count > 0
                                ? "bg-gradient-to-t from-emerald-500 to-emerald-300"
                                : "bg-gray-200 dark:bg-gray-700"
                            }`}
                            style={{ opacity: day.count * 0.25 + 0.25 }}
                          ></div>
                          <p className="text-xs text-center mt-1">
                            {day.date.split("-")[2]}
                          </p>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          {day.date}: {day.count} hours of learning
                        </p>
                      </TooltipContent>
                    </TooltipUI>
                  </TooltipProvider>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recently Purchased Courses */}
          <PurshacedCourseContainer
            courses={purchasedCourses}
            course_metadata={courseMetadata}
            title={"Recently Purchased Courses"}
          />

          {/* Performance Stats */}
          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-pink-500 to-red-500 text-white">
              <CardTitle className="flex items-center">
                <BarChart className="mr-2 h-5 w-5" />
                Performance Stats
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
                <div className="flex items-center mt-6 justify-center">
                  <ResponsiveContainer width="100%" height={200}>
                    <LineChart data={monthlyPerformanceData}>
                      <Line
                        type="monotone"
                        dataKey="performance"
                        stroke="#8884d8"
                        strokeWidth={2}
                      />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Enrollments
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      12
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Completed Courses
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      8
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Lessons Completed
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      156
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Performance Rate
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      85%
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <span className="text-gray-600 dark:text-gray-400">
                      Highest Streak
                    </span>
                    <span className="font-semibold text-gray-800 dark:text-white">
                      14 days
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Achievements */}
          <Card className="overflow-hidden transition-shadow duration-300 hover:shadow-lg">
            <CardHeader className="bg-gradient-to-r from-indigo-500 to-blue-600 text-white">
              <CardTitle className="flex items-center">
                <Award className="mr-2 h-5 w-5" />
                Recent Achievements
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="flex items-center space-x-4 bg-yellow-50 dark:bg-yellow-900 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="bg-yellow-400 p-2 rounded-full">
                    <Star className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      5-Day Streak
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Consistent learner
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-green-50 dark:bg-green-900 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="bg-green-500 p-2 rounded-full">
                    <BookOpenCheck className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Course Completed
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      JavaScript Basics
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-4 bg-purple-50 dark:bg-purple-900 p-4 rounded-lg transition-all duration-300 hover:shadow-md">
                  <div className="bg-purple-500 p-2 rounded-full">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800 dark:text-white">
                      Top 10%
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      In React course
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </main>
    </div>
  );
}
