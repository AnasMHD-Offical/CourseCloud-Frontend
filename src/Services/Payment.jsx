import React from "react";
import { useRazorpay } from "react-razorpay";
import { Button } from "@/Components/ui/button";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";

const RazorpayPayment = ({ price, student_id, courses, handleMutation }) => {
  const { error, isLoading, Razorpay } = useRazorpay();

  const handlePayment = () => {
    const handleEnrollment = async (payment_res) => {
      try {
        const response = await axios_instance.post("/api/create_enrollment", {
          data: {
            student_id: student_id,
            courses: courses,
            payment_id: payment_res?.razorpay_payment_id,
          },
        });
        const { message, success } = response?.data;
        if (success) {
          handleMutation(false)
          toast.success(message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.response.data.message);
      }
    };

    const options = {
      key: import.meta.env.VITE_RAZORPAY_ID,
      amount: price * 100, // Amount in paise
      currency: "INR",
      name: "",
      description: "",
      order_id: "", // Generate order_id on server
      handler: (response) => {
        console.log(response);
        handleEnrollment(response);
      },
      prefill: {
        name: "John Doe",
        email: "john.doe@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#8a10bee0",
      },
    };

    const razorpayInstance = new Razorpay(options);
    razorpayInstance.open();
  };

  return (
    <div>
      {/* <h1>Payment Page</h1> */}
      {isLoading && <p>Loading Razorpay...</p>}
       {error && <p>Error loading Razorpay: {error}</p>}
      <Button
        varient="ghost"
        className="w-full  bg-black text-white hover:bg-primary/90"
        onClick={handlePayment}
        disabled={isLoading || courses.length === 0}
      >
        Pay Now
      </Button>
    </div>
  );
};

export default RazorpayPayment;
