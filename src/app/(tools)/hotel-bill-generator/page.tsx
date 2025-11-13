'use client';

import { useState, useRef, useEffect } from 'react';
import { HotelPreview } from '@/components/tools/hotel/HotelPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Hotel, Calendar, User, MapPin, CreditCard } from 'lucide-react';

export default function HotelBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    hotelName: 'Hotel Grand Residency',
    address: 'Plot 45, Sector 12, MG Road, Gurgaon - 122001',
    gstin: '06AABCU9603R1ZM',
    guestName: 'Vikram Malhotra',
    bookingId: 'RES-88291',
    checkIn: '2024-02-10',
    checkOut: '2024-02-12',
    roomType: 'Deluxe Executive Room',
    roomRate: 3500,
    nights: 2,
    foodAmount: 850,
    extraAmount: 0,
  });

  // Auto-calculate Nights
  useEffect(() => {
    const start = new Date(formData.checkIn);
    const end = new Date(formData.checkOut);
    const diffTime = Math.abs(end.getTime() - start.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    
    if (diffDays > 0) {
      setFormData(prev => ({ ...prev, nights: diffDays }));
    }
  }, [formData.checkIn, formData.checkOut]);

  // Client-side random ID
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      bookingId: 'RES-' + Math.floor(100000 + Math.random() * 900000),
      checkIn: new Date().toISOString().slice(0, 10),
      // Default check-out to tomorrow
      checkOut: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString().slice(0, 10),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Hotel Stay Invoice Generator</h1>
        <p className="text-gray-600 mt-2">Create professional hotel bills with GST for business travel and LTA claims.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Hotel Details</h2>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Hotel Name" name="hotelName" value={formData.hotelName} onChange={handleChange} Icon={Hotel} />
             <BillInput label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} />
           </div>
           <BillInput label="Hotel Address" name="address" value={formData.address} onChange={handleChange} Icon={MapPin} />

           <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">Stay Details</h2>
           <BillInput label="Guest Name" name="guestName" value={formData.guestName} onChange={handleChange} Icon={User} />
           
           <div className="grid grid-cols-2 gap-4">
             <BillInput label="Check-In" name="checkIn" type="date" value={formData.checkIn} onChange={handleChange} Icon={Calendar} />
             <BillInput label="Check-Out" name="checkOut" type="date" value={formData.checkOut} onChange={handleChange} Icon={Calendar} />
           </div>
           <div className="text-right text-sm text-blue-600 font-medium">
              Total Nights: {formData.nights}
           </div>

           <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">Charges (₹)</h2>
           <BillInput label="Room Type" name="roomType" value={formData.roomType} onChange={handleChange} />
           <div className="grid grid-cols-3 gap-4">
             <BillInput label="Room Rate/Night" name="roomRate" type="number" value={formData.roomRate} onChange={handleChange} Icon={CreditCard} />
             <BillInput label="Food/Service" name="foodAmount" type="number" value={formData.foodAmount} onChange={handleChange} />
             <BillInput label="Extra/Laundry" name="extraAmount" type="number" value={formData.extraAmount} onChange={handleChange} />
           </div>
        </div>

        {/* PREVIEW */}
        <div className="space-y-6 flex flex-col">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">A4 Invoice</span>
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl flex justify-center flex-grow overflow-hidden">
              <div className="scale-[0.55] origin-top">
                 <HotelPreview ref={billRef} data={formData} />
              </div>
           </div>

           <DownloadButton billRef={billRef} fileName={`Hotel_Bill_${formData.bookingId}.pdf`} />
        </div>
      </div>
      
      <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl border border-gray-200">
        <h2>Hotel Bill Format for LTA & Business Claims</h2>
        <p>Employees claiming LTA or business travel reimbursement need a valid GST invoice from the hotel. This tool generates a compliant format including:</p>
        <ul>
            <li>**GSTIN & HSN Codes:** Mandatory 9963 SAC code for accommodation services.</li>
            <li>**Stay Duration:** Automatically calculated based on check-in and check-out dates.</li>
            <li>**Tax Breakup:** Shows CGST and SGST separately (typically 12% for hotels).</li>
        </ul>
      </article>
    </div>
  );
}