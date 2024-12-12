import React, { useEffect, useState } from "react";
import { Eye, EyeOff, Home } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Formik, Form, Field } from "formik";
import * as yup from "yup";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { Link } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import axios from "axios";
import { toast } from "sonner";
import { Textarea } from "../ui/textarea";
import { motion } from "framer-motion";

// import { URL } from "url";
const form_validation = yup.object({
  name: yup
    .string()
    .matches(
      /^[a-zA-Z ]+$/,
      "Name should only contain alphabet or whitespace "
    ),
  mobile: yup
    .string()
    .min(10, "Mobile number must be 10 digits")
    .matches(/^[0-9]+$/, "Mobile number must be in integer"),
  email: yup.string().email("Invalid Email address"),
  dob: yup.date(),
  current_password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain atleast one capital letter")
    .matches(/[\d]/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    ),
  new_password: yup
    .string()
    .min(6, "password must be atleast 6 characters")
    .matches(/[A-Z]/, "Password must contain atleast one capital letter")
    .matches(/[\d]/, "Password must contain atleast one digit")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain atleast one special character"
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must be same"),
  profile: yup.mixed(),
  about: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!%@&#?."';:, ]+$/,
      `About should only contain alphabet, numbers, speacials characters (@,!,#,&,?,.,",',;,:,) or whitespace `
    )
    .matches(/^\s*\S[\s\S]*$/, "Enter valid description"),
  proffession: yup
    .string()
    .matches(
      /^[a-zA-Z ]+$/,
      "Proffession should only contain alphabet or whitespace "
    ),
});

