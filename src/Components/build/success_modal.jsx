//importing ES6 modules
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { ShieldCheck, X } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Success modal reusable component
export default function Success_Modal({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  buttonText,
  current_role,
}) {
  //State for manage the user role
  const [role, setRole] = useState("");
  //State for manange login route based on user role
  const [login_route, setLogin_route] = useState("");
  const [CustomRoute, setCustomRoute] = useState("");
  const navigate = useNavigate();
  //useeffect hook used to manange the states that based on user role
  useEffect(() => {
    setRole(current_role);
    if (role === "student") {
      setLogin_route("/login");
    } else if (role === "instructor") {
      setLogin_route("/instructor/login");
    } else if (role === "admin") {
      setLogin_route("/admin/login");
    } else {
      setLogin_route("");
    }
  }, [role]);
//component 
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-md ">
        <DialogClose className="absolute top-3 right-3 z-10">
          <button onClick={onClose}>
            <X />
          </button>
        </DialogClose>
        <DialogHeader className="flex flex-col items-center text-center">
          <div className="rounded-full bg-primary p-3 mb-4">
            <ShieldCheck className="h-8 w-8  text-primary-foreground  " />
          </div>
          <DialogTitle className="text-3xl font-bold">{title}</DialogTitle>
          <DialogDescription className="text-lg text-neutral-950 font-bold">
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-neutral-950">
            {description}
          </p>
        </div>
        <Button className="w-full h-11" onClick={() => navigate(login_route)}>
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
