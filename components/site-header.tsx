"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/services", label: "Services" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = React.useState(false);
  const [open, setOpen] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-background transition-shadow duration-200",
        scrolled && "shadow-[0_1px_0_0_var(--border)]"
      )}
    >
      <div className="wrap flex h-16 items-center justify-between sm:h-18">
        <Link
          href="/"
          className="font-heading text-[1.4rem] tracking-[-0.01em]"
          aria-label="Fernway, home"
        >
          Fernway
        </Link>

        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
          {nav.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "link-draw text-[0.95rem]",
                pathname.startsWith(item.href)
                  ? "[background-size:100%_1px]"
                  : "text-foreground/80 hover:text-foreground"
              )}
            >
              {item.label}
            </Link>
          ))}
          <Button asChild size="sm" className="ml-2 h-10 px-5">
            <Link href="/book">Book an appointment</Link>
          </Button>
        </nav>

        <button
          ref={triggerRef}
          type="button"
          onClick={() => setOpen(true)}
          aria-expanded={open}
          aria-label="Open menu"
          className="-mr-2 flex size-11 items-center justify-center md:hidden"
        >
          <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
            <path
              d="M3 8.5h18M3 15.5h18"
              stroke="currentColor"
              strokeWidth="1.25"
              strokeLinecap="round"
            />
          </svg>
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-50 flex flex-col bg-background motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200 md:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="wrap flex h-16 items-center justify-between">
            <Link href="/" className="font-heading text-[1.4rem]" onClick={() => setOpen(false)}>
              Fernway
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOpen(false);
                triggerRef.current?.focus();
              }}
              aria-label="Close menu"
              className="-mr-2 flex size-11 items-center justify-center"
            >
              <svg aria-hidden="true" viewBox="0 0 24 24" className="size-6">
                <path
                  d="M5 5l14 14M19 5L5 19"
                  stroke="currentColor"
                  strokeWidth="1.25"
                  strokeLinecap="round"
                />
              </svg>
            </button>
          </div>

          <nav className="wrap mt-10 flex flex-col gap-2" aria-label="Main">
            {[...nav, { href: "/book", label: "Book an appointment" }].map(
              (item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-3 font-heading text-4xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both"
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {item.label}
                </Link>
              )
            )}
          </nav>

          <div className="wrap mt-auto mb-10 text-muted-foreground">
            <p>
              {site.address.street}, {site.address.city}, {site.address.state}
            </p>
            <p className="mt-1">
              <a href={site.phoneHref} className="link-draw">
                {site.phone}
              </a>
            </p>
            <p className="mt-4 text-sm">
              Open Wednesday through Sunday. Closed Monday and Tuesday.
            </p>
          </div>
        </div>
      )}
    </header>
  );
}
