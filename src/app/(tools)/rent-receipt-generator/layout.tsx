import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Rent Receipt Generator | HRA House Rent Bill PDF for Income Tax",
  description:
    "Generate rent receipts online for HRA claims. Add landlord & tenant details, PAN, address, monthly rent and period. Download printable PDF accepted for salary & income tax proof.",
  keywords: [
    "rent receipt generator",
    "hra rent receipt",
    "monthly rent receipt pdf",
    "rent bill generator",
    "rent receipt for income tax exemption",
    "house rent receipt download",
    "rent receipt online",
    "hra proof for salary",
    "house rent invoice format",
    "rent receipt for reimbursement"
  ],
  alternates: {
    canonical: "https://billgenerator.in/rent-receipt-generator",
  },
  openGraph: {
    title: "Free Rent Receipt Generator | HRA Rent Bill PDF",
    description:
      "Create correct HRA rent receipts online with landlord & tenant details. Download PDF for income tax & salary reimbursement proof.",
    type: "website",
    url: "https://billgenerator.in/rent-receipt-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
