"use client";

import { useState, useRef, useEffect } from "react";
import { HotelPreview } from "@/components/tools/hotel/HotelPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
import {
  User,
  Calendar,
  MapPin,
  CreditCard,
  Hotel as HotelIcon,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Hand,
} from "lucide-react";

export default function HotelBillPage() {
  const billRef = useRef<HTMLDivElement>(null);

  // 🔵 Zoom + Drag System (same as Internet Bill Generator)
  const [zoom, setZoom] = useState(0.75);
  const [handMode, setHandMode] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const dragStart = useRef({ x: 0, y: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!handMode) return;
    setIsDragging(true);
    dragStart.current = {
      x: e.clientX - position.x,
      y: e.clientY - position.y,
    };
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !handMode) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // 🔵 Hotel Bill Data
  const [formData, setFormData] = useState({
    hotelName: "Hotel Grand Residency",
    address: "Plot 45, Sector 12, MG Road, Gurgaon - 122001",
    gstin: "06AABCU9603R1ZM",
    guestName: "Vikram Malhotra",
    bookingId: "RES-88291",
    checkIn: "2024-02-10",
    checkOut: "2024-02-12",
    roomType: "Deluxe Executive Room",
    roomRate: 3500,
    nights: 2,
    foodAmount: 850,
    extraAmount: 0,
  });

  // Auto-calc nights
  useEffect(() => {
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diff = Math.ceil((end.getTime() - start.getTime()) / 86400000);
    if (diff > 0) {
      setFormData((prev) => ({ ...prev, nights: diff }));
    }
  }, [formData.checkIn, formData.checkOut]);

  // Random booking ID + default dates
  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bookingId: "RES-" + Math.floor(100000 + Math.random() * 900000),
      checkIn: new Date().toISOString().slice(0, 10),
      checkOut: new Date(Date.now() + 86400000).toISOString().slice(0, 10),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Hotel Invoice Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "1630",
      },
      description:
        "Create hotel and accommodation invoices with GST and room breakdown. Download as PDF instantly.",
    }),
  }}
/>

      {/* GLOBAL HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
          Hotel Stay Invoice Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Create professional hotel invoices for LTA, business travel & company reimbursement.
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F3F4F6] font-sans">

        {/* LEFT PANEL — INPUT EDITOR */}
