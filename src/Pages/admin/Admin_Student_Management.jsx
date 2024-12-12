import User_Management from "@/Components/build/User_Management";
import React from "react";

function Admin_Student_Management() {
  return (
    <>
      <User_Management route={"/api/admin/get_all_student"} current_role={"Student"} />
    </>
  );
}

export default Admin_Student_Management;
