"use client";

import { useState, useRef } from "react";
import { MobileBillPreview } from "@/components/tools/mobile/MobileBillPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";

import {
  User,
  Hash,
  Calendar,
  Smartphone,
  DollarSign,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Hand,
} from "lucide-react";

export default function MobileBillPage() {
  const billRef = useRef<HTMLDivElement>(null);

  // -----------------------------------
  // 🟢 ZOOM + HAND TOOL (Same as Internet Generator)
  // -----------------------------------
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
    if (!isDragging || !handMode) return;
    setPosition({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  // -----------------------------------
  // 🟢 FORM DATA
  // -----------------------------------
  const [formData, setFormData] = useState({
    provider: "jio",
    name: "Vikram Singh",
    mobileNo: "9876543210",
    accountNo: "7000829102",
    billNo: "JB-88291",
    billDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15))
      .toISOString()
      .slice(0, 10),
    planAmount: 499,
    address: "Flat 102, Sai Residency, Pune - 411057",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Mobile Bill Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1675",
      },
      description:
        "Generate mobile recharge and postpaid invoices online for reimbursement and proof of payment. Download PDF instantly.",
    }),
  }}
/>

      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
          Mobile Postpaid Bill Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Generate monthly mobile bills for Jio, Airtel, Vi, and BSNL.
        </p>
      </div>

      {/* MAIN LAYOUT (Internet style) */}
      <div className="flex flex-col lg:flex-row min-h-[calc(100vh-64px)] bg-[#F3F4F6] font-sans">

        {/* LEFT SIDEBAR */}
<div className="w-full lg:w-[400px] flex-shrink-0 bg-white border-r border-gray-200 flex flex-col z-20 shadow-sm">

          <div className="lg:flex-1 lg:overflow-y-auto p-4 lg:p-6 space-y-6 custom-scrollbar">

            {/* Provider */}
            <div>
              <label className="text-xs font-bold text-gray-400 uppercase mb-3 block">
                Network Provider
              </label>
              <div className="grid grid-cols-4 gap-2">
                {["jio", "airtel", "vi", "bsnl"].map((p) => (
                  <button
                    key={p}
                    onClick={() =>
                      setFormData((prev) => ({ ...prev, provider: p }))
                    }
                    className={`py-2 text-xs font-bold border rounded-lg uppercase ${
                      formData.provider === p
                        ? "bg-blue-600 text-white border-blue-600"
                        : "bg-gray-50 text-gray-600 border-gray-200"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>

            {/* Inputs */}
            <BillInput
              label="Customer Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              Icon={User}
            />

            <div className="grid grid-cols-2 gap-4">
              <BillInput
                label="Mobile Number"
                name="mobileNo"
                value={formData.mobileNo}
                onChange={handleChange}
                Icon={Smartphone}
              />
              <BillInput
                label="Account Number"
                name="accountNo"
                value={formData.accountNo}
                onChange={handleChange}
                Icon={Hash}
              />
            </div>

            <BillInput
              label="Bill Date"
              name="billDate"
              type="date"
              value={formData.billDate}
              onChange={handleChange}
              Icon={Calendar}
            />

            <BillInput
              label="Plan Amount (₹)"
              name="planAmount"
              type="number"
              value={formData.planAmount}
              onChange={handleChange}
              Icon={DollarSign}
            />

            <BillInput
              label="Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>

          {/* DOWNLOAD BUTTON */}
          <div className="p-4 border-t border-gray-200 bg-gray-50 sticky bottom-0 z-10">
            <p className="text-[10px] font-bold text-gray-400 uppercase mb-3 hidden lg:block">
              Export Options
            </p>
            <DownloadButton
              billRef={billRef}
              fileName={`Mobile_Bill_${formData.mobileNo}.pdf`}
            />
          </div>
        </div>

        {/* RIGHT — PREVIEW PANEL */}
        <div
          className="flex-1 relative bg-[#E5E7EB] flex flex-col overflow-hidden border-t lg:border-t-0 border-gray-300"
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
          {/* Dotted BG */}
          <div
            className="absolute inset-0 opacity-[0.4]"
            style={{
              backgroundImage: "radial-gradient(#9CA3AF 1px, transparent 1px)",
              backgroundSize: "24px 24px",
            }}
          ></div>

          {/* Live Preview Badge */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 bg-white/80 backdrop-blur shadow-sm border border-gray-200 rounded-full px-3 py-1 flex items-center gap-2">
            <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-[10px] font-bold text-gray-700">
              Live Preview
            </span>
          </div>

          {/* Canvas */}
          <div className="flex-1 overflow-auto flex items-start lg:items-center justify-center p-10 custom-scrollbar relative z-10">
            <div
              onMouseDown={handleMouseDown}
              className="transition-transform duration-200 ease-out origin-top lg:origin-center shadow-2xl select-none"
              style={{
                transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              }}
            >
              <MobileBillPreview ref={billRef} data={formData} />
            </div>
          </div>

          {/* Floating Tools */}
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

              {/* Reset */}
              <button
                onClick={() => {
                  setZoom(0.75);
                  setPosition({ x: 0, y: 0 });
                }}
                className="p-1.5 hover:bg-white/20 rounded-full"
              >
                <RotateCcw className="w-3 h-3" />
              </button>

              {/* Hand Tool */}
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
      {/* --- MOBILE BILL SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Mobile Bill Generator for Reimbursement & Payment Proof
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Employees claiming monthly phone allowance or reimbursement often need mobile
      bills as expense proof. If your original bill is unavailable or the billing
      cycle does not match your claim period, this tool generates a proper mobile
      recharge or postpaid invoice instantly with operator details, billing cycle,
      phone number, plan charges, GST and payment mode.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">Airtel</span>
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Jio</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Vi - Vodafone Idea</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">BSNL</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Postpaid & Prepaid Support</h3>
      <p className="text-sm text-gray-500">
        Generate invoices for both monthly postpaid bills and prepaid recharge payments.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Billing Cycle & GST Included</h3>
      <p className="text-sm text-gray-500">
        Auto-calculates monthly rental, plan charges and GST for corporate compliance.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Professional PDF Invoice</h3>
      <p className="text-sm text-gray-500">
        Download a clean invoice accepted for reimbursement claims and finance audits.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a mobile bill invoice?</h3>
      <div className="space-y-6">
        {[
          "Enter telecom operator and mobile number",
          "Select postpaid or prepaid recharge type",
          "Add billing cycle or recharge date",
          "Enter plan charges and GST amount",
          "Add payment method (UPI / Card / NetBanking)",
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
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is this accepted for corporate reimbursement?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. HR departments accept invoices with billing cycle, GST, plan details and phone number.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Can I generate bill for prepaid recharge?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. You can generate recharge invoices showing transaction date, plan and total paid amount.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is mobile number or billing info stored?
          </h4>
          <p className="text-xs text-gray-600">
            No — everything runs on your device. We never upload or save billing data.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}
