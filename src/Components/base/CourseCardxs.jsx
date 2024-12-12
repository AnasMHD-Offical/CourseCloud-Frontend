import React, { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Heart, Star } from "lucide-react";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
function CourseCardxs({ naviate, course, isPurchased }) {
  const [BtnText, SetBtnText] = useState("Add to Cart");
  const [isChanged, setIsChanged] = useState();
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
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
      }
    } catch (error) {
      console.log(error);
    }
  };
  const get_cart_items = async (req, res) => {
    try {
      const response = await axios_instance.get(`api/get_cart/${student_id}`);
      const { cart_items, success } = response?.data;
      if (success) {
        console.log("Cart items",response);

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
    get_cart_items()
  }, [isChanged]);

  return (
    <>
      <Card className="overflow-hidden sm:min-w-52 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-0">
          <div className="relative overflow-hidden">
            <img
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
            <div className="absolute top-2 right-2 bg-transparent rounded-full p-2">
              <Heart className="w-4 h-4 text-center text-white drop-shadow" />
            </div>
          </div>
          <div className="px-6 py-6 sm:py-2.5">
            <h3 className="font-semibold text-2xl md:text-xl lg:text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title ? title : "Complete Life coach certification course 2024"}
            </h3>
            <div className="flex items-center text-sm text-yellow-500 mb-2">
              <Star className="w-4 h-4 sm:w-3 sm:h-3 fill-current mr-1" />
              <span>{rating ? rating.toFixed(1) : "4.5"}</span>
              <span className="text-gray-500 sm:text-xs ml-1">
                {reviews ? `(${reviews}k reviews)` : "(2.3k reviews)"}
              </span>
            </div>
            <div className="font-bold text-xl sm:text-lg text-primary">
              {actual_price
                ? `Rs. ${actual_price?.$numberDecimal} `
                : "Rs. 799"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 sm:p-4 pt-0">
        {isPurchased && (
            <Button
              onClick={() => navigate(`/enrolled_course_view/${course._id}`)}
              className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300"
            >
              Go to Courses
            </Button>
          )}
         {!isPurchased && <Button
            onClick={
              BtnText == "Add to Cart"
                ? handleAddToCart
                : () => navigate("/cart")
            }
            className="w-full rounded-full  text-white bg-gradient-to-r from-primary to-purple-600 hover:bg-primary-dark transition-colors duration-300"
          >
            {BtnText}
          </Button>}
        </CardFooter>
      </Card>
    </>
  );
}

export default CourseCardxs;
