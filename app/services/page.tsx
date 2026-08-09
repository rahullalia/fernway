import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { addOns, serviceGroups } from "@/lib/site";

import facial from "@/public/images/facial.jpg";
import massageHands from "@/public/images/massage-hands.jpg";
import plungePool from "@/public/images/plunge-pool.jpg";

export const metadata: Metadata = {
  title: "Services and prices",
  description:
    "Massage, facials, and body treatments at Fernway in Hudson, NY. Every appointment includes the cedar sauna.",
};

const groupImages = {
  massage: {
    src: massageHands,
    alt: "A therapist's hands pressing into a client's lower back",
  },
  skin: {
    src: facial,
    alt: "A client lying back during a neck and shoulder treatment",
  },
  body: {
    src: plungePool,
    alt: "The sunken soaking pool in the wet room, lit from above",
  },
} as const;

export default function ServicesPage() {
  return (
    <>
      <section className="wrap pt-10 pb-4 sm:pt-14">
        <h1 className="text-5xl sm:text-6xl">Services</h1>
        <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground">
          Prices include everything: the room, the sauna, robes, towels, and
          tea after. What you see here is what you pay, plus whatever you
          choose to tip.
        </p>
      </section>

      {serviceGroups.map((group) => {
        const img = groupImages[group.slug as keyof typeof groupImages];
        return (
          <section
            key={group.slug}
            id={group.slug}
            className="wrap scroll-mt-24 py-14 sm:py-20"
          >
            <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className="lg:col-span-4">
                <h2 className="text-4xl">{group.title}</h2>
                <p className="mt-5 max-w-[40ch] text-muted-foreground">
                  {group.intro}
                </p>
                <Image
                  src={img.src}
                  alt={img.alt}
                  placeholder="blur"
                  sizes="(min-width: 1024px) 30vw, 100vw"
                  className="mt-8 hidden aspect-[4/5] w-full rounded-sm object-cover lg:block"
                />
              </Reveal>
              <div className="lg:col-span-8">
                {group.items.map((item, i) => (
                  <Reveal
                    key={item.slug}
                    delay={i * 60}
                    className="border-t border-border py-6 first:border-t-0 first:pt-0 lg:first:pt-2"
                  >
                    <div className="flex items-baseline justify-between gap-6">
                      <h3 className="font-heading text-2xl">
                        {item.name}
                        <span className="ml-3 font-sans text-sm text-muted-foreground">
                          {item.duration}
                        </span>
                      </h3>
                      <p className="shrink-0 font-heading text-2xl">
                        ${item.price}
                      </p>
                    </div>
                    <p className="mt-2 max-w-[58ch] text-muted-foreground">
                      {item.description}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        );
      })}

      <section className="bg-paper-deep">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="text-4xl">Add-ons</h2>
            <p className="mt-5 max-w-[40ch] text-muted-foreground">
              Small upgrades, added when you book or when you arrive. Each one
              fits inside your existing appointment.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            {addOns.map((a, i) => (
              <Reveal
                key={a.name}
                delay={i * 60}
                className="flex items-baseline justify-between gap-6 border-t border-border py-5 first:border-t-0 first:pt-0"
              >
                <p>
                  <span className="font-medium">{a.name}</span>
                  <span className="ml-3 text-muted-foreground">{a.note}</span>
                </p>
                <p className="shrink-0 font-heading text-xl">
                  {a.price === 0 ? "Free" : `+$${a.price}`}
                </p>
              </Reveal>
            ))}
            <Reveal
              delay={addOns.length * 60}
              className="flex items-baseline justify-between gap-6 border-t border-border py-5"
            >
              <p>
                <span className="font-medium">Sauna only</span>
                <span className="ml-3 text-muted-foreground">
                  45 minutes, Wednesday through Friday
                </span>
              </p>
              <p className="shrink-0 font-heading text-xl">$40</p>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="text-4xl">The fine print</h2>
          </Reveal>
          <Reveal className="max-w-[60ch] space-y-4 text-muted-foreground lg:col-span-8" delay={80}>
            <p>
              Cancel with 24 hours notice for a full refund. Inside 24 hours
              we charge half; no-shows pay in full. Weather and emergencies
              get judged like a person would judge them, not like a policy
              would.
            </p>
            <p>
              Arrive fifteen minutes early, or thirty if you want real time in
              the sauna. If you are running late, call us. Your treatment
              still ends on time so the next person starts on time.
            </p>
            <p>
              Booking for two? The side-by-side room has two tables. Call{" "}
              <a href="tel:+15185550114" className="link-draw text-foreground">
                (518) 555-0114
              </a>{" "}
              and Nora will set it up.
            </p>
          </Reveal>
        </div>
        <Reveal className="mt-14" delay={140}>
          <Button asChild size="lg">
            <Link href="/book">Book an appointment</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
