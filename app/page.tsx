import Image from "next/image";
import Link from "next/link";

import { Glow } from "@/components/glow";
import { Reveal } from "@/components/reveal";
import { Button } from "@/components/ui/button";
import { reviews, serviceGroups } from "@/lib/site";

import heroMassage from "@/public/images/hero-massage.jpg";
import saunaAmber from "@/public/images/sauna-amber.jpg";
import towelRack from "@/public/images/towel-rack.jpg";
import towelsCounter from "@/public/images/towels-counter.jpg";
import towelsStack from "@/public/images/towels-stack.jpg";

const chapters = [
  {
    n: "01",
    title: "arrive",
    body: "Come up to thirty minutes early. The lockers have real keys, the robes are warm, and nobody hurries you down the hall.",
    meta: "robes and slippers provided · phones stay in the lockers",
    img: towelRack,
    alt: "Linen towels and body brushes hanging from a wooden peg rail",
    caption: "the hooks by the lockers",
  },
  {
    n: "02",
    title: "the heat",
    body: "The cedar sauna is included with everything we do. Twenty minutes in there and the week loosens its grip on your shoulders.",
    meta: "included with every appointment · late night thursdays",
    img: saunaAmber,
    alt: "The cedar sauna glowing under two amber sconces",
    caption: "the sauna, holding steady",
  },
  {
    n: "03",
    title: "the table",
    body: "Sixty or ninety minutes. The pressure you ask for, a therapist who asks the right questions and then stops talking.",
    meta: "massage from $135 · facials from $85",
    img: heroMassage,
    alt: "A therapist working on a client's back by a steel-framed window",
    caption: "room two, late afternoon",
  },
  {
    n: "04",
    title: "after",
    body: "Chamomile or ginger, honey from two towns over. Sit in the front room as long as you like; the kettle does not close early.",
    meta: "tea after, always · no upsell script, ever",
    img: towelsStack,
    alt: "A stack of white towels in a wicker basket on the warming shelf",
    caption: "the warming shelf",
  },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="fog-a" />
          <div className="fog-b" />
        </div>
        <div className="wrap relative flex min-h-[88svh] flex-col justify-between pt-14 pb-10 sm:pt-20">
          <h1 className="display text-[17.5vw] leading-[0.98] sm:text-[13vw] lg:text-[10.5vw]">
            <span className="block motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both">
              the last
            </span>
            <span className="block pl-[8vw] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-100">
              quiet room
            </span>
            <span className="block pl-[3vw] motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-4 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-200">
              in hudson<span className="text-primary">.</span>
            </span>
          </h1>

          <div className="mt-12 flex flex-col justify-between gap-10 lg:flex-row lg:items-end">
            <div className="max-w-md motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-3 motion-safe:duration-700 motion-safe:ease-out motion-safe:fill-mode-both motion-safe:delay-300">
              <p className="text-lg text-muted-foreground">
                Fernway is a small day spa behind the bookshop: three treatment
                rooms, a cedar sauna, tea after. Thursdays we stay open late.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-5">
                <Button asChild size="lg">
                  <Link href="/book">book an appointment</Link>
                </Button>
                <Link href="/services" className="type-mono link-draw text-foreground">
                  the menu, with prices
                </Link>
              </div>
              <p className="type-mono mt-10">
                massage · facials · cedar sauna · wed to sun, late thursdays
              </p>
            </div>

            <figure className="print-card w-56 shrink-0 -rotate-2 self-end transition-transform duration-500 ease-(--ease-out-strong) sm:w-64 lg:hover:rotate-0 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-1000 motion-safe:fill-mode-both motion-safe:delay-500">
              <Image
                src={towelsCounter}
                alt="Folded towels on the front counter beside a lit candle"
                placeholder="blur"
                sizes="16rem"
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="type-mono pt-2 text-[#5c5342]">
                front desk, thursday 6:40pm
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* The ritual */}
      <section className="wrap py-20 sm:py-28">
        <Reveal>
          <p className="type-mono">how an evening here goes</p>
          <h2 className="display mt-3 text-5xl sm:text-6xl">the ritual</h2>
        </Reveal>
        <div className="mt-16 space-y-20 sm:space-y-28">
          {chapters.map((c, i) => (
            <Reveal
              key={c.n}
              className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
            >
              <div
                className={
                  i % 2
                    ? "lg:order-2 lg:col-span-6"
                    : "lg:col-span-6"
                }
              >
                <p className="type-mono text-2xl text-primary">{c.n}</p>
                <h3 className="display mt-4 text-4xl sm:text-5xl">{c.title}</h3>
                <p className="mt-5 max-w-[46ch] text-muted-foreground">{c.body}</p>
                <p className="type-mono mt-6">{c.meta}</p>
              </div>
              <div
                className={
                  i % 2
                    ? "lg:order-1 lg:col-span-5"
                    : "lg:col-span-5 lg:col-start-8"
                }
              >
                <figure
                  className={`print-card transition-transform duration-500 ease-(--ease-out-strong) lg:hover:rotate-0 ${i % 2 ? "rotate-[1.2deg]" : "rotate-[-1.2deg]"}`}
                >
                  <Image
                    src={c.img}
                    alt={c.alt}
                    placeholder="blur"
                    sizes="(min-width: 1024px) 38vw, 100vw"
                    className="aspect-[4/3] w-full object-cover"
                  />
                  <figcaption className="type-mono pt-2 text-[#5c5342]">
                    {c.caption}
                  </figcaption>
                </figure>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* The menu */}
      <section className="border-y border-border bg-pit">
        <div className="wrap py-20 sm:py-28">
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="type-mono">prices include the room, the sauna, and tea</p>
              <h2 className="display mt-3 text-5xl sm:text-6xl">the menu</h2>
            </div>
            <Link href="/services" className="type-mono link-draw text-foreground">
              full descriptions
            </Link>
          </Reveal>

          <div className="mt-14 space-y-12">
            {serviceGroups.map((group) => (
              <Reveal key={group.slug}>
                <p className="type-mono mb-3 text-foreground">
                  {group.title.toLowerCase()}
                </p>
                <div>
                  {group.items.map((item) => (
                    <Glow key={item.slug} className="rounded-[6px]">
                      <Link
                        href={`/services#${group.slug}`}
                        className="flex items-baseline px-3 py-4 transition-colors duration-200 hover:text-amber-bright sm:px-4"
                      >
                        <span className="font-heading text-xl sm:text-2xl">
                          {item.name}
                        </span>
                        <span className="type-mono ml-3 shrink-0">
                          {item.duration}
                        </span>
                        <span className="dots" aria-hidden="true" />
                        <span className="type-mono shrink-0 text-base text-foreground">
                          ${item.price}
                        </span>
                      </Link>
                    </Glow>
                  ))}
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal className="mt-14 flex flex-wrap items-center gap-6">
            <Button asChild size="lg">
              <Link href="/book">book an appointment</Link>
            </Button>
            <p className="type-mono">
              add-ons and the fine print live on{" "}
              <Link href="/services" className="link-draw text-foreground">
                the full menu
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      {/* Guest book */}
      <section className="wrap py-20 sm:py-28">
        <Reveal>
          <p className="type-mono">from the guest book</p>
        </Reveal>
        <Reveal as="figure" className="mt-8" delay={80}>
          <blockquote className="display max-w-[24ch] text-4xl leading-[1.08] sm:text-5xl lg:text-6xl">
            &ldquo;{reviews[2].quote.toLowerCase()}&rdquo;
          </blockquote>
          <figcaption className="type-mono mt-6">{reviews[2].name.toLowerCase()}</figcaption>
        </Reveal>
        <div className="mt-16 grid gap-10 border-t border-border pt-10 md:grid-cols-2">
          {reviews.slice(0, 2).map((r, i) => (
            <Reveal as="figure" key={r.name} delay={i * 90}>
              <blockquote className="font-heading text-xl italic leading-snug text-foreground/90 sm:text-2xl">
                &ldquo;{r.quote}&rdquo;
              </blockquote>
              <figcaption className="type-mono mt-4">{r.name.toLowerCase()}</figcaption>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Visit strip */}
      <section className="wrap pb-20 sm:pb-28">
        <Reveal>
          <Glow className="rounded-lg border border-border bg-card">
            <div className="grid gap-10 p-7 sm:p-10 lg:grid-cols-12">
              <div className="lg:col-span-5">
                <h2 className="display text-4xl">finding us</h2>
                <p className="mt-5 max-w-[38ch] text-muted-foreground">
                  Number 6 on a short lane off Warren Street, behind the
                  bookshop. Six minutes on foot from the Amtrak, which makes a
                  9am massage and the 12:40 back to the city a reasonable plan.
                </p>
                <p className="type-mono mt-6">
                  6 fernway, hudson, ny ·{" "}
                  <a href="tel:+15185550114" className="link-draw text-foreground">
                    (518) 555-0114
                  </a>
                </p>
              </div>
              <div className="type-mono self-center lg:col-span-6 lg:col-start-7">
                <p className="mb-3 text-foreground">the week, at a glance</p>
                {[
                  ["wednesday", "9:30am to 7pm"],
                  ["thursday", "9:30am to 9pm · late night"],
                  ["friday", "9:30am to 7pm"],
                  ["saturday + sunday", "9am to 6pm"],
                  ["monday + tuesday", "closed"],
                ].map(([d, t]) => (
                  <p key={d} className="flex justify-between gap-6 border-b border-border/60 py-2 last:border-b-0">
                    <span>{d}</span>
                    <span>{t}</span>
                  </p>
                ))}
                <p className="mt-4">same day? call the desk, we shuffle things.</p>
              </div>
            </div>
          </Glow>
        </Reveal>
      </section>
    </>
  );
}
