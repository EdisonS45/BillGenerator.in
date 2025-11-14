import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free UPI QR Generator | Instant Payment QR Code for PhonePe, GPay & Paytm",
  description:
    "Create your own UPI QR code for payments. Generate QR for Google Pay, PhonePe, Paytm and all UPI apps. Add name, UPI ID and amount. Download printable QR for shop & business.",
  keywords: [
    "upi qr code generator",
    "generate upi qr",
    "payment qr code maker",
    "qr code for phonepe",
    "google pay qr generator",
    "bharat qr generator",
    "upi qr for business",
    "merchant qr generator",
    "upi qr printable",
    "upi payment link and qr"
  ],
  alternates: {
    canonical: "https://billgenerator.in/upi-qr-generator",
  },
  openGraph: {
    title: "Free UPI QR Generator | Payment QR Code for Any App",
    description:
      "Create and download a UPI QR code that works on PhonePe, Google Pay, Paytm and BHIM. No signup required.",
    type: "website",
    url: "https://billgenerator.in/upi-qr-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
