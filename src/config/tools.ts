import { Car, Utensils, Wifi, MapPin, Briefcase } from 'lucide-react';

export const TOOLS_CATEGORIES = [
  {
    title: "Transport & Travel",
    tools: [
      {
        title: "Fuel Bill Generator",
        description: "Generate Petrol, Diesel & CNG receipts for reimbursement.",
        href: "/fuel-bill-generator",
        icon: Car,
        badge: "Popular"
      },
      {
        title: "Taxi/Cab Receipt",
        description: "Create Ola/Uber style invoices with route maps.",
        href: "/taxi-receipt-generator",
        icon: MapPin,
      }
    ]
  },
  {
    title: "Food & Dining",
    tools: [
      {
        title: "Restaurant Bill Maker",
        description: "Make authentic food bills with GST and Order IDs.",
        href: "/restaurant-bill-generator",
        icon: Utensils,
        badge: "High Revenue"
      }
    ]
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
        title: "LTA Assistant",
        description: "Calculate Leave Travel Allowance exemptions.",
        href: "/lta-assistant",
        icon: Briefcase,
      }
    ]
  }
];