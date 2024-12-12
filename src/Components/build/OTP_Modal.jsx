// import { useState, useEffect, useRef} from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "../ui/dialog";
import { toast } from "sonner";
import { X } from "lucide-react";
import { useState, useRef, useEffect } from "react";
//OTP_Modal component
export function OTP_Modal({ isOpen, onClose, verify_otp, email, resend_otp }) {
  //state for manage otp and timer.
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [timer, setTimer] = useState(115); // 1 minutes

  const inputRefs = useRef([]);
  //UseEffect hooks for handling timer
  useEffect(() => {
    let interval;
    if (isOpen && timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isOpen, timer]);

  //function to handle the otp input changes
  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      //moving to the next otp input after entering the value functionality
      if (value !== "" && index < otp.length - 1) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  //when we click backspace it it move on to the previous otp input
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && index > 0 && otp[index] === "") {
      inputRefs.current[index - 1].focus();
    }
  };

  //function to handle verify and submit otp
  const handleVerify = () => {
    const enteredOtp = otp.join("");
    if (enteredOtp.length === otp.length) {
      verify_otp(enteredOtp);
    } else {
      toast.warning("Please check you entered all digits");
    }
  };

  //function to resend otp
  const handleResend = () => {
    setTimer(115);
    setOtp(["", "", "", "", "", ""]);
    resend_otp(); // Call the resendOtp function passed as prop
  };

  //function to make the time format that want to display in the modal
  const formatTime = (seconds) => {
    const min = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const sec = (seconds % 60).toString().padStart(2, "0");
    return `${min}:${sec}`;
  };

  //compoent OTP_Modal
  return (
    <Dialog open={isOpen}>
      <DialogContent className="sm:max-w-[425px] rounded-md">
        <DialogClose className="absolute top-3 right-3 z-10">
          <button onClick={onClose}>
            <X />
          </button>
        </DialogClose>
        <DialogHeader className="mb-5">
          <DialogTitle className="text-center font-extrabold text-3xl">
            OTP Verification
          </DialogTitle>
          <DialogDescription className="text-center font-bold text-lg text-neutral-950">
            Please check your email
          </DialogDescription>
          <div className="text-center mb-4 text-sm">
            We've sent an OTP to <span className="font-medium">{email}</span>
          </div>
        </DialogHeader>
        <div className="flex justify-center space-x-2 mb-4 font-medium text-base">
          {otp.map((digit, index) => (
            <Input
              key={index}
              id={`otp-${index}`}
              ref={(el) => (inputRefs.current[index] = el)}
              type="text"
              inputMode="numeric"
              maxLength={1}
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center text-lg"
            />
          ))}
        </div>
        <div className="text-center mb-4">
          {timer > 0 ? (
            <p>Send code again in {formatTime(timer)}</p>
          ) : (
            <Button variant="link" onClick={handleResend}>
              Resend
            </Button>
          )}
        </div>
        <Button onClick={handleVerify} className="w-full">
          Verify
        </Button>
      </DialogContent>
    </Dialog>
  );
}
