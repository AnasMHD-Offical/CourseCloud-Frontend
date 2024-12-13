import { useEffect, useRef, useState } from "react";
import PurshacedCourseCard from "./PurshacedCourseCard";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
function PurshacedCourseContainer({ courses, title, course_metadata }) {
  const CourseContainerRef = useRef();
  const handleCourseScroll = (scrollOffset) => {
    CourseContainerRef.current.scrollLeft += scrollOffset;
  };

  return (
    <>
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
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              whileHover={{ y: -5 }}
              className="flex flex-nowrap "
            >
              <PurshacedCourseCard
                course={course}
                course_metadata={course_metadata[i]}
              />
            </motion.div>
          ))}
          {courses.length === 0 && (
            <div className="p-2">
              <h1 className="text-3xl  font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                Oops!No Courses purchased
              </h1>
              <p>
                Unlock endless opportunities and transform your life. Explore
                our wide range of courses today!
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default PurshacedCourseContainer;
