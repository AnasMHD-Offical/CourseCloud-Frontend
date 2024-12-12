import { useEffect, useState } from "react";
import { Link, Outlet, useLocation, useParams } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
import { axios_instance } from "@/Config/axios_instance";
import { useDispatch, useSelector } from "react-redux";
import { set_course_plan } from "@/Redux/Slices/CoursePlan";
import { set_Course_Curriculum } from "@/Redux/Slices/CourseCuriculum";
import { set_Course_Preview } from "@/Redux/Slices/CoursePreview";

export default function Instructor_Edit_Course() {
  const [isLoading, setisLoading] = useState(true);
  const location = useLocation();
  const id = location.state;
  const dispatch = useDispatch();
  console.log(id);

  const get_course = async () => {
    try {
      const response = await axios_instance.get(
        `api/instructor/get_course/${id}`
      );
      const { success, courses } = response?.data;
      if (success) {
        console.log(response?.data);

        dispatch(
          set_course_plan({
            data: {
              learningObjectives: courses.objectives,
              targetAudiences: courses.target_students,
              requirements: courses.requirements,
            },
          })
        );
        dispatch(
          set_Course_Curriculum({
            data: courses.lessons,
          })
        );
        dispatch(
          set_Course_Preview({
            data: {
              title: courses.title,
              subtitle: courses.subtitle,
              description: courses.description,
              language: courses.language,
              difficulty: courses.difficulty,
              category: courses.category,
              subcategory: courses.subcategory,
              subject: courses.subject,
              thumbnail: courses.thumbnail,
              price: courses.actual_price,
            },
          })
        );
      }
      setisLoading(false)
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_course();
  }, []);
  return (
    <>
      <div className="max-w-5xl mx-auto sm:mx-2">
        <div className="items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/instuctor">Instructor</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Edit Course</BreadcrumbPage>
              </BreadcrumbItem>
              {/* ... */}
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className="text-3xl font-bold mt-2 mb-2">Edit a course</h2>
          <p className="text-gray-600 mb-6">
            Follow the instructions that we provided
          </p>
          {!isLoading && <Outlet />}
        </div>
      </div>
    </>
  );
}
