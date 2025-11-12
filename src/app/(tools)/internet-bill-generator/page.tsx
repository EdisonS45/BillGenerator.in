'use client';

import { useState, useRef, useEffect } from 'react';
import { InternetPreview } from '@/components/tools/internet/InternetPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Wifi, Calendar, User, CreditCard } from 'lucide-react';

export default function InternetBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  // 1. Static Defaults (Prevents Hydration Error)
  const [formData, setFormData] = useState({
    isp: 'jio',
    customerName: 'Rahul Sharma',
    customerId: '84932011',
    billNo: 'INV-2024-001',
    billDate: '2024-02-01',
    periodStart: '2024-01-01',
    periodEnd: '2024-01-31',
    planName: 'FIBER SILVER PLAN 100MBPS',
    amount: 999,
    address: 'Flat 402, Krishna Heights, Bannerghatta Road, Bangalore - 560076',
  });

  // 2. Client-Side Dynamic Data
  useEffect(() => {
    const today = new Date();
    const lastMonth = new Date();
    lastMonth.setMonth(today.getMonth() - 1);

    setFormData(prev => ({
      ...prev,
      billDate: today.toISOString().slice(0, 10),
      periodStart: lastMonth.toISOString().slice(0, 10),
      periodEnd: today.toISOString().slice(0, 10),
      billNo: 'INV-' + Math.floor(100000 + Math.random() * 900000)
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">Internet & Broadband Bill Generator</h1>
        <p className="text-gray-600 mt-2">Generate professional monthly internet invoices for reimbursement (Jio, Airtel, ACT, BSNL).</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           {/* ISP SELECTOR (Killer Feature) */}
           <div>
             <label className="block text-sm font-medium text-gray-700 mb-2">Select Service Provider</label>
             <div className="grid grid-cols-4 gap-2">
               {['jio', 'airtel', 'act', 'bsnl'].map((provider) => (
                 <button
                   key={provider}
                   onClick={() => setFormData({ ...formData, isp: provider })}
                   className={`py-2 px-3 rounded-lg border text-sm font-medium capitalize transition-all ${
                     formData.isp === provider 
                       ? 'bg-blue-50 border-blue-500 text-blue-700 ring-1 ring-blue-500' 
                       : 'bg-white border-gray-200 text-gray-600 hover:border-gray-300'
                   }`}
                 >
                   {provider}
                 </button>
               ))}
             </div>
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Customer Name" name="customerName" value={formData.customerName} onChange={handleChange} Icon={User} />
             <BillInput label="Customer ID" name="customerId" value={formData.customerId} onChange={handleChange} />
           </div>

           <BillInput label="Billing Address" name="address" value={formData.address} onChange={handleChange} />

           <div className="border-t border-gray-100 pt-4">
             <h3 className="text-sm font-semibold text-gray-900 mb-3">Plan Details</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <BillInput label="Plan Name" name="planName" value={formData.planName} onChange={handleChange} Icon={Wifi} />
               <BillInput label="Plan Amount (₹)" name="amount" type="number" value={formData.amount} onChange={handleChange} Icon={CreditCard} />
             </div>
           </div>

           <div className="border-t border-gray-100 pt-4">
             <h3 className="text-sm font-semibold text-gray-900 mb-3">Billing Period</h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               <BillInput label="Period Start" name="periodStart" type="date" value={formData.periodStart} onChange={handleChange} Icon={Calendar} />
               <BillInput label="Period End" name="periodEnd" type="date" value={formData.periodEnd} onChange={handleChange} Icon={Calendar} />
             </div>
             <div className="mt-4">
                <BillInput label="Bill Date" name="billDate" type="date" value={formData.billDate} onChange={handleChange} />
             </div>
           </div>
        </div>

        {/* PREVIEW AREA */}
        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Format: A4 PDF</span>
           </div>
           
           {/* Preview Wrapper - Scaled down to fit screen */}
           <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl overflow-hidden flex justify-center">
              <div className="scale-[0.6] origin-top"> {/* Visual scaling only */}
                 <InternetPreview ref={billRef} data={formData} />
              </div>
           </div>

           <DownloadButton billRef={billRef} fileName={`Internet_Bill_${formData.isp}_${formData.billDate}.pdf`} />
        </div>

      </div>

      {/* SEO CONTENT */}
      <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl border border-gray-200">
        <h2>Internet Bill Generator for Work from Home Claims</h2>
        <p>Most companies provide internet reimbursement for remote employees. Use this tool to generate broadband receipts if you have lost your original invoice.</p>
        <h3>Features:</h3>
        <ul>
          <li>**Multi-ISP Support:** Templates for JioFiber, Airtel Xstream, ACT, and BSNL.</li>
          <li>**Automated Taxation:** Automatically calculates 18% GST (9% CGST + 9% SGST) applicable on telecom services.</li>
          <li>**Professional A4 Format:** Generates a clean PDF invoice suitable for HR submission.</li>
        </ul>
      </article>
    </div>
  );
}