import React, { useState } from "react";
import { Search, User, Plus, Goal, Delete } from "lucide-react";
import { Button } from "../../Components/ui/button.jsx";
import { Input } from "../../Components/ui/input.jsx";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { set_course_plan } from "@/Redux/Slices/CoursePlan";
import { motion } from "framer-motion";
// import { Field, Formik, Form } from "formik";

export default function Instructor_Create_Course_Plan() {
  // const [learningObjectiveError, setLearningObjectiveError] = useState("");
  //   // const [targetAudienceError, setTargetAudienceError] = useState("");
  //   // const [requirementsError, setRequirementsError] = useState("");
  const [isRequirementsErrorFound, setIsRequirementsErrorFound] = useState("");
  const [isTargetAudienceErrorFound, setIsTargetAudienceErrorFound] =
    useState("");
  const [isLearningObjectiveErrorFound, setIsLearningObjectiveErrorFound] =
    useState(false);
  const [
    isLearningObjectiveErrorFoundMin,
    setIsLearningObjectiveErrorFoundMin,
  ] = useState(false);
  // const [isErrorFound, setIsErrorFound] = useState(false);
  const [objective, setObjective] = useState("");
  const [requirement, setRequirement] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [learningObjectives, setLearningObjectives] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [targetAudiences, setTargetAudiences] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const validation = () => {
    let isErrorFound = false;
    if (learningObjectives.length === 0) {
      isErrorFound = true;
      setIsLearningObjectiveErrorFound(true);
    } else if (learningObjectives.length < 1) {
      isErrorFound = true;
      setIsLearningObjectiveErrorFoundMin(true);
    }

    if (requirements.length === 0) {
      isErrorFound = true;
      setIsRequirementsErrorFound(true);
    }
    if (targetAudiences.length === 0) {
      isErrorFound = true;
      setIsTargetAudienceErrorFound(true);
    }

    return isErrorFound;
  };
  // const validation_schema = async () => {
  //   if (learningObjectives.length === 0) {
  //     setLearningObjectiveError("Learning objectives are required");
  //     setIsLearningObjectiveErrorFound(true);
  //     console.log(isLearningObjectiveErrorFound);
  //   } else if (learningObjectives.length < 4) {
  //     setLearningObjectiveError("Minimum 4 objectives required");
  //     setIsLearningObjectiveErrorFound(true);
  //   } else {
  //     setIsLearningObjectiveErrorFound(false);
  //   }

  //   if (targetAudiences.length === 0) {
  //     setTargetAudienceError("target audience field is required");
  //     setIsTargetAudienceErrorFound(true);
  //   } else {
  //     setIsTargetAudienceErrorFound(false);
  //   }

  //   if (requirements.length === 0) {
  //     setRequirementsError("Requirements is required");
  //     setIsRequirementsErrorFound(true);
  //   } else {
  //     setIsRequirementsErrorFound(false);
  //   }

  //   if (isLearningObjectiveErrorFound) {
  //     setIsErrorFound(true);
  //   } else if (isRequirementsErrorFound) {
  //     setIsErrorFound(true);
  //   } else if (isTargetAudienceErrorFound) {
  //     setIsErrorFound(true);
  //   } else {
  //     setIsErrorFound(false)
  //   }
  //   return isErrorFound
  // };
  // const addItem = (setter, inputId) => {
  //   const input = document.getElementById(inputId).value;
  //   if (input.value.trim()) {
  //     setLearningObjectives([...learningObjectives, input]);
  //     // setter((prev) => [...prev, input.value.trim()]);
  //     input.value = "";
  //   }
  // };

  //Function to add learning objectives

  //Function to add learning objectives
  const addLearningObjectives = (e) => {
    e.preventDefault();
    const input = objective.trim();
    const isExist = learningObjectives.filter((val) => {
      return val.trim().toLowerCase() === input.toLowerCase();
    });
    console.log(isExist);

    if (input !== "" && isExist.length === 0) {
      setLearningObjectives((prev) => [...prev, input]);
      console.log(setLearningObjectives);
      setObjective("");
    }
  };

  //Function to remove the added objective
  const handleRemoveObjective = (e, index) => {
    e.preventDefault();
    console.log(index);

    //Removing one of the objective based on the users action
    const removed = learningObjectives.splice(index, 1);
    setLearningObjectives((prev) => [...prev]);
    console.log(`removed : ${removed}`);
  };

  //Function to add requirements
  const addRequirements = (e) => {
    e.preventDefault();
    const input = requirement.trim();
    const isExist = requirements.filter((val) => {
      return val.trim().toLowerCase() === input.toLowerCase();
    });
    console.log(isExist);

    if (input !== "" && isExist.length === 0) {
      setRequirements((prev) => [...prev, input]);
      console.log();
      setRequirement("");
    }
  };

  //Function to remove added requirements
  const handleRemoveRequirements = (e, index) => {
    e.preventDefault();
    console.log(index);
    //remove the purticular requirement based on the user action
    const removed = requirements.splice(index, 1);
    setRequirements((prev) => [...prev]);
    console.log("removed : ", removed);
  };
  //Function to add target audiences
  const addTargetAudiences = (e) => {
    e.preventDefault();
    const input = targetAudience.trim();
    const isExist = targetAudiences.filter((val) => {
      return val.trim().toLowerCase() === input.toLowerCase();
    });
    console.log(isExist);

    if (input !== "" && isExist.length === 0) {
      setTargetAudiences((prev) => [...prev, input]);
      console.log();
      setTargetAudience("");
    }
  };
  //fucntion to remove audiences
  const handleRemoveAudience = (e, index) => {
    e.preventDefault();
    console.log(index);

    const removed = targetAudiences.splice(index, 1);
    setTargetAudiences((prev) => [...prev]);
    console.log("removed : ", removed);
  };

  const handleRedirectNext = async (e) => {
    e.preventDefault();
    console.log(validation());

    if (!validation()) {
      dispatch(
        set_course_plan({
          data: {
            learningObjectives,
            targetAudiences,
            requirements,
          },
        })
      );
      navigate("/instructor/create_course/2");
      setIsErrorFound(false);
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="flex max-w-2xl justify-between mb-8">
          {/* Course Plan highlighter */}
          <div className="text-center sm:flex flex-col sm:flex-row  items-center">
            <div className="w-8 h-8 ms-8 sm:m-0 rounded-full bg-black text-white flex items-center justify-center">
              1
            </div>
            <span className="ml-2 text-sm sm:text-base font-semibold">
              Course plan
            </span>
          </div>
          {/* Course Currriculum highlighter */}
          <div className="text-center sm:flex flex-col sm:flex-row sm:items-center text-gray-400 ">
            <div className="w-8 h-8 ms-12 sm:m-0 rounded-full bg-gray-200 flex items-center justify-center">
              2
            </div>
            <span className="ml-2 text-sm sm:text-base ">
              Course curriculum
            </span>
          </div>

          {/* Course preview highlighter */}
          <div className="text-center sm:flex flex-col sm:flex-row items-center text-gray-400">
            <div className="w-8 h-8 ms-9 sm:m-0 rounded-full bg-gray-200 flex items-center justify-center">
              3
            </div>
            <span className="ml-2 text-sm sm:text-base">Course preview</span>
          </div>
        </div>

        <form className="space-y-6">
          {/* Learning objectives */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What will students learn from this course ?
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Add minimum 4 objective you must provide
            </p>
            <div className="flex mb-2">
              <Input
                id="learningObjective"
                placeholder="Eg : Learn the basics of python"
                className="flex-grow h-11 bg-white"
                onChange={(e) => setObjective(e.target.value)}
                value={objective}
              />
              <Button
                onClick={addLearningObjectives}
                className="ml-2 h-11 bg-white border hover:bg-neutral-100 border-gray-300"
              >
                <Plus className="h-4 w-4 text-black" />
              </Button>
            </div>
            {isLearningObjectiveErrorFound && (
              <div className="text-sm text-red-500 mb-2">
                Learning objectives are required
              </div>
            )}
            {isLearningObjectiveErrorFoundMin && (
              <div className="text-sm text-red-500">
                Minimum 4 Learning objectives should be mentioned in your course
              </div>
            )}
            {learningObjectives.map((objective, index) => (
              <div
                key={index}
                className="flex items-center mb-2 border bg-white shadow p-1.5 rounded-md max-w-5xl"
              >
                <Goal className="w-6 h-6 me-2" />
                {/* <div className="w-2 h-2 bg-black rounded mr-2"></div> */}
                <div className="flex w-full justify-between items-center ">
                  <span>{objective}</span>
                  <button>
                    <Delete
                      onClick={(e) => handleRemoveObjective(e, index)}
                      className="text-black w-7 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Requirements */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              What are the requirements or prerequisites for taking your course?
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Mention all of the requirements
            </p>
            <div className="flex mb-2">
              <Input
                id="requirement"
                placeholder="Eg : Having a basic knowledge in Maths"
                className="flex-grow h-11 bg-white"
                onChange={(e) => setRequirement(e.target.value)}
                value={requirement}
              />
              <Button
                varient="ghost"
                onClick={addRequirements}
                className="ml-2 h-11 bg-white border hover:bg-neutral-100 border-gray-300"
              >
                <Plus className="h-4 w-4 text-black " />
              </Button>
            </div>
            {isRequirementsErrorFound && (
              <div className="text-sm text-red-500">
                Requirements for your course must be added on you course
              </div>
            )}
            {requirements.map((requirement, index) => (
              <div
                key={index}
                className="flex bg-white items-center mb-2 border shadow p-1.5 px-3 rounded-md max-w-5xl"
              >
                <Goal className="w-6 h-6 me-2" />
                {/* <div className="w-2 h-2 bg-black rounded mr-2"></div> */}
                <div className="flex w-full justify-between items-center ">
                  <span>{requirement}</span>
                  <button>
                    <Delete
                      onClick={(e) => handleRemoveRequirements(e, index)}
                      className="text-black w-7 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
          {/* Target audience */}
          <div>
            <h3 className="text-xl font-semibold mb-2">
              Who is this course for?
            </h3>
            <p className="text-sm text-gray-500 mb-2">
              Mention your target students
            </p>
            <div className="flex mb-2">
              <Input
                id="targetAudience"
                placeholder="Eg : Students who are interested in coding"
                className="flex-grow h-11 bg-white"
                onChange={(e) => setTargetAudience(e.target.value)}
                value={targetAudience}
              />
              <Button
                onClick={addTargetAudiences}
                className="ml-2 h-11 bg-white border hover:bg-neutral-50  border-gray-300"
              >
                <Plus className="h-4 w-4 text-black hover:text-white" />
              </Button>
            </div>
            {isTargetAudienceErrorFound && (
              <div className="text-sm text-red-500">
                Mention the target audiences for your course
              </div>
            )}
            {targetAudiences.map((audience, index) => (
              <div
                key={index}
                className="flex bg-white items-center mb-2 border shadow p-1.5 rounded-md max-w-5xl"
              >
                <Goal className="w-6 h-6 me-2" />
                {/* <div className="w-2 h-2 bg-black rounded mr-2"></div> */}
                <div className="flex w-full justify-between items-center ">
                  <span>{audience}</span>
                  <button>
                    <Delete
                      onClick={(e) => handleRemoveAudience(e, index)}
                      className="text-black w-7 h-5"
                    />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </form>
        <div className="mt-8 flex justify-end">
          <Button
            onClick={handleRedirectNext}
            className="bg-black text-white px-8"
          >
            Next
          </Button>
        </div>
      </motion.div>
    </>
  );
}
