import { Star } from "lucide-react";
import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogFooter,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import { AdminReviewManagement } from "@/Pages/admin/Admin_Review_Management";

export default function CourseCardLandscape({ courses, isUpdated, updateVal }) {
  const [confirmation, setConfirmation] = useState({
    isOpen: false,
    is_blocked: false,
    course_id: null,
  });
  const [isModalOpen, setisModalOpen] = useState(false);

  const handleReview = () => {
    setisModalOpen(true);
  };

  const closeConfirmDialog = () => {
    setConfirmation({
      isOpen: false,
      is_blocked: false,
      course_id: null,
    });
  };

  const handleBlock = async (id) => {
    try {
      const response = await axios_instance.put("api/admin/block_course", {
        _id: id,
      });
      const { success, message } = response?.data;
      if (success) {
        setConfirmation({
          isOpen: false,
          is_blocked: false,
          course_id: null,
        });
        isUpdated(!updateVal);
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleUnblock = async (id) => {
    try {
      const response = await axios_instance.put("api/admin/unblock_course", {
        _id: id,
      });
      const { success, message } = response?.data;
      if (success) {
        setConfirmation({
          isOpen: false,
          is_blocked: false,
          course_id: null,
        });
        isUpdated(!updateVal);
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

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
            <p className="text-sm text-gray-500">
              By {course.instructor_id?.name}
            </p>
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
              Rs.{course.actual_price?.$numberDecimal}
            </span>
            <div className="flex space-x-2">
              <AdminReviewManagement course_id={course._id} />
              <Button
                onClick={() =>
                  setConfirmation({
                    isOpen: true,
                    is_blocked: course.is_blocked,
                    course_id: course._id,
                  })
                }
                size="sm"
              >
                {course.is_blocked ? "Show" : "Hide"}
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/*   confirmation dialog */}
      <Dialog open={confirmation.isOpen} onOpenChange={closeConfirmDialog}>
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
      </Dialog>
    </div>
  );
}
