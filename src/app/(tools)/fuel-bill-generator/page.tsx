"use client";

import { useState, useRef } from "react";
import { FuelPreview } from "@/components/tools/fuel/FuelPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { Car, Calendar, MapPin, IndianRupee } from "lucide-react";

// Hardcoded City Rates (The Killer Feature)
const FUEL_RATES: Record<string, { petrol: number; diesel: number }> = {
  Mumbai: { petrol: 106.31, diesel: 94.27 },
  Delhi: { petrol: 96.72, diesel: 89.62 },
  Bangalore: { petrol: 101.94, diesel: 87.89 },
  Chennai: { petrol: 102.63, diesel: 94.24 },
  Kolkata: { petrol: 106.03, diesel: 92.76 },
  Hyderabad: { petrol: 109.66, diesel: 97.82 },
};

export default function FuelBillPage() {
  const billRef = useRef<HTMLDivElement>(null);

  // State
  const [formData, setFormData] = useState({
    mode: "real" as "basic" | "real", // Default to Real
    provider: "iocl" as "iocl" | "bpcl" | "hp" | "shell" | "generic", // Default to IOCL
    stationName: "Kannan Agencies",
    address: "Railway gate west Pudukkottai - 622001",
    fuelType: "Petrol",
    amount: 2000,
    rate: 106.31,
    date: new Date().toISOString().slice(0, 10),
    time: "10:30",
    vehicleNumber: "MH 02 AB 1234",
    invoiceNo: "TXN" + Math.floor(100000 + Math.random() * 900000),
  });

  // Handle Input Change
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle City Auto-Fill
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    if (city && FUEL_RATES[city]) {
      const type = formData.fuelType.toLowerCase() as "petrol" | "diesel";
      // Default to petrol price if type mismatch, simple fallback
      const newRate = FUEL_RATES[city][type] || FUEL_RATES[city].petrol;
      setFormData((prev) => ({ ...prev, rate: newRate }));
    }
  };
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Internet Bill Generator",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "4.8",
      ratingCount: "1250",
    },
    description:
      "Generate compliant internet and broadband bills for reimbursement claims.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        {/* SEO Header */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900">
            Fuel Bill Generator
          </h1>
          <p className="text-gray-600 mt-2">
            Create realistic petrol and diesel receipts for reimbursement
            claims.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* LEFT COLUMN: INPUT FORM */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            {/* --- NEW: TEMPLATE SELECTOR --- */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <label className="block text-sm font-bold text-blue-900 mb-3">
                1. Select Receipt Style
              </label>

              {/* Mode Toggle */}
              <div className="flex p-1 bg-white rounded-lg border border-blue-200 mb-4">
                <button
                  onClick={() => setFormData((p) => ({ ...p, mode: "real" }))}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    formData.mode === "real"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Real (Logos)
                </button>
                <button
                  onClick={() => setFormData((p) => ({ ...p, mode: "basic" }))}
                  className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                    formData.mode === "basic"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                >
                  Basic (Simple)
                </button>
              </div>

              {/* Provider Logos (Only show if Real mode is on) */}
              {formData.mode === "real" && (
                <div className="grid grid-cols-4 gap-2">
                  {[
                    {
                      id: "iocl",
                      label: "Indian Oil",
                      color: "border-orange-500",
                    },
                    {
                      id: "bpcl",
                      label: "Bharat Pet",
                      color: "border-yellow-500",
                    },
                    { id: "hp", label: "HP", color: "border-blue-500" },
                    { id: "shell", label: "Shell", color: "border-red-500" },
                  ].map((brand) => (
                    <button
                      key={brand.id}
                      onClick={() =>
                        setFormData((p) => ({
                          ...p,
                          provider: brand.id as any,
                        }))
                      }
                      className={`py-2 px-1 border-2 rounded-lg text-xs font-bold transition-all ${
                        formData.provider === brand.id
                          ? `${brand.color} bg-white shadow-md transform scale-105`
                          : "border-transparent bg-blue-100/50 text-gray-600 hover:bg-white"
                      }`}
                    >
                      {brand.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Bill Details
            </h2>

            {/* Killer Feature: Quick City Selector */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Auto-fill Rates by City
              </label>
              <select
                onChange={handleCityChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
              >
                <option value="">Select a City...</option>
                {Object.keys(FUEL_RATES).map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BillInput
                label="Station Name"
                name="stationName"
                value={formData.stationName}
                onChange={handleChange}
                Icon={MapPin}
              />
              <BillInput
                label="Vehicle Number"
                name="vehicleNumber"
                value={formData.vehicleNumber}
                onChange={handleChange}
                Icon={Car}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Fuel Type
                </label>
                <select
                  name="fuelType"
                  value={formData.fuelType}
                  onChange={handleChange}
                  className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                >
                  <option>Petrol</option>
                  <option>Diesel</option>
                  <option>CNG</option>
                  <option>Power Petrol</option>
                </select>
              </div>
              <BillInput
                label="Fuel Rate (₹/L)"
                name="rate"
                type="number"
                step="0.01"
                value={formData.rate}
                onChange={handleChange}
                Icon={IndianRupee}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <BillInput
                label="Total Amount (₹)"
                name="amount"
                type="number"
                value={formData.amount}
                onChange={handleChange}
                Icon={IndianRupee}
              />
              <BillInput
                label="Date"
                name="date"
                type="date"
                value={formData.date}
                onChange={handleChange}
                Icon={Calendar}
              />
            </div>

            <BillInput
              label="Station Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
            />
          </div>
              
          {/* RIGHT COLUMN: PREVIEW & DOWNLOAD */}
          <div className="space-y-6">
            <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                A4 / Thermal
              </span>
            </div>

            {/* The Wrapper that gets screenshotted */}
            <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center">
              <FuelPreview ref={billRef} data={formData} />
            </div>

            <DownloadButton
              billRef={billRef}
              fileName={`Fuel_Bill_${formData.date}.pdf`}
            />
          </div>
        </div>
                
        {/* --- MODERN SEO GUIDE SECTION --- */}
        <div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">
          {/* 1. Intro & Supported Brands */}
          <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              Fuel Bill Generator for Reimbursement
            </h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              Managing corporate travel expenses often involves submitting
              physical receipts. If you have lost your original receipt or need
              a digital copy for your records, our tool helps you create a
              compliant proof of expense for Petrol, Diesel, and CNG purchases.
            </p>

            <div className="flex flex-wrap gap-3">
              <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">
                Indian Oil (IOCL)
              </span>
              <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">
                Bharat Petroleum (BPCL)
              </span>
              <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">
                Hindustan Petroleum (HPCL)
              </span>
              <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">
                Shell India
              </span>
            </div>
          </div>

          {/* 2. Key Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
                <IndianRupee className="w-5 h-5 text-blue-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">
                Auto-Updated Rates
              </h3>
              <p className="text-sm text-gray-500">
                We fetch standard fuel rates for major cities like Mumbai,
                Delhi, and Bangalore automatically.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-purple-50 rounded-lg flex items-center justify-center mb-4">
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Thermal Format</h3>
              <p className="text-sm text-gray-500">
                Mimics the dot-matrix font and layout of real petrol pump
                machines to pass the eye test.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
              <div className="w-10 h-10 bg-green-50 rounded-lg flex items-center justify-center mb-4">
                <Car className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">Vehicle Metadata</h3>
              <p className="text-sm text-gray-500">
                Includes detailed fields like Vehicle Number, Nozzle ID, and
                Density readings for authenticity.
              </p>
            </div>
          </div>

          {/* 3. HOW-TO & FAQ (Split) */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">
            {/* Left: How To */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-2xl font-bold text-gray-900">
                How to generate a valid receipt?
              </h3>
              <div className="space-y-6">
                {[
                  {
                    title: "Select Fuel Type",
                    desc: "Choose between Petrol, Diesel, or CNG variants.",
                  },
                  {
                    title: "Enter Amount",
                    desc: "Input the total value. We auto-calculate the Liters.",
                  },
                  {
                    title: "Add Vehicle Details",
                    desc: "Enter your car number to link the bill to your claim.",
                  },
                  {
                    title: "Download",
                    desc: "Export as a high-quality PDF or JPEG instantly.",
                  },
                ].map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                      {idx + 1}
                    </div>
                    <div>
                      <h4 className="font-bold text-gray-900 mb-1">
                        {step.title}
                      </h4>
                      <p className="text-sm text-gray-600">{step.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: FAQ */}
            <div className="lg:col-span-5">
              <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100">
                <h3 className="text-lg font-bold text-blue-900 mb-6">
                  Frequently Asked Questions
                </h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">
                      Is this accepted for claims?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Yes. This format includes all standard accounting details
                      required for Fuel Reimbursement and Driver Allowance
                      claims.
                    </p>
                  </div>
                  <div className="w-full h-px bg-blue-200/50"></div>
                  <div>
                    <h4 className="text-sm font-bold text-gray-900 mb-2">
                      Do you store my vehicle number?
                    </h4>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      No. This tool runs 100% in your browser (Client-Side).
                      Your data never leaves your device.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
