import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  Menu,
  Search,
  ShoppingCart,
  X,
  LogOut,
  LayoutDashboard,
  Award,
  User,
  GraduationCap,
  User2,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { useDispatch, useSelector } from "react-redux";
import { student_logout } from "@/Redux/Slices/StudentSlice";
import { axios_instance } from "@/Config/axios_instance";
import "./CustomStyle.css";
import { ScrollArea } from "../ui/scroll-area";
const studentDropdownContent = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Profile", icon: User, href: "/dashboard/profile" },
  { title: "My Courses", icon: GraduationCap, href: "/dashboard/courses" },
  { title: "Wishlist", icon: Heart, href: "/dashboard/wishlist" },
  { title: "Certificates", icon: Award, href: "/dashboard/certificates" },
];

function Header({ isScrolled, page }) {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isStudentDropdownOpen, setIsStudentDropdownOpen] = useState(false);
  const [isSearchFilterOpen, setIsSearchFilterOpen] = useState(false);
  const [Courses, setCourses] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [FilteredCourse, setFilteredCourse] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const hadleSettingsNavigate = () => {
  //   setIsStudentDropdownOpen(open);
  // };
  const get_Courses = async () => {
    try {
      const resposne = await axios_instance.get("/api/get_courses", {
        params: {
          student_id: student_id ? student_id : null,
        },
      });
      const { success, message } = resposne?.data;
      if (success) {
        setCourses(resposne?.data?.courses);
        console.log(resposne);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_Courses();
  }, []);

  const get_course_by_search = async () => {
    try {
      const response = await axios_instance.get(
        "api/get_course_by_search_sort_filter",
        {
          params: {
            search: searchItem,
            student_id: student_id,
          },
        }
      );

      const { success, courses } = response?.data;
      if (success) {
        setFilteredCourse(courses);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleResultCourseView = (id) => {
    navigate(`/overview/${id}`);
    setIsSearchFilterOpen(false);
    setSearchItem("");
  };
  const handleResultPurchasedCourseView = (id) => {
    navigate(`/enrolled_course_view/${id}`);
    setIsSearchFilterOpen(false);
    setSearchItem("");
  };

  useEffect(() => {
    get_course_by_search();
  }, [searchItem]);

  const handleLogout = async () => {
    try {
      const response = await axios_instance.post("/api/student_logout");
      const { success, message } = response?.data;
      if (success) {
        localStorage.removeItem("student_data");
        dispatch(student_logout());
        toast.success(message);
        console.log(response);
        navigate("/");
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };
  const handleInputChange = (e) => {
    const searchTerm = e.target.value;
    setSearchItem(searchTerm);
    if (searchTerm !== "") {
      setIsSearchFilterOpen(true);
    } else {
      setIsSearchFilterOpen(false);
    }
  };

  return (
    <>
      <motion.header
        className={`sticky top-0 z-50 bg-white/80 backdrop-blur-md transition-all duration-300 ${
          isScrolled ? "shadow-md py-2" : "py-4"
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 100 }}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          {/* Brand Name  */}
          <Link to="/" className="text-2xl font-bold text-primary">
            CourseCloud
          </Link>
          {/* Navigation Content and search */}
          <div className="hidden w-full lg:flex justify-center items-center space-x-6">
            <div className="relative group">
              <Input
                onChange={handleInputChange}
                value={searchItem}
                className="pl-10 pr-4 py-2 w-more rounded-full border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
                placeholder="Search for anything you want to learn over or under the clouds"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 w-4 h-4" />
            </div>
            {isSearchFilterOpen && (
              <motion.div className="absolute lg:left-52 left-more top-14 w-more h-2 ">
                <ScrollArea>
                  <ul className="bg-white rounded-lg py-4 px-4  space-y-4">
                    {FilteredCourse.length > 0 ? (
                      FilteredCourse.map((course) => {
                        return (
                          <li
                            className="hover:bg-gray-100 py-2 ps-2 rounded-md cursor-pointer"
                            key={course?._doc?._id || course?._id}
                            onClick={
                              course?.is_purchased
                                ? () =>
                                    handleResultPurchasedCourseView(
                                      course?._doc?._id || course?._id
                                    )
                                : () =>
                                    handleResultCourseView(
                                      course?._doc?._id || course?._id
                                    )
                            }
                          >
                            {course?._doc?.title || course.title}
                          </li>
                        );
                      })
                    ) : (
                      <li key={0}> No results found </li>
                    )}
                  </ul>
                </ScrollArea>
              </motion.div>
            )}
          </div>
          <div className="flex items-center space-x-4">
            {/* Login / Signup button */}
            {page === "landing" && (
              <Button
                onClick={() => navigate("/login")}
                variant="ghost"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Login / Sign up
              </Button>
            )}
            {/* Add to card button with badge */}
            {page !== "landing" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate(`/cart`)}
                className="hover:bg-primary/10 transition-colors relative"
              >
                <ShoppingCart className="w-5 h-5" />
              </Button>
            )}
            {page !== "landing" && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate("/dashboard/wishlist")}
                className="hover:bg-primary/10 transition-colors relative"
              >
                <Heart className="w-8 h-8" />
              </Button>
            )}
            {page !== "landing" && (
              // <Avatar>
              //   <AvatarImage
              //     width={40}
              //     height={40}
              //     className="rounded-full"
              //     // onClick={hadleSettingsNavigate}
              //     onMouseEnter={() => setIsStudentDropdownOpen(true)}
              //     onMouseLeave={() => setIsStudentDropdownOpen(false)}
              //     // onClick={handleStudentDropdown}
              //     src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730571309/openart-image_z-cDRKP9_1730556373858_raw_rpgts8.jpg"
              //     alt="profile-navigator"
              //   />
              //   <AvatarFallback>CN</AvatarFallback>
              // </Avatar>
              <User2 className="w-8 h-8"/>
            )}
            {/* Hamburger for mobile device naviagtion*/}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </Button>
          </div>
        </div>
        {/* mobile view navigation content */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ ease: [0.17, 0.67, 0.83, 0.67] }}
              className="xl:hidden rounded-b-lg mt-2 p-4"
            >
              <div className="relative mt-2">
                <Input
                  onChange={handleInputChange}
                  className="pl-10 pr-4 py-2 w-full rounded-full"
                  placeholder="Search for anything"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              <motion.div className="absolute w-72 top-24 w-more h-2">
                <ul className="bg-white rounded-lg py-4 px-4  space-y-4">
                  {FilteredCourse.length > 0 ? (
                    FilteredCourse.map((course) => {
                      return (
                        <li
                          className="hover:bg-gray-100 py-2 ps-2 rounded-md"
                          key={course._id}
                        >
                          {course.title}
                        </li>
                      );
                    })
                  ) : (
                    <li key={0}> No results found </li>
                  )}
                </ul>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
        {isStudentDropdownOpen && (
          <motion.div
            className="absolute right-2  shadow"
            onMouseEnter={() => setIsStudentDropdownOpen(true)}
            onMouseLeave={() => setIsStudentDropdownOpen(false)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: "spring", stiffness: 100 }}
          >
            <ul className="bg-white rounded-lg py-6 px-4 w-56 space-y-3">
              {studentDropdownContent.map((settings, index) => (
                <li
                  key={index}
                  className="hover:bg-gray-100 rounded-md px-4 py-2"
                >
                  <Link
                    to={settings.href}
                    className="flex gap-2 items-center  bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                  >
                    <settings.icon className="w-4 h-4 text-primary" />{" "}
                    {settings.title}
                  </Link>
                </li>
              ))}
              <li className="hover:bg-gray-100 rounded-md px-4 py-2">
                <button
                  onClick={handleLogout}
                  className="flex w-full items-center gap-2 m bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600"
                >
                  {" "}
                  <LogOut className="w-4 h-4 text-primary" /> Logout
                </button>
              </li>
            </ul>
          </motion.div>
        )}
      </motion.header>
    </>
  );
}

export default Header;
