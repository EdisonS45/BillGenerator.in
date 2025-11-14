import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free Medical Bill Generator | Hospital & Doctor Invoice Maker Online",
  description:
    "Generate medical, doctor consultation, pharmacy & hospital bills online for reimbursement and insurance claims. Download PDF instantly with patient, diagnosis, charges & GST.",
  keywords: [
    "medical bill generator",
    "hospital bill generator",
    "doctor consultation bill generator",
    "medical bill for reimbursement",
    "doctor invoice maker",
    "hospital invoice format pdf",
    "diagnostic centre bill generator",
    "pharmacy bill generator",
    "health insurance medical bill",
    "medical reimbursement invoice"
  ],
  alternates: {
    canonical: "https://billgenerator.in/medical-bill-generator",
  },
  openGraph: {
    title: "Free Medical Bill Generator | Hospital Invoice PDF",
    description:
      "Create instant medical / doctor / hospital invoices online. Download PDF for reimbursement and insurance claims.",
    type: "website",
    url: "https://billgenerator.in/medical-bill-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
