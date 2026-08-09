import Link from "next/link";

import { Button } from "@/components/ui/button";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[62svh] flex-col items-start justify-center py-20">
      <p className="type-mono">404</p>
      <h1 className="display mt-4 max-w-[16ch] text-6xl sm:text-7xl">
        this page took the night off.
      </h1>
      <p className="mt-6 max-w-[44ch] text-lg text-muted-foreground">
        Whatever you were looking for is not at this address. The front desk
        can point you the right way:{" "}
        <a href={site.phoneHref} className="link-draw text-foreground">
          {site.phone}
        </a>
        .
      </p>
      <div className="mt-9 flex flex-wrap items-center gap-6">
        <Button asChild>
          <Link href="/">back to the front room</Link>
        </Button>
        <Link href="/book" className="type-mono link-draw text-foreground">
          book an appointment
        </Link>
      </div>
    </section>
  );
}
