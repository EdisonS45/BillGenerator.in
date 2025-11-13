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
        description:
          "Generate Petrol, Diesel & CNG receipts for reimbursement.",
        href: "/fuel-bill-generator",
        icon: Car,
        badge: "Popular",
      },
      {
        title: "Taxi/Cab Receipt",
        description: "Create Ola/Uber style invoices with route maps.",
        href: "/taxi-receipt-generator",
        icon: MapPin,
      },
      {
        title: "Hotel Stay Invoice", // NEW
        description: "Generate hotel & lodge bills with check-in/out dates.",
        href: "/hotel-bill-generator",
        icon: Hotel,
      },
      {
        title: "LTA Assistant",
        description: "Calculate Leave Travel Allowance exemptions.",
        href: "/lta-assistant",
        icon: Briefcase,
      },
    ],
  },
  {
    title: "Food & Dining",
    tools: [
      {
        title: "Restaurant Bill Maker",
        description: "Make authentic food bills with GST and Order IDs.",
        href: "/restaurant-bill-generator",
        icon: Utensils,
        badge: "High Revenue",
      },
    ],
  },
  {
    title: "Utilities & Office",
    tools: [
      {
        title: "Internet Bill Generator",
        description: "Broadband & Wi-Fi receipts for remote work claims.",
        href: "/internet-bill-generator",
        icon: Wifi,
      },
      {
        title: "Mobile Postpaid Bill", // NEW
        description: "Generate monthly mobile bills for Vi, Airtel, and Jio.",
        href: "/mobile-bill-generator",
        icon: Smartphone,
      },
    ],
  },
  {
    title: "Tax & Business", // NEW CATEGORY
    tools: [
      {
        title: "HRA Rent Receipt", // NEW
        description: "Monthly or annual rent receipts for HRA tax proof.",
        href: "/rent-receipt-generator",
        icon: Home,
        badge: "Tax Saver",
      },
      {
        title: "GST Invoice Maker", // NEW
        description: "Professional GST invoices for freelancers and business.",
        href: "/gst-invoice-generator",
        icon: FileText,
      },
      {
        title: "Medical / Pharmacy", // NEW
        description: "Chemist bills and pharmacy receipts for medical claims.",
        href: "/medical-bill-generator",
        icon: Stethoscope,
      },
      {
        title: "UPI QR Code", // NEW
        description:
          "Create GPay/PhonePe/Paytm style QR standees with amounts.",
        href: "/upi-qr-generator",
        icon: QrCode, //
        badge: "Hot",
      },
    ],
  },
];
