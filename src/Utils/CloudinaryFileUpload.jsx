import { Button } from "@/Components/ui/button";
import { Plus, Upload } from "lucide-react";
import { useRef, useEffect } from "react";
import { toast } from "sonner";
const CloudinaryUploadWidget_Files = ({ onUploadComplete }) => {
  const cloudinaryRef = useRef();
  const FileWidgetRef = useRef();
  useEffect(() => {
    cloudinaryRef.current = window.cloudinary;
    FileWidgetRef.current = cloudinaryRef.current.createUploadWidget(
      {
        cloudName: "dtc1xcil8",
        uploadPreset: "CourseCloud_Assignments",
        resourceType: "raw", // Set to raw to accept only document files
        clientAllowedFormats: [
          "pdf",
          "doc",
          "docx",
          "xls",
          "xlsx",
          "ppt",
          "pptx",
        ], // Specify allowed document formats
        maxFileSize: 10000000,
      },
      (error, result) => {
        if (error) {
          toast.error("Unexpected error occurs while uploading. Try again");
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
        onClick={() => FileWidgetRef.current.open()}
        type="button"
        variant="outline"
        className="bg-gradient-to-r from-purple-900 to-purple-600 text-white hover:text-white"
      >
        <Upload className="mr-2 h-4 w-4" /> Upload Assignment
      </Button>
    </>
  );
};

export default CloudinaryUploadWidget_Files;
