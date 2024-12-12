import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent } from "@/components/ui/card"
import { StarRating } from "./star_rating"

export function ReviewCard({ review }) {
  const timeAgo = (date) => {
    const formatedDate = new Date(Date.parse(date))
    const days = Math.floor(
      (new Date().getTime() - formatedDate.getTime()) / (1000 * 60 * 60 * 24)
    )
    return `${days} day${days === 1 ? "" : "s"} ago`
  }
  // const formatDate = (date)=>{
  //   console.log(new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date));
  //   // return new Intl.DateTimeFormat('en-US', {year: 'numeric', month: '2-digit',day: '2-digit', hour: '2-digit', minute: '2-digit', second: '2-digit'}).format(date)
  // }
  console.log(Date.parse(review.createdAt));
  

  return (
    <Card className="border-0 shadow shadow-purple-200">
      <CardContent className="p-4">
        <div className="flex gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={review.student_id?.profile || ""} alt={review.student_id?.name || "student"} />
            <AvatarFallback>
              {review.student_id?.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <h3 className="font-medium leading-none">{review.student_id?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {timeAgo(review.createdAt)}
              </p>
            </div>
            <StarRating rating={review.rating} size="sm" />
            <p className="text-sm text-muted-foreground">{review.feedback}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

