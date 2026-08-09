import type { MetadataRoute } from "next";

// Demo build: keep it out of search indexes until a real client takes it live.
export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", disallow: "/" },
  };
}
