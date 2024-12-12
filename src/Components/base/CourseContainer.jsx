import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { axios_instance } from "@/Config/axios_instance";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

function CourseContainer({ update, title, value, mutation, wishlistMutation }) {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const CourseContainerRef = useRef();
  const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const handleCourseScroll = (scrollOffset) => {
    CourseContainerRef.current.scrollLeft += scrollOffset;
  };
  const [ismutated, setIsMutated] = useState(false);
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
        console.log("Courses : ", resposne?.data?.courses);
      }
    } catch (error) {
      console.log(error);
    }
  };
  // console.log(CourseData);

  useEffect(() => {
    get_Courses();
  }, [ismutated, update]);

  return (
    <>
      <section className="py-16 md:py-24 px-2 sm:px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              {title}
            </h2>
            <Button
              onClick={() => handleCourseScroll(320)}
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>
          </div>
          <div
            className="flex overflow-x-scroll scroll-smooth h-full pb-8 hide-scroll-bar gap-6"
            ref={CourseContainerRef}
          >
            {courses.map((course, i) => (
              <motion.div
                key={course?._doc?._id || course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-nowrap "
              >
                <CourseCard
                  update={update}
                  mutation={mutation}
                  wishlist_mutation={wishlistMutation}
                  value={value}
                  course={course?._doc || course}
                  isPurchased={course?.is_purchased || null}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseContainer;
