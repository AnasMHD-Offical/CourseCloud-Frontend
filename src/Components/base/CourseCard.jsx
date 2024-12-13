import React, { useState, useEffect } from "react";
import { Card, CardContent, CardFooter } from "../ui/card";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import { toast } from "sonner";

function CourseCard({
  update,
  mutation,
  value,
  naviate,
  wishlist_mutation,
  course,
  isPurchased,
}) {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [isChanged, setIsChanged] = useState();
  const [BtnText, SetBtnText] = useState("Add to Cart");
  const navigate = useNavigate();
  const { title, subtitle, thumbnail, rating, reviews, actual_price } = course;

  const handleAddToCart = async () => {
    try {
      const response = await axios_instance.put("api/add_to_cart", {
        student_id: student_id,
        course_id: course._id,
        price: actual_price,
      });
      const { success, message } = response?.data;
      if (success) {
        setIsChanged(!isChanged);
        toast.success(message);
        console.log(response);
        mutation(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const response = await axios_instance.put("api/add_to_wishlist", {
        student_id: student_id,
        course_id: course._id,
      });
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        console.log(response);
        wishlist_mutation(false);
      }
    } catch (error) {
      console.log(error);
      toast.info(error?.response?.data?.message || "Already added to cart");
    }
  };

  const get_cart_items = async (req, res) => {
    try {
      const response = await axios_instance.get(`api/get_cart/${student_id}`);
      const { cart_items, success } = response?.data;
      if (success) {
        console.log(response);

        const isAddedtoCart = cart_items?.cart_items.filter(
          (item) => item.course_id._id == course._id
        );
        SetBtnText(isAddedtoCart.length > 0 ? "Go to Cart" : "Add to Cart");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    get_cart_items();
  }, [isChanged, update]);

  return (
    <>
      <Card className="cursor-pointer overflow-hidden w-72 sm:min-w-80 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-0">
          <div className="relative h-48 overflow-hidden">
            <img
              onClick={
                isPurchased
                  ? () => navigate(`/enrolled_course_view/${course._id}`)
                  : () => navigate(`/overview/${course._id}`)
              }
              src={
                thumbnail
                  ? thumbnail
                  : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
              }
              alt={title}
              layout="fill"
              objectFit="cover"
              className="transition-transform duration-300 group-hover:scale-110"
            />
            {!isPurchased && (
              <button
                onClick={handleAddToWishlist}
                className="absolute top-2 right-2 bg-transparent rounded-full p-2"
              >
                <Heart
                  className={`w-5 h-5 text-center text-white drop-shadow`}
                />
              </button>
            )}
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title ? title : "Complete Life coach certification course 2024"}
            </h3>
            <div className="flex items-center text-sm text-yellow-500 mb-2">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>{rating ? rating.toFixed(1) : "4.5"}</span>
              <span className="text-gray-500 ml-1">
                {reviews ? `(${reviews}k reviews)` : "(2.3k reviews)"}
              </span>
            </div>
            <div className="font-bold text-xl text-primary">
              {actual_price
                ? `Rs. ${actual_price?.$numberDecimal} `
                : "Rs. 799"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0">
          {isPurchased && (
            <Button
              onClick={() => navigate(`/enrolled_course_view/${course._id}`)}
              className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300"
            >
              Go to Courses
            </Button>
          )}
          {!isPurchased && (
            <Button
              onClick={
                BtnText === "Add to Cart" || ""
                  ? () => handleAddToCart()
                  : () => navigate("/cart")
              }
              className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300"
            >
              {BtnText}
            </Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
}

export default CourseCard;
