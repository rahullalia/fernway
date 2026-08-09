import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-paper-deep">
      <div className="wrap py-16 sm:py-20">
        <div className="flex flex-col items-start justify-between gap-8 sm:flex-row sm:items-end">
          <h2 className="font-heading text-4xl sm:text-5xl">
            Ready when you are.
          </h2>
          <Button asChild size="lg">
            <Link href="/book">Book an appointment</Link>
          </Button>
        </div>

        <div className="mt-16 grid gap-10 border-t border-border pt-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <p className="font-heading text-xl">Fernway</p>
            <p className="mt-3 max-w-[26ch] text-muted-foreground">
              Massage, skin care, and a very good cedar sauna in Hudson, New
              York.
            </p>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Visit</h3>
            <address className="mt-3 text-muted-foreground not-italic">
              {site.address.street}
              <br />
              {site.address.city}, {site.address.state} {site.address.zip}
              <br />
              <span className="text-sm">{site.address.note}</span>
            </address>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Hours</h3>
            <ul className="mt-3 space-y-1 text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.days}>
                  {h.days}
                  <br />
                  <span className="text-sm">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-sans text-sm font-medium">Get in touch</h3>
            <ul className="mt-3 space-y-1 text-muted-foreground">
              <li>
                <a href={site.phoneHref} className="link-draw">
                  {site.phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${site.email}`} className="link-draw">
                  {site.email}
                </a>
              </li>
            </ul>
            <ul className="mt-6 space-y-1 text-muted-foreground">
              <li>
                <Link href="/services" className="link-draw">
                  Services and prices
                </Link>
              </li>
              <li>
                <Link href="/faq" className="link-draw">
                  Questions, answered
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col justify-between gap-2 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row">
          <p>© 2026 Fernway Day Spa LLC</p>
          <p>Prices current as of summer 2026.</p>
        </div>
      </div>
    </footer>
  );
}
