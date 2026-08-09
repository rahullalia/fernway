import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/reveal";
import { team } from "@/lib/site";

import plungePool from "@/public/images/plunge-pool.jpg";
import sauna from "@/public/images/sauna.jpg";
import towelsStack from "@/public/images/towels-stack.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fernway is a four-person day spa on a little lane off Warren Street in Hudson, NY. Open since 2019.",
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid gap-12 pt-12 pb-16 sm:pt-16 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <div className="lg:col-span-7">
          <p className="type-mono">est. 2019 · behind the bookshop</p>
          <h1 className="display mt-3 max-w-[16ch] text-5xl leading-[1.04] sm:text-6xl lg:text-7xl">
            a former stationer&rsquo;s on a little lane.
          </h1>
          <div className="mt-8 max-w-[56ch] space-y-5 text-muted-foreground">
            <p>
              Fernway is named after its address: number 6 on a short lane off
              Warren Street. The building sold paper and pens for sixty years,
              sat empty for two, and opened as a spa in the fall of 2019 after
              a long year of sanding floors. The typewriter lettering on this
              site is our little nod to the previous tenants.
            </p>
            <p>
              June Calloway opened it with a simple bet: that people would
              drive past the big hotel spas for a small place that does fewer
              things and does them properly. Three treatment rooms. A cedar
              sauna. A wet room with a rain shower. That is the whole building,
              and that is the point.
            </p>
            <p>
              Most of our guests live within twenty minutes. A good number come
              up from the city on the Amtrak, walk the six minutes from the
              station, and time their massage to the return train. We keep the
              schedule honest so that math works.
            </p>
          </div>
        </div>
        <div className="flex flex-row gap-6 lg:col-span-5 lg:flex-col lg:items-end">
          <Reveal delay={100}>
            <figure className="print-card w-44 rotate-[-2deg] transition-transform duration-500 ease-(--ease-out-strong) hover:rotate-0 sm:w-60">
              <Image
                src={plungePool}
                alt="The sunken soaking pool in the wet room, lit from above"
                placeholder="blur"
                sizes="15rem"
                priority
                className="aspect-[4/5] w-full object-cover"
              />
              <figcaption className="type-mono pt-2 text-[#5c5342]">
                the wet room
              </figcaption>
            </figure>
          </Reveal>
          <Reveal delay={220} className="self-end lg:self-auto">
            <figure className="print-card w-40 rotate-[1.6deg] transition-transform duration-500 ease-(--ease-out-strong) hover:rotate-0 sm:w-52">
              <Image
                src={sauna}
                alt="Cedar sauna benches beside a stone-filled stove"
                placeholder="blur"
                sizes="13rem"
                className="aspect-square w-full object-cover"
              />
              <figcaption className="type-mono pt-2 text-[#5c5342]">
                the sauna, by day
              </figcaption>
            </figure>
          </Reveal>
        </div>
      </section>

      <section className="border-y border-border bg-pit">
        <div className="wrap py-20 sm:py-28">
          <Reveal>
            <p className="type-mono">four of us, no rotation of strangers</p>
            <h2 className="display mt-3 text-5xl sm:text-6xl">
              who you&rsquo;ll meet
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 70}>
                <h3 className="font-heading text-2xl">{person.name}</h3>
                <p className="type-mono mt-1">{person.role.toLowerCase()}</p>
                <p className="mt-3 max-w-[46ch] text-muted-foreground">
                  {person.line}
                </p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="wrap grid items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-16">
        <Reveal>
          <figure className="print-card rotate-[-1deg] transition-transform duration-500 ease-(--ease-out-strong) hover:rotate-0">
            <Image
              src={towelsStack}
              alt="A stack of white towels in a wicker basket on the warming shelf"
              placeholder="blur"
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="aspect-[4/3] w-full object-cover"
            />
            <figcaption className="type-mono pt-2 text-[#5c5342]">
              the warming shelf
            </figcaption>
          </figure>
        </Reveal>
        <Reveal delay={120}>
          <h2 className="display max-w-[16ch] text-5xl sm:text-6xl">
            how we run the place
          </h2>
          <div className="mt-7 max-w-[52ch] space-y-5 text-muted-foreground">
            <p>
              Unscented oil is always available, and the sheet mask never comes
              with a sales pitch. If a therapist thinks you need a different
              treatment than the one you booked, they will say so and charge
              you for the cheaper one.
            </p>
            <p>
              The rooms stay quiet. The kettle stays on. Tea is chamomile or
              ginger, and the honey is from two towns over.
            </p>
          </div>
          <p className="type-mono mt-8">
            <Link href="/book" className="link-draw text-foreground">
              come see it in person
            </Link>
          </p>
        </Reveal>
      </section>
    </>
  );
}
