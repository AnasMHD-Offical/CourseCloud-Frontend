import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Breadcrumb from "./Components/Breadcrumb";
import { StudentsTable } from "./Components/StudentTable";
import PaginationComp from "@/Components/base/Pagination";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
export default function InstructorStudentsProgress() {
  const [enrolledStudents, setEnrolledStudents] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCourses, setTotalCourse] = useState();
  const [courseLimit, setCourseLimit] = useState(4);

  const { id } = useParams();
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const get_enrolled_students = async () => {
    try {
      const response = await axios_instance.get(
        "api/instructor/get_enrolled_students",
        {
          params: {
            page: currentPage,
            limit: courseLimit,
            course_id: id,
          },
        }
      );
      const { success, message, enrolled_students, totalPage } = response?.data;
      if (success) {
        console.log(response?.data);
        
        setEnrolledStudents(enrolled_students);
        setTotalCourse(totalPage);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(()=>{
    get_enrolled_students()
  },[])
  return (
    <>
      <div className="flex-1">
        <div className="p-4">
          <Breadcrumb
            homeRoute={"/instructor/course_management"}
            pageRoute={"Student Progress"}
          />
          <h1 className="mt-2 text-3xl font-bold">Students Progress</h1>
        </div>
        <div className="p-6">
          <div className="rounded-lg border">
            <StudentsTable enrolledStudents={enrolledStudents}/>
          </div>
        </div>
        {/* {courses.length > 0 && ( */}
        <PaginationComp
          page={currentPage}
          setPage={handlePageChange}
          total={totalCourses}
          limit={courseLimit}
        />
        {/* )} */}
      </div>
    </>
  );
}
