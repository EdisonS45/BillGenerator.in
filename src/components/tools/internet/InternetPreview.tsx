import { forwardRef } from 'react';
import { Wifi, Phone, Globe, Mail, QrCode } from 'lucide-react';
import clsx from 'clsx';

// Branding Configurations - ADJUSTED FOR ACTUAL LOGOS
const ISP_THEMES: Record<string, { color: string; bg: string; label: string; logoPath?: string }> = {
  jio: { color: 'text-[#0f3cc9]', bg: 'bg-[#0f3cc9]', label: 'JioFiber Services Ltd', logoPath: '/logos/jio.svg' },
  airtel: { color: 'text-[#e40000]', bg: 'bg-[#e40000]', label: 'Airtel Xstream Fiber', logoPath: '/logos/airtel.svg' },
  act: { color: 'text-[#00a4a6]', bg: 'bg-[#00a4a6]', label: 'ACT Fibernet', logoPath: '/logos/act.svg' },
  bsnl: { color: 'text-[#00863c]', bg: 'bg-[#00863c]', label: 'BSNL Bharat Fiber', logoPath: '/logos/bsnl.svg' },
  generic: { color: 'text-gray-800', bg: 'bg-gray-800', label: 'Internet Service Provider' }, // No logoPath for generic
};

interface InternetPreviewProps {
  data: {
    isp: string;
    customerName: string;
    customerId: string;
    billNo: string;
    billDate: string;
    periodStart: string;
    periodEnd: string;
    planName: string;
    amount: number;
    address: string;
  };
}

