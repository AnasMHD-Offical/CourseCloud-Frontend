import { Progress } from "../ui/progress";
import { Clock, Star } from "lucide-react";
import React from "react";
import { Card, CardContent } from "../ui/card";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";
function PurshacedCourseCard({ course, course_metadata }) {
  const navigate = useNavigate();
  return (
    <>
      <Card
        key={course.course_id._id}
        className="overflow-hidden w-72 transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
      >
        <img
          src={course.course_id.thumbnail}
          alt={course.course_id.title}
          className="w-full h-40 object-cover"
          onClick={() =>
            navigate(`/enrolled_course_view/${course.course_id._id}`)
          }
        />
        <CardContent className="p-4 flex-1">
          <h3 className="font-bold text-base mb-2 text-gray-800 dark:text-white">
            {course.course_id.title}
          </h3>
          <div>
            <div className="flex justify-between items-center mb-2">
              {/* <p className="text-gray-600 dark:text-gray-400">Rs.{course.price}</p> */}
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1 text-gray-600 dark:text-gray-400">
                  {course.course_id.rating ? course.course_id.rating.toFixed(1) : 4.5 }
                </span>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <Badge
                variant="secondary"
                className="bg-indigo-100 text-indigo-800 dark:bg-indigo-900 dark:text-indigo-200"
              >
                {course.course_id.difficulty
                  ? course.course_id.difficulty.charAt(0).toUpperCase() +
                    course.course_id.difficulty.slice(1)
                  : "Beginner"}
              </Badge>
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <Clock className="h-4 w-4 mr-1" />
                {course_metadata?.duration.toFixed(2) || 30} hr
              </div>
            </div>
            <Progress
              value={course.progress || 30}
              className="h-3 mb-2 bg-slate-50 border"
            />
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {course.progress || 40}% complete
            </p>
          </div>
        </CardContent>
      </Card>
    </>
  );
}

export default PurshacedCourseCard;
