import {
  Car,
  Utensils,
  Wifi,
  MapPin,
  Briefcase,
  Hotel,
  QrCode,
  Stethoscope,
  Home,
  Smartphone,
  FileText,
} from "lucide-react";

export const TOOLS_CATEGORIES = [
  {
    title: "Transport & Travel",
    tools: [
      {
        title: "Fuel Bill Generator",
        description: "Generate petrol, diesel, and CNG bills for reimbursement.",
        href: "/fuel-bill-generator",
        icon: Car,
        badge: "Popular",
      },
      {
        title: "Taxi/Cab Receipt",
        description: "Create Ola and Uber style cab receipts with maps.",
        href: "/taxi-receipt-generator",
        icon: MapPin,
      },
      {
        title: "Hotel Stay Invoice",
        description: "Make hotel stay invoices with GST and dates.",
        href: "/hotel-bill-generator",
        icon: Hotel,
      },
      {
        title: "LTA Assistant",
        description: "Create flight or train invoices for LTA claims.",
        href: "/lta-assistant",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Tax & Business",
    tools: [
      {
        title: "HRA Rent Receipt",
        description: "Generate rent receipts with revenue stamps for HRA.",
        href: "/rent-receipt-generator",
        icon: Home,
        badge: "Tax Saver",
      },
      {
        title: "UPI QR Code",
        description: "Create PhonePe, GPay, or Paytm QR codes with fixed amounts.",
        href: "/upi-qr-generator",
        icon: QrCode,
        badge: "Hot",
      },
      {
        title: "GST Invoice Maker",
        description: "Make professional GST invoices for your business.",
        href: "/gst-invoice-generator",
        icon: FileText,
      },
      {
        title: "Medical / Pharmacy",
        description: "Create pharmacy bills for medical allowance claims.",
        href: "/medical-bill-generator",
        icon: Stethoscope,
      },
    ],
  },
  {
    title: "Utilities & Office",
    tools: [
      {
        title: "Internet Bill Generator",
        description: "Get broadband bills for Jio, Airtel, and ACT.",
        href: "/internet-bill-generator",
        icon: Wifi,
      },
      {
        title: "Mobile Postpaid Bill",
        description: "Generate postpaid mobile bills for reimbursement.",
        href: "/mobile-bill-generator",
        icon: Smartphone,
      },
    ],
  },
  {
    title: "Food & Dining",
    tools: [
      {
        title: "Restaurant Bill Maker",
        description: "Create food bills with GST for food allowances.",
        href: "/restaurant-bill-generator",
        icon: Utensils,
        badge: "High Revenue",
      },
    ],
  },
];