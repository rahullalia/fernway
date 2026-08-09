export const site = {
  name: "Fernway",
  tagline: "A day spa in Hudson, New York",
  address: {
    street: "6 Fernway",
    city: "Hudson",
    state: "NY",
    zip: "12534",
    note: "Just off Warren Street, behind the bookshop.",
  },
  phone: "(518) 555-0114",
  phoneHref: "tel:+15185550114",
  email: "hello@fernwayhudson.com",
  hours: [
    { days: "Wednesday and Friday", time: "9:30am to 7pm" },
    { days: "Thursday", time: "9:30am to 9pm" },
    { days: "Saturday and Sunday", time: "9am to 6pm" },
    { days: "Monday and Tuesday", time: "Closed" },
  ],
  closedDays: [1, 2], // Monday, Tuesday
} as const;

// Minutes from midnight, indexed Sunday through Saturday. null = closed.
export const openHours: ({ open: number; close: number } | null)[] = [
  { open: 540, close: 1080 }, // Sun 9 to 6
  null, // Mon
  null, // Tue
  { open: 570, close: 1140 }, // Wed 9:30 to 7
  { open: 570, close: 1260 }, // Thu 9:30 to 9, the late night
  { open: 570, close: 1140 }, // Fri 9:30 to 7
  { open: 540, close: 1080 }, // Sat 9 to 6
];

export function formatMinutes(mins: number) {
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  const hour12 = ((h + 11) % 12) + 1;
  return `${hour12}${m ? `:${m.toString().padStart(2, "0")}` : ""}${h < 12 ? "am" : "pm"}`;
}

export type ServiceItem = {
  slug: string;
  name: string;
  duration: string;
  price: number;
  description: string;
  bookable?: { minutes: number };
};

export type ServiceGroup = {
  slug: string;
  title: string;
  intro: string;
  items: ServiceItem[];
};

export const serviceGroups: ServiceGroup[] = [
  {
    slug: "massage",
    title: "Massage",
    intro:
      "All massages happen in one of our three treatment rooms, each with its own thermostat. Tell your therapist what you want out of the hour. They will ask anyway.",
    items: [
      {
        slug: "classic-60",
        name: "Classic massage",
        duration: "60 min",
        price: 135,
        description:
          "Long, steady strokes at whatever pressure you ask for. The one to pick if you just want to stop thinking for an hour.",
        bookable: { minutes: 60 },
      },
      {
        slug: "classic-90",
        name: "Classic massage",
        duration: "90 min",
        price: 190,
        description:
          "The same massage with room to breathe. Ninety minutes means nothing gets rushed, including you.",
        bookable: { minutes: 90 },
      },
      {
        slug: "deep-tissue-60",
        name: "Deep tissue",
        duration: "60 min",
        price: 150,
        description:
          "Slow, focused pressure. Tell us where it hurts and that is where the hour goes.",
        bookable: { minutes: 60 },
      },
      {
        slug: "deep-tissue-90",
        name: "Deep tissue",
        duration: "90 min",
        price: 205,
        description:
          "For the desk-job back or the marathon week. Expect to feel it the next day, in the good way.",
        bookable: { minutes: 90 },
      },
      {
        slug: "prenatal-60",
        name: "Prenatal massage",
        duration: "60 min",
        price: 140,
        description:
          "Side-lying with proper bolsters, from the second trimester on. June and Sam are both certified.",
        bookable: { minutes: 60 },
      },
    ],
  },
  {
    slug: "skin",
    title: "Skin",
    intro:
      "Priya runs the skin room. She will look at your skin before she decides anything, so the treatment you get is rarely the one you expected and usually the one you needed.",
    items: [
      {
        slug: "facial-60",
        name: "The facial",
        duration: "60 min",
        price: 145,
        description:
          "Cleanse, steam, extractions if you need them, a mask matched to your skin that day, and a face and neck massage.",
        bookable: { minutes: 60 },
      },
      {
        slug: "deep-cleanse-75",
        name: "Deep-cleanse facial",
        duration: "75 min",
        price: 170,
        description:
          "The facial, plus more time under steam and a proper going-over for congested skin. Book this one before a big event, not the day of.",
        bookable: { minutes: 75 },
      },
      {
        slug: "express-facial-30",
        name: "Express facial",
        duration: "30 min",
        price: 85,
        description:
          "Cleanse, mask, moisture, out the door. Fits inside a lunch break and looks like a full night of sleep.",
        bookable: { minutes: 30 },
      },
    ],
  },
  {
    slug: "body",
    title: "Body",
    intro:
      "Scrubs happen in the wet room at the end of the hall. You rinse off under the rain shower, then decide whether you ever want to leave.",
    items: [
      {
        slug: "salt-scrub-45",
        name: "Salt scrub",
        duration: "45 min",
        price: 110,
        description:
          "Warm oil and fine salt, head to toe. Your skin drinks water differently for about a week afterward.",
        bookable: { minutes: 45 },
      },
      {
        slug: "scrub-massage-105",
        name: "Scrub, then massage",
        duration: "105 min",
        price: 250,
        description:
          "The salt scrub followed by a sixty-minute classic massage. The whole morning, spoken for.",
        bookable: { minutes: 105 },
      },
    ],
  },
];

