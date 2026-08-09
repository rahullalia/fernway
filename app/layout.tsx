import type { Metadata, Viewport } from "next";
import { Courier_Prime, Fraunces, Hanken_Grotesk } from "next/font/google";

import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";

import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["SOFT", "WONK", "opsz"],
  variable: "--font-fraunces",
});

const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--font-hanken",
});

const courier = Courier_Prime({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-courier",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://fernway-pied.vercel.app"),
  title: {
    default: "Fernway · Day spa in Hudson, NY",
    template: "%s · Fernway",
  },
  description:
    "Massage, facials, and a cedar sauna in Hudson, New York. Open Wednesday through Sunday, late on Thursdays.",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#171310",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${hanken.variable} ${courier.variable}`}
      suppressHydrationWarning
    >
      <body className="flex min-h-svh flex-col">
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.classList.add("js")`,
          }}
        />
        <a
          href="#content"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-50 focus:rounded-sm focus:bg-primary focus:px-5 focus:py-2.5 focus:text-primary-foreground"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="content" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
