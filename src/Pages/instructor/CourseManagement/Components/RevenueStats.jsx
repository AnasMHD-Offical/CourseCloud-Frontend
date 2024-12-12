import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import {
  Download,
  Users,
  DollarSign,
  Wallet,
  StarIcon,
} from "lucide-react";

export default function RevenueStats({ stats }) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Course Revenue Stats</CardTitle>
        <Button size="sm" variant="outline">
          <Download className="h-4 w-4 mr-2" />
          Download Report
        </Button>
      </CardHeader>
      <CardContent className="grid gap-4 md:grid-cols-1 lg:grid-cols-2">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Enrolled Students</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {stats.enrolledStudents}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <StarIcon className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Course Rating</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              {stats.CourseRating || "No ratings"}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <DollarSign className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Revenue per Course</span>
            </div>
            <div className="mt-2 text-2xl font-bold">
              Rs.{stats.revenuePerCourse}
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center gap-2">
              <Wallet className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Total Revenue</span>
            </div>
            <div className="mt-2 text-2xl font-bold">Rs.{stats.totalRevenue}</div>
          </CardContent>
        </Card>
      </CardContent>
    </Card>
  );
}
