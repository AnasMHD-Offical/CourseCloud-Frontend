import User_Management from "@/Components/build/User_Management";
import React from "react";

function Admin_Instructor_Managment() {
  return (
    <>
      <User_Management
        current_role={"Instructor"}
        route={"/api/admin/get_all_instructor"}
      />
    </>
  );
}

export default Admin_Instructor_Managment;
