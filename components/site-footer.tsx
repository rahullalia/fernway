import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-pit">
      <div className="wrap py-20 sm:py-28">
        <div className="flex flex-col items-start gap-10">
          <p className="type-mono">closing time</p>
          <h2 className="display max-w-[14ch] text-5xl sm:text-7xl">
            we&rsquo;ll put the kettle on.
          </h2>
          <Button asChild size="lg">
            <Link href="/book">book an appointment</Link>
          </Button>
        </div>

        <div className="mt-20 grid gap-x-8 gap-y-10 border-t border-border pt-10 sm:grid-cols-3">
          <div>
            <p className="type-mono mb-3 text-foreground">visit</p>
            <address className="text-muted-foreground not-italic">
              {site.address.street}, {site.address.city}, {site.address.state}{" "}
              {site.address.zip}
              <br />
              <span className="text-sm">{site.address.note}</span>
            </address>
          </div>

          <div>
            <p className="type-mono mb-3 text-foreground">hours</p>
            <ul className="space-y-1 text-muted-foreground">
              {site.hours.map((h) => (
                <li key={h.days} className="flex justify-between gap-4">
                  <span>{h.days}</span>
                  <span className="type-mono self-center">{h.time}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="type-mono mb-3 text-foreground">elsewhere</p>
            <ul className="space-y-1 text-muted-foreground">
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
              <li className="pt-4">
                <Link href="/services" className="link-draw">
                  The menu
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

        <p className="type-mono mt-16 flex flex-col justify-between gap-1 border-t border-border pt-6 sm:flex-row">
          <span>© 2026 fernway day spa llc</span>
          <span>prices current as of summer 2026</span>
        </p>
      </div>
    </footer>
  );
}
