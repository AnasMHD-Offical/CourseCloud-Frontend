import Password_reset_form from "@/Components/build/password_reset_form";
import React from "react";

function Instructor_Password_Reset() {
  return (
    <>
      <Password_reset_form current_role={"instructor"} />
    </>
  );
}

export default Instructor_Password_Reset;
