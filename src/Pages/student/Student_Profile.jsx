"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import {
  BookOpen,
  ChevronRight,
  GraduationCap,
  Heart,
  Home,
  LayoutDashboard,
  Library,
  LogOut,
  Medal,
  Settings,
  User,
  X,
  Camera,
  Bell,
  Lock,
  EyeOff,
  Eye,
} from "lucide-react";
import { Link } from "react-router-dom";
import { axios_instance } from "@/Config/axios_instance";
import { useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import { Textarea } from "@/Components/ui/textarea";
import * as yup from "yup";
import { toast } from "sonner";
import axios from "axios";
import { cn } from "@/lib/utils";
import { Separator } from "@radix-ui/react-separator";

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
  confirm_password: yup
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
export default function ProfilePage() {
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const [isOpen, setIsOpen] = useState(false);
  const [profileImage, setProfileImage] = useState("/placeholder.svg");
  const [is_profile_data_changed, SetIs_profile_data_changed] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    mobile: "",
    email: "",
    dob: "",
    proffession: "",
    about: "",
    current_password: "",
    new_password: "",
    confirm_password: "",
  });
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setshowConfirmPassword] = useState(false);
  const [studentData, setStudentData] = useState({});

  const get_profile = async () => {
    try {
      const resposnse = await axios_instance.get(
        `api/get_student_data/${student_id}`
      );
      const { success, student_data } = resposnse?.data;
      if (success) {
        setInitialValues({
          name: student_data?.name || "",
          mobile: student_data?.mobile || "",
          email: student_data?.email || "",
          dob: student_data?.dob || "",
          proffession: student_data?.proffession || "",
          about: student_data?.about || "",
          current_password: "",
          new_password: "",
          confirm_password: "",
        });
        setStudentData(student_data);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
        _id: student_id || "",
      };
      console.log(data);

      const response = await axios_instance.put("api/edit_profile", data);
      const { success, message } = response?.data;
      if (success) {
        toast.success(message);
        SetIs_profile_data_changed(!is_profile_data_changed);
      }
    } catch (error) {
      const { message } = error?.response?.data;
      console.log(error);
      toast.error(message);
    }
  };
  useEffect(() => {
    get_profile();
  }, [is_profile_data_changed]);

  const navItems = [
    { href: "/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/profile", icon: User, label: "Profile" },
    { href: "/courses", icon: BookOpen, label: "All courses" },
    { href: "/wishlist", icon: Heart, label: "Wishlist" },
    { href: "/certificates", icon: Medal, label: "Certificates" },
    { href: "/learning", icon: GraduationCap, label: "Learning" },
  ];

  const toggleMenu = () => setIsOpen(!isOpen);
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-blue-50 to-purple-100 text-gray-800">
      {/* Header */}
      <main className="flex-1 w-full md:pt-0 pt-1 overflow-auto bg-gradient-to-br to-primary/10 from-purple-50 via-blue-50">
        {/* Header */}
        <motion.header
          initial={{ y: -100 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", stiffness: 100 }}
          className="sticky top-0 z-10 bg-transparent border-b"
        >
          <div className=" mx-auto px-6 w-full py-4 flex items-center justify-between ">
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={toggleMenu}
              >
                <Library className="h-6 w-6" />
              </Button>
              <AnimatePresence>
                {isOpen && (
                  <motion.div
                    initial={{ x: "-100%" }}
                    animate={{ x: 0 }}
                    exit={{ x: "-100%" }}
                    transition={{
                      type: "spring",
                      stiffness: 300,
                      damping: 30,
                    }}
                    className="fixed inset-y-0 left-0 z-50 w-64 bg-background shadow-lg"
                  >
                    <div className="flex flex-col h-full">
                      <div className="flex items-center justify-between p-4 border-b">
                        <Link
                          href="/"
                          className="flex items-center gap-2 font-bold text-2xl"
                        >
                          <div className="h-8 w-8 rounded-full bg-primary" />
                          CourseCloud
                        </Link>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={toggleMenu}
                        >
                          <X className="h-6 w-6" />
                        </Button>
                      </div>
                      <ScrollArea className="flex-1 px-3 py-4">
                        <div className="space-y-1">
                          {navItems.map((item) => (
                            <Link
                              key={item.href}
                              href={item.href}
                              className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                              )}
                              onClick={toggleMenu}
                            >
                              <item.icon className="h-4 w-4" />
                              {item.label}
                            </Link>
                          ))}
                        </div>
                        <Separator className="my-4" />
                        <div className="space-y-1">
                          <Button
                            variant="ghost"
                            className="w-full justify-start gap-3 text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                            onClick={toggleMenu}
                          >
                            <LogOut className="h-4 w-4" />
                            Logout
                          </Button>
                        </div>
                      </ScrollArea>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
              {isOpen && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ type: "tween" }}
                  className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
                  onClick={toggleMenu}
                />
              )}
              <h1 className="text-2xl font-bold">Profile</h1>
            </div>
          </div>
        </motion.header>

        {/* Breadcrumbs */}
        <motion.nav
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="container mx-auto px-6 py-4"
          aria-label="Breadcrumb"
        >
          <ol className="flex items-center space-x-2 text-sm text-muted-foreground">
            <li>
              <Link to="/" className="hover:text-foreground transition-colors">
                <Home className="h-4 w-4" />
                <span className="sr-only">Home</span>
              </Link>
            </li>
            <li>
              <ChevronRight className="h-4 w-4" />
            </li>
            <li>
              <span className="text-foreground font-medium" aria-current="page">
                profile
              </span>
            </li>
          </ol>
        </motion.nav>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          className="container mx-auto px-6 py-8"
        >
          <div className="flex-1 space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="p-6">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={form_validation}
                    onSubmit={handle_submit}
                    enableReinitialize
                  >
                    {({ errors, touched, setFieldValue }) => (
                      <Form>
                        <div className="flex items-center gap-6 mb-6 p-2">
                          <div className="relative">
                            <img
                              src={
                                studentData.profile
                                  ? studentData.profile
                                  : `https://eu.ui-avatars.com/api/?name=${studentData.name}&size=250`
                              }
                              alt="Profile"
                              width={128}
                              height={128}
                              className="rounded-full object-cover"
                            />
                            <label
                              htmlFor="profile"
                              className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full cursor-pointer hover:bg-purple-700 transition-colors"
                            >
                              <Camera className="h-4 w-4" />
                            </label>
                            <Field name="profile" id="profile">
                              {({ field }) => (
                                <input
                                  type="file"
                                  id="profile"
                                  name="profile"
                                  className="hidden"
                                  accept="image/*"
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
                          <div>
                            <h2 className="text-2xl font-semibold">
                              {studentData.name
                                ? studentData.name
                                : "Full Name"}
                            </h2>
                            <p className="text-gray-600">
                              {studentData.proffession
                                ? studentData.proffession
                                : "Proffession"}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-8">
                          <div>
                            <h2 className="text-xl font-semibold mb-4">
                              Personal Information
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div className="space-y-2">
                                <Label htmlFor="name">Full Name</Label>
                                <Field
                                  as={Input}
                                  id="name"
                                  name="name"
                                  placeholder="John Doe"
                                />
                                {errors.name && touched.name && (
                                  <div className="text-sm text-red-500">
                                    {errors.name}
                                  </div>
                                )}
                              </div>
                              {/* <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Field
                                  as={Input}
                                  id="email"
                                  name="email"
                                  type="email"
                                  placeholder="john.doe@example.com"
                                />
                                {errors.email && touched.email && (
                                  <div className="text-sm text-red-500">
                                    {errors.email}
                                  </div>
                                )}
                              </div> */}
                              <div className="space-y-2">
                                <Label htmlFor="mobile">Phone</Label>
                                <Field
                                  as={Input}
                                  id="mobile"
                                  name="mobile"
                                  type="tel"
                                  placeholder="9036623554"
                                />
                                {errors.mobile && touched.mobile && (
                                  <div className="text-sm text-red-500">
                                    {errors.mobile}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="dob">Date of Birth</Label>
                                <Field
                                  as={Input}
                                  type="date"
                                  id="dob"
                                  name="dob"
                                />
                                {errors.dob && touched.dob && (
                                  <div className="text-sm text-red-500">
                                    {errors.dob}
                                  </div>
                                )}
                              </div>
                              <div className="space-y-2">
                                <Label htmlFor="proffesssion">
                                  Proffesssion
                                </Label>
                                <Field
                                  as={Input}
                                  type="text"
                                  id="proffession"
                                  name="proffession"
                                  placeholder="Your proffession"
                                />
                                {errors.proffession && touched.proffession && (
                                  <div className="text-sm text-red-500">
                                    {errors.proffession}
                                  </div>
                                )}
                              </div>
                            </div>
                            <div className="mt-6 space-y-2">
                              <Label htmlFor="bio">About</Label>
                              <Field
                                as={Textarea}
                                id="about"
                                name="about"
                                className="w-full min-h-[100px] p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
                                placeholder="Passionate web developer with 5 years of experience in creating responsive and user-friendly websites."
                              />
                              {errors.about && touched.about && (
                                <div className="text-sm text-red-500">
                                  {errors.about}
                                </div>
                              )}
                            </div>
                          </div>

                          {!studentData?.googleId && (
                            <div>
                              <h2 className="text-xl font-semibold mb-4">
                                Account Settings
                              </h2>
                              <div className="space-y-6">
                                <div>
                                  <h3 className="text-lg font-medium mb-2">
                                    Change Password
                                  </h3>
                                  <div className="space-y-4">
                                    <div className="space-y-2">
                                      <Label htmlFor="current_password">
                                        Current Password
                                      </Label>
                                      <div className="relative">
                                        <Field
                                          as={Input}
                                          id="current_password"
                                          name="current_password"
                                          className="h-10"
                                          type={
                                            showCurrentPassword
                                              ? "text"
                                              : "password"
                                          }
                                          placeholder="Your password"
                                        />
                                        <button
                                          type="button"
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                          onClick={() =>
                                            setShowCurrentPassword(
                                              !showCurrentPassword
                                            )
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
                                    <div className="space-y-2">
                                      <Label htmlFor="newPassword">
                                        New Password
                                      </Label>
                                      <div className="relative">
                                        <Field
                                          as={Input}
                                          id="new_password"
                                          name="new_password"
                                          className="h-10"
                                          type={
                                            showNewPassword
                                              ? "text"
                                              : "password"
                                          }
                                          placeholder="Your password"
                                        />
                                        <button
                                          type="button"
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                          onClick={() =>
                                            setShowNewPassword(!showNewPassword)
                                          }
                                        >
                                          {showNewPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                          ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                          )}
                                        </button>
                                        {errors.new_password &&
                                          touched.new_password && (
                                            <div className="text-sm text-red-500">
                                              {errors.new_password}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                    <div className="space-y-2">
                                      <Label htmlFor="confirmPassword">
                                        Confirm New Password
                                      </Label>
                                      <div className="relative">
                                        <Field
                                          as={Input}
                                          id="confirm_password"
                                          name="confirm_password"
                                          className="h-10"
                                          type={
                                            showConfirmPassword
                                              ? "text"
                                              : "password"
                                          }
                                          placeholder="Your confirm password"
                                        />
                                        <button
                                          type="button"
                                          className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                          onClick={() =>
                                            setshowConfirmPassword(
                                              !showConfirmPassword
                                            )
                                          }
                                        >
                                          {showConfirmPassword ? (
                                            <EyeOff className="h-4 w-4 text-gray-400" />
                                          ) : (
                                            <Eye className="h-4 w-4 text-gray-400" />
                                          )}
                                        </button>
                                        {errors.confirm_password &&
                                          touched.confirm_password && (
                                            <div className="text-sm text-red-500">
                                              {errors.confirm_password}
                                            </div>
                                          )}
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                        <Button type="submit" className="mt-8">
                          Save Changes
                        </Button>
                      </Form>
                    )}
                  </Formik>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
