"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Star } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { axios_instance } from "@/Config/axios_instance";
import PaginationComp from "@/Components/base/Pagination";
import CourseCardLandscape from "@/Components/base/CourseCardLandscape";

// const courses = [
//   {
//     id: 1,
//     title: "Complete Full stack development course 2024",
//     instructor: "Andrew Kim",
//     rating: 4.7,
//     students: 21,
//     duration: "240+ hours",
//     price: 8599,
//     image:
//       "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
//   },
//   {
//     id: 1,
//     title: "Complete Full stack development course 2024",
//     instructor: "Andrew Kim",
//     rating: 4.7,
//     students: 21,
//     duration: "240+ hours",
//     price: 8599,
//     image:
//       "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
//   },
//   {
//     id: 1,
//     title: "Complete Full stack development course 2024",
//     instructor: "Andrew Kim",
//     rating: 4.7,
//     students: 21,
//     duration: "240+ hours",
//     price: 8599,
//     image:
//       "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730953909/kpsd38m8mtl6nxtmujlr.jpg",
//   },
// ];

export default function Admin_Course_Management() {
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourse] = useState();
  const [courseLimit, setCourseLimit] = useState(6);
  const [sortBy, setSortBy] = useState("popularity");
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updated, setUpdated] = useState(false);

  const get_all_courses = async () => {
    try {
      const response = await axios_instance.get("api/admin/get_all_courses", {
        params: {
          page: currentPage,
          limit: courseLimit,
          sort: sortBy,
          filter: filterBy,
          search: searchQuery,
        },
      });
      const { success, message, courses, totalPage } = response?.data;
      if (success) {
        setCourses(courses);
        setTotalCourse(totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleUpdate = async (val) => {
    setUpdated(val)
  };


  const handlePageChange = (page) => {
    setCurrentPage(page);
  };


  useEffect(() => {
    get_all_courses();
  }, [currentPage, searchQuery, sortBy, filterBy , updated]);

  return (
    <div className="p-2 pt-1 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/admin" className="text-gray-500">
              Home
            </Link>
            <ChevronRight className="h-4 w-4 mx-2" />
          </li>
          <li className="flex items-center text-gray-700">Course Management</li>
        </ol>
      </nav>

      <h1 className="text-3xl font-bold mb-6">Course Management</h1>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 space-y-4 md:space-y-0">
        <div className="relative group">
          <Input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 pr-4 py-2 w-full rounded-full bg-slate-50 border-gray-300 focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50 transition-all duration-300"
            placeholder="Search for courses"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-primary transition-colors duration-300 w-4 h-4" />
        </div>
        <div className="flex space-x-4 w-full md:w-auto">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
              <SelectValue placeholder="Sort By" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="popularity">Most Popular</SelectItem>
              <SelectItem value="newest">Newest</SelectItem>
              <SelectItem value="oldest">Oldest</SelectItem>
              <SelectItem value="PriceAsc">Price : Low to High</SelectItem>
              <SelectItem value="PriceDes">Price : High to Low</SelectItem>
              <SelectItem value="AlphaAsc">Course : A-Z</SelectItem>
              <SelectItem value="AlphaDes">Course : Z-A</SelectItem>
            </SelectContent>
          </Select>
          <Select value={filterBy} onValueChange={setFilterBy}>
            <SelectTrigger className="w-full md:w-[180px] border rounded-full shadow-md bg-slate-50">
              <SelectValue placeholder="Filter" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="blocked">Blocked</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Course List */}
      {/* <div className="space-y-4 mb-10">
        {courses.map((course) => (
          <div
            key={course._id}
            className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-4"
          >
            <img
              src={course.thumbnail}
              alt={course.title}
              className="w-full h-60 md:w-36 md:h-24 object-cover rounded-lg"
            />
            <div className="flex-1">
              <h3 className="text-lg font-semibold">{course.title}</h3>
              <p className="text-sm text-gray-500">
                By {course.instructor_id?.name}
              </p>
              <div className="flex items-center mt-2">
                <Star className="h-4 w-4 text-yellow-400 fill-current" />
                <span className="ml-1 text-sm">{course.rating || 4.5}</span>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-gray-500">
                  {course.enrolled_count} students •{" "}
                  {course?.difficulty.charAt(0).toUpperCase() +
                    course?.difficulty.slice(1)}{" "}
                  • 2024 Bestselling
                </span>
              </div>
            </div>
            <div className="flex flex-col items-end space-y-2">
              <span className="font-bold">
                Rs.{course.actual_price?.$numberDecimal}
              </span>
              <div className="flex space-x-2">
                <Button
                  onClick={course.is_blocked ? handleUnblock : handleBlock}
                  size="sm"
                >
                  {course.is_blocked ? "Unblock" : "Block"}
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div> */}

      <CourseCardLandscape courses={courses} isUpdated={handleUpdate} updateVal={updated} />

      {courses.length > 0 && (
        <PaginationComp
          page={currentPage}
          setPage={handlePageChange}
          total={totalCourses}
          limit={courseLimit}
        />
      )}
      {/* Pagination
      <div className="flex justify-center mt-8">
        <nav className="inline-flex rounded-md shadow">
          <Button variant="outline" size="icon">
            1
          </Button>
          <Button variant="outline" size="icon">
            2
          </Button>
          <Button variant="outline" size="icon">
            3
          </Button>
          <Button variant="outline" size="icon">
            4
          </Button>
          <Button variant="outline" size="icon">
            5
          </Button>
        </nav>
      </div> */}
    </div>
  );
}
