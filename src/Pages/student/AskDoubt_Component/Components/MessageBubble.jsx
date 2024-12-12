import { MoreHorizontal } from "lucide-react";
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/Components/ui/avatar";

export function MessageBubble({ content, type }) {
  return (
    <div
      className={`flex px-4 text-sm sm:text-base  ${
        type === "user" ? "justify-end" : "justify-start"
      } group`}
    >
      <div className="relative">
        <Avatar
          className={`absolute w-7 h-7 bottom-8 border-2 border-purple-50 ${
            type === "user" ? "right-0 left-full top-0.5" : "right-full top-0"
          } bg-black`}
        >
          <AvatarFallback>CC</AvatarFallback>
          <AvatarImage
            src={
              type === "user"
                ? "https://res.cloudinary.com/dtc1xcil8/image/upload/v1730571309/openart-image_z-cDRKP9_1730556373858_raw_rpgts8.jpg"
                : "https://res.cloudinary.com/dtc1xcil8/image/upload/v1732863888/attachment_126736972_c2e5hv.jpg"
            }
            alt="icon-img"
          />
        </Avatar>
        <div
          className={`relative sm:max-w-[80%] rounded-md px-2 sm:px-4 py-1 sm:py-2 mt-1 ${
            type === "user"
              ? "bg-gradient-to-r from-purple-950 to-purple-800 text-white ml-12"
              : "bg-gradient-to-r from-purple-800 to-purple-600 text-white mr-12"
          }`}
        >
          <p className=" ">
            {content.split("\n").map((line, index) => (
              <div key={index}>
                {line}
                <br />
              </div>
            ))}
          </p>
        </div>
      </div>
    </div>
  );
}
