"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/Components/ui/dialog";
import { Button } from "@/Components/ui/button";
import { Star, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import PaginationComp from "@/Components/base/Pagination";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import { StarRating } from "../student/ReviewAndRatings/star_rating";

const dummyReviews = [
  {
    id: "1",
    name: "John Doe",
    text: "Great course! I learned a lot.",
    date: "2023-05-15",
    status: "active",
  },
  {
    id: "2",
    name: "Jane Smith",
    text: "The content was informative, but I wish there were more practical examples.",
    date: "2023-05-14",
    status: "active",
  },
  {
    id: "3",
    name: "Bob Johnson",
    text: "Excellent instructor, very clear explanations.",
    date: "2023-05-13",
    status: "blocked",
  },
];

export function AdminReviewManagement({ course_id }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState();
  const [courseLimit, setCourseLimit] = useState(3);
  const [rating, setRating] = useState(4.5);
  const [reviews, setReviews] = useState(dummyReviews);
  const [processingId, setProcessingId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);

  //   const toggleReviewStatus = async (id) => {
  //     setProcessingId(id);
  //     // Simulate API call
  //     await new Promise((resolve) => setTimeout(resolve, 1000));
  //     setReviews(
  //       reviews.map((review) =>
  //         review.id === id
  //           ? {
  //               ...review,
  //               status: review.status === "active" ? "blocked" : "active",
  //             }
  //           : review
  //       )
  //     );
  //     setProcessingId(null);
  //   };

  const get_review = async () => {
    try {
      const response = await axios_instance.get(
        `api/admin/get_reviews/${course_id}`,
        {
          params: {
            page: currentPage,
            limit: courseLimit,
          },
        }
      );
      const { success, message, reviews, review_count, Course_rating } =
        response?.data;
      console.log("Review : ", reviews);

      if (success) {
        setReviews(reviews);
        console.log("total reviews : ", review_count);

        setTotalReviews(review_count);
        setRating(Course_rating);
        // setUpdated(!updated)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };

  const block_review = async (id) => {
    try {
      const response = await axios_instance.put(`/api/admin/block_review`, {
        _id: id,
      });
      if (response?.data?.success) {
        setIsLoading(false);
        setUpdated(!updated);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const unblock_review = async (id) => {
    try {
      const response = await axios_instance.put(`/api/admin/unblock_review`, {
        _id: id,
      });
      if (response?.data?.success) {
        setIsLoading(false);
        setUpdated(!updated);
        toast.success(response?.data?.message);
      }
    } catch (error) {
      console.log(error?.message);
    }
  };

  const timeAgo = (date) => {
    const formatedDate = new Date(Date.parse(date));
    const days = Math.floor(
      (new Date().getTime() - formatedDate.getTime()) / (1000 * 60 * 60 * 24)
    );
    return `${days} day${days === 1 ? "" : "s"} ago`;
  };
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  useEffect(() => {
    get_review();
  }, [course_id, currentPage, updated]);

  const handleBlock = (id) => {
    setIsLoading(true);
    block_review(id);
  };

  const handleUnblock = (id) => {
    setIsLoading(true);
    unblock_review(id);
  };

  //   open={isOpen} onOpenChange={setIsOpen}
  return (
    <Dialog>
      <DialogTrigger>
        <Button size="sm">Show Reviews & Ratings</Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl w-11/12 h-[80vh] overflow-y-auto hide-scroll-bar scroll-smooth bg-gradient-to-r from-purple-50 to-blue-50">
        <DialogTitle className="sr-only">Course Rating and Reviews</DialogTitle>
        <div className="flex flex-col lg:flex-row lg:items-start max-h-full">
          {/* Rating Summary Section */}
          <div className="lg:w-1/3 p-4 flex flex-col items-center justify-center border-b lg:border-b-0 lg:border-r">
            <h2 className="text-2xl font-bold mb-4">Course Rating</h2>
            <div className="text-5xl font-bold mb-2">
              {rating ? rating.toFixed(1) : 0}
            </div>
            <div className="flex mb-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={cn(
                    "w-6 h-6",
                    star <= Math.round(rating)
                      ? "text-yellow-400 fill-yellow-400"
                      : "text-gray-300"
                  )}
                />
              ))}
            </div>
            <div className="text-sm text-gray-500">{totalReviews} reviews</div>
          </div>

          {/* Reviews List Section */}
          <div className="lg:w-2/3 p-4 flex flex-col">
            <h2 className="text-2xl font-bold mb-4">Reviews</h2>
            <div className="flex-grow mb-4">
              {reviews.map((review) => (
                <div
                  key={review._id}
                  className="mb-4 p-3 border rounded-lg bg-white"
                >
                  <div className="flex justify-between items-start mb-2">
                    <div className="flex flex-col">
                      <div className="flex gap-2">
                        <img
                          src={
                            review?.student_id?.profile ||
                            "https://placehold.co/400"
                          }
                          alt="image"
                          className="w-7 h-7 rounded-full"
                        />
                        <div>
                          <p className="font-semibold">
                            {review?.student_id?.name}
                          </p>
                          <div className="flex gap-2">
                            <p className="text-sm">
                              {review.rating ? review.rating.toFixed(1) : 4}
                            </p>
                            <StarRating rating={review.rating} size="sm" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={
                        review?.is_blocked
                          ? () => handleUnblock(review._id)
                          : () => handleBlock(review._id)
                      }
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : review.is_blocked ? (
                        "Unblock"
                      ) : (
                        "Block"
                      )}
                    </Button>
                  </div>
                  <p className="text-sm line-clamp-2">{review.feedback}</p>
                  <div className="flex justify-between mt-2">
                    <div
                      className={cn(
                        "text-xs mt-1",
                        review?.is_blocked ? "text-red-600" : "text-green-600"
                      )}
                    >
                      {review?.is_blocked ? "Blocked" : "Active"}
                    </div>
                    <div className="text-sm text-gray-500 ml-9">
                      {timeAgo(review.createdAt)}
                    </div>
                  </div>
                </div>
              ))}
              {reviews.length === 0 && (
                <p className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Oops! No reviews added
                </p>
              )}
            </div>

            {/* Pagination Controls */}
            {totalReviews > courseLimit && (
              <PaginationComp
                page={currentPage}
                setPage={handlePageChange}
                total={totalReviews}
                limit={courseLimit}
              />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
