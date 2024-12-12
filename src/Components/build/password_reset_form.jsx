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
import { Eye, EyeOff } from "lucide-react";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import { Link, useLocation } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import Success_Modal from "./success_modal";

const form_validation = yup.object({
  new_password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain atleast one capital letter")
    .matches(/[\d]/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    )
    .required("New password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must be same")
    .required("Confirm password is required"),
});
export default function Password_reset_form({ current_role }) {
  //State for mananging the form data
  const [form_data, setForm_data] = useState(null);
  //State for managing the user role
  const [role, setRole] = useState("");
  //state for manage the user login route
  const [login_route, setLogin_route] = useState("");
  //state for manage the reset password route based on user
  const [reset_password_route, setReset_password_route] = useState("");
  //state for managing the otp modal (either *success or otp)
  const [otp_modal_open, setOtp_modal_open] = useState(false);
  //state for manange show and hide passwords
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
// We use use location to get data from the component that navigate it into here.
  const location = useLocation();
  const email = location.state;
// useEffect to handle routes based on the user role
  useEffect(() => {
    setRole(current_role);
    if (role === "student") {
      setLogin_route("/");
      setReset_password_route("/api/reset_password");
    } else if (role === "instructor") {
      setLogin_route("/instructor");
      setReset_password_route("/api/instructor/reset_password");
    } else if (role === "admin") {
      setLogin_route("/admin");
      setReset_password_route("/api/admin/reset_password");
    } else {
      setLogin_route("");
    }
  }, [role]);
  console.log(login_route);

  //Function to handle the reset password form submit 
  const handle_submit = async (values) => {
    setForm_data(values);
    console.log(form_data);

    const data = {
      email: email,
      password: values.new_password,
    };
    console.log(data);

    try {
      const response = await axios_instance.put(reset_password_route, data);
      console.log(response);
      setOtp_modal_open(true)
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-3xl font-extrabold text-center">
            Reset password
          </CardTitle>
          <p className="text-base text-neutral-950 font-bold text-center text-muted-foreground">
            Enter your new password
          </p>
          <CardDescription className="text-sm font-normal text-center text-muted-foreground">
            Please type something you’ll remember
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Formik
            initialValues={{
              new_password: "",
              confirmPassword: "",
            }}
            validationSchema={form_validation}
            onSubmit={handle_submit}
          >
            {({ errors, touched, isSubmitting }) => (
              <Form className="space-y-4">
                <div className="space-y-2">
                  <label
                    htmlFor="new_password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    New password
                  </label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="new_password"
                      name="new_password"
                      type={showPassword ? "text" : "password"}
                      placeholder="your password"
                      className="pr-10 h-11"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.new_password && touched.new_password && (
                    <div className="text-sm text-red-500 ">
                      {errors.new_password}
                    </div>
                  )}
                </div>
                <div className="space-y-2">
                  <label
                    htmlFor="confirm-password"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirm new password
                  </label>
                  <div className="relative">
                    <Field
                      as={Input}
                      id="confirm-password"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Your password"
                      className="pr-10 h-11 "
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      className="absolute inset-y-0 right-0 flex items-center px-3"
                    >
                      {showConfirmPassword ? (
                        <EyeOff className="h-4 w-4 text-gray-500" />
                      ) : (
                        <Eye className="h-4 w-4 text-gray-500" />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && touched.confirmPassword && (
                    <div className="text-sm text-red-500 ">
                      {errors.confirmPassword}
                    </div>
                  )}
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11"
                >
                  Reset password
                </Button>
              </Form>
            )}
          </Formik>
        </CardContent>
        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground text-neutral-950">
            Remembered password?{" "}
            <Link
              to={login_route}
              className="text-neutral-950 font-bold text-sm hover:underline"
            >
              Log in
            </Link>
          </p>
        </CardFooter>
      </Card>
      <Success_Modal
        isOpen={otp_modal_open}
        onClose={() => setOtp_modal_open(false)}
        title={"Password changed"}
        subtitle={"Explore the courses"}
        description={"Login to your account with your new password"}
        buttonText={"Back to Login"}
        current_role={current_role}
      />
    </div>
  );
}
