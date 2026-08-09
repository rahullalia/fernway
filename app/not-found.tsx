import Link from "next/link";

import { ArrowLink } from "@/components/arrow-link";
import { site } from "@/lib/site";

export default function NotFound() {
  return (
    <section className="wrap flex min-h-[60svh] flex-col items-start justify-center py-20">
      <h1 className="max-w-[20ch] text-5xl sm:text-6xl">
        This page took the day off.
      </h1>
      <p className="mt-6 max-w-[44ch] text-lg text-muted-foreground">
        Whatever you were looking for is not at this address. The front desk
        can point you the right way: call{" "}
        <a href={site.phoneHref} className="link-draw text-foreground">
          {site.phone}
        </a>
        , or start over from the beginning.
      </p>
      <div className="mt-9 flex flex-wrap gap-6">
        <ArrowLink href="/">Back to the home page</ArrowLink>
        <Link href="/book" className="link-draw font-medium">
          Book an appointment
        </Link>
      </div>
    </section>
  );
}
