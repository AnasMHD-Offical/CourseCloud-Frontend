"use client"

import { Star } from 'lucide-react'
import { cn } from "@/lib/utils"


export function StarRating({
  rating,
  maxRating = 5,
  size = "md",
  onRatingSelect,
  interactive = false,
  className,
}) {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4",
    lg: "w-6 h-6",
  }

  return (
    <div className={cn("flex gap-0.5", className)}>
      {[...Array(maxRating)].map((_, index) => (
        <button
          key={index}
          type={interactive ? "button" : undefined}
          className={cn(
            "text-muted-foreground transition-colors",
            index < rating && "text-yellow-400",
            interactive && "hover:text-yellow-400 cursor-pointer"
          )}
          onClick={() => interactive && onRatingSelect?.(index + 1)}
          disabled={!interactive}
        >
          <Star
            className={sizeClasses[size]}
            fill={index < rating ? "currentColor" : "none"}
          />
          <span className="sr-only">{`${index + 1} star${
            index === 0 ? "" : "s"
          }`}</span>
        </button>
      ))}
    </div>
  )
}

