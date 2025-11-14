import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Taxi Receipt Generator | Ola & Uber Style Cab Invoice PDF",
  description:
    "Generate taxi, cab, Ola and Uber style invoices for reimbursement. Add driver, pickup-drop route, trip fare, tolls and GST. Download PDF instantly for office claims.",
  keywords: [
    "taxi bill generator",
    "taxi receipt generator",
    "cab bill generator",
    "ola invoice generator",
    "uber bill pdf",
    "taxi bill for reimbursement",
    "ola travel invoice",
    "uber trip receipt download",
    "cab receipt download pdf",
    "taxi bill format"
  ],
  alternates: {
    canonical: "https://billgenerator.in/taxi-receipt-generator",
  },
  openGraph: {
    title: "Free Taxi Receipt Generator | Ola & Uber Invoice PDF",
    description:
      "Create instant cab receipts for office reimbursement with route map, driver info, distance, fare and GST.",
    type: "website",
    url: "https://billgenerator.in/taxi-receipt-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
