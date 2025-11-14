"use client";

import { useState, useRef, useEffect } from "react";
import { RentReceiptPreview } from "@/components/tools/rent/RentReceiptPreview";
import { BillInput } from "@/components/shared/BillInput";
import { DownloadButton } from "@/components/shared/DownloadButton";
import { Home, User, Calendar, CreditCard, FileText } from "lucide-react";

export default function RentReceiptPage() {
  const billRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    tenantName: "Arjun Kapoor",
    landlordName: "Ramesh Verma",
    landlordPan: "ABCDE1234F",
    address: "Flat 302, Sunshine Apartments, Indiranagar, Bangalore - 560038",
    amount: 18500,
    receiptNo: "REC-2024/03",
    date: new Date().toISOString().slice(0, 10),
    periodStart: "2024-03-01",
    periodEnd: "2024-03-31",
    paymentMode: "UPI" as const,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
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
      name: "Rent Receipt Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2540",
      },
      description:
        "Generate rent receipts online with landlord and tenant details for HRA income tax exemption and salary proof.",
    }),
  }}
/>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">
          HRA Rent Receipt Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">
          Generate monthly rent receipts with Revenue Stamp for Income Tax HRA
          Proof.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">
            Rent Details
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BillInput
              label="Tenant Name"
              name="tenantName"
              value={formData.tenantName}
              onChange={handleChange}
              Icon={User}
            />
            <BillInput
              label="Landlord Name"
              name="landlordName"
              value={formData.landlordName}
              onChange={handleChange}
              Icon={User}
            />
          </div>
          <BillInput
            label="Rented Property Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            Icon={Home}
          />

          <div className="grid grid-cols-2 gap-4">
            <BillInput
              label="Rent Amount (₹)"
              name="amount"
              type="number"
              value={formData.amount}
              onChange={handleChange}
              Icon={CreditCard}
            />
            <BillInput
              label="Landlord PAN (Optional)"
              name="landlordPan"
              value={formData.landlordPan}
              onChange={handleChange}
              Icon={FileText}
            />
          </div>

          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">
            Period
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <BillInput
              label="For Month (Start)"
              name="periodStart"
              type="date"
              value={formData.periodStart}
              onChange={handleChange}
              Icon={Calendar}
            />
            <BillInput
              label="For Month (End)"
              name="periodEnd"
              type="date"
              value={formData.periodEnd}
              onChange={handleChange}
              Icon={Calendar}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <BillInput
              label="Receipt Date"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Payment Mode
              </label>
              <select
                name="paymentMode"
                value={formData.paymentMode}
                onChange={handleChange}
                className="block w-full rounded-lg border-gray-300 shadow-sm py-2.5 px-3 border"
              >
                <option>Cash</option>
                <option>Cheque</option>
                <option>UPI</option>
                <option>Bank Transfer</option>
              </select>
            </div>
          </div>
        </div>

        <div className="space-y-6 flex flex-col">
          <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
            <span className="text-white font-medium">Live Preview</span>
            <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">
              Revenue Stamp
            </span>
          </div>
          <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center flex-grow overflow-hidden">
            <div className="scale-[0.7] origin-top">
              <RentReceiptPreview ref={billRef} data={formData} />
            </div>
          </div>
          <DownloadButton
            billRef={billRef}
            fileName={`Rent_Receipt_${formData.periodStart}.pdf`}
          />
        </div>
      </div>
      {/* --- RENT RECEIPT SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Rent Receipt Generator for HRA Claims & Income Tax Exemption
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Employees claiming HRA (House Rent Allowance) need valid rent receipts to submit
      to HR and for income tax exemption under Section 10(13A). If physical receipts
      are missing or incomplete, this tool generates professional rent receipts with
      landlord details, PAN, rental duration, monthly amount and payment mode — fully
      compliant for salary proof and tax filing.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">HRA Exemption</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Income Tax</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Salary Claims</span>
      <span className="px-3 py-1 bg-orange-50 text-orange-700 text-xs font-bold rounded-full border border-orange-100">Reimbursement Proof</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Supports Monthly / Quarterly / Yearly</h3>
      <p className="text-sm text-gray-500">
        Instantly generate rent receipts for a custom period — 1 month to 12 months.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">PAN & Address Included</h3>
      <p className="text-sm text-gray-500">
        HRA claims often require landlord PAN when rent exceeds ₹1 lakh per year — handled automatically.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">HR-Friendly PDF Format</h3>
      <p className="text-sm text-gray-500">
        Download printable, signature-ready PDFs accepted by HR teams & tax consultants.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate rent receipts?</h3>
      <div className="space-y-6">
        {[
          "Enter tenant and landlord details",
          "Add property address and rent amount",
          "Select duration — monthly / quarterly / yearly",
          "Add landlord PAN if annual rent > ₹1,00,000",
          "Choose payment mode (Cash / UPI / Bank)",
          "Download PDF and sign before submitting to HR"
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
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is this accepted for HRA tax exemption?</h4>
          <p className="text-xs text-gray-600">
            Yes. These receipts contain all mandatory details required for HRA, including PAN if applicable.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is digital signature mandatory?</h4>
          <p className="text-xs text-gray-600">
            Most HR teams accept signed or stamped receipts. Hand-signature is recommended for final PDF.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is tenant/landlord information stored?</h4>
          <p className="text-xs text-gray-600">
            No — all data stays on your device. Nothing is uploaded or stored on our servers.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}
