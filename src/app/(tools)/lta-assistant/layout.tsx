import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free LTA Assistant | Leave Travel Allowance Calculator for Tax Exemption",
  description:
    "Calculate Leave Travel Allowance (LTA) exemption in minutes. Check eligibility, exemption rules, family travel policy, allowed expenses and required documents. Download LTA summary as PDF.",
  keywords: [
    "lta assistant",
    "lta exemption calculator",
    "leave travel allowance calculator",
    "lta claim eligibility",
    "lta tax exemption",
    "documents for lta",
    "lta reimbursement rules",
    "lta exemption online",
    "lta claim for family travel",
    "lta tax saving"
  ],
  alternates: {
    canonical: "https://billgenerator.in/lta-assistant",
  },
  openGraph: {
    title: "Free LTA Assistant | Leave Travel Allowance Exemption Calculator",
    description:
      "Calculate your eligible LTA exemption and download a claim summary for reimbursement and tax filing.",
    type: "website",
    url: "https://billgenerator.in/lta-assistant",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
