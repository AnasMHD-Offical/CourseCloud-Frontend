import PaginationComp from "@/Components/base/Pagination";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { axios_instance } from "@/Config/axios_instance";
import { ReviewCard } from "@/Pages/student/ReviewAndRatings/review_card";
import { Star } from "lucide-react";
import React, { useEffect, useState } from "react";

const courses = [
  {
    id: 1,
    enrolledStudents: 2,
    rating: 4.25,
    revenuePerCourse: 5699,
    totalRevenue: 11398,
    reviews: [
      {
        user: "Student 1",
        rating: 4,
        comment: "Great course content and structure!",
      },
      {
        user: "Student 2",
        rating: 4.5,
        comment: "Very informative and well-explained concepts.",
      },
      {
        user: "Student 2",
        rating: 4.5,
        comment: "Very informative and well-explained concepts.",
      },
      {
        user: "Student 2",
        rating: 4.5,
        comment: "Very informative and well-explained concepts.",
      },
    ],
  },
  // Add more courses as needed
];
export default function ReviewStats({ course_id }) {
  const [reviews, setReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalReviews, setTotalReviews] = useState();
  const [courseLimit, setCourseLimit] = useState(4);
  const get_review = async () => {
    try {
      const response = await axios_instance.get(
        `api/instructor/get_reviews/${course_id}`,
        {
          params: {
            page: currentPage,
            limit: courseLimit,
          },
        }
      );
      const { success, message, reviews, review_count } = response?.data;
      console.log("Review : ", reviews);

      if (success) {
        setReviews(reviews);
        console.log("total reviews : ", review_count);

        setTotalReviews(review_count);
        // setUpdated(!updated)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };
  useEffect(() => {
    get_review();
  }, [course_id, currentPage]);
  return (
    <>
      <Card className="py-2">
        <CardHeader>
          <CardTitle className="text-lg">Course Reviews</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {reviews.map((review, index) => (
              <ReviewCard key={review._id} review={review} />
            ))}
            {reviews.length === 0 && (
              <div>
                <h2 className="text-lg font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                  Oops! No reviews added
                </h2>
              </div>
            )}
          </div>
        </CardContent>
        {totalReviews > courseLimit && (
          <PaginationComp
            page={currentPage}
            setPage={handlePageChange}
            total={totalReviews}
            limit={courseLimit}
          />
        )}
      </Card>
    </>
  );
}
