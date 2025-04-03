"use client";

import React from "react"
import { cn } from "@/lib/utils"

interface LoadingProps {
  className?: string
  text?: string
}

export function AppLoading({ className, text = "正在加载中..." }: LoadingProps) {
  return (
    <div className={cn("flex flex-col items-center justify-center h-screen", className)}>
      <svg
        width="48"
        height="48"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
        className="text-primary animate-spin mb-4"
      >
        <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none" strokeDasharray="32" strokeDashoffset="32">
          <animate
            attributeName="stroke-dashoffset"
            dur="1.5s"
            repeatCount="indefinite"
            values="32;0"
            keyTimes="0;1"
          />
        </circle>
      </svg>
      <p className="text-muted-foreground text-lg">{text}</p>
    </div>
  )
}