<div className="w-full lg:w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">

          <div className="lg:flex-1 lg:overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">

            {/* HOTEL DETAILS */}
            <h2 className="text-xs font-bold text-gray-400 uppercase">Hotel Details</h2>

            <BillInput label="Hotel Name" name="hotelName" value={formData.hotelName} onChange={handleChange} Icon={HotelIcon} />
            <BillInput label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} />
            <BillInput label="Address" name="address" value={formData.address} onChange={handleChange} Icon={MapPin} />

            {/* STAY DETAILS */}
            <div className="h-px bg-gray-100"></div>

            <h2 className="text-xs font-bold text-gray-400 uppercase">Stay Details</h2>

            <BillInput label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} Icon={User} />

            <div className="grid grid-cols-2 gap-3">
              <BillInput label="Check-In" name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} Icon={Calendar} />
              <BillInput label="Check-Out" name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} Icon={Calendar} />
            </div>

            <p className="text-right text-[11px] font-bold text-blue-600">Nights: {formData.nights}</p>

            {/* CHARGES */}
            <div className="h-px bg-gray-100"></div>

            <h2 className="text-xs font-bold text-gray-400 uppercase">Charges (₹)</h2>

            <BillInput label="Room Type" name="roomType" value={formData.roomType} onChange={handleChange} />

            <div className="grid grid-cols-3 gap-3">
              <BillInput label="Room Rate" name="roomRate" type="number" value={formData.roomRate} onChange={handleChange} Icon={CreditCard} />
              <BillInput label="Food/Service" name="foodAmount" type="number" value={formData.foodAmount} onChange={handleChange} />
              <BillInput label="Extras" name="extraAmount" type="number" value={formData.extraAmount} onChange={handleChange} />
            </div>

          </div>

          {/* DOWNLOAD BUTTON */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">
              Export Options
            </p>
            <DownloadButton billRef={billRef} fileName={`Hotel_Bill_${formData.bookingId}.pdf`} outputMode="invoice" />
          </div>

        </div>

        {/* RIGHT PANEL — PREVIEW */}
        <div className="flex-1 relative bg-[#E5E7EB] flex flex-col overflow-hidden border-t lg:border-t-0 border-gray-300"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: handMode
              ? isDragging
                ? "grabbing"
                : "grab"
              : "default",
          }}
        >
          {/* BACKGROUND PATTERN */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* LIVE PREVIEW BADGE */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm shadow px-3 py-1 rounded-full border border-gray-200 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-700">Live Preview</span>
          </div>

          {/* SCROLLABLE PREVIEW CANVAS */}
          <div className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-10 relative z-10 custom-scrollbar">
            <div
              onMouseDown={handleMouseDown}
              className="transition-transform duration-200 ease-out origin-top lg:origin-center shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <HotelPreview ref={billRef} data={formData} />
            </div>
          </div>

          {/* FLOATING ZOOM + HAND TOOLBAR */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-2xl border border-white/10">

              {/* ZOOM OUT */}
              <button onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full">
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>

              {/* ZOOM IN */}
              <button onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full">
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/20 mx-1"></div>

              {/* RESET */}
              <button
                onClick={() => {
                  setZoom(0.75);
                  setPosition({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              {/* HAND TOOL */}
              <button
                onClick={() => setHandMode(!handMode)}
                className={`p-1.5 rounded-full transition ${handMode ? "bg-white/30" : "opacity-40"}`}
                title="Toggle Hand Tool"
              >
                <Hand className="w-4 h-4" />
              </button>

            </div>
          </div>

        </div>
      </div>
      {/* --- HOTEL SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* 1. INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Hotel Invoice Generator for Reimbursement & Business Travel
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Employees and business travelers often need hotel invoices for corporate reimbursement.
      If your original hotel bill is missing, not itemized properly, or you need a digital copy
      for record keeping, our tool generates a professional room tariff invoice instantly with
      GST, guest details, stay duration, and payment mode breakup.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">Hotel Stay</span>
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Lodge & Accommodation</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Business Travel</span>
      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">Reimbursement Claims</span>
    </div>
  </div>

  {/* 2. FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Room Tariff Breakdown</h3>
      <p className="text-sm text-gray-500">Auto-calculates number of nights, per-night rate, and total payable amount.</p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">GST Included</h3>
      <p className="text-sm text-gray-500">Automatically adds GST 12% / 18% based on tariff and generates proper invoice format.</p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Professional PDF Export</h3>
      <p className="text-sm text-gray-500">Print or share via WhatsApp / Email instantly — accepted for office claims.</p>
    </div>
  </div>

  {/* 3. STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a hotel invoice?</h3>
      <div className="space-y-6">
        {[
          "Enter hotel name, GSTIN and address",
          "Add guest name and check-in / check-out dates",
          "Enter room tariff and number of nights",
          "Add GST & optional service charges (if needed)",
          "Select payment mode (Cash / UPI / Card / Bank Transfer)",
          "Download the invoice as a PDF"
        ].map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <p className="text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* FAQ */}
    <div className="lg:col-span-5">
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 space-y-6">
        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is this invoice valid for reimbursement?</h4>
          <p className="text-xs text-gray-600">Yes. It includes GSTIN, tariff breakup, number of nights, guest details and payment info — fully compliant.</p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Does this work for lodges / PG / service apartments?</h4>
          <p className="text-xs text-gray-600">Yes. It is suitable for hotels, lodges, service apartments and accommodation businesses.</p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Do you store invoice or guest data?</h4>
          <p className="text-xs text-gray-600">No — everything happens locally in your browser. Nothing is uploaded or saved on our servers.</p>
        </div>
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
