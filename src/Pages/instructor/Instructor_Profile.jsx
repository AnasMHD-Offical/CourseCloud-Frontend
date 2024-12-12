import Profile from "@/Components/build/Profile";
import React from "react";

function Instructor_Profile() {
  return (
    <>
      <Profile current_role={"Instructor"} user_route={"/api/instructor/get_instructor"}/>
    </>
  );
}

export default Instructor_Profile;
