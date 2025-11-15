"use client";

import { useState, useRef } from "react";
import { InternetPreview } from "@/components/tools/internet/InternetPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
import {
  User,
  Hash,
  Calendar,
  DollarSign,
  Globe,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  ChevronLeft,
  Hand,
  IndianRupee,
} from "lucide-react";
import Link from "next/link";

export default function InternetBillPage() {
  const billRef = useRef<HTMLDivElement>(null);

  const [zoom, setZoom] = useState(0.65);

  // 🟢 NEW — Hand Tool + Drag Position
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

  // 🔵 BILL DATA
  const [formData, setFormData] = useState({
    isp: "jio",
    customerName: "Edison S",
    customerId: "ACC-87654321",
    billNo: "INV-2024-5678",
    billDate: new Date().toISOString().slice(0, 10),
    periodStart: "2024-03-01",
    periodEnd: "2024-03-31",
    planName: "JioFiber 300 Mbps Plan",
    amount: 799,
    address: "Apartment 1204, Green Meadows, Indira Nagar, Bangalore - 560038",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Internet Bill Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1485",
      },
      description:
        "Generate broadband and WiFi invoices instantly for reimbursement and record keeping.",
    }),
  }}
/>

      {/* GLOBAL HEADER */}
<div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3 ">
          Internet & Broadband Bill Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>

        <p className="text-gray-600 mt-2">
          Generate professional monthly internet invoices for reimbursement
          (Jio, Airtel, ACT, BSNL).
        </p>
      </div>

      {/* MAIN LAYOUT */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F3F4F6] font-sans">
        {/* LEFT PANEL — EDITOR */}
        <div className="w-full lg:w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] lg:h-[calc(100vh-64px)]">
          {/* Sidebar Header */}

          {/* Inputs */}
          <div className="lg:flex-1 lg:overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">
            {/* ISP Selector */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">
                Service Provider
              </label>
              <div className="grid grid-cols-2 gap-3">
                {["jio", "airtel", "act", "bsnl"].map((p) => (
                  <button
                    key={p}
                    onClick={() => setFormData({ ...formData, isp: p })}
                    className={`h-10 flex items-center justify-center border rounded-lg text-xs font-bold uppercase transition-all ${
                      formData.isp === p
                        ? "border-blue-600 bg-blue-50 text-blue-700"
                        : "border-gray-200 text-gray-600 hover:border-gray-300 bg-white"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            <div className="h-px bg-gray-100"></div>

            {/* BILL INPUTS */}
            <div className="space-y-4">
              <BillInput
                label="Customer Name"
                name="customerName"
                value={formData.customerName}
                onChange={handleChange}
                Icon={User}
              />

              <div className="grid grid-cols-2 gap-3">
                <BillInput
                  label="Customer ID"
                  name="customerId"
                  value={formData.customerId}
                  onChange={handleChange}
                  Icon={Hash}
                />

                <BillInput
                  label="Invoice No"
                  name="billNo"
                  value={formData.billNo}
                  onChange={handleChange}
                />
              </div>

              <BillInput
                label="Plan Name"
                name="planName"
                value={formData.planName}
                onChange={handleChange}
                Icon={Globe}
              />

              <div className="grid grid-cols-2 gap-3">
                <BillInput
                  label="Amount (₹)"
                  name="amount"
                  type="number"
                  value={formData.amount}
                  onChange={handleChange}
                  Icon={IndianRupee}
                />
                <BillInput
                  label="Bill Date"
                  name="billDate"
                  type="date"
                  value={formData.billDate}
                  onChange={handleChange}
                  Icon={Calendar}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-500 mb-1 uppercase">
                  Address
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  rows={2}
                  className="block w-full rounded-lg border-gray-200 bg-gray-50 focus:bg-white focus:border-blue-500 py-2 px-3 text-sm resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Download Button */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 ">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">
              Export Options
            </p>
            <DownloadButton
              billRef={billRef}
              fileName={`Internet_${formData.billNo}.pdf`}
              outputMode="invoice"
            />
          </div>
        </div>

        {/* RIGHT — PREVIEW */}
        <div className="flex-1 relative bg-[#E5E7EB] flex flex-col lg:h-[calc(100vh-64px)] overflow-hidden border-t lg:border-t-0 border-gray-300">
          {/* Dotted Background */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          {/* Live Preview Badge */}
          <div className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur shadow-sm border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] lg:text-xs font-bold text-gray-700">
              Live Preview
            </span>
          </div>

          {/* MAIN PREVIEW — DRAG + ZOOM ENABLED */}
          <div
            className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-8 lg:p-12 relative z-10 custom-scrollbar"
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            style={{
              cursor: handMode ? (isDragging ? "grabbing" : "grab") : "default",
            }}
          >
            <div
              onMouseDown={handleMouseDown}
              className="transition-transform duration-200 ease-out origin-top lg:origin-center shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <InternetPreview ref={billRef} data={formData} />
            </div>
          </div>

          {/* FLOATING ZOOM + HAND TOOL */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-30">
            <div className="flex items-center gap-2 bg-gray-900 text-white px-3 py-2 rounded-full shadow-xl border border-white/10">
              {/* Zoom Out */}
              <button
                onClick={() => setZoom(Math.max(0.3, zoom - 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <ZoomOut className="w-4 h-4" />
              </button>

              <span className="text-xs font-mono min-w-[3rem] text-center">
                {Math.round(zoom * 100)}%
              </span>

              {/* Zoom In */}
              <button
                onClick={() => setZoom(Math.min(1.5, zoom + 0.1))}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
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

              {/* 🟢 HAND TOOL TOGGLE */}
              <button
                onClick={() => setHandMode(!handMode)}
                className={`p-1.5 rounded-full transition ${
                  handMode ? "bg-white/30" : "opacity-40"
                }`}
                title="Toggle Hand Tool"
              >
                <Hand className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* --- INTERNET SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO BLOCK */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Internet Bill Generator for Reimbursement & Home Office Setup
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Remote employees and business professionals commonly need internet bills for
      office reimbursement. If the original bill is missing or the billing cycle
      doesn’t match your claim period, this tool generates a compliant broadband
      invoice instantly with operator details, monthly rental, taxes and payment mode.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Airtel Xstream</span>
      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">JioFiber</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">ACT Broadband</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">BSNL / Hathway / Local ISP</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Auto Charge Calculation</h3>
      <p className="text-sm text-gray-500">
        Automatically calculates monthly rental, GST and total payable amount.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Supports All Providers</h3>
      <p className="text-sm text-gray-500">
        Airtel, JioFiber, ACT, BSNL, Hathway and regional internet operators supported.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Corporate Invoice Format</h3>
      <p className="text-sm text-gray-500">
        Includes account number, plan details, billing cycle, taxes and payment status — accepted for office claims.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate an internet bill?</h3>
      <div className="space-y-6">
        {[
          "Enter ISP name (Airtel / JioFiber / ACT / BSNL / others)",
          "Fill subscriber name, account number and address",
          "Select billing cycle dates and plan charges",
          "Add GST and optional installation/late fee charges",
          "Confirm payment mode (UPI / Card / NetBanking)",
          "Download the invoice as PDF for reimbursement"
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
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is this accepted for reimbursement?</h4>
          <p className="text-xs text-gray-600">
            Yes. It includes plan details, billing cycle, GST, and payment info — compliant with most corporate claim policies.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Does this support monthly / quarterly billing?</h4>
          <p className="text-xs text-gray-600">
            Yes. You can select any billing cycle depending on your reimbursement requirement.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is my subscriber data stored?</h4>
          <p className="text-xs text-gray-600">
            No. Everything runs on your device only — we never upload or save account data.
          </p>
        </div>
        
      </div>
    </div>
  </div>
</div>

    </div>
  );
}
