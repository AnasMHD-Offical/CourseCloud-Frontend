"use client"

import * as React from "react"
import { ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { ScrollArea } from "@/components/ui/scroll-area"

export function AssignmentList({ assignments, onSelect }) {
  return (
    <ScrollArea className="h-[300px] rounded-md border">
      {assignments.map((assignment, index) => (
        <Collapsible key={index} className="mb-2">
          <div className="flex items-center justify-between space-x-4 rounded-md border p-2">
            <div>
              <h3 className="text-sm font-semibold">{assignment.title}</h3>
              <p className="text-xs text-muted-foreground">{assignment.time}</p>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onSelect(assignment)}
              >
                View
              </Button>
              <CollapsibleTrigger asChild>
                <Button variant="ghost" size="sm">
                  <ChevronDown className="h-4 w-4" />
                  <span className="sr-only">Toggle</span>
                </Button>
              </CollapsibleTrigger>
            </div>
          </div>
          <CollapsibleContent className="px-2 py-2">
            <p className="text-sm text-muted-foreground">
              {assignment.description}
            </p>
          </CollapsibleContent>
        </Collapsible>
      ))}
      <Button className="mt-4 w-full" variant="outline" size="sm">
        Show more
      </Button>
    </ScrollArea>
  )
}

