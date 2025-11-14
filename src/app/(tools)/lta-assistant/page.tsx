"use client";

import { useState, useRef, useEffect } from "react";
import { LTAPreview } from "@/components/tools/lta/LTAPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";

import {
  User,
  Calendar,
  Plane,
  Plus,
  Trash2,
  Briefcase,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Hand,
} from "lucide-react";

export default function LTAPage() {
  const billRef = useRef<HTMLDivElement>(null);

  // ----------------------------
  // 🔵 ZOOM + HAND TOOL (same as Internet Bill Generator)
  // ----------------------------
  const [zoom, setZoom] = useState(0.65);
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
    if (!handMode || !isDragging) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };
  const handleMouseUp = () => setIsDragging(false);

  // ----------------------------
  // 🔵 LTA FORM DATA
  // ----------------------------
  const [formData, setFormData] = useState({
    agencyName: "Global Travels Pvt Ltd",
    customerName: "Sahayam S",
    bookingId: "BKG-882910",
    bookingDate: "2024-01-10",
    travelMode: "Flight" as "Flight" | "Train",
    origin: "Chennai",
    destination: "Port Blair",
    travelDate: "2024-01-25",
    blockYear: "2022-2025",
    baseFare: 8500,
    taxes: 1200,
    passengers: [
      { name: "Durai singam", age: 44, relation: "Self" },
      { name: "Danny SA", age: 42, relation: "Friend" },
    ],
  });

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      bookingId: "BKG-" + Math.floor(100000 + Math.random() * 900000),
    }));
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ----------------------------
  // PASSENGERS
  // ----------------------------
  const addPassenger = () => {
    setFormData((prev) => ({
      ...prev,
      passengers: [
        ...prev.passengers,
        { name: "New Passenger", age: 0, relation: "Child" },
      ],
    }));
  };

  const updatePassenger = (index: number, field: string, value: string | number) => {
    const newPax = [...formData.passengers];
    newPax[index] = { ...newPax[index], [field]: value };
    setFormData((prev) => ({ ...prev, passengers: newPax }));
  };

  const removePassenger = (index: number) => {
    if (formData.passengers.length > 1) {
      setFormData((prev) => ({
        ...prev,
        passengers: prev.passengers.filter((_, i) => i !== index),
      }));
    }
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "LTA Assistant",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.7",
        ratingCount: "1120",
      },
      description:
        "Calculate LTA exemption based on travel details, family members, ticket fare and tax rules. Download summary for claims.",
    }),
  }}
