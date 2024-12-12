import React, { useState } from "react";
import { Search, User, Plus, Goal, Delete } from "lucide-react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/Components/ui/breadcrumb";
// import { Field, Formik, Form } from "formik";

export default function Instructor_Create_Course_1() {
  const [learningObjectiveError, setLearningObjectiveError] = useState("");
  const [isErrorFound, setIsErrorFound] = useState(false);
  const [objective, setObjective] = useState("");
  const [requirement, setRequirement] = useState("");
  const [targetAudience, setTargetAudience] = useState("");
  const [learningObjectives, setLearningObjectives] = useState([]);
  const [requirements, setRequirements] = useState([]);
  const [targetAudiences, setTargetAudiences] = useState([]);
  const navigate = useNavigate();

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

  const handleRedirectNext = async () => {
    const error = await validation_schema();
    console.log(error);

    if (!error) {
      navigate("/instructor/create_course/2", {
        state: {
          Objectives: learningObjectives,
          Audiences: targetAudiences,
          Course_requirements: requirements,
        },
      });
      setIsErrorFound(false);
    }
  };

  return (
    <>
      <div className="max-w-5xl mx-auto sm:mx-2">
        <div className="items-center justify-between mb-6">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/instuctor/">Instructor</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>Create Course</BreadcrumbPage>
              </BreadcrumbItem>
              {/* ... */}
            </BreadcrumbList>
          </Breadcrumb>

          <h2 className="text-3xl font-bold mt-2 mb-2">Create a course</h2>
          <p className="text-gray-600 mb-6">
            Follow the instructions that we provided
          </p>
          <Outlet />
        </div>
      </div>
    </>
  );
}
