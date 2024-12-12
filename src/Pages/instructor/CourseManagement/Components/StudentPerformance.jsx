"use client"

import { PieChart, Pie } from "recharts"
import { Card } from "@/Components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/Components/ui/chart"

export function PerformanceChart({ performance }) {
  const data = [
    {
      name: "Completion",
      value: parseFloat(performance.completionRate),
      fill: "var(--color-completion)",
    },
    {
      name: "Performance",
      value: parseFloat(performance.performanceRate),
      fill: "var(--color-performance)",
    },
  ]

  return (
    <Card className="p-4">
      <ChartContainer
        config={{
          completion: {
            label: "Completion Rate",
            color: "hsl(var(--chart-1))",
          },
          performance: {
            label: "Performance Rate",
            color: "hsl(var(--chart-2))",
          },
        }}
        className="h-[180px]"
      >
        <PieChart>
          <ChartTooltip content={<ChartTooltipContent />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={80}
          />
        </PieChart>
      </ChartContainer>
    </Card>
  )
}

