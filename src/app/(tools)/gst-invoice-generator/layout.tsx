import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Free GST Invoice Generator | Online Tax Invoice Maker with QR Code",
  description:
    "Create GST-compliant invoices online with auto tax calculation and UPI / Bank QR code for instant payment. Download in PDF format with HSN, CGST, SGST & IGST breakup.",
  keywords: [
    "gst invoice generator",
    "online gst invoice generator",
    "gst bill maker",
    "tax invoice generator",
    "invoice maker with gst",
    "hsn code invoice",
    "gst invoice format pdf",
    "gst bill generator with qr code",
    "invoice generator for freelancers",
    "gst invoice for small business",
  ],
  alternates: {
    canonical: "https://billgenerator.in/gst-invoice-generator",
  },
  openGraph: {
    title: "Free GST Invoice Generator with QR Code",
    description:
      "Generate quick invoices with tax breakup and payment QR code. Download in PDF instantly.",
    type: "website",
    url: "https://billgenerator.in/gst-invoice-generator",
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
