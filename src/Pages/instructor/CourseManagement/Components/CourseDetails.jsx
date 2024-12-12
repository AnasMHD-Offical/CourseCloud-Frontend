import { Card, CardContent, CardHeader } from "@/Components/ui/card"
import { Star, Clock, Award, BookOpen, CheckCircle } from 'lucide-react'

export default function CourseDetail({ course }) {
  return (
    <Card>
      <CardHeader className="p-4 md:p-6">
        <div className="grid gap-4 md:grid-cols-[240px,1fr]">
          <div className="relative aspect-video overflow-hidden rounded-lg ">
            <img
              alt="Course thumbnail"
              className="object-cover"
              height={240}
              src={course?.thumbnail}
              width={280}
            />
          </div>
          <div className="grid gap-1">
            <h1 className="font-bold text-3xl bg-clip-text bg-gradient-to-r text-transparent from-purple-900 to-purple-600">{course?.title}</h1>
            <h3 className="font-bold text-lg">Rs.{course?.actual_price?.$numberDecimal}</h3>
            <div className="flex items-center gap-2">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`h-4 w-4 ${
                      i < Math.floor(course?.rating || 4)
                        ? "fill-yellow-400 text-yellow-400"
                        : "fill-muted text-yellow-400"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {course.rating} ({course.reviews})
              </span>
            </div>
            <p className="text-sm text-muted-foreground">{course.enrolled_count} students enrolled</p>
          </div>
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 p-4 md:p-6">
        <div>
          <h2 className="font-semibold mb-2">Course Objectives:</h2>
          <ul className="grid gap-2">
            {course.objectives.map((inclusion, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <Clock className="h-4 w-4 text-muted-foreground" />
                {inclusion}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Requirements:</h2>
          <ul className="grid gap-2">
            {course.requirements.map((requirement, index) => (
              <li key={index} className="flex items-center gap-2 text-sm">
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
                {requirement}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2 className="font-semibold mb-2">Description:</h2>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

