import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/Components/ui/select";
import { ArrowLeft, PlusCircle, Upload } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import * as yup from "yup";
import { Formik, Form, Field } from "formik";
import CloudinaryUploadWidget_Image from "@/Utils/CloudinaryImageUpload";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { axios_instance } from "@/Config/axios_instance";
import { remove_course_plan } from "@/Redux/Slices/CoursePlan";
import { remove_Course_Curriculum } from "@/Redux/Slices/CourseCuriculum";
import CustomSuccessDialogBox from "@/Components/build/CustomSuccessDialog";
import { motion } from "framer-motion";
const validation_form = yup.object({
  title: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Title should only contain alphabet,numbers or whitespace "
    )
    .required("Title is required"),
  subtitle: yup
    .string()
    .matches(
      /^[a-zA-Z0-9 ]+$/,
      "Subtitle should only contain alphabet,numbers or whitespace "
    )
    .required("Subtitle is required"),
  description: yup
    .string()
    .matches(
      /^[a-zA-Z0-9!%@&#?."';:, ]+$/,
      `Description should only contain alphabet, numbers, speacials characters (@,!,#,&,?,.,",',;,:,) or whitespace `
    )
    .required("Description is required"),
  language: yup.string().required("Language of the course is required"),
  difficulty: yup.string().required("Difficulty of the course is required"),
  category: yup.string().required("Category of the course is required"),
  subcategory: yup.string().required("Subcategory of the course is required"),
  subject: yup.string().required("Subject of the course is required"),
  thumbnail: yup.string().required("Thumbnail of the course is required"),
  price: yup
    .string()
    .matches(/^[0-9,. ]+$/, "Price must be in numeric")
    .required("Price of the course is required"),
});

