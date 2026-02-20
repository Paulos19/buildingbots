import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils" // Utilitário padrão do Shadcn (clsx + tailwind-merge)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean
  variant?: "default" | "outline" | "ghost"
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    // O Design Mid-Century Brutalist aplicado ao botão
    const variants = {
      default: "bg-bb-impact text-bb-dark border-2 border-bb-dark shadow-[4px_4px_0px_0px_var(--color-bb-dark)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-none",
      outline: "bg-bb-white text-bb-dark border-2 border-bb-dark shadow-[4px_4px_0px_0px_var(--color-bb-impact)] hover:bg-bb-variant",
      ghost: "bg-transparent text-bb-white hover:text-bb-impact underline-offset-4 hover:underline"
    }

    return (
      <Comp
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap px-6 py-3 text-sm font-heading font-bold uppercase tracking-widest transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-bb-highlight disabled:pointer-events-none disabled:opacity-50",
          variants[variant],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"
export { Button }
