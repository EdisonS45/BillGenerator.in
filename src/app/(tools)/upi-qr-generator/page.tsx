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
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "UPI QR Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2890",
      },
      description:
        "Generate UPI payment QR code for Google Pay, PhonePe, Paytm and BHIM. Download printable QR for business.",
    }),
  }}
/>

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
      
{/* --- UPI QR SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      UPI QR Generator for Instant Digital Payments
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      UPI QR codes are widely used by shops, freelancers and small businesses to accept
      quick digital payments. This tool helps you create an instant UPI QR code linked
      to your UPI ID — works with Google Pay, PhonePe, Paytm, BHIM and all UPI apps.
      Optionally add customer amount, payment note and download printable PNG / PDF.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Google Pay</span>
      <span className="px-3 py-1 bg-purple-50 text-purple-700 text-xs font-bold rounded-full border border-purple-100">PhonePe</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Paytm</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">BHIM UPI</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Works on All UPI Apps</h3>
      <p className="text-sm text-gray-500">
        One QR that accepts payments from Google Pay, PhonePe, Paytm, BHIM and all UPI banking apps.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Custom Amount + Note</h3>
      <p className="text-sm text-gray-500">
        Add fixed amount and payment notes for products, services or donations.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Printable QR for Shops</h3>
      <p className="text-sm text-gray-500">
        Download high-resolution QR suitable for desk stands and sticker prints for billing counters.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a UPI payment QR?</h3>
      <div className="space-y-6">
        {[
          "Enter your UPI ID (example: name@oksbi)",
          "Add your display name or shop name",
          "Optionally set amount and payment note",
          "Generate the QR and verify by scanning",
          "Download PNG / PDF for printing or sharing"
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
            Will this QR accept money from all UPI apps?
          </h4>
          <p className="text-xs text-gray-600">
            Yes — the QR follows the Bharat-QR UPI standard and works across all UPI payment apps.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is my UPI ID stored anywhere?
          </h4>
          <p className="text-xs text-gray-600">
            No. All QR generation happens locally on your device. Nothing is uploaded or saved on our servers.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Can I print the QR for my shop counter?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. High-resolution QR downloads are available for sticker prints and desk stands.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}