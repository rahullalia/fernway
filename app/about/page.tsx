import type { Metadata } from "next";
import Image from "next/image";

import { ArrowLink } from "@/components/arrow-link";
import { Reveal } from "@/components/reveal";
import { team } from "@/lib/site";

import towelsCounter from "@/public/images/towels-counter.jpg";
import towelsStack from "@/public/images/towels-stack.jpg";

export const metadata: Metadata = {
  title: "About",
  description:
    "Fernway is a four-person day spa on a little lane off Warren Street in Hudson, NY. Open since 2019.",
};

export default function AboutPage() {
  return (
    <>
      <section className="wrap grid gap-10 pt-10 pb-16 sm:pt-14 lg:grid-cols-12 lg:gap-16 lg:pb-24">
        <div className="lg:col-span-7">
          <h1 className="max-w-[18ch] text-5xl leading-[1.06] sm:text-6xl">
            A former stationer&rsquo;s on a little lane.
          </h1>
          <div className="mt-8 max-w-[56ch] space-y-5 text-muted-foreground">
            <p>
              Fernway is named after its address: number 6 on a short lane off
              Warren Street, behind the bookshop. The building sold paper and
              pens for sixty years, sat empty for two, and opened as a spa in
              the fall of 2019 after a long year of sanding floors.
            </p>
            <p>
              June Calloway opened it with a simple bet: that people would
              drive past the big hotel spas for a small place that does fewer
              things and does them properly. Three treatment rooms. A cedar
              sauna. A wet room with a rain shower. That is the whole
              building, and that is the point.
            </p>
            <p>
              Most of our guests live within twenty minutes. A good number
              come up from the city on the Amtrak, walk the six minutes from
              the station, and time their massage to the return train. We keep
              the schedule honest so that math works.
            </p>
          </div>
        </div>
        <Reveal className="lg:col-span-5" delay={100}>
          <Image
            src={towelsCounter}
            alt="Folded towels on the front counter beside a candle and a brass mirror"
            placeholder="blur"
            sizes="(min-width: 1024px) 40vw, 100vw"
            priority
            className="aspect-[4/5] w-full rounded-sm object-cover"
          />
        </Reveal>
      </section>

      <section className="bg-paper-deep">
        <div className="wrap py-20 sm:py-28">
          <Reveal>
            <h2 className="text-4xl sm:text-5xl">Who you&rsquo;ll meet</h2>
          </Reveal>
          <div className="mt-12 grid gap-x-8 gap-y-10 sm:grid-cols-2">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 70}>
                <h3 className="font-heading text-2xl">{person.name}</h3>
                <p className="mt-1 text-sm text-muted-foreground">
                  {person.role}
                </p>
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
          <Image
            src={towelsStack}
            alt="A stack of white towels in a wicker basket on the warming shelf"
            placeholder="blur"
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="aspect-[4/3] w-full rounded-sm object-cover"
          />
        </Reveal>
        <Reveal delay={120}>
          <h2 className="max-w-[16ch] text-4xl sm:text-5xl">
            How we run the place
          </h2>
          <div className="mt-7 max-w-[52ch] space-y-5 text-muted-foreground">
            <p>
              Unscented oil is always available, and the sheet mask never
              comes with a sales pitch. If a therapist thinks you need a
              different treatment than the one you booked, they will say so
              and charge you for the cheaper one.
            </p>
            <p>
              The rooms stay quiet. The kettle stays on. Tea is chamomile or
              ginger, and the honey is from two towns over.
            </p>
          </div>
          <div className="mt-8">
            <ArrowLink href="/book">Come see it in person</ArrowLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
