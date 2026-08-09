import type { Metadata } from "next";

import { BookingWidget } from "@/components/booking/booking-widget";
import { Glow } from "@/components/glow";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Pick a treatment, a day, and a time. Nothing is charged online; we confirm by email and payment happens at the spa.",
};

export default function BookPage() {
  return (
    <section className="wrap grid gap-14 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <p className="type-mono">three picks and a name</p>
        <h1 className="display mt-3 text-6xl sm:text-7xl">book</h1>
        <p className="mt-6 max-w-[50ch] text-lg text-muted-foreground">
          We confirm every request by email before it counts, so nothing is
          final until you hear from a person.
        </p>
        <div className="mt-12">
          <BookingWidget />
        </div>
      </div>

      <aside className="lg:col-span-5">
        <Glow className="rounded-lg border border-border bg-card lg:sticky lg:top-24">
          <div className="p-7 sm:p-9">
            <h2 className="display text-3xl">before you come in</h2>
            <ul className="mt-6 space-y-5 text-muted-foreground">
              <li>
                Arrive fifteen minutes early, or thirty if you want unhurried
                time in the sauna. It is included either way.
              </li>
              <li>
                Wear anything. Robes, slippers, towels, and lockers are here,
                and the lockers have actual keys.
              </li>
              <li>
                Parking is free on Warren Street after 5pm, metered before.
                The Columbia Street lot is a three-minute walk.
              </li>
              <li>
                Booking for two? The side-by-side room cannot be booked
                online. Call the desk and Nora will arrange it.
              </li>
            </ul>
            <div className="type-mono mt-8 space-y-1 border-t border-border pt-6">
              <p>
                <a href={site.phoneHref} className="link-draw text-foreground">
                  {site.phone}
                </a>
              </p>
              <p>wed + fri 9:30 to 7 · thu until 9 · weekends 9 to 6</p>
            </div>
          </div>
        </Glow>
      </aside>
    </section>
  );
}
