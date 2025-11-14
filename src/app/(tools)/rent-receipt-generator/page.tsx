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
    </div>
  );
}
