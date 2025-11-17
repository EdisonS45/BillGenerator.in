import { MetadataRoute } from "next";
import { TOOLS_CATEGORIES } from "@/config/tools";

export default function sitemap(): MetadataRoute.Sitemap {
  const site = "https://bill-generator-in.vercel.app/";

  const toolPaths = TOOLS_CATEGORIES.flatMap(c => c.tools.map(t => ({
    url: `${site}${t.href}`,
    lastModified: new Date(),
    changeFrequency: "weekly",
    priority: 0.9,
  })));

  return [
    {
      url: site,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    ...toolPaths,
    { url: `${site}/about`, lastModified: new Date() },
    { url: `${site}/privacy`, lastModified: new Date() },
    { url: `${site}/disclaimer`, lastModified: new Date() },
    { url: `${site}/support`, lastModified: new Date() },
    { url: `${site}/faq`, lastModified: new Date() },
  ];
}
