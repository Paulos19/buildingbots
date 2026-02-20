import * as React from "react"
import { cn } from "@/lib/utils"

const Input = React.forwardRef<HTMLInputElement, React.InputHTMLAttributes<HTMLInputElement>>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-12 w-full border-2 border-bb-dark bg-bb-white px-4 py-2 text-base text-bb-dark shadow-[2px_2px_0px_0px_var(--color-bb-dark)] transition-all placeholder:text-bb-semidark/50 focus-visible:outline-none focus-visible:ring-0 focus-visible:border-bb-highlight focus-visible:shadow-[4px_4px_0px_0px_var(--color-bb-highlight)] disabled:cursor-not-allowed disabled:opacity-50 font-body",
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"
export { Input }