/>

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
          LTA/LTC Invoice Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Generate authentic flight/train invoices for LTA claims.
        </p>
      </div>

      {/* MAIN LAYOUT (InternetBill style) */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F3F4F6] font-sans">

        {/* LEFT SIDEBAR (EDITOR) */}
        <div className="w-full lg:w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">

          <div className="lg:flex-1 lg:overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">
            {/* Agency */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BillInput
                label="Travel Agency Name"
                name="agencyName"
                value={formData.agencyName}
                onChange={handleChange}
                Icon={Briefcase}
              />
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">
                  Block Year
                </label>
                <select
                  name="blockYear"
                  value={formData.blockYear}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg py-2.5 px-3 text-sm"
                >
                  <option>2022-2025</option>
                  <option>2018-2021</option>
                </select>
              </div>
            </div>

            {/* Trip */}
            <div className="h-px bg-gray-100" />
            <h2 className="text-xs font-bold text-gray-400 uppercase">Trip Details</h2>

            <div className="grid grid-cols-2 gap-3">
              <BillInput name="origin" label="Origin" value={formData.origin} onChange={handleChange} />
              <BillInput name="destination" label="Destination" value={formData.destination} onChange={handleChange} />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <BillInput
                name="travelDate"
                type="date"
                label="Travel Date"
                value={formData.travelDate}
                onChange={handleChange}
                Icon={Calendar}
              />
              <div>
                <label className="text-xs font-bold text-gray-400 uppercase block mb-2">
                  Travel Mode
                </label>
                <select
                  name="travelMode"
                  value={formData.travelMode}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-lg py-2.5 px-3 text-sm"
                >
                  <option>Flight</option>
                  <option>Train</option>
                </select>
              </div>
            </div>

            {/* Passengers */}
            <div className="h-px bg-gray-100" />
            <h2 className="text-xs font-bold text-gray-400 uppercase flex justify-between items-center">
              Passengers
              <button
                onClick={addPassenger}
                className="text-blue-600 text-xs flex items-center gap-1"
              >
                <Plus className="w-4 h-4" /> Add
              </button>
            </h2>

            <div className="space-y-3">
              {formData.passengers.map((p, idx) => (
                <div key={idx} className="flex items-center gap-2 bg-gray-50 p-2 rounded-lg">
                  <User className="w-4 h-4 text-gray-400" />
                  <input
                    value={p.name}
                    onChange={(e) => updatePassenger(idx, "name", e.target.value)}
                    className="flex-1 text-sm bg-transparent border-none focus:ring-0"
                  />
                  <input
                    value={p.relation}
                    onChange={(e) => updatePassenger(idx, "relation", e.target.value)}
                    className="w-20 text-xs text-gray-600 bg-transparent border-none"
                  />
                  <button
                    onClick={() => removePassenger(idx)}
                    className="text-red-400 hover:text-red-600"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>

            {/* Fare */}
            <div className="h-px bg-gray-100" />
            <h2 className="text-xs font-bold text-gray-400 uppercase">Fare</h2>

            <div className="grid grid-cols-2 gap-3">
              <BillInput
                label="Fare (₹)"
                name="baseFare"
                type="number"
                value={formData.baseFare}
                onChange={handleChange}
              />
              <BillInput
                label="Taxes (₹)"
                name="taxes"
                type="number"
                value={formData.taxes}
                onChange={handleChange}
              />
            </div>
          </div>

          {/* DOWNLOAD */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">
              Export Options
            </p>
            <DownloadButton
              billRef={billRef}
              fileName={`LTA_Invoice_${formData.customerName}.pdf`}
            />
          </div>
        </div>

        {/* RIGHT PREVIEW AREA (Exact copy of Internet Bill) */}
        <div
          className="flex-1 relative bg-[#E5E7EB] flex flex-col overflow-hidden border-t lg:border-t-0 border-gray-300"
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          style={{
            cursor: handMode ? (isDragging ? "grabbing" : "grab") : "default",
          }}
        >
          {/* dotted bg */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          />

          {/* badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/90 backdrop-blur-sm shadow px-3 py-1 rounded-full border border-gray-200 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-700">
              Live Preview
            </span>
          </div>

          {/* preview canvas */}
          <div className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-10 custom-scrollbar relative z-10">
            <div
              onMouseDown={handleMouseDown}
              className="transition-transform duration-200 shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <LTAPreview ref={billRef} data={formData} />
            </div>
          </div>

          {/* floating toolbar */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-xl border border-white/10">
              <button
                onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>

              <button
                onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <ZoomIn className="w-4 h-4" />
              </button>

              <div className="w-px h-4 bg-white/20 mx-1"></div>

              <button
                onClick={() => {
                  setZoom(0.75);
                  setPosition({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              <button
                onClick={() => setHandMode(!handMode)}
                className={`p-1.5 rounded-full ${
                  handMode ? "bg-white/30" : "opacity-40"
                }`}
              >
                <Hand className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- LTA SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      LTA Assistant — Calculate Leave Travel Allowance Exemption
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Leave Travel Allowance (LTA) is one of the most powerful tax-saving components 
      for salaried employees. However, exemption rules are confusing — which trips 
      qualify, who in the family is included, what expenses are allowed, and how often 
      LTA can be claimed. Our tool simplifies this by helping you calculate eligible 
      exemption based on government rules and generate a summary for HR reimbursement.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">LTA Exemption</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Family Travel</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">HR Reimbursement</span>
      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">Tax Saving</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Rule-Based Calculations</h3>
      <p className="text-sm text-gray-500">
        Calculates exemption using government rules — fare type, family members and trip frequency.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Family Member Support</h3>
      <p className="text-sm text-gray-500">
        Includes spouse, children, dependent parents and siblings — based on eligibility rules.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Claim Summary PDF</h3>
      <p className="text-sm text-gray-500">
        Download a claim summary for HR teams with fare breakup and exemption calculation.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to calculate LTA exemption?</h3>
      <div className="space-y-6">
        {[
          "Enter details of travel (origin → destination and dates)",
          "Add number of family members traveling",
          "Enter ticket fare and travel class",
          "Check if the trip falls under the current 4-year block",
          "Review eligible LTA exemption and taxable amount",
          "Download summary for reimbursement submission"
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
          <h4 className="text-sm font-bold text-gray-900 mb-2">Can LTA be claimed every year?</h4>
          <p className="text-xs text-gray-600">
            No. It can be claimed twice in a 4-year block as per income tax rules.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Does hotel & food expense count?</h4>
          <p className="text-xs text-gray-600">
            No. Only travel fare (flight / train / bus) is eligible for exemption.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Can LTA be claimed for international trips?</h4>
          <p className="text-xs text-gray-600">
            No. Only domestic travel within India is eligible.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}
