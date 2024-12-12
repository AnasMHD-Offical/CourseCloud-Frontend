import { useEffect, useState } from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Heart,
  Star,
  Target,
  TimerIcon,
  Trash,
  Trash2,
  User2,
} from "lucide-react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";

function CardWishlist({ handleChange, value, course }) {
  const [isChanged, setIsChanged] = useState();
  const [BtnText, SetBtnText] = useState("Add to Cart");

  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const navigate = useNavigate();
  const { title, subtitle, thumbnail, rating, reviews, actual_price } = course;

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    courseId: null,
  });

  const openConfirmDialog = () => {
    setConfirmDialog({ isOpen: true });
  };

  const closeConfirmDialog = () => {
    setConfirmDialog({ isOpen: false, courseId: null });
  };

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
      toast.error(error?.response?.data?.message);
    }
  };

  const handleRemoveWishlist = async () => {
    try {
      const response = await axios_instance.delete(
        `api/remove_from_wishlist/${student_id}/${course._id}`
      );
      const { success, message } = response.data;
      if (success) {
        toast.success(message);
        handleChange(value);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.resposnse?.data?.message);
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
  }, [isChanged]);
  return (
    <>
      <Card className="cursor-pointer overflow-hidden  sm:max-w-96 transition-all duration-300 hover:shadow-lg group">
        <CardContent className="p-0">
          <div
            className="relative h-48 overflow-hidden"
            onClick={() => navigate(`/overview/${course._id}`)}
          >
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
              <Heart className="w-5 h-5 text-center text-red-600 fill-red-600 drop-shadow" />
            </div>
          </div>
          <div className="p-6">
            <h3 className="font-semibold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
              {title ? title : "Complete Life coach certification course 2024"}
            </h3>
            <div className="flex items-center text-sm text-yellow-500 mb-2">
              <Star className="w-4 h-4 fill-current mr-1" />
              <span>{rating ? rating : "4.5"}</span>
              <span className="text-gray-500 ml-1">
                {reviews ? `(${reviews}k reviews)` : "(2.3k reviews)"}
              </span>
            </div>
            <div className="flex sm:hidden xl:flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
              <div className="flex gap-1 items-center">
                <User2 className="w-4 h-4 " />
                <span>{course?.instructor_id.name || "Instructor"} </span>
              </div>
              <div className="flex gap-1 items-center">
                <TimerIcon className="w-4 h-4 " />
                <span>{course?.duration || "40hr"} </span>
              </div>
              <div className="flex gap-1 items-center">
                <Target className="w-4 h-4 " />
                <span>{course?.difficulty || "Beginner"} </span>
              </div>
            </div>
            <div className="font-bold text-xl text-primary">
              {actual_price
                ? `Rs. ${actual_price?.$numberDecimal} `
                : "Rs. 799"}
            </div>
          </div>
        </CardContent>
        <CardFooter className="p-6 pt-0 flex gap-2">
          <Button
            onClick={
              BtnText === "Add to Cart"
                ? handleAddToCart
                : () => navigate("/cart")
            }
            className="w-full rounded-full  text-white bg-gradient-to-r from-primary/100 to-purple-600 hover:bg-primary-dark transition-colors duration-300"
          >
            {BtnText}
          </Button>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openConfirmDialog}
                  className="text-red-600 hover:text-red-700 hover:bg-red-50"
                >
                  <Trash2 className="w-5 h-5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Remove from Wishlist</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardFooter>
      </Card>

      
      <Dialog open={confirmDialog.isOpen} onOpenChange={closeConfirmDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Remove from Wishlist</DialogTitle>
            <DialogDescription>
              Are you sure you want to remove this course from your wishlist?
              This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={closeConfirmDialog}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={handleRemoveWishlist}>
              Remove
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CardWishlist;
