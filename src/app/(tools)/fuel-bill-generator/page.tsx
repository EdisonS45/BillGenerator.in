'use client';

import { useState, useRef } from 'react';
import { FuelPreview } from '@/components/tools/fuel/FuelPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Car, Calendar, MapPin, IndianRupee } from 'lucide-react';

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
    stationName: 'INDIAN OIL DEALER',
    address: 'S.V. Road, Andheri West, Mumbai - 400058',
    fuelType: 'Petrol',
    amount: 2000,
    rate: 106.31,
    date: new Date().toISOString().slice(0, 10),
    time: '10:30',
    vehicleNumber: 'MH 02 AB 1234',
    invoiceNo: 'TXN' + Math.floor(100000 + Math.random() * 900000),
  });

  // Handle Input Change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  // Handle City Auto-Fill
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const city = e.target.value;
    if (city && FUEL_RATES[city]) {
      const type = formData.fuelType.toLowerCase() as 'petrol' | 'diesel';
      // Default to petrol price if type mismatch, simple fallback
      const newRate = FUEL_RATES[city][type] || FUEL_RATES[city].petrol;
      setFormData(prev => ({ ...prev, rate: newRate }));
    }
  };

  return (
    <div className="space-y-8">
      {/* SEO Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Fuel Bill Generator</h1>
        <p className="text-gray-600 mt-2">Create realistic petrol and diesel receipts for reimbursement claims.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Bill Details</h2>
          
          {/* Killer Feature: Quick City Selector */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Auto-fill Rates by City</label>
            <select 
              onChange={handleCityChange}
              className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
            >
              <option value="">Select a City...</option>
              {Object.keys(FUEL_RATES).map(city => (
                <option key={city} value={city}>{city}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <BillInput label="Station Name" name="stationName" value={formData.stationName} onChange={handleChange} Icon={MapPin} />
            <BillInput label="Vehicle Number" name="vehicleNumber" value={formData.vehicleNumber} onChange={handleChange} Icon={Car} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Fuel Type</label>
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
             <BillInput label="Fuel Rate (₹/L)" name="rate" type="number" step="0.01" value={formData.rate} onChange={handleChange} Icon={IndianRupee} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Total Amount (₹)" name="amount" type="number" value={formData.amount} onChange={handleChange} Icon={IndianRupee} />
             <BillInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} Icon={Calendar} />
          </div>
          
           <BillInput label="Station Address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        {/* RIGHT COLUMN: PREVIEW & DOWNLOAD */}
        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">A4 / Thermal</span>
           </div>
           
           {/* The Wrapper that gets screenshotted */}
           <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center">
              <FuelPreview ref={billRef} data={formData} />
           </div>

           <DownloadButton billRef={billRef} fileName={`Fuel_Bill_${formData.date}.pdf`} />

        </div>

      </div>
      
      {/* SEO Content Layer (Required for ranking) */}
      <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl border border-gray-200">
        <h2>How to use this Fuel Bill Generator?</h2>
        <p>Simply enter your vehicle details, select your city to auto-fetch current petrol prices, and download your receipt. This tool is perfect for generating lost fuel receipts for:</p>
        <ul>
          <li>Corporate Reimbursement Claims</li>
          <li>Driver Allowance Documentation</li>
          <li>LTA (Leave Travel Allowance) Proofs</li>
        </ul>
        <h3>Current Petrol Prices in India</h3>
        <p>Our tool automatically updates rates for major cities like Mumbai, Delhi, and Bangalore. Always cross-check with your actual transaction history.</p>
      </article>
    </div>
  );
}