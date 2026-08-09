import type { Metadata } from "next";

import { Reveal } from "@/components/reveal";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqs, site } from "@/lib/site";

export const metadata: Metadata = {
  title: "FAQ",
  description:
    "Parking, walk-ins, gift cards, the sauna, and everything else people ask the front desk at Fernway.",
};

export default function FaqPage() {
  return (
    <section className="wrap grid gap-12 pt-12 pb-20 sm:pt-16 sm:pb-28 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <p className="type-mono">asked at the desk, answered here</p>
        <h1 className="display mt-3 text-6xl sm:text-7xl">questions</h1>
        <p className="mt-6 max-w-[36ch] text-muted-foreground">
          Everything people actually ask, written down so Nora can drink her
          coffee while it is still hot.
        </p>
        <p className="type-mono mt-8">
          something else on your mind?
          <br />
          <a href={site.phoneHref} className="link-draw text-foreground">
            {site.phone}
          </a>{" "}
          ·{" "}
          <a href={`mailto:${site.email}`} className="link-draw text-foreground">
            {site.email}
          </a>
        </p>
      </div>
      <Reveal className="lg:col-span-8" delay={80}>
        <Accordion type="single" collapsible defaultValue={faqs[0].q}>
          {faqs.map((f, i) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>
                <span className="flex items-baseline gap-4">
                  <span className="type-mono shrink-0 text-primary">
                    {(i + 1).toString().padStart(2, "0")}
                  </span>
                  {f.q}
                </span>
              </AccordionTrigger>
              <AccordionContent className="pl-10">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
