import React from "react";
import Password_reset_form from "@/Components/build/password_reset_form";

function Admin_Password_Reset() {
  return (
    <>
      <Password_reset_form current_role={"admin"} />
    </>
  );
}

export default Admin_Password_Reset;
