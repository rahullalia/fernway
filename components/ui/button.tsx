import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex shrink-0 select-none items-center justify-center gap-2 whitespace-nowrap rounded-full font-medium tracking-[0.01em] outline-none transition-[transform,background-color,color,border-color] duration-150 ease-(--ease-out-strong) active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-pine-deep",
        outline:
          "border border-foreground/25 bg-transparent text-foreground hover:border-foreground/60",
        ghost: "text-foreground hover:bg-secondary",
        link: "text-foreground underline underline-offset-4 hover:text-pine-deep",
      },
      size: {
        default: "h-11 px-6 text-[0.95rem]",
        sm: "h-9 px-4 text-[0.9rem]",
        lg: "h-13 px-8 text-[1.0625rem]",
        icon: "size-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot.Root : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
