import Password_reset_form from "@/Components/build/password_reset_form";
import React from "react";

function Student_Password_Reset() {
  return (
    <>
      <Password_reset_form current_role={"student"} />
    </>
  );
}

export default Student_Password_Reset;
