import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import CourseCard from "./CourseCard";
import { axios_instance } from "@/Config/axios_instance";
import { useNavigate } from "react-router-dom";

function CourseContainerManual({ title , CourseData}) {
  const CourseContainerRef = useRef();
  // const [courses, setCourses] = useState([]);
  const navigate = useNavigate();
  const handleCourseScroll = (scrollOffset) => {
    CourseContainerRef.current.scrollLeft += scrollOffset;
  };
  return (
    <>
      <section className="py-8 md:py-16 px-2 sm:px-10">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
              {title}
            </h2>
            {CourseData.length !== 0 && <Button
              onClick={() => handleCourseScroll(320)}
              variant="outline"
              className="text-primary border-primary hover:bg-primary/10 transition-colors"
            >
              View all
              <ArrowRight className="w-4 h-4 mr-2" />
            </Button>}
          </div>
          <div
            className="flex overflow-x-scroll scroll-smooth h-full pb-8 hide-scroll-bar gap-6"
            ref={CourseContainerRef}
          >
            {CourseData.map((course, i) => (
              <motion.div
                key={course._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                whileHover={{ y: -5 }}
                className="flex flex-nowrap "
              >
                <CourseCard course={course} />
              </motion.div>
            ))}
            {CourseData.length === 0 && (<h2 className="text-3xl">No Courses found</h2>) }
          </div>
        </div>
      </section>
    </>
  );
}

export default CourseContainerManual;
