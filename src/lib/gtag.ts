// lib/gtag.ts
export const GA_MEASUREMENT_ID = "G-2EYMMNFW2V"; // 👈 replace

// Log a pageview
export const pageview = (url: string) => {
  if (typeof window === "undefined") return;
  // @ts-ignore
  window.gtag("config", GA_MEASUREMENT_ID, {
    page_path: url,
  });
};
