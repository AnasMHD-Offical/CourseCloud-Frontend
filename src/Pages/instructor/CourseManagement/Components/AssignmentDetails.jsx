import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function AssignmentDetails({ assignment }) {
  if (!assignment) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Assignments</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Select an assignment to view details
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">{assignment.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <h4 className="text-sm font-semibold">Description</h4>
            <p className="text-sm text-muted-foreground">
              {assignment.description}
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold">Estimated Time</h4>
            <p className="text-sm text-muted-foreground">{assignment.time}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
