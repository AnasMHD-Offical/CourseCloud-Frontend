import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
// import { Switch } from "@/components/ui/switch";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Separator } from "@/components/ui/separator";
import { Star } from "lucide-react";
import {
  motion,
  AnimatePresence,
  useAnimation,
  useInView,
} from "framer-motion";
import { useRef } from "react";
import Footer from "@/Components/base/Footer";
import Header from "@/Components/base/Header";
import CourseContainer from "@/Components/base/CourseContainer";
import CourseCardxs from "@/Components/base/CourseCardxs";
import "../../Components/base/CustomStyle.css";
import { useParams } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import CourseContainerManual from "@/Components/base/CourseContainerManual";
import { toast } from "sonner";
import PaginationComp from "@/Components/base/Pagination";
import { useSelector } from "react-redux";

export default function CategoryPage() {
  const [viewMode, setViewMode] = useState();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 10000]);
  const [selectedRating, setSelectedRating] = useState("all");
  const [selectedLevel, setSelectedLevel] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("popularity");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourse] = useState();
  const [courseLimit, setCourseLimit] = useState(6);
  const [isLoading, setIsLoading] = useState(true);
  const [CoursesByCategory, setCoursesByCategory] = useState([]);
  const [CoursesBySubCategory, setCoursesBySubCategory] = useState([]);
  const [categoryName, setCategoryName] = useState("");
  const [categories, setCategories] = useState([
    { _id: "All", title: "All category" },
  ]);
  const [subcategories, setSubcategories] = useState([]);
  const [courses, setCourses] = useState([]);

  const courseGridRef = useRef(null);
  const isInView = useInView(courseGridRef, { once: true, amount: 0.2 });
  const controls = useAnimation();
  const { id, subcategory } = useParams();

  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );

  const get_courses_by_category = async () => {
    try {
      const resposnse = await axios_instance.get(
        `/api/get_courses_by_category/${id}/${subcategory}`
      );
      const { success, message, BySubcategory, ByCategory } = resposnse?.data;
      if (success) {
        setCoursesByCategory(ByCategory);
        setCategoryName(ByCategory[0].category.title);
        setCoursesBySubCategory(BySubcategory);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_category = async () => {
    try {
      const response = await axios_instance.get("api/get_category");
      console.log(response);
      setCategories(response?.data?.categories);
    } catch (error) {
      //   const { message } = error?.response?.data;
      console.log(error);
    }
  };

  const get_course_by_search_sort_filter = async () => {
    try {
      const response = await axios_instance.get(
        "api/get_course_by_search_sort_filter",
        {
          params: {
            search: searchQuery,
            category: selectedCategory,
            subcategory: selectedSubcategory,
            rating: selectedRating,
            difficulty: selectedLevel,
            sort: sortBy,
            starting_price: priceRange[0],
            Ending_price: priceRange[1],
            page: currentPage,
            limit: courseLimit,
            student_id: student_id,
          },
        }
      );

      const { success, message, courses, totalPage } = response?.data;
      if (success) {
        setCourses(courses);
        setTotalCourse(totalPage);
        console.log(courses);
        setIsLoading(false);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  // const get_course_length = async () => {
  //   try {
  //     const response = await axios_instance.get("api/get_course_length");
  //     const { totalCourses, success } = response?.data;
  //     if (success) {
  //       setTotalCourse(totalCourses);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error(error?.response?.data?.message);
  //   }
  // };

  console.log(priceRange);

  useEffect(() => {
    get_course_by_search_sort_filter();
  }, [
    searchQuery,
    currentPage,
    priceRange,
    sortBy,
    selectedLevel,
    selectedRating,
    selectedSubcategory,
    selectedCategory,
  ]);

  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);

  useEffect(() => {
    get_courses_by_category();
    get_category();
  }, []);

  const handleCategoryChange = (value) => {
    setSelectedCategory(value);
    const sub = categories
      .map((category) => category.sub_category)
      .flat()
      .filter((sub) => (sub.status !== false, sub.category_id === value));
    setSubcategories(sub);

    // setSubcategories(refinedSubcategories);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const clearFilters = () => {
    setSelectedCategory("all");
    setSelectedSubcategory("all");
    setPriceRange([0, 10000]);
    setSelectedRating("all");
    setSelectedLevel("all");
    setSearchQuery("");
  };

  const SkeletonCard = () => (
    <div className="bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden animate-pulse">
      <div className="h-48 bg-gray-300 dark:bg-gray-600"></div>
      <div className="p-4 space-y-4">
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
        <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-full"></div>
        <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen bg-gray-50 text-gray-900`}>
      {/*Header  */}
      <Header />

      {/* Hero Banner */}
      <section
        className={`py-20 min-h-96 bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50`}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center text-white">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-4xl bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600  md:text-5xl font-bold mb-6 leading-tight"
            >
              Unlock Your Potential with CourseCloud
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-xl mb-8 opacity-90 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
            >
              Discover thousands of courses taught by expert instructors across
              various fields.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Button
                size="lg"
                className="bg-black text-white  hover:bg-neutral-900"
              >
                Explore Courses
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="mx-auto xl:px-4 pb-12 pt-8 bg-gradient-to-br from-primary/10 via-purple-100 to-blue-50">
        <h2 className="text-3xl md:text-4xl ms-10 md:ms-16 mb-6 font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
          Filter Courses
        </h2>
        <div className="px-10 flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="w-full lg:w-64 space-y-6"
          >
            <Card className={`p-6 shadow-lg rounded-xl sticky top-24`}>
              <CardHeader className="px-0 pt-0">
                <CardTitle className="flex justify-between items-center">
                  Filters
                  <Button variant="ghost" size="sm" onClick={clearFilters}>
                    Clear All
                  </Button>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-0 space-y-6">
                <div>
                  <Label className="text-lg mb-2">Category</Label>
                  <Select
                    value={selectedCategory}
                    onValueChange={(value) => handleCategoryChange(value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="All category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem
                          key={category._id}
                          value={
                            category.title === "All Category"
                              ? "all"
                              : category._id
                          }
                        >
                          {category.title}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedCategory !== "all" && (
                  <div>
                    <Label className="text-lg mb-2">Subcategory</Label>
                    <Select
                      value={selectedSubcategory}
                      onValueChange={(value) => setSelectedSubcategory(value)}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="Select a subcategory" />
                      </SelectTrigger>
                      <SelectContent>
                        {subcategories.map((subcategory) => (
                          <SelectItem
                            key={subcategory.id}
                            value={subcategory.title}
                          >
                            {subcategory.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                <div>
                  <Label className="text-lg mb-2">Price Range</Label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={10000}
                    step={100}
                    className="mt-2"
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>₹{priceRange[0]}</span>
                    <span>₹{priceRange[1]}</span>
                  </div>
                </div>

                <div>
                  <Label className="text-lg mb-2">Rating</Label>
                  <RadioGroup
                    value={selectedRating}
                    onValueChange={setSelectedRating}
                    className="mt-2 space-y-2"
                  >
                    {["all", "5", "4", "3"].map((rating) => (
                      <div key={rating} className="flex items-center space-x-2">
                        <RadioGroupItem
                          value={rating}
                          id={`rating-${rating}`}
                        />
                        <Label
                          htmlFor={`rating-${rating}`}
                          className="flex items-center cursor-pointer"
                        >
                          {rating === "all" ? (
                            <span>All Ratings</span>
                          ) : (
                            <>
                              <span className="ml-2 mr-1">{rating}</span>
                              {Array(parseInt(rating))
                                .fill(null)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className="w-4 h-4 fill-yellow-400 text-yellow-400"
                                  />
                                ))}
                            </>
                          )}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                </div>

                <div>
                  <Label className="text-lg mb-2">Level</Label>
                  <RadioGroup
                    value={selectedLevel}
                    onValueChange={setSelectedLevel}
                    className="mt-2 space-y-2"
                  >
                    {["all", "beginner", "intermediate", "advanced"].map(
                      (level) => (
                        <div
                          key={level}
                          className="flex items-center space-x-2"
                        >
                          <RadioGroupItem value={level} id={`level-${level}`} />
                          <Label
                            htmlFor={`level-${level}`}
                            className="cursor-pointer capitalize"
                          >
                            {level === "all" ? "All Levels" : level}
                          </Label>
                        </div>
                      )
                    )}
                  </RadioGroup>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Course Grid */}
          <div className="flex-1">
            <div className="flex w-full justify-between flex-col  sm:flex-row items-center mb-6">
              <h2 className="text-3xl font-bold mb-2 sm:mb-0">
                Featured Courses
              </h2>
              <div className="flex items-center space-x-4 w-full sm:w-48">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full bg-white text-black shadow sm:w-[180px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Courses</SelectItem>
                    <SelectItem value="popularity">Most Popular</SelectItem>
                    <SelectItem value="newest">Newest</SelectItem>
                    <SelectItem value="oldest">Oldest</SelectItem>
                    <SelectItem value="PriceAsc">
                      Price : Low to High
                    </SelectItem>
                    <SelectItem value="PriceDes">
                      Price : High to Low
                    </SelectItem>
                    <SelectItem value="AlphaAsc">Course : A-Z</SelectItem>
                    <SelectItem value="AlphaDes">Course : Z-A</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <motion.div
              ref={courseGridRef}
              initial="hidden"
              animate={controls}
              variants={{
                visible: {
                  transition: {
                    staggerChildren: 0.1,
                  },
                },
              }}
              className={
                "grid overflow-clip grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6"
              }
            >
              <AnimatePresence>
                {isLoading
                  ? Array(6)
                      .fill(null)
                      .map((_, index) => (
                        <motion.div
                          key={`skeleton-${index}`}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                        >
                          <SkeletonCard />
                        </motion.div>
                      ))
                  : courses.map((course) => (
                      <motion.div
                        key={course?._doc?._id || course._id}
                        initial={{ opacity: 0, y: 20, scale: 0.9 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ delay: 0.3 }}
                      >
                        <CourseCardxs
                          course={course?._doc || course}
                          isPurchased={course?.is_purchased || null}
                        />
                      </motion.div>
                    ))}
                {courses.length === 0 && (
                  <div className="w-full bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-800">
                    <h3 className="text-4xl  font-bold">
                      Oops! No Course Found
                    </h3>
                    <p>
                      Filter and sort another courses and Improve your skills{" "}
                    </p>
                  </div>
                )}
              </AnimatePresence>
            </motion.div>
            {courses.length > 0 && (
              <PaginationComp
                page={currentPage}
                setPage={handlePageChange}
                total={totalCourses}
                limit={courseLimit}
              />
            )}
          </div>
        </div>
      </main>

      {/* Ccourse From the selected subcategory */}
      <CourseContainerManual
        title={`Courses From ${subcategory}`}
        CourseData={CoursesBySubCategory}
      />

      {/* Courses From the selected category */}
      <CourseContainerManual
        title={
          categoryName
            ? `Courses Related to ${categoryName}`
            : "Courses Related to your Category"
        }
        CourseData={CoursesByCategory}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}
