import { useState } from "react";
import { Button } from "@/Components/ui/button.jsx";
import { Dialog, DialogContent, DialogTrigger } from "@/Components/ui/dialog.jsx";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card.jsx";
import { AssignmentList } from "./Components/AssignmentList";
import { AssignmentDetails } from "./Components/AssignmentDetails";
import { PerformanceChart } from "./Components/StudentPerformance";

// Sample data
const studentData = {
  name: "Anna Smith",
  performance: {
    lessonsCompleted: "16/21",
    performanceRate: "96.8%",
    completionRate: "98.7%",
    quizzesCompleted: 32,
    activeTime: "120 hrs",
  },
  assignments: [
    {
      title: "Fundamentals of Web Designing",
      description: "Learn the basics of HTML, CSS, and JS.",
      time: "3 hrs",
    },
    {
      title: "Responsive Web Design",
      description: "Building websites that adapt to all screens.",
      time: "4 hrs",
    },
    {
      title: "Advanced JS Concepts",
      description: "Master advanced JavaScript techniques.",
      time: "5 hrs",
    },
  ],
};

export default function StudentDetails() {
  const [selectedAssignment, setSelectedAssignment] = useState(null);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Detailed overview</Button>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] w-full max-h-[90vh] overflow-y-auto">
        <div className="container mx-auto p-4">
          <div className="mb-8 flex items-center justify-between">
            <h1 className="text-2xl font-bold">
              {studentData.name}'s Dashboard
            </h1>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Overall Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <PerformanceChart performance={studentData.performance} />
                </div>
                <dl className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <dt className="font-medium">Lessons Completed</dt>
                    <dd className="text-muted-foreground">
                      {studentData.performance.lessonsCompleted}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Performance Rate</dt>
                    <dd className="text-muted-foreground">
                      {studentData.performance.performanceRate}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Completion Rate</dt>
                    <dd className="text-muted-foreground">
                      {studentData.performance.completionRate}
                    </dd>
                  </div>
                  <div>
                    <dt className="font-medium">Active Time</dt>
                    <dd className="text-muted-foreground">
                      {studentData.performance.activeTime}
                    </dd>
                  </div>
                </dl>
              </CardContent>
            </Card>
            <div className="grid gap-6">
              <AssignmentList
                assignments={studentData.assignments}
                onSelect={setSelectedAssignment}
              />
              <AssignmentDetails assignment={selectedAssignment} />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
