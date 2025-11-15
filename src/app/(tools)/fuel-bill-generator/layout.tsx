import type { Metadata } from "next";

export const metadata: Metadata = {
  // 1. TITLE: Hits the two biggest keywords (Fuel & Petrol) + "Free" modifier
  title: "Fuel Bill Generator | Online Petrol & Diesel Receipt Generator Free",
  
  // 2. DESCRIPTION: Includes "Reimbursement" (Intent) and secondary keywords
  description: "Generate petrol and diesel receipts online within seconds. Free Fuel Bill Generator for reimbursement claims — supports IOCL, BPCL, HPCL and Shell. Download print-ready PDF or JPG thermal fuel bills instantly.",
  
  // 3. KEYWORDS: Copied directly from your Excel analysis
  keywords: [
    "fuel bill generator",
    "petrol bill generator",
    "diesel bill generator",
    "online petrol bill generator",
    "fuel receipt generator",
    "fake petrol bill for reimbursement", // High intent, despite the word 'fake'
    "driver allowance receipt",
    "petrol pump bill format"
  ],

  alternates: {
    canonical: "https://billgenerator.in/fuel-bill-generator",
  },

  openGraph: {
    title: "Free Petrol & Fuel Bill Generator",
    description: "Lost your fuel receipt? Generate a compliant duplicate instantly with auto-updated city rates.",
    type: "website",
    url: "https://billgenerator.in/fuel-bill-generator",
    // images: ["/og-fuel.jpg"], // Add this later
  }
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}