export const addOns = [
  { name: "Hot stones", price: 25, note: "added to any massage" },
  { name: "Cupping", price: 30, note: "with Sam only" },
  { name: "Scalp massage", price: 20, note: "the last fifteen minutes, upgraded" },
  { name: "Unscented everything", price: 0, note: "just ask when you book" },
];

export const team = [
  {
    name: "June Calloway",
    role: "Owner, massage therapist",
    line: "Fifteen years of massage, the first eight in a Manhattan hotel spa she describes as 'beautiful and deafening.' Fernway is her answer to that.",
  },
  {
    name: "Sam Delgado",
    role: "Massage therapist",
    line: "Deep tissue and sports massage. Former bike mechanic, which explains both the grip strength and the patience.",
  },
  {
    name: "Priya Raman",
    role: "Esthetician",
    line: "Will not sell you a twelve-step routine. Believes most skin needs three good products and eight hours of sleep.",
  },
  {
    name: "Nora Whitfield",
    role: "Front desk",
    line: "Knows the schedule better than the software does. If you call, you get Nora.",
  },
];

export const reviews = [
  {
    quote:
      "I came in with a desk-job neck and left without one. Sam found knots I had given names to.",
    name: "Casey R.",
  },
  {
    quote:
      "The quietest hour you can buy in Hudson on a Saturday. I book the 9am and the whole day goes better.",
    name: "Dana M.",
  },
  {
    quote:
      "My mother and I have a standing booking, first Sunday of the month. The sauna alone would be worth the drive up from the city.",
    name: "Amara T.",
  },
];

export const faqs = [
  {
    q: "Do you take walk-ins?",
    a: "When a room is open, gladly. Midweek your odds are decent. Friday through Sunday we are usually booked out, so call ahead or book online and save yourself the trip.",
  },
  {
    q: "Where do I park?",
    a: "Street parking on Warren is free after 5pm and metered before. The municipal lot on Columbia Street is a three-minute walk and almost always has room.",
  },
  {
    q: "What should I bring?",
    a: "Nothing. Robes, slippers, towels, and water are here waiting. Come in gym clothes, work clothes, whatever the day put you in.",
  },
  {
    q: "Can two of us book together?",
    a: "Yes. Our side-by-side room has two tables. The online calendar cannot hold both at once, so call the desk and Nora will set it up.",
  },
  {
    q: "I'm pregnant. Can I book a massage?",
    a: "From the second trimester on, yes. Book the prenatal massage specifically, since the setup is different: side-lying position, proper bolsters, and a therapist certified for it.",
  },
  {
    q: "What happens if I'm running late?",
    a: "Call us. We hold your room, but your treatment still ends on time so the next person starts on time. Fifteen minutes late usually means a shorter massage, not a cancelled one.",
  },
  {
    q: "What's your cancellation policy?",
    a: "Full refund with 24 hours notice. Inside 24 hours we charge half, because the room sat empty. No-shows pay in full. Snowstorms and emergencies are judged like a human being would judge them.",
  },
  {
    q: "Do you sell gift cards?",
    a: "Any amount, and they never expire. Buy one at the desk or over the phone and we can mail it, or hold it for pickup with a handwritten note if you tell Nora what to write.",
  },
  {
    q: "How does the sauna work?",
    a: "It is included with every treatment. Arrive up to thirty minutes early, change into a robe, and warm up before your appointment. Phones stay in the lockers. That rule is most of why it stays quiet. If you just want the heat, sauna-only sessions run Wednesday through Friday: forty-five minutes for $40.",
  },
  {
    q: "Should I tip?",
    a: "It is entirely up to you and never assumed. Guests who tip usually leave fifteen to twenty percent, in cash or by card at checkout.",
  },
];
