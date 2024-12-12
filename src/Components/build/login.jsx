//Importing essestial components and modules
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { axios_instance } from "../../Config/axios_instance";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { GoogleLogin } from "@react-oauth/google";
import * as yup from "yup";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Axis3DIcon, EyeIcon, EyeOffIcon, OctagonX } from "lucide-react";
import { Formik, Form, Field } from "formik";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { useSelector, useDispatch } from "react-redux";
import { set_admin_data } from "@/Redux/Slices/AdminSlice";
import { set_student_data } from "@/Redux/Slices/StudentSlice";
import { set_instructor_data } from "@/Redux/Slices/Instructor_Slice";
import { StopIcon } from "@radix-ui/react-icons";
//validation schema for login form
const form_validation = yup.object({
  email: yup
    .string()
    .email("Invalid Email address")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain atleast one capital letter")
    .matches(/[\d]/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    )
    .required("Password is required"),
});

// Login component
function Login({ current_role }) {
  //managing the role that was to change the submit route according to the role
  const [role, setRole] = useState("");
  //manageing the api routes to sent the data based on the role
  const [login_api, setLogin_api] = useState("");
  //state for manage the register route
  const [register_route, setResgister_route] = useState("");
  //state for managing forgot password route based on role
  const [forget_password_route, setForgot_password_route] = useState("");
  //Declaring the state for show and hide password in password input.
  const [showPassword, setShowPassword] = useState(false);
  //state for manage google auth block for admin
  const [is_admin, setIs_admin] = useState(true);

  const [homeRoute,setHomeRoute] = useState("")
  //Decalring navigate from useNavigate hook
  const navigate = useNavigate();

  const dispatch = useDispatch();
  //useEffect hooks for handle role based login
  useEffect(() => {
    setRole(current_role);
    //Setting the routes for specific roles
    if (role === "student") {
      setLogin_api("/api/student_login");
      setResgister_route("/register");
      setForgot_password_route("/forgot_password");
      setHomeRoute("/")
    } else if (role === "instructor") {
      setLogin_api("/api/instructor/instructor_login");
      setResgister_route("/instructor/register");
      setForgot_password_route("/instructor/forgot_password");
      setHomeRoute("/instructor")
    } else if (role === "admin") {
      setLogin_api("/api/admin/admin_login");
      setForgot_password_route("/admin/forgot_password");
      setIs_admin(false);
    } else {
      setLogin_api("");
    }
  }, [role]);

  console.log(login_api);

  //Decalring functions for handle form submit
  const handle_Submit = async (values) => {
    try {
      //sending data to server in route :  /api/student_login
      const response = await axios_instance.post(login_api, values);
      console.log("here");

      console.log(response);

      //detructuring the success(bool),message(string) from the response
      const { success, message } = response?.data;
      const user_data =
        response?.data?.admin_data ||
        response?.data?.instructor_data ||
        response?.data?.student_data;
      //short circuting the success(bool) to show toaster
      if (success) {
        toast.success(message);
        navigate(homeRoute)
        console.log(user_data.role);
        console.log(user_data);

        //setting the user data based on the role to the redux store
        {
          user_data.role === "admin" &&
            dispatch(
              set_admin_data({
                admin: {
                  _id: user_data._id,
                  role: user_data.role,
                },
              })
            );
        }
        {
          user_data.role === "student" &&
            dispatch(
              set_student_data({
                student: {
                  _id: user_data._id,
                  role: user_data.role,
                },
              })
            );
        }
        {
          user_data.role === "instructor" &&
            dispatch(
              set_instructor_data({
                instructor: {
                  _id: user_data._id,
                  role: user_data.role,
                },
              })
            );
        }

        //navigate it into the Home page of the user role
        {
          user_data.role === "admin" && navigate("/admin");
        }
        // {user_data.role === "student" && navigate("/admin/category_management")}
        // {user_data.role === "admin" && navigate("/admin/category_management")}
      }
    } catch (error) {
      //throw a toast error based on the error type
      const { message } = error?.response?.data;
      console.log(error);
      console.log(error?.response?.data);
      toast.error(message);
    }
  };
  //Declare function to handle google_login and google_signup or register.
  const handle_google_auth = async (credentialResponse) => {
    try {
      //Decoding the user credentials
      const data = jwtDecode(credentialResponse.credential);
      // console.log(data);
      //Sending request to register and login the user
      const response = await axios_instance.post("/google_auth", {
        data,
        role,
      });
      console.log(response);
      //Destructuring the resolved messages and success_status
      const { success, message , user_data} = response?.data;
      if (success) {
        //throw a toaster for success indentification for user
        toast.success(message);
        navigate(homeRoute)
        //Navigate to home route when the user logged in.
        {
          user_data.role === "student" &&
            dispatch(
              set_student_data({
                student: {
                  _id: user_data._id,
                  role: user_data.role,
                },
              })
            );
        }
        {
          user_data.role === "instructor" &&
            dispatch(
              set_instructor_data({
                instructor: {
                  _id: user_data._id,
                  role: user_data.role,
                },
              })
            );
        }


      }
    } catch (error) {
      //Throw error based on the status and rejection message
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };

  //Login Component
  return (
    <div className="relative min-h-screen xl:min-h-screen flex items-center justify-center bg-gray-100 p-4 sm:p-2 md:p-4 lg:p-10">
      {/* <h2 className=" block sm:hidden absolute text-2xl text-center font-extrabold top-6 sm:left-60">
        CourseCloud
      </h2> */}
      <Card
        className=" mx-auto flex relative md:w-10/12 rounded-xl md:max-h-screen"
        id="login_form"
      >
        <h2 className=" hidden md:block absolute sm:text-2xl md:text-3xl font-extrabold top-6 left-8 text-neutral-200">
          CourseCloud
        </h2>
        <img
          src="https://res.cloudinary.com/dtc1xcil8/image/upload/v1730556641/dhil48sknbltoebtjupu.jpg"
          alt=""
          className="sm:max-w-xs md:max-w-sm lg:max-w-md xl:max-w-2xl hidden md:block rounded-xl rounded-r-none"
        />
        <Card className="w-full max-w-[400px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-[550px] sm:rounded-s-sm">
          {/* Login heading */}
          <CardHeader className="space-y-2 sm:space-y-3 md:space-y-4">
            <CardTitle className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-center h-14">
              Login
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
            {/* Form starts here */}
            <Formik
              initialValues={{ email: "", password: "" }}
              validationSchema={form_validation}
              onSubmit={handle_Submit}
            >
              {({ errors, touched, isSubmitting }) => (
                <Form className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-7">
                  {/* email input */}
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm sm:text-base md:text-lg font-medium block"
                    >
                      Email
                    </label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      placeholder="your email"
                      type="email"
                      autoComplete="email"
                      className="h-10 sm:h-11 text-sm sm:text-base"
                    />
                    {/* Showing the validation error message for email */}
                    {errors.email && touched.email && (
                      <div className="text-red-500 text-sm mt-1">
                        {errors.email}
                      </div>
                    )}
                  </div>
                  {/* Password inputs */}
                  <div className="space-y-2">
                    <label
                      htmlFor="password"
                      className="text-sm sm:text-base md:text-lg font-medium block"
                    >
                      Password
                    </label>
                    <div className="relative">
                      <Field
                        as={Input}
                        id="password"
                        name="password"
                        placeholder="your password"
                        autoComplete="current-password"
                        //Checking the state if show and hide password is required
                        type={showPassword ? "text" : "password"}
                        className="h-10 mb-2 sm:h-11 text-sm sm:text-base pr-10"
                      />
                      <button
                        type="button"
                        // setting the state for show and hide password
                        onClick={() => setShowPassword(!showPassword)}
                        className={
                          errors.password
                            ? "absolute right-3 top-8 trForm -translate-y-6"
                            : "absolute right-3 top-1/2 trForm -translate-y-1/2"
                        }
                        aria-label={
                          showPassword ? "Hide password" : "Show password"
                        }
                      >
                        {showPassword ? (
                          <EyeOffIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                        ) : (
                          <EyeIcon className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" />
                        )}
                      </button>
                      {/* Showing the validation error message for password */}
                      {errors.password && touched.password && (
                        <div className="text-red-500 text-sm mt-1">
                          {errors.password}
                        </div>
                      )}
                    </div>
                  </div>
                  {/* Navigate to forgot password if the user forgot the password */}
                  <Link
                    to={forget_password_route}
                    className="text-sm sm:text-base  text-gray-600 hover:underline"
                  >
                    forgot password?
                  </Link>
                  {/* Submit button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-black text-white hover:bg-gray-800 h-10 sm:h-11 text-sm sm:text-base"
                  >
                    Login
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 sm:space-y-5 md:space-y-6">
            {!is_admin && (
              <div className="flex-col items-center">
                <h1 className="text-center text-lg font-medium">
                  Admin Only access
                </h1>
                <p>Unauthorised access will made you in trouble</p>
                <OctagonX className="w-32 h-32 ms-24 mt-3" />
              </div>
            )}

            {/* Option provided , when a user didn't have an account . He can navigate to the register page */}
            {is_admin && (
              <p className="text-sm sm:text-base text-center">
                Don't have an account?{" "}
                <Link
                  to={register_route}
                  className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 font-bold hover:underline"
                >
                  Register
                </Link>
              </p>
            )}
            {is_admin && (
              <div className="text-center text-sm sm:text-base">or</div>
            )}
            {/* Option to register and login with google */}
            {is_admin && (
              <GoogleLogin
                onSuccess={handle_google_auth}
                onError={() => {
                  console.log("Login Failed");
                }}
              />
            )}
            {/* {role === "instructor" && (
              <>
                <h1 className="text-base text-center font-light">
                  "Get into the fasinating world of course and Wish you all the
                  best for your teaching journey."
                </h1>
                <p className="text-right">
                  - By <span className="font-medium">CourseCloud Team</span>
                </p>
              </>
            )}
            {role === "student" && (
              <>
                <h1 className="text-base text-center font-light mb-0">
                  "Get into the fasinating world of course and Wish you all the
                  best for your upskilling journey."
                </h1>
                <p className="text-right">
                  - By <span className="font-medium">CourseCloud Team</span>
                </p>
              </>
            )} */}
          </CardFooter>
        </Card>
      </Card>
    </div>
  );
}

//Exporting the Login component
export default Login;