export default function Profile({ current_role, user_route }) {
  const admin = useSelector((state) => state?.admin?.admin_data?.admin);
  const student = useSelector((state) => state?.student?.student_data?.student);
  const instructor = useSelector(
    (state) => state?.instructor?.instructor_data?.instructor
  );
  const [role, setRole] = useState("");
  const [get_user_route, setGet_user_route] = useState("");
  const [edit_user_route, setEdit_user_route] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [user_id, setUser_id] = useState("");
  const [user_data, setUser_data] = useState();
  const [is_user_data_changed, setIs_user_data_changed] = useState("");
  const [home_route, setHome_route] = useState("");

  console.log(admin);

  useEffect(() => {
    setRole(current_role);
    setGet_user_route(user_route);
    if (role === "Student") {
      setHome_route("/dashboard");
      setEdit_user_route("api/edit_student");
      setUser_id(student?._id);
    } else if (role === "Instructor") {
      setHome_route("instuctor/dashboard");
      setEdit_user_route("api/instructor/edit_instructor");
      setUser_id(instructor?._id);
    } else if (role === "Admin") {
      setHome_route("admin/dashboard");
      setEdit_user_route("api/admin/edit_admin");
      setUser_id(admin?._id);
    }
  });

  useEffect(() => {
    const get_user = async () => {
      try {
        console.log(`${get_user_route}/${user_id}`);

        const response = await axios_instance.get(
          `${get_user_route}/${user_id}`
        );
        console.log(response);
        const { success, message, user_data } = response?.data;
        if (success) {
          setUser_data(user_data);
          console.log(user_data);
        }
      } catch (error) {
        console.log(error);
      }
    };
    get_user();
  }, [user_id, is_user_data_changed]);

  console.log(user_data);

  //   const SidebarContent = () => (
  //     <nav>
  //       <ul className="space-y-2">
  //         {[
  //           "Dashboard",
  //           "Profile",
  //           "Student Management",
  //           "Instructor Management",
  //           "Course Management",
  //           "Category Management",
  //         ].map((item, index) => (
  //           <li key={index}>
  //             <a
  //               href="#"
  //               className={`block px-4 py-2 rounded-md ${
  //                 item === "Profile"
  //                   ? "bg-blue-500 text-white"
  //                   : "text-gray-700 hover:bg-gray-200"
  //               }`}
  //             >
  //               {item}
  //             </a>
  //           </li>
  //         ))}
  //       </ul>
  //       <button className="mt-4 w-full px-4 py-2 bg-red-500 text-white rounded-md flex items-center justify-center">
  //         <LogOut className="mr-2 h-4 w-4" /> Logout
  //       </button>
  //     </nav>
  //   );
  //

  const Cloudinary_Upload = async (profile) => {
    const formData = new FormData();
    formData.append("file", profile);
    formData.append("upload_preset", "CourseCloud");
    formData.append("cloud_name", "dtc1xcil8");
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dtc1xcil8/image/upload",
        formData
      );
      return response.data.secure_url;
    } catch (error) {
      console.log(error);
    }
  };
  // Function to handle edit form submit
  const handle_submit = async (values) => {
    try {
      console.log(values);
      //if the user edited there profile pic . it wil upload it to the cloudinary and sent the data back
      if (values?.profile) {
        const profile_Cld_Url = await Cloudinary_Upload(values?.profile);
        values.profile = profile_Cld_Url;
      }
      const data = {
        name: values?.name || "",
        email: values?.email || "",
        mobile: values?.mobile || "",
        dob: values?.dob || "",
        current_password: values?.current_password || "",
        new_password: values?.new_password || "",
        profile: values?.profile || "",
        proffession: values?.proffession || "",
        about: values?.about || "",
        _id: user_id || "",
      };
      console.log(data);

      const response = await axios_instance.patch(edit_user_route, data);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        setIs_user_data_changed(!is_user_data_changed);
      }
    } catch (error) {
      // const {message} = error?.response?.data
      console.log(error);
      // toast.error(message)
    }
  };
  return (
    <>
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-6xl mx-auto "
      >
        <div className=" mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to={home_route}>{role}</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{`${role} Profile`}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-black to-purple-600  mt-2">
            Profile
          </h2>
        </div>

        {/* Personal info card */}
        <Card className="mb-8">
          <CardContent className="p-6 pt-0.5">
            <CardHeader className="pl-1.5 pb-1">
              <h3 className="hidden sm:block text-2xl font-bold text-center sm:text-left">
                Personal Info
              </h3>
            </CardHeader>
            <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-10 ">
              <Avatar className="w-36 h-36 mt-4">
                <AvatarImage
                  src={user_data?.profile || ""}
                  alt="Profile picture"
                  className="w-36 h-36"
                />
                <AvatarFallback>AM</AvatarFallback>
                {console.log(user_data?.profile)}
              </Avatar>
              <div className="flex-col space-y-4  text">
                <h3 className="block sm:hidden text-2xl font-bold text-center sm:text-left">
                  Personal Info
                </h3>
                <p>
                  <span className="font-semibold text-base">Name:</span>{" "}
                  {user_data?.name || "User's Name"}
                </p>
                <p>
                  <span className="font-semibold text-base">Email:</span>{" "}
                  {user_data?.email || "User's Email"}
                </p>
                <p>
                  <span className="font-semibold text-base">Phone:</span>{" "}
                  {user_data?.mobile || "Nil"}
                </p>
                <p>
                  <span className="font-semibold text-base">DOB:</span>{" "}
                  {user_data?.dob || "Nil"}
                </p>
                <p>
                  <span className="font-semibold text-base">Proffession:</span>{" "}
                  {user_data?.proffession || "Nil"}
                </p>
              </div>
            </div>
            <p className="p-2 border rounded-lg mt-2">
              <span className="font-semibold text-lg">About:</span>{" "}
              {user_data?.about || "Nil"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="text-xl font-semibold mb-4 ">Edit Profile</h3>
            <Formik
              initialValues={{
                name: user_data?.name || "",
                email: user_data?.email || "",
                mobile: user_data?.mobile || "",
                dob: user_data?.dob || "",
                proffession: user_data?.proffession || "",
                about: user_data?.about || "",
                current_password: "",
                new_password: "",
                confirmPassword: "",
                profile: "",
              }}
              validationSchema={form_validation}
              onSubmit={handle_submit}
              enableReinitialize
            >
              {({ errors, touched, setFieldValue }) => (
                <Form className="space-y-4">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="fullName"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Full Name
                    </label>
                    <Field
                      as={Input}
                      id="name"
                      name="name"
                      placeholder="Your name"
                      className="h-10"
                    />
                    {errors.name && touched.name && (
                      <div className="text-sm text-red-500">{errors.name}</div>
                    )}
                  </div>
                  {/* Mobile */}
                  <div>
                    <label
                      htmlFor="mobile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Mobile no.
                    </label>
                    <Field
                      as={Input}
                      id="mobile"
                      name="mobile"
                      placeholder="Your mobile no."
                      className="h-10"
                      maxLength="10"
                    />
                    {errors.mobile && touched.mobile && (
                      <div className="text-sm text-red-500">
                        {errors.mobile}
                      </div>
                    )}
                  </div>
                  {/* Email */}
                  {/* <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email
                    </label>
                    <Field
                      as={Input}
                      id="email"
                      name="email"
                      type="email"
                      placeholder="Your email"
                      className="h-10"
                    />
                    {errors.email && touched.email && (
                      <div className="text-sm text-red-500">{errors.email}</div>
                    )}
                  </div> */}
                  {/* Dob */}
                  <div>
                    <label
                      htmlFor="dob"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Date of birth
                    </label>
                    <Field
                      as={Input}
                      id="dob"
                      name="dob"
                      type="date"
                      className="h-10"
                      placeholder="Your date-of-birth"
                    />
                    {errors.dob && touched.dob && (
                      <div className="text-sm text-red-500">{errors.dob}</div>
                    )}
                  </div>
                  {/* Proffesion */}
                  {role === "Instructor" && (
                    <div>
                      <label
                        htmlFor="proffession"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Proffession
                      </label>
                      <Field
                        as={Input}
                        id="proffession"
                        name="proffession"
                        placeholder="Your proffession"
                        className="h-10"
                      />
                      {errors.proffession && touched.proffession && (
                        <div className="text-sm text-red-500">
                          {errors.proffession}
                        </div>
                      )}
                    </div>
                  )}
                  {role === "Instructor" && (
                    <div>
                      <label
                        htmlFor="about"
                        className="block text-sm font-medium text-gray-700"
                      >
                        About
                      </label>
                      <Field
                        as={Textarea}
                        id="about"
                        name="about"
                        placeholder="About yourself"
                        // className="h-10"
                        rows={4}
                      />
                      {errors.about && touched.about && (
                        <div className="text-sm text-red-500">
                          {errors.about}
                        </div>
                      )}
                    </div>
                  )}
                  {/* Current password */}
                  {!user_data?.googleId && (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Current Password
                      </label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="current_password"
                          name="current_password"
                          className="h-10"
                          type={showCurrentPassword ? "text" : "password"}
                          placeholder="Your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowCurrentPassword(!showCurrentPassword)
                          }
                        >
                          {showCurrentPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        {errors.current_password &&
                          touched.current_password && (
                            <div className="text-sm text-red-500">
                              {errors.current_password}
                            </div>
                          )}
                      </div>
                    </div>
                  )}
                  {/* New password */}
                  {!user_data?.googleId && (
                    <div>
                      <label
                        htmlFor="password"
                        className="block text-sm font-medium text-gray-700"
                      >
                        New Password
                      </label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="new_password"
                          name="new_password"
                          className="h-10"
                          type={showNewPassword ? "text" : "password"}
                          placeholder="Your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                        >
                          {showNewPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        {errors.new_password && touched.new_password && (
                          <div className="text-sm text-red-500">
                            {errors.new_password}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Confirm password */}
                  {!user_data?.googleId && (
                    <div>
                      <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Confirm password
                      </label>
                      <div className="relative">
                        <Field
                          as={Input}
                          id="confirmPassword"
                          name="confirmPassword"
                          className="h-10"
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Your password"
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                          onClick={() =>
                            setShowConfirmPassword(!showConfirmPassword)
                          }
                        >
                          {showConfirmPassword ? (
                            <EyeOff className="h-4 w-4 text-gray-400" />
                          ) : (
                            <Eye className="h-4 w-4 text-gray-400" />
                          )}
                        </button>
                        {errors.confirmPassword && touched.confirmPassword && (
                          <div className="text-sm text-red-500">
                            {errors.confirmPassword}
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                  {/* Upload picture */}
                  <div>
                    <label
                      htmlFor="profile"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Upload Picture
                    </label>
                    <Field name="profile" id="profile">
                      {({ field }) => (
                        <input
                          className="border rounded-md w-full h-11 file:bg-neutral-100 file:mt-0 file:border-neutral-100 file:border-0 file:rounded-s-lg file:mr-6 file:w-32 file:h-11 "
                          type="file"
                          onChange={(event) => {
                            setFieldValue(
                              field.name,
                              event.currentTarget.files[0]
                            );
                          }}
                        />
                      )}
                    </Field>
                    {errors.profile && touched.profile && (
                      <div className="text-sm text-red-500">
                        {errors.profile}
                      </div>
                    )}
                  </div>
                  {/* Edit btn */}
                  <Button type="submit" className="w-full">
                    Edit profile
                  </Button>
                </Form>
              )}
            </Formik>
          </CardContent>
        </Card>
      </motion.div>
    </>
  );
}
