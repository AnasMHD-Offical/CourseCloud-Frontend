import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  Star,
  Trash2,
  ArrowUp,
  Heart,
  TimerIcon,
  User2,
  Target,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Header from "@/Components/base/Header";
import CourseContainer from "@/Components/base/CourseContainer";
import Footer from "@/Components/base/Footer";
import { useSelector } from "react-redux";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import RazorpayPayment from "@/Services/Payment";
import AnchorLink from "react-anchor-link-smooth-scroll";

export default function CartPage() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );

  const [cartItems, setCartItems] = useState([]);
  const [couponCode, setCouponCode] = useState("");
  const [isApplying, setIsApplying] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [showFloatingCart, setShowFloatingCart] = useState(false);
  const [isCartUpdated, setIsCartUpdated] = useState(false);
  const [isMutated, setIsMutated] = useState(false);

  const get_cart_items = async (req, res) => {
    try {
      const response = await axios_instance.get(`api/get_cart/${student_id}`);
      const { cart_items, success } = response?.data;
      if (success) {
        setCartItems(cart_items.cart_items);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    get_cart_items();
  }, [isCartUpdated, isMutated]);

  const removeFromCart = async (id) => {
    try {
      const response = await axios_instance.delete(
        `api/remove_from_cart/${student_id}/${id}`
      );
      const { message, success } = response?.data;
      if (success) {
        console.log(response);
        toast.success(message);
        setIsCartUpdated(!isCartUpdated);
      }
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message);
    }
  };

  const handleMutation = (mutated) => {
    setIsMutated(!mutated);
  };

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + +item.price?.$numberDecimal,
      0
    );
  };

  const calculateDiscount = () => {
    return 0; // Example fixed discount
  };

  //   const scrollCarousel = (direction) => {
  //     if (carouselRef.current) {
  //       const scrollAmount = 300;
  //       if (direction === "left") {
  //         carouselRef.current.scrollBy({
  //           left: -scrollAmount,
  //           behavior: "smooth",
  //         });
  //       } else {
  //         carouselRef.current.scrollBy({
  //           left: scrollAmount,
  //           behavior: "smooth",
  //         });
  //       }
  //     }
  //   };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 300);
      setShowFloatingCart(window.scrollY > 400);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      {/* Header */}
      <Header />

      <main className="container mx-auto px-16 py-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-3xl md:text-4xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r to-primary from-purple-900"
        >
          Your Cart
        </motion.h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence>
              {cartItems.map((item, index) => (
                <motion.div
                  key={item.course_id._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="bg-white border-gray-200 shadow-sm overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex flex-col sm:flex-row">
                        <div className="relative overflow-hidden w-full  h-48 sm:h-full lg:max-w-full  xl:max-w-72">
                          <img
                            src={
                              item.course_id.thumbnail
                                ? item.course_id.thumbnail
                                : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730710700/dehvw4jfovkrkmsldhwc.jpg"
                            }
                            alt={item.course_id.title}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-300 group-hover:scale-105"
                          />
                        </div>
                        <div className="flex-1 p-6">
                          <h3 className="text-xl font-semibold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600">
                            {item.course_id.title}
                          </h3>
                          <div className="flex items-center space-x-2 mb-2">
                            <div className="flex items-center text-yellow-500">
                              {Array(5)
                                .fill(null)
                                .map((_, i) => (
                                  <Star
                                    key={i}
                                    className={`w-4 h-4 ${
                                      i < item.course_id.rating
                                        ? Math.floor(item.course_id.rating)
                                        : 4
                                        ? "fill-current"
                                        : "stroke-current fill-transparent"
                                    }`}
                                  />
                                ))}
                            </div>
                            <span className="text-sm text-gray-600">
                              (
                              {item.course_id.reviews
                                ? item.course_id.reviews
                                : "12,136 review"}
                              )
                            </span>
                          </div>
                          <div className="flex sm:hidden xl:flex flex-wrap items-center text-sm text-gray-600 space-x-4 mb-4">
                            <div className="flex gap-1 items-center">
                              <User2 className="w-4 h-4 " />
                              <span>
                                {item.course_id.instructor_id
                                  ? item.course_id.instructor_id.name
                                  : "Instructor"}
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <TimerIcon className="w-4 h-4 " />
                              <span>
                                {item.course_id.duration
                                  ? item.course_id.duration
                                  : "40hr"}
                              </span>
                            </div>
                            <div className="flex gap-1 items-center">
                              <Target className="w-4 h-4 " />
                              <span>
                                {item.course_id.difficulty
                                  .charAt(0)
                                  .toUpperCase() +
                                  item.course_id.difficulty.slice(1)}
                              </span>
                            </div>
                          </div>
                          <div className="flex flex-row sm:flex-col lg:flex-row items-center justify-between">
                            <span className="text-2xl font-bold text-gray-900">
                              ₹{item.course_id.actual_price?.$numberDecimal}
                            </span>
                            <div className="flex items-center md:flex-row space-x-2">
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      onClick={() => removeFromCart(item._id)}
                                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
                                    >
                                      <Trash2 className="w-5 h-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Remove from cart</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                              <TooltipProvider>
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="text-purple-600 hover:text-purple-700 hover:bg-blue-50"
                                    >
                                      <Heart className="w-5 h-5" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Save for later</p>
                                  </TooltipContent>
                                </Tooltip>
                              </TooltipProvider>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
              {cartItems.length === 0 && (
                <div>
                  <h3 className="text-4xl  font-bold">Oops! Cart is Empty</h3>
                  <p>Add items to your cart and Improve your skills </p>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Checkout Summary */}
          <motion.div
            id="payment"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:sticky lg:top-24"
          >
            <Card className="bg-white border-gray-200 shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-900">
                  Order Summary
                </h2>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>₹{calculateTotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>Discount</span>
                    <span>-₹{calculateDiscount().toLocaleString()}</span>
                  </div>
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex justify-between text-lg font-semibold text-gray-900">
                      <span>Total</span>
                      <span>
                        ₹
                        {(
                          calculateTotal() - calculateDiscount()
                        ).toLocaleString()}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Enter coupon code"
                      value={couponCode}
                      onChange={(e) => setCouponCode(e.target.value)}
                      className="bg-white border-gray-300"
                    />
                    <Button
                      onClick={() => {
                        setIsApplying(true);
                        setTimeout(() => setIsApplying(false), 1000);
                      }}
                      disabled={isApplying}
                    >
                      {isApplying ? "Applying..." : "Apply"}
                    </Button>
                  </div>
                  <RazorpayPayment
                    price={calculateTotal() - calculateDiscount()}
                    student_id={student_id}
                    courses={cartItems}
                    handleMutation={handleMutation}
                  />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Related Courses */}
        <CourseContainer
          update={isCartUpdated}
          mutation={handleMutation}
          title={"Courses You May Like"}
        />
      </main>

      {/* Footer */}
      <Footer />

      {/* Back to Top Button */}
      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            onClick={scrollToTop}
            className="fixed bottom-4 right-4 bg-primary text-white p-2 rounded-full shadow-lg"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating Cart Summary */}
      <AnimatePresence>
        {showFloatingCart && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 left-4 right-4 bg-white p-4 rounded-lg shadow-lg md:left-auto md:right-4 md:w-72"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="font-semibold">Total:</span>
              <span className="font-bold text-lg">
                ₹{(calculateTotal() - calculateDiscount()).toLocaleString()}
              </span>
            </div>
            <AnchorLink href="#payment">
              <Button className="w-full">Pay Now</Button>
            </AnchorLink>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
