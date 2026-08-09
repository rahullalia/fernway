import Image from "next/image";
import Link from "next/link";

import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { reviews } from "@/lib/site";

import heroMassage from "@/public/images/hero-massage.jpg";
import sauna from "@/public/images/sauna.jpg";
import towelRack from "@/public/images/towel-rack.jpg";

const previews = [
  {
    href: "/services#massage",
    title: "Massage",
    line: "Classic, deep tissue, prenatal.",
    from: 135,
  },
  {
    href: "/services#skin",
    title: "Skin",
    line: "Facials matched to your skin that day, not to a menu.",
    from: 85,
  },
  {
    href: "/services#body",
    title: "Body",
    line: "Salt scrubs, the wet room, and the rain shower.",
    from: 110,
  },
];

export default function HomePage() {
  return (
    <>
      <section className="wrap grid items-center gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-2 lg:gap-16 lg:pb-24">
        <div>
          <h1 className="text-[2.9rem] leading-[1.04] sm:text-6xl lg:text-[4.4rem] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both">
            Take the hour.
          </h1>
          <p className="mt-6 max-w-[44ch] text-lg text-muted-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-100">
            Fernway is a small day spa in Hudson, New York: three treatment
            rooms, a cedar sauna, and people who are good at their jobs. The
            kettle is usually on.
          </p>
          <div className="mt-9 flex flex-wrap items-center gap-6 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-200">
            <Button asChild size="lg">
              <Link href="/book">Book an appointment</Link>
            </Button>
            <ArrowLink href="/services">Services and prices</ArrowLink>
          </div>
          <p className="mt-10 text-sm text-muted-foreground motion-safe:animate-in motion-safe:fade-in motion-safe:duration-700 motion-safe:fill-mode-both motion-safe:delay-300">
            Open Wednesday through Sunday · 6 Fernway, Hudson, NY
          </p>
        </div>
        <div className="relative motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-150">
          <Image
            src={heroMassage}
            alt="A therapist working on a client's back in a treatment room with a steel-framed window"
            priority
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-sm object-cover lg:aspect-[5/4]"
          />
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-12">
          <Reveal className="lg:col-span-7">
            <h2 className="max-w-[16ch] text-4xl sm:text-5xl">
              Small on purpose.
            </h2>
            <div className="mt-7 max-w-[54ch] space-y-5 text-muted-foreground">
              <p>
                There are three rooms, four of us, and one long hallway that
                smells like cedar and eucalyptus. We keep the schedule light
                enough that nobody gets hurried out the door, including you.
              </p>
              <p>
                There are no membership tiers and no upsell script. You book
                the hour, you get the whole hour, and the sauna is included
                because it should be.
              </p>
            </div>
            <div className="mt-8">
              <ArrowLink href="/about">More about Fernway</ArrowLink>
            </div>
          </Reveal>
          <Reveal className="lg:col-span-5" delay={120}>
            <Image
              src={towelRack}
              alt="Linen towels and body brushes hanging from a wooden peg rail"
              placeholder="blur"
              sizes="(min-width: 1024px) 40vw, 100vw"
              className="aspect-[4/5] w-full rounded-sm object-cover"
            />
          </Reveal>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">What we do</h2>
        </Reveal>
        <div className="mt-12">
          {previews.map((p, i) => (
            <Reveal key={p.href} delay={i * 70}>
              <Link
                href={p.href}
                className="group flex items-baseline justify-between gap-6 border-t border-border py-7 transition-colors duration-200 hover:text-pine-deep"
              >
                <div>
                  <h3 className="font-heading text-2xl sm:text-3xl">
                    {p.title}
                  </h3>
                  <p className="mt-1.5 text-muted-foreground">{p.line}</p>
                </div>
                <span className="flex shrink-0 items-center gap-3 text-muted-foreground">
                  <span className="text-sm sm:text-base">from ${p.from}</span>
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 16 16"
                    className="size-4 transition-transform duration-250 ease-(--ease-out-strong) group-hover:translate-x-1"
                  >
                    <path
                      d="M2 8h11m0 0L9.5 4.5M13 8l-3.5 3.5"
                      stroke="currentColor"
                      strokeWidth="1.25"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="none"
                    />
                  </svg>
                </span>
              </Link>
            </Reveal>
          ))}
          <div className="border-t border-border pt-7">
            <ArrowLink href="/services" className="text-muted-foreground">
              Everything, with prices
            </ArrowLink>
          </div>
        </div>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
          <Reveal>
            <Image
              src={sauna}
              alt="Cedar sauna benches beside a stone-filled stove"
              placeholder="blur"
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="aspect-[4/3] w-full rounded-sm object-cover"
            />
          </Reveal>
          <Reveal delay={120}>
            <h2 className="max-w-[14ch] text-4xl sm:text-5xl">
              The sauna comes with.
            </h2>
            <div className="mt-7 max-w-[52ch] space-y-5 text-muted-foreground">
              <p>
                Every appointment includes the cedar sauna at the end of the
                hall. Arrive up to thirty minutes early, change into a robe,
                and warm up before your treatment starts.
              </p>
              <p>
                Phones stay in the lockers, which is most of the reason it
                stays quiet in there.
              </p>
            </div>
            <p className="mt-8 text-sm text-muted-foreground">
              Just want the heat? Sauna-only sessions run Wednesday through
              Friday: 45 minutes for $40.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="wrap py-20 sm:py-28">
        <Reveal>
          <h2 className="text-4xl sm:text-5xl">From the guest book</h2>
        </Reveal>
        <div className="mt-12 grid gap-10 md:grid-cols-3 md:gap-8">
          {reviews.map((r, i) => (
            <Reveal as="figure" key={r.name} delay={i * 90}>
              <blockquote className="font-heading text-xl leading-snug text-foreground/90 sm:text-2xl">
                “{r.quote}”
              </blockquote>
              <figcaption className="mt-5 text-sm text-muted-foreground">
                {r.name}
              </figcaption>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
