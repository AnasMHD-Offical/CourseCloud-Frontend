import { Button } from "@/Components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useRef, useEffect } from "react";
import { toast } from "sonner";
const CloudinaryUploadWidget_Image = ({ onUploadComplete }) => {
  const cloudinaryRef = useRef();
  const imageWidgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    imageWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtc1xcil8",
        uploadPreset: "CourseCloud_Tutorial_Thumbnails",
        resourceType: "image", // Set to image to accept only image files
        clientAllowedFormats: ["jpg", "png", "gif", "bmp", "webp" ,"jpeg"], // Specify allowed image formats
        maxFileSize: 5000000, // Limit file size to 5 MB
      },
      (error, result) => {
        if (error) {
          toast.error("Unexpected error occurs while uploading. Try again");
          console.log(error);
        } else if (!error && result && result?.event === "success") {
          console.log(result);
          onUploadComplete(result?.info?.secure_url);
          toast.success("Assignment file uploaded to the cloud storage");
        }
      }
    );
    console.log(cloudinaryRef.current);
  }, []);

  return (
    <>
      <Button
        onClick={() => imageWidgetRef.current.open()}
        type="button"
        variant="outline"
      >
        <Upload className="h-4 w-4" />
        Upload Thumbnail
      </Button>
    </>
  );
};

export default CloudinaryUploadWidget_Image;
