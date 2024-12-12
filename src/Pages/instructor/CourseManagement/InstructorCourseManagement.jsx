"use client";

import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, Search, Star } from "lucide-react";
import { Button } from "@/Components/ui/button.jsx";
import { Input } from "@/Components/ui/input.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { axios_instance } from "@/Config/axios_instance";
import PaginationComp from "@/Components/base/Pagination";
import CourseCardLandscapeReuse from "@/Components/base/CourseCardLandscapeReuse";
import { useSelector } from "react-redux";

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

export default function InstructorCourseManagement() {
  const [courses, setCourses] = useState([
    {
      _id: 1,
      title: "title",
      instructor_id: {
        name: "Fullname",
      },
      enrolled_count: 2,
      difficulty: "beginner",
    },
  ]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourse] = useState();
  const [courseLimit, setCourseLimit] = useState(4);
  const [sortBy, setSortBy] = useState("popularity");
  const [filterBy, setFilterBy] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [updated, setUpdated] = useState(false);

  const instructor_id = useSelector(
    (state) => state?.instructor?.instructor_data?.instructor?._id
  );
  const get_all_courses = async () => {
    try {
      const response = await axios_instance.get(
        "api/instructor/get_all_courses_by_instructor",
        {
          params: {
            page: currentPage,
            limit: courseLimit,
            sort: sortBy,
            filter: filterBy,
            search: searchQuery,
            instructor_id: instructor_id,
          },
        }
      );
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
    setUpdated(val);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  useEffect(() => {
    get_all_courses();
  }, [currentPage, searchQuery, sortBy, filterBy, updated]);

  return (
    <div className="p-2 pt-1 min-h-screen">
      {/* Breadcrumb */}
      <nav className="text-sm mb-4">
        <ol className="list-none p-0 inline-flex">
          <li className="flex items-center">
            <Link href="/instructor" className="text-gray-500">
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
              <SelectItem value="blocked">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <CourseCardLandscapeReuse
        courses={courses}
        isUpdated={handleUpdate}
        updateVal={updated}
      />

      {courses.length > 0 && (
        <PaginationComp
          page={currentPage}
          setPage={handlePageChange}
          total={totalCourses}
          limit={courseLimit}
        />
      )}
    </div>
  );
}
