import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const site = "https://billgenerator.in";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${site}/sitemap.xml`,
  };
}
