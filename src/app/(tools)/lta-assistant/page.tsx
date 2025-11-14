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
    </div>
  );
}
