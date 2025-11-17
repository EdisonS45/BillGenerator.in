"use client";

import { useState, useRef, useEffect } from "react";
import FuelBillSEOSection from "@/components/seo/FuelBillSEOSection";

import { FuelPreview } from "@/components/tools/fuel/FuelPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
// MODIFIED: Removed FileText/Image icons as they are no longer needed here
import { Car, Calendar, MapPin, IndianRupee } from "lucide-react";

// Hardcoded City Rates
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
    provider: "iocl" as "iocl" | "bpcl" | "hp" | "shell" | "generic",
    stationName: "City Fuel Station",
    address: "Outer Ring Road, Bengaluru – 560037",
    fuelType: "Petrol",
    amount: 2000,
    rate: 106.31,
    volume: 18.82,
    date: new Date().toISOString().slice(0, 10),
    time: "10:30",
    vehicleNumber: "KA 05 MN 1234",
    invoiceNo: "",
    wrinkle: "light" as "none" | "light" | "medium",
  });

  useEffect(() => {
    if (!formData.invoiceNo) {
      setFormData((prev) => ({
        ...prev,
        invoiceNo: "TXN" + Math.floor(100000 + Math.random() * 900000),
      }));
    }
  }, []);
  // Auto-calc Amount when Volume changes
  useEffect(() => {
    if (formData.volume && formData.rate) {
      setFormData((f) => ({
        ...f,
        amount: Number((Number(f.volume) * Number(f.rate)).toFixed(2)),
      }));
    }
  }, [formData.volume, formData.rate]);

  // Auto-calc Volume when Amount changes
  useEffect(() => {
    if (formData.amount && formData.rate) {
      setFormData((f) => ({
        ...f,
        volume: Number((Number(f.amount) / Number(f.rate)).toFixed(2)),
      }));
    }
  }, [formData.amount, formData.rate]);

  // --- REMOVED: Download Type State ---

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
      const newRate = FUEL_RATES[city][type] || FUEL_RATES[city].petrol;
      setFormData((prev) => ({ ...prev, rate: newRate }));
    }
  };

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Fuel Bill Generator",
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
      "Generate realistic petrol and diesel fuel receipts for reimbursement claims.",
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="space-y-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
          <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
            Fuel Bill Generator
            <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
              Free
            </span>
          </h1>
          <p className="text-gray-600 mt-2">
            The Online Fuel Bill Generator helps you create petrol and diesel
            receipts for reimbursement instantly. Whether you’re looking for a
            petrol bill generator online, a diesel bill generator for office
            claims, or a fuel receipt generator for DA and travel allowance,
            this tool produces highly realistic thermal bill formats similar to
            petrol pump receipts.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
          {/* LEFT COLUMN: INPUT FORM */}
          <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
            {/* --- TEMPLATE SELECTOR --- */}
            <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
              <label className="block text-sm font-bold text-blue-900 mb-3">
                1. Select Receipt Style
              </label>
              <div className="mt-4 mb-4 bg-blue-50 p-3 rounded-lg border border-blue-100">
                <label className="block text-xs font-bold text-blue-900 mb-2">
                  Paper Condition (Texture)
                </label>

                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "light", label: "Light" },
                    { id: "medium", label: "Medium" },
                    { id: "none", label: "Clean" },
                  ].map((opt) => (
                    <button
                      key={opt.id}
                      onClick={() =>
                        setFormData((p) => ({ ...p, wrinkle: opt.id as any }))
                      }
                      className={`py-2 px-1 rounded-md text-xs font-bold border transition-all ${
                        formData.wrinkle === opt.id
                          ? "bg-blue-600 text-white border-blue-700 shadow-sm"
                          : "bg-white text-gray-600 border border-blue-200 hover:bg-blue-100"
                      }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Provider Logos (Only show if Real mode is on) */}

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
            </div>
            <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
              Bill Details
            </h2>

            {/* Quick City Selector */}
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
                onChange={(e) => {
                  let value = e.target.value;
                  // Restrict to 2 decimals max
                  if (value.includes(".")) {
                    const [int, dec] = value.split(".");
                    value = int + "." + dec.substring(0, 2);
                  }
                  setFormData((prev) => ({ ...prev, amount: Number(value) }));
                }}
                Icon={IndianRupee}
              />
              <BillInput
                label="Volume (Litres)"
                name="volume"
                type="number"
                step="0.01"
                value={formData.volume}
                onChange={handleChange}
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
              {/* --- MODIFIED: Updated width in label --- */}
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
                Thermal Preview
              </span>
            </div>

            {/* The Wrapper that gets screenshotted */}
            <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl flex justify-center overflow-x-auto">
              {/* --- MODIFIED: Adjusted width from 224px to 256px --- */}
              <div className="max-w-xs sm:max-w-[291px] w-full">
                <FuelPreview ref={billRef} data={formData} />
              </div>
            </div>

            <DownloadButton
              billRef={billRef}
              fileName={`Fuel_Bill_${formData.date}.pdf`}
            />
          </div>
        </div>

      {/* <section className="w-full bg-white mt-24">
        <div className="max-w-6xl mx-auto px-4">
          <FuelBillSEOSection />
        </div>
      </section> */}
      </div>
    </>
  );
}
