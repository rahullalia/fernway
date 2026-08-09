"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { formatMinutes, openHours, serviceGroups, site } from "@/lib/site";
import { cn } from "@/lib/utils";

const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
];
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"];
const HORIZON_DAYS = 60;

type Service = {
  slug: string;
  name: string;
  duration: string;
  price: number;
  minutes: number;
  group: string;
};

const services: Service[] = serviceGroups.flatMap((group) =>
  group.items
    .filter((item) => item.bookable)
    .map((item) => ({
      slug: item.slug,
      name: item.name,
      duration: item.duration,
      price: item.price,
      minutes: item.bookable!.minutes,
      group: group.title,
    }))
);

function startOfDay(d: Date) {
  return new Date(d.getFullYear(), d.getMonth(), d.getDate());
}

function addDays(d: Date, n: number) {
  const next = new Date(d);
  next.setDate(next.getDate() + n);
  return next;
}

function dateKey(d: Date) {
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

/* Deterministic hash so the fake availability is stable per day and slot. */
function seed(str: string) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) {
    h = (h * 33) ^ str.charCodeAt(i);
  }
  return Math.abs(h);
}

function slotsFor(date: Date, minutes: number) {
  const hours = openHours[date.getDay()];
  if (!hours) return [];
  const weekend = date.getDay() === 0 || date.getDay() === 6;
  const lastStart = hours.close - minutes;
  const out: { label: string; value: number }[] = [];
  for (let t = hours.open; t <= lastStart; t += 30) {
    const keepUnder = weekend ? 42 : 58;
    if (seed(`${dateKey(date)}:${t}`) % 100 >= keepUnder) continue;
    out.push({ label: formatMinutes(t), value: t });
  }
  return out;
}

