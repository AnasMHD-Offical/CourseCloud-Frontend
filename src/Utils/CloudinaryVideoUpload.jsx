import { Button } from "@/Components/ui/button";
import { Upload } from "lucide-react";
import { useRef, useEffect } from "react";
import { toast } from "sonner";
const CloudinaryUploadWidget_Videos = ({ onUploadComplete }) => {
  const cloudinaryRef = useRef();
  const widgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    widgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtc1xcil8",
        uploadPreset: "CourseCloud_Course_tutorials",
        resourceType: "video", // Set to video to accept only video files
        clientAllowedFormats: ["mp4", "avi", "mov", "mkv"], // List allowed video formats
        multiple: false, // Allow single file upload; set to true if you want to allow multiple files
        maxFileSize: 100000000, // Max file size will be 100 MB
      },
      (error, result) => {
        if (error) {
          toast.error("Unexpected error occurs while uploading. Try again");
        } else if (result?.event === "success") {
          console.log(result);
          onUploadComplete(result?.info?.public_id);
          toast.success("Video uploaded to the cloud storage")
        }
      }
    );
    console.log(cloudinaryRef.current);
  }, []);

  return (
    <>
      <Button onClick={() => widgetRef.current.open()} type="button" variant="outline">
        <Upload className="mr-2 h-4 w-4" /> Upload video
      </Button>
    </>
  );
};

export default CloudinaryUploadWidget_Videos;
