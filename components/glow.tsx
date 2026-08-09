"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

/* Sets the candle-glow origin (--gx/--gy) as the pointer moves.
   Vars live on the element itself, so recalc stays local. */
export function Glow({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) {
  const ref = React.useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--gx", `${e.clientX - r.left}px`);
    el.style.setProperty("--gy", `${e.clientY - r.top}px`);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      className={cn("glow-row", className)}
      {...props}
    >
      {children}
    </div>
  );
}
