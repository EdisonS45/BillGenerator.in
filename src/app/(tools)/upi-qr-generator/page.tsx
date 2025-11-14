'use client';

import { useState, useRef } from 'react';
import { UPIPreview } from '@/components/tools/upi/UPIPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { QrCode, User, Wallet, IndianRupee, Text } from 'lucide-react';

export default function UPIPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  const [formData, setFormData] = useState({
    upiId: 'edison64@okhdfcbank',
    payeeName: 'SREE Investments',
    amount: 0, // 0 means dynamic (user enters amount)
    note: '',
    theme: 'phonepe',
    showLogo: false,         
  logoUrl: null, 
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">UPI QR Code Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">Create branded QR Standees (PhonePe, GPay, Paytm) with fixed or dynamic amounts.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUTS */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           {/* Theme Selector */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Select Standee Style</label>
             <div className="grid grid-cols-4 gap-2">
               {['phonepe', 'gpay', 'paytm', 'bhim'].map(t => (
                 <button 
                   key={t} 
                   onClick={() => setFormData({...formData, theme: t})}
                   className={`py-2 border rounded uppercase text-xs font-bold transition-all ${
                     formData.theme === t 
                       ? 'bg-blue-600 text-white ring-2 ring-blue-300 border-transparent' 
                       : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
                   }`}
                 >
                   {t}
                 </button>
               ))}
             </div>
           </div>

           <BillInput label="UPI ID (VPA)" name="upiId" value={formData.upiId} onChange={handleChange} Icon={Wallet} placeholder="e.g. business@oksbi" />
           <BillInput label="Payee/Business Name" name="payeeName" value={formData.payeeName} onChange={handleChange} Icon={User} />
           
           <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                 <label className="text-sm font-bold text-yellow-800">Fixed Amount (Optional)</label>
                 <span className="text-[10px] text-yellow-700 bg-yellow-100 px-2 py-0.5 rounded">High CPC Feature</span>
              </div>
              <BillInput 
                label="" 
                name="amount" 
                type="number" 
                value={formData.amount} 
                onChange={handleChange} 
                Icon={IndianRupee} 
                placeholder="Leave 0 for dynamic payment"
                wrapperClassName="mb-0"
              />
              <p className="text-xs text-yellow-700 mt-2">
                 *If you enter an amount (e.g., 500), the customer's app will automatically fill ₹500 when scanned. Leave 0 to let them type.
              </p>
           </div>

           <BillInput label="Transaction Note" name="note" value={formData.note} onChange={handleChange} Icon={Text} placeholder="e.g. Shop Bill" />
        </div>

        {/* PREVIEW */}
        <div className="space-y-6 flex flex-col">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <QrCode className="text-gray-400 w-5 h-5" />
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center flex-grow overflow-hidden">
              <div className="scale-[0.8] origin-top">
                 <UPIPreview ref={billRef} data={formData} />
              </div>
           </div>

           <DownloadButton billRef={billRef} fileName={`UPI_QR_${formData.payeeName}.pdf`} />
        </div>
      </div>
      
      <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl border border-gray-200">
        <h2>Free UPI QR Code Generator with Amount</h2>
        <p>Create a professional QR code standee for your shop or business. Compatible with all UPI apps including:</p>
        <ul>
            <li><strong>PhonePe</strong> (Purple Theme)</li>
            <li><strong>Google Pay</strong> (Blue/White Theme)</li>
            <li><strong>Paytm</strong> (Cyan Theme)</li>
            <li><strong>BHIM</strong> (Generic Theme)</li>
        </ul>
        <p><strong>Why add a fixed amount?</strong> If you are sending a bill for a specific order (e.g., ₹1,250), generating a QR with the amount pre-filled prevents errors and makes payment faster for your client.</p>
      </article>
    </div>
  );
}