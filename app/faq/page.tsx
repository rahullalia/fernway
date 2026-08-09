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
    <section className="wrap grid gap-12 pt-10 pb-20 sm:pt-14 sm:pb-28 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-4">
        <h1 className="text-5xl sm:text-6xl">Questions, answered</h1>
        <p className="mt-6 max-w-[36ch] text-muted-foreground">
          Everything people actually ask the front desk, written down so Nora
          can drink her coffee while it is still hot.
        </p>
        <p className="mt-8 text-muted-foreground">
          Something else on your mind?
          <br />
          <a href={site.phoneHref} className="link-draw text-foreground">
            {site.phone}
          </a>{" "}
          or{" "}
          <a href={`mailto:${site.email}`} className="link-draw text-foreground">
            {site.email}
          </a>
        </p>
      </div>
      <Reveal className="lg:col-span-8" delay={80}>
        <Accordion type="single" collapsible defaultValue={faqs[0].q}>
          {faqs.map((f) => (
            <AccordionItem key={f.q} value={f.q}>
              <AccordionTrigger>{f.q}</AccordionTrigger>
              <AccordionContent>{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Reveal>
    </section>
  );
}
