import { Star } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";

export default function CourseCardLandscapeReuse({ courses }) {
  const navigate = useNavigate();
  return (
    <div className="space-y-4 mb-10">
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
            <p className="text-sm text-gray-500">{course?.subtitle}</p>
            <div className="flex items-center mt-2">
              <Star className="h-4 w-4 text-yellow-400 fill-current" />
              <span className="ml-1 text-sm">
                {course.rating ? course?.rating.toFixed(1) : 4.5}
              </span>
              <span className="mx-2 text-gray-300">|</span>
              <span className="text-sm text-gray-500">
                {course?.enrolled_count} students •{" "}
                {course?.difficulty.charAt(0).toUpperCase() +
                  course?.difficulty.slice(1)}{" "}
                • 2024 Bestselling
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end space-y-2">
            <span className="font-bold">
              Rs.{course?.actual_price?.$numberDecimal}
            </span>
            <div className="flex space-x-2">
              <Button
                className="bg-gradient-to-r from-purple-900 to-purple-600 text-white hover:from-white hover:to-purple-200 hover:text-black"
                onClick={() =>
                  navigate(`/instructor/course_overview/${course?._id}`)
                }
              >
                Course progress
              </Button>
              <Button
                className="bg-gradient-to-r to-purple-900 from-purple-600 text-white hover:to-white hover:from-purple-200 hover:text-black"
                onClick={() =>
                  navigate(`/instructor/Students_progress/${course?._id}`)
                }
              >
                Student progress
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/*   confirmation dialog */}
      {/* <Dialog open={confirmation.isOpen} onOpenChange={closeConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {`${confirmation.is_blocked ? "Unblock" : "Block"} the Course`}
            </DialogTitle>
            <DialogDescription>
              {`Are you sure you want to ${
                confirmation.is_blocked ? "Unblock" : "Block"
              } this course from platform.`}
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeConfirmDialog}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={
                confirmation.is_blocked
                  ? () => handleUnblock(confirmation.course_id)
                  : () => handleBlock(confirmation.course_id)
              }
            >
              {`${confirmation.is_blocked ? "Unblock" : "Block"}`}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog> */}
    </div>
  );
}
