import { useState, useEffect } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { OTP_Modal } from "./OTP_Modal";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";

const form_validation = yup.object({
  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),
});

export default function Forgot_Password({ current_role }) {
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [login_route, setLogin_route] = useState("");
  const [otp_modal_open, setOtp_modal_open] = useState(false);
  //state to manage the otp sending based on role
  const [send_otp_route, setSend_otp_route] = useState("");
  //state to manage otp validation based on role
  const [validate_otp_route, setValidate_otp_route] = useState("");
  //state to handle password_reset_navigate
  const [password_reset_navigate, setPassword_reset_navigate] = useState("");
  //declaring navigate from useNavigate hook
  const navigate = useNavigate();

  useEffect(() => {
    setRole(current_role);
    if (role === "student") {
      setLogin_route("/");
      //setting otp_send route api based on student
      setSend_otp_route("/api/send_otp");
      //setting validate_otp route api based on student
      setValidate_otp_route("/api/validate_otp");
      setPassword_reset_navigate("/password_reset");
    } else if (role === "instructor") {
      setLogin_route("/instructor");
      //setting send_otp route api based on instructor role
      setSend_otp_route("/api/instructor/send_otp");
      //setting validate_otp route api based on instructor role
      setValidate_otp_route("/api/instructor/validate_otp");
      setPassword_reset_navigate("/instructor/password_reset");
    } else if (role === "admin") {
      setLogin_route("/admin");
      setSend_otp_route("/api/admin/send_otp");
      setValidate_otp_route("/api/admin/validate_otp");
      setPassword_reset_navigate("/admin/password_reset");
    } else {
      setLogin_route("");
    }
  }, [role, current_role]);
  console.log(login_route);

  const handle_submit = async (values) => {
    try {
      setEmail(values.email);
      //send a request to the sent_otp server api .
      const response = await axios_instance.post(send_otp_route, {
        email: values.email,
        // name: null,
        For: "forgot_password",
      });
      console.log(response);

      const { message, success } = response?.data;
      //checking the response resolved or not and proceed the otp_modal open
      if (success) {
        toast.success(message);
        setOtp_modal_open(true);
      }
    } catch (error) {
      //throw toast error corresponding to the error type
      const { message } = error?.response?.data;
      toast.error(message);

      console.log(error);
    }
  };
  const handle_validate_otp = async (otp) => {
    try {
      //sending a request to validate the entered otp from otp_modal to server route /api/validate_otp
      const response = await axios_instance.post(validate_otp_route, {
        email: email,
        otp: otp,
        For: "forgot_password",
      });
      //destructuring success(bool) and message(string)
      const { message, success, data } = response?.data;
      console.log(response);
      //checking if the otp is valid and if it valid call the handle_form_submit for furthur student register procedures
      if (success) {
        toast.success(message);
        navigate(password_reset_navigate, { state: data?.email });
      }
    } catch (error) {
      //throw an toaster error based on the error type.
      const { message } = error?.response?.data;
      toast.error(message);
      console.log(error);
    }
  };

  const handle_resend_otp = async () => {
    //dectructuring email and name from form data
    try {
      //sending request a to server to resent otp to the given email
      const response = await axios_instance.post(send_otp_route, {
        email: email,
        For: "forgot_password",
      });
      const { message, success } = response?.data;
      //checking the response and if it resolved then toast a success and open the otp entring modal
      if (success) {
        toast.success(message);
        setOtp_modal_open(true);
      }
    } catch (error) {
      //throwing error based on the errror type
      const { message } = error?.response?.data;
      if (error.status === 409) {
        toast.error(message);
      } else if (error.status === 500) {
        toast.error(message);
      } else {
        toast.error("Something went wrong");
      }
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen bg-neutral-100">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Forgot password
          </CardTitle>
          <p className="text-center text-lg font-semibold text-neutral-950">
            Don't worry! It happens
          </p>
          <CardDescription className="text-center text-neutral-900">
            Please enter the email associated with your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              email: "",
            }}
            validationSchema={form_validation}
            onSubmit={handle_submit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Email
                    </label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email address"
                      className="h-12"
                    />
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm">{errors.email}</div>
                    )}
                  </div>
                  <Button
                    className="w-full h-11 text-sm bg-black hover:bg-gray-900"
                    type="submit"
                    disabled={isSubmitting}
                  >
                    Send OTP
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter>
          <p className="text-base text-center w-full">
            Remember password?{" "}
            <Link
              to={login_route}
              className="font-bold text-neutral-950 hover:text-neutral-900"
            >
              Login
            </Link>
          </p>
        </CardFooter>
      </Card>
      <OTP_Modal
        isOpen={otp_modal_open}
        onClose={() => setOtp_modal_open(false)}
        email={email}
        verify_otp={handle_validate_otp}
        resend_otp={handle_resend_otp}
      />
    </div>
  );
}
