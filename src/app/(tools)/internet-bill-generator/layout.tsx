import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Internet Bill Generator | Broadband & WiFi Invoice Maker Online",
  description:
    "Generate internet & broadband bills for reimbursement claims. Supports Airtel, JioFiber, ACT, BSNL, Hathway and more. Download WiFi invoice as PDF instantly.",
  keywords: [
    "internet bill generator",
    "broadband bill generator",
    "wifi bill generator",
    "broadband invoice maker",
    "broadband bill for reimbursement",
    "jiofiber bill generator",
    "airtel internet bill",
    "internet bill format pdf",
    "wifi bill for office claims",
    "act broadband bill download"
  ],
  alternates: {
    canonical: "https://billgenerator.in/internet-bill-generator",
  },
  openGraph: {
    title: "Free Internet Bill Generator | Broadband Invoice PDF",
    description:
      "Create instant internet & WiFi invoices with provider details and client ID. Download PDF for reimbursement claims.",
    type: "website",
    url: "https://billgenerator.in/internet-bill-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
