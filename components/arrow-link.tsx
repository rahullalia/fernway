import Link from "next/link";

import { cn } from "@/lib/utils";

export function ArrowLink({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-2 font-medium text-foreground",
        className
      )}
    >
      <span className="link-draw">{children}</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="size-4 transition-transform duration-250 ease-(--ease-out-strong) group-hover:translate-x-1"
      >
        <path
          d="M2 8h11m0 0L9.5 4.5M13 8l-3.5 3.5"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </svg>
    </Link>
  );
}
