'use client';

import { useState, useRef, useEffect } from 'react';
import { MobileBillPreview } from '@/components/tools/mobile/MobileBillPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Smartphone, User, Hash, Calendar, DollarSign } from 'lucide-react';

export default function MobileBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    provider: 'jio',
    name: 'Vikram Singh',
    mobileNo: '9876543210',
    accountNo: '7000829102',
    billNo: 'JB-88291',
    billDate: new Date().toISOString().slice(0, 10),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 15)).toISOString().slice(0, 10),
    planAmount: 499,
    address: 'Flat 102, Sai Residency, Pune - 411057',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Mobile Postpaid Bill Generator</h1>
        <p className="text-gray-600 mt-2">Generate monthly mobile bills for Jio, Airtel, Vi, and BSNL claims.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-1">Network Provider</label>
             <div className="grid grid-cols-4 gap-2">
               {['jio', 'airtel', 'vi', 'bsnl'].map(p => (
                 <button key={p} onClick={() => setFormData({...formData, provider: p})} className={`py-2 border rounded uppercase text-xs font-bold ${formData.provider === p ? 'bg-blue-600 text-white' : 'bg-gray-50 text-gray-600'}`}>
                   {p}
                 </button>
               ))}
             </div>
           </div>
           
           <BillInput label="Customer Name" name="name" value={formData.name} onChange={handleChange} Icon={User} />
           <div className="grid grid-cols-2 gap-4">
             <BillInput label="Mobile Number" name="mobileNo" value={formData.mobileNo} onChange={handleChange} Icon={Smartphone} />
             <BillInput label="Account Number" name="accountNo" value={formData.accountNo} onChange={handleChange} Icon={Hash} />
           </div>
           <BillInput label="Bill Date" name="billDate" type="date" value={formData.billDate} onChange={handleChange} Icon={Calendar} />
           <BillInput label="Monthly Plan Amount (₹)" name="planAmount" type="number" value={formData.planAmount} onChange={handleChange} Icon={DollarSign} />
           <BillInput label="Address" name="address" value={formData.address} onChange={handleChange} />
        </div>

        <div className="space-y-6 flex flex-col">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">A4 Invoice</span>
           </div>
           <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center flex-grow overflow-hidden">
              <div className="scale-[0.6] origin-top">
                 <MobileBillPreview ref={billRef} data={formData} />
              </div>
           </div>
           <DownloadButton billRef={billRef} fileName={`Mobile_Bill_${formData.mobileNo}.pdf`} />
        </div>
      </div>
    </div>
  );
}