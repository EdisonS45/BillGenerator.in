import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Restaurant Bill Generator | Food & Hotel Invoice PDF for Reimbursement",
  description:
    "Generate food, restaurant and hotel dining bills online for reimbursement. Add dishes, GST, service charge and payment details. Download printable PDF in restaurant invoice format.",
  keywords: [
    "restaurant bill generator",
    "food bill generator",
    "hotel food bill generator",
    "restaurant invoice format pdf",
    "restaurant invoice maker",
    "food bill for reimbursement",
    "cafe bill generator",
    "food receipt generator",
    "restaurant bill pdf",
    "food and beverages invoice"
  ],
  alternates: {
    canonical: "https://billgenerator.in/restaurant-bill-generator",
  },
  openGraph: {
    title: "Free Restaurant Bill Generator | Hotel & Food Invoice Maker PDF",
    description:
      "Generate instant restaurant invoices with food items, GST and service charge. Download PDF for reimbursement claims.",
    type: "website",
    url: "https://billgenerator.in/restaurant-bill-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
