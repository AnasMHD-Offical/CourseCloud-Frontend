import { ChevronRight, Home } from "lucide-react";
import { Link } from "react-router-dom";

export default function Breadcrumb({ pageRoute, homeRoute, previousRoute }) {
  return (
    <nav className="flex items-center space-x-1 text-sm text-muted-foreground">
      <Link
        to="/instructor/course_management"
        className="flex items-center hover:text-primary"
      >
        <Home className="h-4 w-4" />
        <span className="sr-only">Home</span>
      </Link>
      {previousRoute && (
        <>
          <ChevronRight className="h-4 w-4" />
          <span className="text-foreground">{previousRoute}</span>
        </>
      )}
      <ChevronRight className="h-4 w-4" />
      <span className="text-foreground">{pageRoute}</span>
    </nav>
  );
}