export const InternetPreview = forwardRef<HTMLDivElement, InternetPreviewProps>(({ data }, ref) => {
  const theme = ISP_THEMES[data.isp] || ISP_THEMES.generic;
  
  // Tax Calculations (Standard 18% Telecom GST)
  const taxableValue = Number(data.amount);
  const cgst = (taxableValue * 0.09).toFixed(2);
  const sgst = (taxableValue * 0.09).toFixed(2);
  const total = (taxableValue + parseFloat(cgst) + parseFloat(sgst)).toFixed(2);

  // Logo rendering
  const renderLogo = () => {
    if (theme.logoPath) {
      return <img src={theme.logoPath} alt={theme.label} className="h-10 w-auto" />;
    }
    // Fallback for generic or if no logoPath is provided
    return (
      <div className={clsx("w-10 h-10 rounded flex items-center justify-center text-white", theme.bg)}>
         <Wifi className="w-6 h-6" />
      </div>
    );
  };

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* A4 Paper Container */}
      <div 
        ref={ref}
        className="bg-white shadow-2xl text-gray-900 relative flex flex-col"
        style={{ 
          width: '595px', // Standard A4 Width
          minHeight: '842px', // Standard A4 Height
          fontFamily: 'Arial, Helvetica, sans-serif', // PDF Safe Fonts
          fontSize: '11px'
        }}
      >
        {/* --- HEADER SECTION --- */}
        <div className="p-8 pb-4 border-b border-gray-200">
          <div className="flex justify-between items-start">
            {/* Company Logo & Name */}
            <div className="flex items-center gap-3">
               {renderLogo()} {/* Use the new renderLogo function */}
               <div>
                  <h1 className={clsx("text-xl font-bold uppercase tracking-wide", theme.color)}>{theme.label}</h1>
                  <p className="text-xs text-gray-500">An ISO 9001:2015 Certified Company</p>
               </div>
            </div>
            {/* Invoice Label */}
            <div className="text-right">
               <h2 className="text-2xl font-bold text-gray-300 uppercase">Tax Invoice</h2>
               <p className="text-xs font-semibold text-gray-600 mt-1">Original for Recipient</p>
            </div>
          </div>

          {/* Company Meta */}
          <div className="mt-6 flex justify-between text-[10px] text-gray-500">
             <div>
                <p className="font-bold text-gray-700">Registered Office:</p>
                <p>Block 4, Tech Park, Outer Ring Road</p>
                <p>Bangalore, Karnataka - 560103</p>
                <p className="mt-1"><span className="font-semibold">GSTIN:</span> 29AABCU9603R1ZM</p>
                <p><span className="font-semibold">CIN:</span> U72900KA2020PTC123456</p>
             </div>
             <div className="text-right">
                <p><span className="font-semibold">Helpline:</span> 1800-200-9999</p>
                <p><span className="font-semibold">Email:</span> support@{data.isp}fiber.in</p>
                <p><span className="font-semibold">Website:</span> www.{data.isp}.in</p>
             </div>
          </div>
        </div>

        {/* --- BILLING GRID --- */}
        <div className="grid grid-cols-2 border-b border-gray-200">
           {/* Column 1: Billed To */}
           <div className="p-6 border-r border-gray-200">
              <h3 className={clsx("font-bold uppercase mb-3 text-xs", theme.color)}>Billed To</h3>
              <p className="font-bold text-base text-gray-900 mb-1">{data.customerName}</p>
              <p className="text-gray-600 w-4/5 leading-relaxed mb-4">{data.address}</p>
              
              <div className="flex gap-4 text-[10px]">
                 <div>
                    <p className="text-gray-500 uppercase font-bold">Account No</p>
                    <p className="font-mono text-sm">{data.customerId}</p>
                 </div>
                 <div>
                    <p className="text-gray-500 uppercase font-bold">State Code</p>
                    <p className="font-mono text-sm">29 (KAR)</p>
                 </div>
              </div>
           </div>

           {/* Column 2: Invoice Details */}
           <div className="p-6 bg-gray-50/50">
              <h3 className={clsx("font-bold uppercase mb-3 text-xs", theme.color)}>Invoice Details</h3>
              <div className="grid grid-cols-2 gap-y-3 gap-x-4 text-xs">
                 <div>
                    <p className="text-gray-500">Invoice Number</p>
                    <p className="font-bold text-gray-900">{data.billNo}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Invoice Date</p>
                    <p className="font-bold text-gray-900">{data.billDate}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Billing Period</p>
                    <p className="font-bold text-gray-900">{data.periodStart} to {data.periodEnd}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Due Date</p>
                    <p className="font-bold text-red-600">{data.billDate}</p>
                 </div>
                 <div className="col-span-2 mt-2">
                    <div className="inline-block border-2 border-green-600 text-green-700 px-3 py-1 rounded font-bold text-xs uppercase transform -rotate-2">
                       PAID ONLINE
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* --- ITEMIZED TABLE --- */}
        <div className="p-8 flex-grow">
           <table className="w-full text-left border-collapse">
              <thead>
                 <tr className={clsx("text-white text-xs uppercase tracking-wider", theme.bg)}>
                    <th className="py-2 px-4 rounded-tl">Description</th>
                    <th className="py-2 px-4 text-center">SAC Code</th>
                    <th className="py-2 px-4 text-center">Qty</th>
                    <th className="py-2 px-4 text-right rounded-tr">Amount</th>
                 </tr>
              </thead>
              <tbody className="text-xs">
                 <tr className="border-b border-gray-100">
                    <td className="py-4 px-4">
                       <p className="font-bold text-gray-900">{data.planName}</p>
                       <p className="text-gray-500 mt-0.5">High Speed Internet - Monthly Rental</p>
                    </td>
                    <td className="py-4 px-4 text-center text-gray-500">998422</td>
                    <td className="py-4 px-4 text-center">1</td>
                    <td className="py-4 px-4 text-right font-medium">₹ {taxableValue.toFixed(2)}</td>
                 </tr>
              </tbody>
           </table>

           {/* --- TOTALS SECTION --- */}
           <div className="flex justify-end mt-6">
              <div className="w-64">
                 <div className="flex justify-between py-1 text-gray-600">
                    <span>Taxable Value</span>
                    <span>{taxableValue.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between py-1 text-gray-600">
                    <span>CGST (9%)</span>
                    <span>{cgst}</span>
                 </div>
                 <div className="flex justify-between py-1 text-gray-600 border-b border-gray-300 pb-2">
                    <span>SGST (9%)</span>
                    <span>{sgst}</span>
                 </div>
                 <div className={clsx("flex justify-between py-3 text-lg font-bold", theme.color)}>
                    <span>Total Amount</span>
                    <span>₹ {total}</span>
                 </div>
                 <div className="text-right text-[10px] text-gray-500 mt-1">
                    (E & O.E.)
                 </div>
              </div>
           </div>
        </div>

        {/* --- FOOTER & BANK DETAILS --- */}
        <div className="bg-gray-50 border-t border-gray-200 p-6 text-[10px] text-gray-500">
           <div className="grid grid-cols-3 gap-8">
              {/* Terms */}
              <div>
                 <h4 className="font-bold text-gray-700 mb-2 uppercase">Terms & Conditions</h4>
                 <p className="leading-tight mb-1">1. Payment must be made by due date.</p>
                 <p className="leading-tight mb-1">2. 18% interest charged on late payments.</p>
                 <p className="leading-tight">3. Disputes subject to local jurisdiction only.</p>
              </div>

              {/* Bank Details */}
              <div>
                 <h4 className="font-bold text-gray-700 mb-2 uppercase">Bank Transfer Details</h4>
                 <p><span className="font-semibold">Bank:</span> HDFC Bank</p>
                 <p><span className="font-semibold">A/c Name:</span> {theme.label}</p>
                 <p><span className="font-semibold">A/c No:</span> 50200012345678</p>
                 <p><span className="font-semibold">IFSC:</span> HDFC0000123</p>
              </div>

              {/* QR & Sig */}
              <div className="flex flex-col items-end justify-end">
                 <div className="mb-2 text-center">
                    <div className="bg-white p-1 border border-gray-200 inline-block">
                        <QrCode className="w-12 h-12 text-gray-800" />
                    </div>
                    <p className="text-[9px] mt-1">Scan to Pay</p>
                 </div>
                 <p className="font-bold text-gray-900">Authorized Signatory</p>
              </div>
           </div>
        </div>

        {/* Decorative Bottom Strip */}
        <div className={clsx("h-2 w-full", theme.bg)}></div>
      </div>
    </div>
  );
});

InternetPreview.displayName = 'InternetPreview';