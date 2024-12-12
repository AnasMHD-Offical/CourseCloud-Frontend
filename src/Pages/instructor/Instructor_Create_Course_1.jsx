import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../../Components/ui/breadcrumb";
// import { Field, Formik, Form } from "formik";

export default function Instructor_Create_Course_1() {


  return (
    <>
      <div className="max-w-5xl mx-auto sm:mx-2">
        <div className="items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/instuctor/">Instructor</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Course</BreadcrumbPage>
              </BreadcrumbItem>
              {/* ... */}
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className="text-3xl font-bold mt-2 mb-2">Create a course</h2>
          <p className="text-gray-600 mb-6">
            Follow the instructions that we provided
          </p>
          <Outlet />
        </div>
      </div>
    </>
  );
}
