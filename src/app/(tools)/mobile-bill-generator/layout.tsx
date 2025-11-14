import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Mobile Bill Generator | Postpaid & Prepaid Recharge Invoice PDF",
  description:
    "Generate mobile recharge and postpaid invoices online for reimbursement and bill proof. Supports Airtel, Jio, Vi, BSNL and more. Download PDF instantly with number, billing cycle and GST.",
  keywords: [
    "mobile bill generator",
    "postpaid bill generator",
    "mobile recharge invoice",
    "mobile bill for reimbursement",
    "airtel mobile bill generator",
    "jio mobile bill pdf",
    "vi vodafone idea invoice",
    "bsnl mobile bill",
    "mobile recharge bill pdf",
    "phone bill invoice maker"
  ],
  alternates: {
    canonical: "https://billgenerator.in/mobile-bill-generator",
  },
  openGraph: {
    title: "Free Mobile Bill Generator | Recharge & Postpaid Invoice PDF",
    description:
      "Generate instant mobile recharge or postpaid invoices with GST & download as PDF for reimbursement.",
    type: "website",
    url: "https://billgenerator.in/mobile-bill-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
