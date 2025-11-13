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
      {/* HEADER */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">
          Mobile Postpaid Bill Generator
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
    </div>
  );
}
