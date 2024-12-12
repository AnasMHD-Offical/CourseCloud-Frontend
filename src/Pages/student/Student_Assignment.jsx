import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import CloudinaryUploadWidget_Files from "@/Utils/CloudinaryFileUpload";
import {
  CheckCheckIcon,
  CheckCircle,
  Download,
  TicketCheck,
  Upload,
} from "lucide-react";
import { useEffect, useState } from "react";
import { saveAs } from "file-saver";
import { axios_instance } from "@/Config/axios_instance";
import { toast } from "sonner";
import { useSelector } from "react-redux";

export default function AssignmentComponent({ assignment }) {
  const [completedAssignment, setCompletedAssignment] = useState();
  const [completed, setCompleted] = useState(false);
  const student_id = useSelector(
    (state) => state?.student?.student_data?.student?._id
  );
  const { current_lesson_id, current_course_id } = useSelector(
    (state) => state?.current_course_data
  );

  const handleDownload = async (assignment_link) => {
    // Simulated download functionality
    console.log(`Downloading assignment ${assignment_link}`);
    saveAs(assignment_link, `${assignment_link}`);
  };

  const handleUploadChange = (url) => {
    setCompletedAssignment(url);
    handleUpload(url);
  };

  const handleUpload = async (url) => {
    try {
      const response = await axios_instance.put(
        "api/update_assignment_progress",
        {
          student_id: student_id,
          course_id: current_course_id,
          lesson_id: current_lesson_id,
          completed_assignment: url,
        }
      );
      const { message, success } = response?.data;
      if (success) {
        setCompleted(true);
        toast.success(message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-5xl p-4 flex flex-col gap-3 bg-clip-text text-transparent bg-gradient-to-r from-primary to-purple-600 ">
      <section>
        <h2 className="text-2xl font-bold mb-4">Given Assignments</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{`Assignment for ${assignment.title}`}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    Complete the assignment after watching the lesson and submit
                    within 7 days of lesson completion
                  </p>
                  <p className="text-xs italic">
                    This is only for increase your knowledge on this topic
                  </p>
                </div>
              </div>
              <Button
                onClick={() => handleDownload(assignment.assignment_link)}
                className="bg-gradient-to-r from-purple-900 to-purple-600 text-white"
              >
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Submit Assignments</h2>
        <Card>
          <CardContent className="p-6">
            <div className="flex justify-between items-start">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">{`Assignment for ${assignment.title}`}</h3>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>
                    Complete the assignment after watching the lesson and submit
                    within 7 days of lesson completion
                  </p>
                  <p className="text-xs italic">
                    This is only for increase your knowledge on this topic
                  </p>
                </div>
              </div>
              <div className="relative">
                {completed && (
                  <Button
                    disabled="true"
                    className="bg-gradient-to-r from-purple-900 to-purple-600"
                  >
                    <CheckCircle className="w-4 h-4 " />
                    Completed
                  </Button>
                )}
                {!completed && (
                  <CloudinaryUploadWidget_Files
                    onUploadComplete={handleUploadChange}
                  />
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
