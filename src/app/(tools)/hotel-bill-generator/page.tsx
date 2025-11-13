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
      {/* GLOBAL HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Hotel Stay Invoice Generator
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
            <DownloadButton billRef={billRef} fileName={`Hotel_Bill_${formData.bookingId}.pdf`} />
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
    </div>
  );
}
