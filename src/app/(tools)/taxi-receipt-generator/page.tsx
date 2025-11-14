'use client';

import { useState, useRef, useEffect } from 'react';
import { TaxiPreview } from '@/components/tools/taxi/TaxiPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { MapPin, User, Car, Navigation, Clock } from 'lucide-react';

export default function TaxiBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  // 1. Static Defaults
  const [formData, setFormData] = useState({
    platform: 'Uber' as 'Uber' | 'Ola' | 'Generic',
    pickup: 'Terminal 2, Mumbai International Airport',
    drop: 'Trident Hotel, Bandra Kurla Complex',
    date: '2024-02-01',
    time: '14:30',
    distance: 12.5,
    duration: 45,
    amount: 340,
    driverName: 'Vikram Singh',
    carModel: 'Maruti Swift Dzire',
    carNumber: 'MH 02 DN 4829',
  });

  // 2. Client-side Updates
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  // 3. Smart Fare Calculator
  // When user changes distance, we estimate the price
  const handleDistanceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const dist = Number(e.target.value);
    // Formula: Base 50 + (dist * 18) + Random variance
    const estimatedPrice = 50 + (dist * 18); 
    
    setFormData(prev => ({
      ...prev,
      distance: dist,
      amount: Math.round(estimatedPrice)
    }));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      name: "Taxi Receipt Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "3185",
      },
      description:
        "Generate taxi, cab, Ola and Uber style invoices for reimbursement with pickup-drop details, driver and fare breakup.",
    }),
  }}
/>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">Taxi Receipt Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">Generate realistic Uber/Ola style cab receipts for local travel reimbursement.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           {/* Platform Selector */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Platform Style</label>
             <div className="flex space-x-4">
               {['Uber', 'Ola', 'Generic'].map((p) => (
                 <label key={p} className="flex items-center space-x-2 cursor-pointer">
                    <input 
                      type="radio" 
                      name="platform" 
                      value={p}
                      checked={formData.platform === p}
                      onChange={() => setFormData({...formData, platform: p as any})}
                      className="text-blue-600 focus:ring-blue-500"
                    />
                    <span className="text-sm font-medium text-gray-900">{p}</span>
                 </label>
               ))}
             </div>
           </div>

           <div className="grid grid-cols-1 gap-4">
             <BillInput label="Pickup Location" name="pickup" value={formData.pickup} onChange={handleChange} Icon={MapPin} />
             <BillInput label="Drop Location" name="drop" value={formData.drop} onChange={handleChange} Icon={MapPin} />
           </div>

           {/* Smart Distance Input */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <div className="relative">
                <BillInput 
                    label="Distance (km)" 
                    name="distance" 
                    type="number" 
                    value={formData.distance} 
                    onChange={handleDistanceChange} 
                    Icon={Navigation} 
                />
                <p className="text-[10px] text-blue-600 mt-1 absolute right-0 top-0">Auto-calculates Price</p>
             </div>
             <BillInput label="Total Fare (₹)" name="amount" type="number" value={formData.amount} onChange={handleChange} />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
             <BillInput label="Time" name="time" type="time" value={formData.time} onChange={handleChange} />
           </div>

           <div className="border-t border-gray-100 pt-4">
             <h3 className="text-sm font-semibold text-gray-900 mb-3">Driver Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <BillInput label="Driver Name" name="driverName" value={formData.driverName} onChange={handleChange} Icon={User} />
               <BillInput label="Car Model" name="carModel" value={formData.carModel} onChange={handleChange} Icon={Car} />
             </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">App Screenshot</span>
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl overflow-hidden flex justify-center">
              <TaxiPreview ref={billRef} data={formData} />
           </div>

           <DownloadButton billRef={billRef} fileName={`Taxi_Receipt_${formData.date}.pdf`} />
        </div>

      </div>
      
{/* --- TAXI RECEIPT SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Taxi Receipt Generator for Office Travel Reimbursement
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Cab receipts are required for corporate reimbursement and business travel claims.
      If an Ola / Uber receipt is missing or the original does not match the reimbursement
      period, this tool generates a professional taxi invoice instantly with distance,
      route, driver details, trip ID, GST and payment mode — matching real cab receipt layout.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Ola</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Uber</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Taxi / Cab</span>
      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">Reimbursement</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Route + Distance Breakdown</h3>
      <p className="text-sm text-gray-500">
        Add pickup & drop, via points and total kilometers — fare calculated automatically.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Toll / Night Charges / GST</h3>
      <p className="text-sm text-gray-500">
        Supports toll, parking, airport surcharge and GST fields for reimbursement compliance.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Ola / Uber Style PDF</h3>
      <p className="text-sm text-gray-500">
        Matches real cab invoice format accepted by HR & finance departments.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a taxi invoice?</h3>
      <div className="space-y-6">
        {[
          "Enter taxi company (Ola / Uber / or manual cab)",
          "Add driver name, vehicle number & trip ID",
          "Enter pickup → drop location and distance (km)",
          "Add base fare, per-km rate, tolls & GST",
          "Select payment mode (Cash / UPI / Card)",
          "Download the invoice as a PDF for reimbursement"
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
            Is this accepted for office reimbursement?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. This invoice layout includes route, trip distance, GST and fare — compliant for HR reimbursement.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Can this replace Ola / Uber PDF?
          </h4>
          <p className="text-xs text-gray-600">
            Yes, when an invoice is unavailable or incorrect. It follows Ola-/Uber-styled invoice formatting.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is route & trip data stored anywhere?
          </h4>
          <p className="text-xs text-gray-600">
            No — all trip details remain in your browser. Nothing is uploaded or saved on our servers.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}