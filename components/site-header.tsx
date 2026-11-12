"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { formatMinutes, openHours, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const links = [
  { href: "/", label: "home" },
  { href: "/services", label: "the menu" },
  { href: "/about", label: "about" },
  { href: "/faq", label: "questions" },
  { href: "/book", label: "book" },
];

const DAY_NAMES = [
  "sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday",
];

function statusFor(now: Date) {
  const day = now.getDay();
  const mins = now.getHours() * 60 + now.getMinutes();
  const today = openHours[day];
  if (today && mins < today.open) {
    return `opens ${formatMinutes(today.open)} today`;
  }
  if (today && mins < today.close) {
    return today.close >= 1260
      ? `late night · open until ${formatMinutes(today.close)}`
      : `open today until ${formatMinutes(today.close)}`;
  }
  for (let i = 1; i <= 7; i++) {
    const next = openHours[(day + i) % 7];
    if (next) {
      return `closed · back ${DAY_NAMES[(day + i) % 7]} ${formatMinutes(next.open)}`;
    }
  }
  return "";
}

const noUpdates = () => () => {};

function StatusLine({ className }: { className?: string }) {
  // The server can't know the visitor's clock, so it renders the general hours;
  // the browser swaps in today's status as soon as it hydrates.
  const status = React.useSyncExternalStore(
    noUpdates,
    () => statusFor(new Date()),
    () => "wed to sun · late thursdays",
  );
  return (
    <p className={cn("type-mono", className)}>
      <span aria-hidden="true" className="mr-2 inline-block size-[7px] rounded-full bg-primary align-middle" />
      {status}
    </p>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const [overlayOpen, setOverlayOpen] = React.useState(false);
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const closeRef = React.useRef<HTMLButtonElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  // Close both menus when the route changes (adjusted during render, not in an effect).
  const [menusFor, setMenusFor] = React.useState(pathname);
  if (pathname !== menusFor) {
    setMenusFor(pathname);
    setOverlayOpen(false);
    setDrawerOpen(false);
  }

  React.useEffect(() => {
    if (overlayOpen) {
      document.documentElement.style.overflow = "hidden";
      closeRef.current?.focus();
    } else {
      document.documentElement.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOverlayOpen(false);
        triggerRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      document.documentElement.style.overflow = "";
    };
  }, [overlayOpen]);

  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur-sm">
      <div className="wrap flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="display text-[1.55rem]"
          aria-label="Fernway, home"
        >
          fernway
        </Link>

        <StatusLine className="hidden md:block" />

        <div className="flex items-center gap-3">
          <Button asChild size="sm">
            <Link href="/book">book</Link>
          </Button>

          {/* Desktop: full-screen overlay menu */}
          <button
            ref={triggerRef}
            type="button"
            onClick={() => setOverlayOpen(true)}
            aria-expanded={overlayOpen}
            aria-label="Open menu"
            className="type-mono hidden h-9 items-center rounded-[6px] px-3 text-foreground transition-colors hover:bg-secondary md:inline-flex"
          >
            menu
          </button>

          {/* Mobile: bottom sheet */}
          <Drawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <DrawerTrigger
              className="type-mono inline-flex h-9 items-center rounded-[6px] px-3 text-foreground transition-colors hover:bg-secondary md:hidden"
              aria-label="Open menu"
            >
              menu
            </DrawerTrigger>
            <DrawerContent className="border-t border-border bg-card">
              <DrawerTitle className="sr-only">Menu</DrawerTitle>
              <nav aria-label="Main" className="flex flex-col px-6 pt-2 pb-4">
                {links.map((item, i) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setDrawerOpen(false)}
                    className={cn(
                      "display border-b border-border/60 py-4 text-4xl last:border-b-0 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:fill-mode-both",
                      pathname === item.href && "text-primary"
                    )}
                    style={{ animationDelay: `${50 + i * 40}ms` }}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <div className="flex items-center justify-between gap-4 border-t border-border/60 px-6 py-5">
                <StatusLine />
                <a href={site.phoneHref} className="type-mono link-draw text-foreground">
                  {site.phone}
                </a>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>

      {/* Desktop overlay */}
      {overlayOpen && (
        <div
          className="fixed inset-0 z-50 hidden bg-background md:block motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
          role="dialog"
          aria-modal="true"
          aria-label="Menu"
        >
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="fog-a" />
            <div className="fog-b" />
          </div>
          <div className="wrap relative flex h-16 items-center justify-between">
            <Link href="/" className="display text-[1.55rem]" onClick={() => setOverlayOpen(false)}>
              fernway
            </Link>
            <button
              ref={closeRef}
              type="button"
              onClick={() => {
                setOverlayOpen(false);
                triggerRef.current?.focus();
              }}
              className="type-mono h-9 rounded-[6px] px-3 text-foreground transition-colors hover:bg-secondary"
            >
              close
            </button>
          </div>
          <div className="wrap relative mt-14 grid gap-16 lg:grid-cols-12">
            <nav aria-label="Main" className="flex flex-col items-start gap-1 lg:col-span-8">
              {links.map((item, i) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOverlayOpen(false)}
                  className={cn(
                    "display py-2 text-6xl transition-colors duration-200 hover:text-primary lg:text-7xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-400 motion-safe:ease-out motion-safe:fill-mode-both",
                    pathname === item.href && "text-primary"
                  )}
                  style={{ animationDelay: `${60 + i * 50}ms` }}
                >
                  {item.label}
                </Link>
              ))}
            </nav>
            <div className="type-mono space-y-6 self-end pb-4 lg:col-span-4 motion-safe:animate-in motion-safe:fade-in motion-safe:fill-mode-both motion-safe:delay-300">
              <div>
                {site.hours.map((h) => (
                  <p key={h.days} className="flex justify-between gap-6 border-b border-border/60 py-2">
                    <span className="lowercase">{h.days}</span>
                    <span className="lowercase">{h.time}</span>
                  </p>
                ))}
              </div>
              <p>
                {site.address.street.toLowerCase()}, {site.address.city.toLowerCase()}, ny ·{" "}
                <a href={site.phoneHref} className="link-draw text-foreground">
                  {site.phone}
                </a>
              </p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
