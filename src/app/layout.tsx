import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { Navbar } from '@/components/layout/Navbar';
import Script from "next/script"; // 👈 important
import AnalyticsListener from "./analytics-listener";

import { Footer } from '@/components/layout/Footer'; // <-- NEW IMPORT
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  metadataBase: new URL("https://bill-generator-in.vercel.app/"),
  title: "Free Online Bill & Receipt Generator | BillGeneratorIndia.in",
  description:
    "Generate Fuel Bills, Taxi Receipts, Broadband Invoices, LTA Flight Tickets & Restaurant Bills instantly. 100% free — no login, no data stored.",
  openGraph: {
    title: "BillGeneratorIndia.in",
    description:
      "Create reimbursement-ready bills & receipts instantly in PDF.",
    url: "https://bill-generator-in.vercel.app/",
    siteName: "BillGenerator.in",
    images: [
      {
        url: "/og-cover.png",
        width: 1200,
        height: 630,
        alt: "BillGenerator.in - Free Bill & Receipt Generator",
      },
    ],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "BillGeneratorIndia.in",
    description:
      "Generate bills & receipts for reimbursement instantly — 100% free.",
    images: ["/og-cover.png"],
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
<html lang="en">
  <head>
    {/* Google Analytics (GA4) */}
    <Script
      src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX"
      strategy="afterInteractive"
    />
    <Script id="ga4-init" strategy="afterInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());
        gtag('config', 'G-2EYMMNFW2V', {
          page_path: window.location.pathname,
        });
      `}
    </Script>

    {/* JSON-LD SCHEMA → MOVE IT INSIDE HEAD HERE */}
    <script
      type="application/ld+json"
      suppressHydrationWarning
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "SoftwareApplication",
          "name": "BillGenerator.in",
          "description":
            "Free online tools to generate bills, receipts and invoices for reimbursement, LTA, travel & business purposes instantly.",
          "applicationCategory": "Utility",
          "operatingSystem": "Web",
          "url": "https://bill-generator-in.vercel.app/",
          "aggregateRating": {
            "@type": "AggregateRating",
            "ratingValue": "4.9",
            "ratingCount": "2141"
          },
          "offers": {
            "@type": "Offer",
            "price": "0.00",
            "priceCurrency": "INR"
          }
        }),
      }}
    />
  </head>

  <body className={`${inter.className} min-h-screen bg-gray-50 flex flex-col`}>
    <AnalyticsListener />
    <Navbar />

    <div className="flex-grow">{children}</div>

    <Footer />
  </body>
</html>

  );
}