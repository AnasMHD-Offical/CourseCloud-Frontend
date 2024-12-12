import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { useNavigate } from "react-router-dom";
import StudentDetails from "../InstructorStudentDetails";

export function StudentsTable({ enrolledStudents }) {
  const navigate = useNavigate();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="bg-black rounded-l-lg rounded-b-none text-white">
            Name
          </TableHead>
          <TableHead className="bg-black text-white">Progress Bar</TableHead>
          <TableHead className="bg-black text-white">
            Date of Enrolled
          </TableHead>
          <TableHead className="bg-black text-white">Tasks Completed</TableHead>
          <TableHead className="bg-black text-white">Overall</TableHead>
          <TableHead className="bg-black rounded-b-none rounded-r-lg text-white">
            Action
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {enrolledStudents.map((student, index) => (
          <TableRow key={index}>
            <TableCell>{student.student_id?.name || "Name"}</TableCell>
            <TableCell>
              <Progress value={student.progress || 0} className="w-[60%]" />
            </TableCell>
            <TableCell>
              {student.date_of_purchase.split("T")[0] || "nil"}
            </TableCell>
            <TableCell>{student.tasksCompleted || 0}%</TableCell>
            <TableCell>{student.overall || 0}%</TableCell>
            <TableCell>
              <StudentDetails />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
