import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Hotel Invoice Generator | Lodge & Accommodation Bill Maker Online",
  description:
    "Create hotel and lodge invoices online with GST, room tariff, number of nights, guest information, and payment details. Download as PDF instantly — compliant for reimbursement claims.",
  keywords: [
    "hotel invoice generator",
    "hotel bill generator",
    "lodge bill generator",
    "hotel invoice format pdf",
    "hotel bill for reimbursement",
    "accommodation invoice generator",
    "room booking invoice",
    "hotel gst bill",
    "hotel invoice maker",
    "hotel invoice for office claims"
  ],
  alternates: {
    canonical: "https://billgenerator.in/hotel-invoice-generator",
  },
  openGraph: {
    title: "Free Hotel Invoice Generator | Lodge Bill Maker Online",
    description:
      "Generate hotel & lodge invoices with GST and download as PDF instantly. Ideal for reimbursement claims.",
    type: "website",
    url: "https://billgenerator.in/hotel-invoice-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
