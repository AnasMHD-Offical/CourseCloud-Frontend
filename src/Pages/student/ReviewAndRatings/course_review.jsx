"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { StarRating } from "./star_rating";
import { ReviewCard } from "./review_card";
import { Field, Form, Formik } from "formik";
import * as yup from "yup";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const INITIAL_REVIEWS = [
  {
    id: "1",
    name: "Anas Muhammed",
    rating: 5,
    text: "This course really helped me to improve my skills in web development. Thankyou Akshay bro for this wonderful course.",
    date: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    id: "2",
    name: "Padmapriya Shankar",
    rating: 5,
    text: "This course really helped me to improve my skills in web development. Thanks for this course",
    date: new Date(Date.now() - 24 * 60 * 60 * 1000),
    avatar: "/placeholder.svg?height=40&width=40",
  },
];
console.log("Date : ", INITIAL_REVIEWS[0].date);

const validation_form = yup.object({
  feedback: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!%@&#?."';:,() ]+$/,
      `Feedback should only contain alphabet, numbers, speacials characters (@,!,#,&,?,.,",',;,:,-) or whitespace `
    ),
});
export function CourseReviews() {
  const [activeTab, setActiveTab] = useState("reviews");
  const [reviews, setReviews] = useState(INITIAL_REVIEWS);
  const [newReview, setNewReview] = useState("");
  const [selectedRating, setSelectedRating] = useState(0);
  const [updated, setUpdated] = useState(false);
  const formikRef = useRef();
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const { current_course_id } = useSelector(
    (state) => state?.current_course_data
  );
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  //Function to fetch the reviews from the db
  const get_review = async () => {
    try {
      const response = await axios_instance.get(
        `api/get_reviews/${current_course_id}`
      );
      const { success, message, reviews } = response?.data;
      console.log("Review : ", reviews);

      if (success) {
        setReviews(reviews);
        // setUpdated(!updated)
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };

  // function to create a new review to the db.
  const handleSubmitReview = async (value) => {
    try {
      if (selectedRating > 0) {
        const response = await axios_instance.post("api/create_review", {
          student_id: student_id,
          course_id: current_course_id,
          rating: selectedRating,
          feedback: value.feedback,
        });
        const { success, message } = response?.data;
        if (success) {
          toast.success(message);
          formikRef.current.resetForm();
          setSelectedRating(0);
          setUpdated(!updated);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data?.message);
    }
  };

  useEffect(() => {
    get_review();
  }, [updated]);

  return (
    <div className="w-full max-w-5xl  p-4 space-y-6">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold">Rating & Review</h1>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">
              {averageRating.toFixed(1)} Rating
            </span>
            <StarRating rating={averageRating} size="lg" className="mt-2" />
          </div>
          <p className="text-muted-foreground">
            {reviews.length}+ Students enrolled in this course
          </p>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex-1">
            <StarRating
              rating={selectedRating}
              onRatingSelect={setSelectedRating}
              interactive
              size="lg"
              className="mb-2"
            />
            <Formik
              initialValues={{
                feedback: "",
              }}
              innerRef={formikRef}
              validationSchema={validation_form}
              onSubmit={handleSubmitReview}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="flex">
                    <Field
                      as={Input}
                      id="feedback"
                      name="feedback"
                      placeholder="Give your valuable feedback"
                      className="rounded-r-none h-12"
                    />
                    <Button
                      className="rounded-l-none bg-gradient-to-r h-12 w-14 from-purple-900 to-purple-600"
                      disabled={selectedRating === 0}
                      type="submit"
                    >
                      <ArrowRight className="h-4 w-4" />
                      <span className="sr-only">Submit review</span>
                    </Button>
                  </div>
                  {errors.feedback && touched.feedback && (
                    <div className="text-red-500 text-sm">
                      {errors.feedback}
                    </div>
                  )}
                </Form>
              )}
            </Formik>
          </div>
        </div>

        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard key={review._id} review={review} />
          ))}
        </div>
      </div>
    </div>
  );
}
