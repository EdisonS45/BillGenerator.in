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
  Menu,
} from "lucide-react";
import Link from "next/link";

export default function InternetBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  const [zoom, setZoom] = useState(0.65);

  const [formData, setFormData] = useState({
    isp: "jio",
    customerName: "Priya Sharma",
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
    // responsive-container: flex-col on mobile, flex-row on desktop
    <div className="space-y-8">
      {/* ✅ HEADER ADDED (same style as Restaurant/Fuel/Medical) */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Internet & Broadband Bill Generator
        </h1>
        <p className="text-gray-600 mt-2">
          Generate professional monthly internet invoices for reimbursement
          (Jio, Airtel, ACT, BSNL).
        </p>
      </div>
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F3F4F6] font-sans">
        {/* --- 1. EDITOR PANEL (Top on Mobile, Left on Desktop) --- */}
        <div className="w-full lg:w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm lg:shadow-[4px_0_24px_rgba(0,0,0,0.02)] lg:h-[calc(100vh-64px)]">
          {/* Header */}
          <div className="px-4 py-3 lg:px-6 lg:py-4 border-b border-gray-100 flex items-center justify-between bg-white sticky top-0 z-10">
            <div className="flex items-center gap-2 text-gray-500 hover:text-blue-600 transition-colors cursor-pointer">
              <Link href="/" title="Back">
                <ChevronLeft className="w-5 h-5" />
              </Link>
              <h1 className="text-sm font-bold text-gray-900 uppercase tracking-wider">
                Internet Bill
              </h1>
            </div>
            <div className="text-[10px] font-bold bg-blue-50 text-blue-600 px-2 py-1 rounded">
              EDITOR
            </div>
          </div>

          {/* Scrollable Inputs */}
          {/* Mobile: Auto height. Desktop: Flex-1 overflow-y-auto */}
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

            {/* Inputs */}
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
                  Icon={DollarSign}
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

          {/* Action Buttons (Sticky Bottom on Mobile, Fixed Bottom on Desktop Sidebar) */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 lg:relative z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">
              Export Options
            </p>
            <DownloadButton
              billRef={billRef}
              fileName={`Internet_${formData.billNo}.pdf`}
            />
          </div>
        </div>

        {/* --- 2. PREVIEW PANEL (Bottom on Mobile, Right on Desktop) --- */}
        <div className="flex-1 relative bg-[#E5E7EB] flex flex-col lg:h-[calc(100vh-64px)] overflow-hidden border-t lg:border-t-0 border-gray-300">
          {/* Background Pattern */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          {/* Badge */}
          <div className="absolute top-4 lg:top-6 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur shadow-sm border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] lg:text-xs font-bold text-gray-700">
              Live Preview
            </span>
          </div>

          {/* Canvas Area */}
          <div className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-8 lg:p-12 relative z-10 custom-scrollbar">
            <div
              className="transition-transform duration-200 ease-out origin-top lg:origin-center shadow-2xl"
              style={{ transform: `scale(${zoom})` }}
            >
              <InternetPreview ref={billRef} data={formData} />
            </div>
          </div>

          {/* Zoom Controls (Floating) */}
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
                onClick={() => setZoom(0.75)}
                className="p-1.5 hover:bg-white/20 rounded-full"
                title="Reset"
              >
                <RotateCcw className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
