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
import { BadgeCheck, X } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Success modal reusable component
export default function CustomSuccessDialogBox({
  isOpen,
  onClose,
  title,
  subtitle,
  description,
  buttonText,
  customRoute
}) {
  const navigate = useNavigate();

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
            <BadgeCheck className="h-8 w-8  text-primary-foreground  " />
          </div>
          <DialogTitle className="text-3xl text-center font-bold">{title}</DialogTitle>
          <DialogDescription className="text-lg text-center text-neutral-950 font-bold">
            {subtitle}
          </DialogDescription>
        </DialogHeader>
        <div className="text-center mb-6">
          <p className="text-muted-foreground text-neutral-950">
            {description}
          </p>
        </div>
        <Button className="w-full h-11" onClick={() => navigate(customRoute)}>
          {buttonText}
        </Button>
      </DialogContent>
    </Dialog>
  );
}