export default function Instructor_Create_Course_Preview() {
  const instructor_id = useSelector(
    (state) => state?.instructor?.instructor_data?.instructor?._id
  );
  console.log(instructor_id);

  const course_curriculam = useSelector(
    (state) => state?.course_curriculum?.Course_Curriculum?.data
  );
  console.log("course curriculaum", course_curriculam);

  const course_plan = useSelector(
    (state) => state?.course_plan?.Course_plan?.data
  );
  console.log("Course plan", course_plan);

  const [thumbnailPreview, setThumbnailPreview] = useState("");
  const [Course_curriculum_data, setCourse_curriculum_data] = useState("");
  const [course_categories, setCourse_categories] = useState([]);
  const [course_subcategories, setCourse_subcategories] = useState([]);
  const [isDialogOpen, setisDialogOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formikRef = useRef();

  const handleFormSubmit = async (values) => {
    console.log(values);
    try {
      const course_data = {
        instructor_id: instructor_id,
        course_preview: values,
        course_plan: course_plan,
        course_curriculam: course_curriculam,
      };
      const response = await axios_instance.post(
        "api/instructor/add_course",
        course_data
      );
      const { message, success } = response?.data;
      if (success) {
        dispatch(remove_course_plan());
        dispatch(remove_Course_Curriculum());
        setisDialogOpen(true);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const get_category = async () => {
    try {
      const response = await axios_instance.get(
        "api/instructor/get_category_instructor"
      );
      // console.log(response);
      const { message, success, categories } = response?.data;
      if (success) {
        setCourse_categories(categories);
      }
    } catch (error) {
      console.log(error);
      const { message } = error?.response?.data;
      toast.error(message);
    }
  };

  useEffect(() => {
    setCourse_curriculum_data(course_curriculam);
    get_category();
  }, []);

  const handleCategoryChange = (value) => {
    formikRef.current.setFieldValue("category", value);
    const category = course_categories.filter(
      (category) => category._id === value
    );
    const subcategory = category[0].sub_category.filter(
      (subcategory) => subcategory.status === true
    );
    setCourse_subcategories(subcategory);
    console.log(category);
    console.log(subcategory);
  };

  const handleThumbnailUpload = (thumbnail) => {
    formikRef.current.setFieldValue("thumbnail", thumbnail);
    setThumbnailPreview(thumbnail);
    console.log("image:", thumbnail);
  };

  return (
    <>
      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="max-w-5xl mx-auto sm:mx-2"
      >
        {/* Course highlighter */}
        <div className="flex justify-between mb-8">
          <div className="text-center flex sm:flex flex-col sm:flex-row  items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              1
            </div>
            <span className="ml-2 font-semibold">Course plan</span>
          </div>
          <div className="flex text-center sm:flex flex-col sm:flex-row  items-center">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              2
            </div>
            <span className="ml-2 font-semibold">Course curriculum</span>
          </div>
          <div className="flex text-center sm:flex flex-col sm:flex-row  items-center ">
            <div className="w-8 h-8 rounded-full bg-black text-white flex items-center justify-center">
              3
            </div>
            <span className="ml-2">Course preview</span>
          </div>
        </div>
        {/* Course Preview Form */}
        <div className="space-y-6  ">
          <div>
            <h3 className="text-2xl font-semibold mb-1">Course Preview</h3>
            <p className="text-sm font-normal">
              Please complete the fields below with the specific details of your
              course.
            </p>
          </div>
          <Formik
            initialValues={{
              title: "",
              subtitle: "",
              description: "",
              language: "",
              difficulty: "",
              category: "",
              subcategory: "",
              subject: "",
              thumbnail: "",
              price: "",
            }}
            innerRef={formikRef}
            validationSchema={validation_form}
            onSubmit={handleFormSubmit}
          >
            {({
              errors,
              touched,
              isSubmitting,
              setFieldValue,
              setFieldTouched,
            }) => (
              <Form className="space-y-4 sm:border p-2 sm:p-4 rounded-lg bg-white">
                <div>
                  <Label htmlFor="title" className="text-base">
                    Course Title
                  </Label>
                  <Field
                    as={Input}
                    id="title"
                    name="title"
                    className="h-11"
                    placeholder="Eg. Learn the basics of python"
                  />
                  {errors.title && touched.title && (
                    <div className="text-sm text-red-500">{errors.title}</div>
                  )}
                </div>

                <div>
                  <Label htmlFor="subtitle" className="text-base">
                    Course Subtitle
                  </Label>
                  <Field
                    as={Input}
                    id="subtitle"
                    name="subtitle"
                    className="h-11"
                    placeholder="Eg. You will get to deep knowledge in python"
                  />
                  {errors.subtitle && touched.subtitle && (
                    <div className="text-sm text-red-500">
                      {errors.subtitle}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Use a brief memorable statement to tell what will be done
                    after completing your course.
                  </p>
                </div>

                <div>
                  <Label htmlFor="description" className="text-base">
                    Course Description
                  </Label>
                  <Field
                    as={Textarea}
                    id="description"
                    name="description"
                    placeholder="Eg. Learn how to design a website using HTML, CSS, JS"
                    className="min-h-[100px]"
                  />
                  {errors.description && touched.description && (
                    <div className="text-sm text-red-500">
                      {errors.description}
                    </div>
                  )}
                  <p className="text-xs text-gray-500 mt-1">
                    Course description should have 500 words
                  </p>
                </div>

                <div>
                  <h4 className="font-semibold mb-3">Basic Info</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Field id="language" name="language">
                        {({ field }) => (
                          <Select
                            value={field.value}
                            onFocus={() => setFieldTouched("language", true)}
                            onValueChange={(value) =>
                              setFieldValue("language", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Language" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="english">English</SelectItem>
                              <SelectItem value="spanish">Spanish</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {errors.language && touched.language && (
                        <div className="text-sm text-red-500">
                          {errors.language}
                        </div>
                      )}
                    </div>
                    {/* Diffuculty selector */}
                    <div>
                      <Field id="difficulty" name="difficulty">
                        {({ field }) => (
                          <Select
                            value={field.value}
                            onFocus={() => setFieldTouched("difficulty", true)}
                            onValueChange={(value) =>
                              setFieldValue("difficulty", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Difficulty" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="beginner">Beginner</SelectItem>
                              <SelectItem value="intermediate">
                                Intermediate
                              </SelectItem>
                              <SelectItem value="advanced">Advanced</SelectItem>
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {errors.difficulty && touched.difficulty && (
                        <div className="text-sm text-red-500">
                          {errors.difficulty}
                        </div>
                      )}
                    </div>
                    {/* Category selector */}
                    <div>
                      <Field id="category" name="category">
                        {({ field }) => (
                          <Select
                            value={field.value}
                            onFocus={() => setFieldTouched("category", true)}
                            onValueChange={(value) =>
                              handleCategoryChange(value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {course_categories.map((category) => {
                                return (
                                  <SelectItem
                                    key={category._id}
                                    value={category._id}
                                  >
                                    {category.title}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {console.log(course_categories)}
                      {errors.category && touched.category && (
                        <div className="text-sm text-red-500">
                          {errors.category}
                        </div>
                      )}
                    </div>
                    {/* Subcategory selector */}
                    <div>
                      <Field id="subcategory" name="subcategory">
                        {({ field }) => (
                          <Select
                            value={field.value}
                            onFocus={() => setFieldTouched("subcategory", true)}
                            onValueChange={(value) =>
                              setFieldValue("subcategory", value)
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Sub-category" />
                            </SelectTrigger>
                            <SelectContent>
                              {course_subcategories.map((subcategory) => {
                                return (
                                  <SelectItem
                                    key={subcategory._id}
                                    value={subcategory.title}
                                  >
                                    {subcategory.title}
                                  </SelectItem>
                                );
                              })}
                            </SelectContent>
                          </Select>
                        )}
                      </Field>
                      {errors.subcategory && touched.subcategory && (
                        <div className="text-sm text-red-500">
                          {errors.subcategory}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                {/* Course Subject */}
                <div>
                  <Label htmlFor="primary" className="text-base">
                    What is primarily taught in your course?
                  </Label>
                  <Field
                    as={Input}
                    id="subject"
                    name="subject"
                    className="h-11"
                    placeholder="Eg. Web development"
                  />
                  {errors.subject && touched.subject && (
                    <div className="text-sm text-red-500">{errors.subject}</div>
                  )}
                </div>
                {/* Course Thumbnail */}
                <div>
                  <Label className="text-base">Course Thumbnail</Label>
                  <div className="mt-2 flex items-start gap-4">
                    <div className="relative w-40 aspect-video border bg-gray-100 rounded-lg overflow-hidden">
                      <img
                        src={
                          thumbnailPreview
                            ? `${thumbnailPreview}`
                            : "https://placehold.co/600x400"
                        }
                        alt="Course thumbnail placeholder"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <CloudinaryUploadWidget_Image
                      onUploadComplete={(url) => handleThumbnailUpload(url)}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Upload your course here. It must meet our quality standards
                    to be accepted. Important guidelines: 1500x1000 pixels or
                    4:3 aspect ratio; .jpg, .jpeg,. gif, .bmp , .webp or .png.
                    Image size must be lower than 5MB
                  </p>
                  {errors.thumbnail && touched.thumbnail && (
                    <div className="text-sm text-red-500">
                      {errors.thumbnail}
                    </div>
                  )}
                </div>
                {/* Course Price */}
                <div>
                  <Label htmlFor="price" className="text-base">
                    Course Price
                  </Label>
                  <Field
                    as={Input}
                    id="price"
                    name="price"
                    className="h-11"
                    placeholder="Eg. Rs.7,999"
                  />
                  {errors.price && touched.price && (
                    <div className="text-sm text-red-500">{errors.price}</div>
                  )}
                </div>
                <div className="mt-8 flex justify-between">
                  <Button
                    className="bg-black text-white px-4"
                    onClick={() => navigate("/instructor/create_course/2")}
                  >
                    <ArrowLeft className="ml-1 h-4 w-4" />
                    Previous
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-black text-white hover:bg-gray-800"
                  >
                    Add Course
                    <PlusCircle className="mr-2 h-4 w-4" />
                  </Button>
                </div>
              </Form>
            )}
          </Formik>
          <CustomSuccessDialogBox
            isOpen={isDialogOpen}
            onClose={() => setisDialogOpen(false)}
            title={"Course Added Successfully"}
            subtitle={"Keep going & earn more"}
            description={
              "The course is reviewed and added to this platform shortly"
            }
            buttonText={"Back to create course"}
            customRoute={"/instructor/create_course"}
          />
        </div>
      </motion.div>
    </>
  );
}
