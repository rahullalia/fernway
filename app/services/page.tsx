import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Glow } from "@/components/glow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { addOns, serviceGroups } from "@/lib/site";

import massageHands from "@/public/images/massage-hands.jpg";

export const metadata: Metadata = {
  title: "The menu",
  description:
    "Massage, facials, and body treatments at Fernway in Hudson, NY. Every price includes the cedar sauna.",
};

export default function ServicesPage() {
  return (
    <>
      <section className="wrap grid gap-12 pt-12 pb-8 sm:pt-16 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-8">
          <p className="type-mono">services and prices, nothing hidden</p>
          <h1 className="display mt-3 text-6xl sm:text-7xl">the menu</h1>
          <p className="mt-6 max-w-[52ch] text-lg text-muted-foreground">
            Prices include everything: the room, the sauna, robes, towels, and
            tea after. What you see here is what you pay, plus whatever you
            choose to tip.
          </p>
        </div>
        <figure className="print-card hidden w-52 rotate-[1.5deg] self-end justify-self-end transition-transform duration-500 ease-(--ease-out-strong) hover:rotate-0 lg:col-span-4 lg:block">
          <Image
            src={massageHands}
            alt="A therapist's hands pressing into a client's lower back"
            placeholder="blur"
            sizes="13rem"
            className="aspect-[4/5] w-full object-cover"
          />
          <figcaption className="type-mono pt-2 text-[#5c5342]">
            room two, about 4pm
          </figcaption>
        </figure>
      </section>

      {serviceGroups.map((group) => (
        <section
          key={group.slug}
          id={group.slug}
          className="wrap scroll-mt-24 py-12 sm:py-16"
        >
          <Reveal className="grid gap-10 lg:grid-cols-12 lg:gap-16">
            <div className="lg:col-span-4">
              <h2 className="display text-5xl">{group.title.toLowerCase()}</h2>
              <p className="mt-5 max-w-[40ch] text-muted-foreground">
                {group.intro}
              </p>
            </div>
            <div className="lg:col-span-8">
              {group.items.map((item, i) => (
                <Reveal key={item.slug} delay={i * 60}>
                  <Glow className="rounded-[6px]">
                    <div className="px-3 py-5 sm:px-4">
                      <p className="flex items-baseline">
                        <span className="font-heading text-2xl">{item.name}</span>
                        <span className="type-mono ml-3 shrink-0">
                          {item.duration}
                        </span>
                        <span className="dots" aria-hidden="true" />
                        <span className="type-mono shrink-0 text-base text-foreground">
                          ${item.price}
                        </span>
                      </p>
                      <p className="mt-2 max-w-[56ch] text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Glow>
                </Reveal>
              ))}
            </div>
          </Reveal>
        </section>
      ))}

      <section className="border-y border-border bg-pit">
        <div className="wrap grid gap-10 py-16 sm:py-20 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-5xl">extras</h2>
            <p className="mt-5 max-w-[40ch] text-muted-foreground">
              Small upgrades, added when you book or when you arrive. Each one
              fits inside your existing appointment.
            </p>
          </Reveal>
          <div className="lg:col-span-8">
            {[...addOns.map((a) => ({
              name: a.name,
              note: a.note,
              price: a.price === 0 ? "free" : `+$${a.price}`,
            })), {
              name: "Sauna only",
              note: "45 minutes, wednesday through friday",
              price: "$40",
            }].map((a, i) => (
              <Reveal
                key={a.name}
                delay={i * 50}
                className="flex items-baseline border-b border-border/60 py-4 last:border-b-0"
              >
                <span className="font-medium">{a.name}</span>
                <span className="type-mono ml-3 hidden shrink-0 sm:inline">
                  {a.note.toLowerCase()}
                </span>
                <span className="dots" aria-hidden="true" />
                <span className="type-mono shrink-0 text-base text-foreground">
                  {a.price}
                </span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap py-16 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-4">
            <h2 className="display text-5xl">the fine print</h2>
          </Reveal>
          <Reveal
            className="max-w-[60ch] space-y-4 text-muted-foreground lg:col-span-8"
            delay={80}
          >
            <p>
              Cancel with 24 hours notice for a full refund. Inside 24 hours we
              charge half; no-shows pay in full. Weather and emergencies get
              judged like a person would judge them, not like a policy would.
            </p>
            <p>
              Arrive fifteen minutes early, or thirty if you want real time in
              the sauna. If you are running late, call us. Your treatment still
              ends on time so the next person starts on time.
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
            <Link href="/book">book an appointment</Link>
          </Button>
        </Reveal>
      </section>
    </>
  );
}