function prettyDate(d: Date) {
  return d.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function BookingWidget() {
  const today = startOfDay(new Date());
  const minDate = addDays(today, 1);
  const maxDate = addDays(today, HORIZON_DAYS);

  const [service, setService] = React.useState<Service | null>(null);
  const [monthCursor, setMonthCursor] = React.useState(
    () => new Date(today.getFullYear(), today.getMonth(), 1)
  );
  const [date, setDate] = React.useState<Date | null>(null);
  const [time, setTime] = React.useState<{ label: string; value: number } | null>(null);
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [notes, setNotes] = React.useState("");
  const [sending, setSending] = React.useState(false);
  const [sent, setSent] = React.useState(false);

  const minutes = service?.minutes ?? 60;
  const slots = date ? slotsFor(date, minutes) : [];

  const selectDate = (d: Date) => {
    setDate(d);
    setTime(null);
  };

  const selectService = (s: Service) => {
    setService(s);
    setTime(null);
  };

  const emailOk = /.+@.+\..+/.test(email);
  const ready = service && date && time && name.trim().length > 1 && emailOk;

  const missing = [
    !service && "a treatment",
    !date && "a day",
    !time && "a time",
    !(name.trim().length > 1 && emailOk) && "your details",
  ].filter(Boolean) as string[];

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ready || sending) return;
    setSending(true);
    window.setTimeout(() => {
      setSending(false);
      setSent(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 900);
  };

  /* Calendar grid for the visible month. */
  const year = monthCursor.getFullYear();
  const month = monthCursor.getMonth();
  const firstWeekday = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: (Date | null)[] = [
    ...Array.from({ length: firstWeekday }, () => null),
    ...Array.from({ length: daysInMonth }, (_, i) => new Date(year, month, i + 1)),
  ];

  const canGoBack =
    new Date(year, month, 1) > new Date(minDate.getFullYear(), minDate.getMonth(), 1);
  const canGoForward =
    new Date(year, month + 1, 1) <= new Date(maxDate.getFullYear(), maxDate.getMonth(), 1);

  const disabledDay = (d: Date) =>
    d < minDate || d > maxDate || !openHours[d.getDay()];

  if (sent && service && date && time) {
    const ref = `FW-${(seed(`${dateKey(date)}:${time.value}:${email}`) % 9000 + 1000)}`;
    return (
      <div className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-500 motion-safe:ease-out">
        <h2 className="display text-4xl sm:text-5xl">request sent.</h2>
        <p className="mt-4 max-w-[48ch] text-muted-foreground">
          Nora will confirm by email during open hours, usually within the
          hour. Nothing is charged until you walk out happy.
        </p>

        <div className="mt-10 max-w-md rounded-[6px] border border-dashed border-input bg-card p-7">
          <p className="type-mono flex justify-between text-foreground">
            <span>fernway · hudson, ny</span>
            <span>{ref}</span>
          </p>
          <div className="type-mono mt-6 space-y-2.5 border-t border-dashed border-input pt-5">
            <p className="flex justify-between gap-6">
              <span>treatment</span>
              <span className="text-right text-foreground">
                {service.name.toLowerCase()}, {service.duration}
              </span>
            </p>
            <p className="flex justify-between gap-6">
              <span>date</span>
              <span className="text-right text-foreground">
                {prettyDate(date).toLowerCase()}
              </span>
            </p>
            <p className="flex justify-between gap-6">
              <span>time</span>
              <span className="text-right text-foreground">{time.label}</span>
            </p>
            <p className="flex justify-between gap-6">
              <span>price</span>
              <span className="text-right text-foreground">${service.price}</span>
            </p>
            <p className="flex justify-between gap-6">
              <span>confirmation to</span>
              <span className="text-right text-foreground">{email}</span>
            </p>
          </div>
          <p className="type-mono mt-5 border-t border-dashed border-input pt-4">
            arrive early. the sauna is included. the kettle will be on.
          </p>
        </div>

        <p className="type-mono mt-6">
          need to change something? call{" "}
          <a href={site.phoneHref} className="link-draw text-foreground">
            {site.phone}
          </a>
        </p>
        <Button
          variant="outline"
          className="mt-8"
          onClick={() => {
            setSent(false);
            setService(null);
            setDate(null);
            setTime(null);
            setName("");
            setEmail("");
            setPhone("");
            setNotes("");
          }}
        >
          book another
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={submit}>
      <fieldset>
        <legend className="display text-3xl">choose a treatment</legend>
        <div className="mt-5 space-y-2">
          {serviceGroups.map((group) => (
            <React.Fragment key={group.slug}>
              <p className="type-mono pt-3 first:pt-0">
                {group.title.toLowerCase()}
              </p>
              {services
                .filter((s) => s.group === group.title)
                .map((s) => {
                  const selected = service?.slug === s.slug;
                  return (
                    <label
                      key={s.slug}
                      className={cn(
                        "flex cursor-pointer items-center gap-4 rounded-[6px] border bg-card px-4 py-3.5 transition-colors duration-150",
                        selected
                          ? "border-primary"
                          : "border-border hover:border-muted-foreground/60"
                      )}
                    >
                      <input
                        type="radio"
                        name="service"
                        value={s.slug}
                        checked={selected}
                        onChange={() => selectService(s)}
                        className="sr-only"
                      />
                      <span
                        aria-hidden="true"
                        className={cn(
                          "size-4 shrink-0 rounded-full border transition-all duration-150",
                          selected ? "border-[5px] border-primary" : "border-input"
                        )}
                      />
                      <span className="flex-1">
                        {s.name}
                        <span className="type-mono ml-2">{s.duration}</span>
                      </span>
                      <span className="type-mono text-base text-foreground">
                        ${s.price}
                      </span>
                    </label>
                  );
                })}
            </React.Fragment>
          ))}
        </div>
      </fieldset>

      <fieldset className="mt-12 border-t border-border pt-10">
        <legend className="sr-only">Pick a day</legend>
        <div className="flex items-baseline justify-between">
          <h2 className="display text-3xl">pick a day</h2>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMonthCursor(new Date(year, month - 1, 1))}
              disabled={!canGoBack}
              aria-label="Previous month"
              className="flex size-10 items-center justify-center rounded-[6px] transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
                <path d="M10 3 5 8l5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
            <button
              type="button"
              onClick={() => setMonthCursor(new Date(year, month + 1, 1))}
              disabled={!canGoForward}
              aria-label="Next month"
              className="flex size-10 items-center justify-center rounded-[6px] transition-colors hover:bg-secondary disabled:pointer-events-none disabled:opacity-30"
            >
              <svg aria-hidden="true" viewBox="0 0 16 16" className="size-4">
                <path d="m6 3 5 5-5 5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" fill="none" />
              </svg>
            </button>
          </div>
        </div>
        <p className="type-mono mt-1">
          {MONTHS[month].toLowerCase()} {year} · closed monday and tuesday ·
          thursdays until 9
        </p>
        <div
          key={`${year}-${month}`}
          className="mt-5 grid max-w-sm grid-cols-7 gap-1 motion-safe:animate-in motion-safe:fade-in motion-safe:duration-200"
        >
          {WEEKDAYS.map((w, i) => (
            <span
              key={`${w}-${i}`}
              className="type-mono flex size-10 items-center justify-center sm:size-11"
            >
              {w}
            </span>
          ))}
          {cells.map((d, i) =>
            d ? (
              <button
                key={i}
                type="button"
                onClick={() => selectDate(d)}
                disabled={disabledDay(d)}
                aria-label={prettyDate(d)}
                aria-pressed={date?.getTime() === d.getTime()}
                className={cn(
                  "flex size-10 items-center justify-center rounded-[6px] text-sm transition-colors duration-150 sm:size-11",
                  date?.getTime() === d.getTime()
                    ? "bg-primary font-medium text-primary-foreground"
                    : "hover:bg-secondary",
                  disabledDay(d) && "pointer-events-none text-foreground/25"
                )}
              >
                {d.getDate()}
              </button>
            ) : (
              <span key={i} />
            )
          )}
        </div>
        <p className="type-mono mt-3">
          booking opens tomorrow and runs eight weeks out. same day? call{" "}
          <a href={site.phoneHref} className="link-draw text-foreground">
            {site.phone}
          </a>
        </p>
      </fieldset>

      {date && (
        <fieldset
          key={dateKey(date) + minutes}
          className="mt-12 border-t border-border pt-10 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:ease-out"
        >
          <legend className="sr-only">Pick a time</legend>
          <h2 className="display text-3xl">{prettyDate(date).toLowerCase()}</h2>
          <div aria-live="polite">
            {slots.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {slots.map((slot) => {
                  const selected = time?.value === slot.value;
                  return (
                    <button
                      key={slot.value}
                      type="button"
                      onClick={() => setTime(slot)}
                      aria-pressed={selected}
                      className={cn(
                        "type-mono rounded-[6px] border px-4 py-2 transition-colors duration-150",
                        selected
                          ? "border-primary bg-primary text-primary-foreground"
                          : "border-border bg-card text-foreground hover:border-muted-foreground/60"
                      )}
                    >
                      {slot.label}
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="mt-5 max-w-[44ch] text-muted-foreground">
                That day is spoken for. Try the day before or after, or call
                the desk and we will see what we can shuffle.
              </p>
            )}
          </div>
          {service && slots.length > 0 && (
            <p className="type-mono mt-4">
              times shown fit a {service.duration} appointment
            </p>
          )}
        </fieldset>
      )}

      {time && (
        <fieldset className="mt-12 border-t border-border pt-10 motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300 motion-safe:ease-out">
          <legend className="sr-only">Your details</legend>
          <h2 className="display text-3xl">your details</h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <div className="grid gap-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                autoComplete="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="h-12 rounded-[6px] border-input bg-card px-4 text-base"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12 rounded-[6px] border-input bg-card px-4 text-base"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="phone">
                Phone{" "}
                <span className="font-normal text-muted-foreground">
                  (only if you want a text reminder)
                </span>
              </Label>
              <Input
                id="phone"
                type="tel"
                autoComplete="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="h-12 rounded-[6px] border-input bg-card px-4 text-base"
              />
            </div>
            <div className="grid gap-2 sm:col-span-2">
              <Label htmlFor="notes">
                Anything we should know?{" "}
                <span className="font-normal text-muted-foreground">
                  (injuries, allergies, scent-free, quiet please)
                </span>
              </Label>
              <Textarea
                id="notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                rows={3}
                className="rounded-[6px] border-input bg-card px-4 py-3 text-base"
              />
            </div>
          </div>
        </fieldset>
      )}

      <div className="mt-12 border-t border-border pt-8">
        <Button type="submit" size="lg" disabled={!ready || sending}>
          {sending ? "sending your request…" : "request appointment"}
        </Button>
        <p className="type-mono mt-4" aria-live="polite">
          {ready
            ? "nothing is charged now. we confirm by email, and payment happens at the spa."
            : missing.length > 0
              ? `still to pick: ${missing.join(", ")}.`
              : ""}
        </p>
      </div>
    </form>
  );
}
