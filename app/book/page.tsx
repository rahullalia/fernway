import type { Metadata } from "next";

import { BookingWidget } from "@/components/booking/booking-widget";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Book an appointment",
  description:
    "Pick a treatment, a day, and a time. Nothing is charged online; we confirm by email and payment happens at the spa.",
};

export default function BookPage() {
  return (
    <section className="wrap grid gap-14 pt-10 pb-20 sm:pt-14 sm:pb-28 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-7">
        <h1 className="text-5xl sm:text-6xl">Book an appointment</h1>
        <p className="mt-6 max-w-[50ch] text-lg text-muted-foreground">
          Three quick picks and a name. We confirm every request by email
          before it counts, so nothing is final until you hear from us.
        </p>
        <div className="mt-12">
          <BookingWidget />
        </div>
      </div>

      <aside className="lg:col-span-5">
        <div className="rounded-lg border border-border bg-card p-7 sm:p-9 lg:sticky lg:top-28">
          <h2 className="font-heading text-2xl">Before you come in</h2>
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
              Parking is free on Warren Street after 5pm, metered before. The
              Columbia Street lot is a three-minute walk.
            </li>
            <li>
              Booking for two? The side-by-side room cannot be booked online.
              Call the desk and Nora will arrange it.
            </li>
          </ul>
          <div className="mt-8 border-t border-border pt-6 text-muted-foreground">
            <p>
              <a href={site.phoneHref} className="link-draw text-foreground">
                {site.phone}
              </a>
            </p>
            <p className="mt-1 text-sm">
              Wednesday to Friday 9:30 to 7 · weekends 9 to 6
            </p>
          </div>
        </div>
      </aside>
    </section>
  );
}
