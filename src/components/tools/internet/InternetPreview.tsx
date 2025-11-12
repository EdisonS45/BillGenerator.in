import { forwardRef } from 'react';
import { Wifi, Globe, Phone } from 'lucide-react';
import clsx from 'clsx';

// Branding Configurations
const ISP_THEMES: Record<string, { color: string; label: string }> = {
  jio: { color: 'bg-[#0f3cc9]', label: 'JioFiber' },
  airtel: { color: 'bg-[#e40000]', label: 'Airtel Xstream' },
  act: { color: 'bg-[#00a4a6]', label: 'ACT Fibernet' },
  bsnl: { color: 'bg-[#00863c]', label: 'BSNL Bharat' },
  generic: { color: 'bg-gray-800', label: 'Internet Service Provider' },
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
  
  // Telecom GST is standard 18% in India
  const taxableValue = data.amount;
  const cgst = taxableValue * 0.09;
  const sgst = taxableValue * 0.09;
  const total = taxableValue + cgst + sgst;

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* A4 Container */}
      <div 
        ref={ref}
        className="bg-white shadow-xl text-gray-800 relative"
        style={{ 
          width: '595px', // A4 Width in pixels (approx at 72dpi)
          minHeight: '842px', // A4 Height
          fontFamily: 'Arial, sans-serif' 
        }}
      >
        {/* HEADER BAND */}
        <div className={clsx("h-4 w-full", theme.color)}></div>
        
        <div className="p-10">
          
          {/* LOGO & TITLE */}
          <div className="flex justify-between items-start mb-12">
            <div>
               <div className="flex items-center space-x-2 mb-2">
                  <div className={clsx("p-2 rounded text-white", theme.color)}>
                    <Wifi className="w-6 h-6" />
                  </div>
                  <span className={clsx("text-2xl font-bold", theme.color.replace('bg-', 'text-'))}>
                    {theme.label}
                  </span>
               </div>
               <p className="text-sm text-gray-500">GSTIN: 27AABCU9603R1ZM</p>
               <p className="text-sm text-gray-500">Original for Recipient</p>
            </div>
            <div className="text-right">
              <h1 className="text-4xl font-light text-gray-300 uppercase tracking-widest">Invoice</h1>
            </div>
          </div>

          {/* BILL INFO GRID */}
          <div className="grid grid-cols-2 gap-12 mb-12">
             <div>
                <h3 className="text-xs font-bold text-gray-400 uppercase mb-2">Billed To</h3>
                <p className="font-bold text-lg">{data.customerName}</p>
                <p className="text-sm text-gray-600 w-2/3 leading-relaxed">{data.address}</p>
                <p className="text-sm mt-2"><span className="font-semibold">Cust ID:</span> {data.customerId}</p>
             </div>
             <div className="space-y-3">
                <div className="flex justify-between border-b border-gray-100 pb-1">
                   <span className="text-gray-500 text-sm">Invoice Number</span>
                   <span className="font-bold">{data.billNo}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                   <span className="text-gray-500 text-sm">Bill Date</span>
                   <span className="font-bold">{data.billDate}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                   <span className="text-gray-500 text-sm">Bill Period</span>
                   <span className="font-bold text-xs">{data.periodStart} to {data.periodEnd}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-1">
                   <span className="text-gray-500 text-sm">Due Date</span>
                   <span className="font-bold text-red-600">Paid</span>
                </div>
             </div>
          </div>

          {/* CHARGES TABLE */}
          <table className="w-full mb-8">
            <thead>
               <tr className={clsx("text-white text-sm", theme.color)}>
                 <th className="py-2 px-4 text-left rounded-l">Description</th>
                 <th className="py-2 px-4 text-right">SAC Code</th>
                 <th className="py-2 px-4 text-right rounded-r">Amount</th>
               </tr>
            </thead>
            <tbody className="text-sm">
               <tr className="border-b border-gray-100">
                 <td className="py-4 px-4 font-medium">{data.planName} (Monthly Rental)</td>
                 <td className="py-4 px-4 text-right text-gray-500">998422</td>
                 <td className="py-4 px-4 text-right">₹ {taxableValue.toFixed(2)}</td>
               </tr>
               {/* Empty Rows for layout */}
               <tr className="h-24"><td></td><td></td><td></td></tr>
            </tbody>
          </table>

          {/* TOTALS SECTION */}
          <div className="flex justify-end mb-12">
             <div className="w-1/2 space-y-2">
                <div className="flex justify-between text-sm text-gray-600">
                   <span>Taxable Amount</span>
                   <span>₹ {taxableValue.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                   <span>CGST (9%)</span>
                   <span>₹ {cgst.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                   <span>SGST (9%)</span>
                   <span>₹ {sgst.toFixed(2)}</span>
                </div>
                <div className={clsx("flex justify-between text-xl font-bold pt-4 border-t-2 mt-2", theme.color.replace('bg-', 'text-'))}>
                   <span>Total Amount</span>
                   <span>₹ {total.toFixed(2)}</span>
                </div>
             </div>
          </div>

          {/* FOOTER */}
          <div className="border-t border-gray-200 pt-8 mt-auto">
             <div className="grid grid-cols-3 gap-4 text-xs text-gray-400 text-center">
                <div className="flex flex-col items-center">
                   <Globe className="w-4 h-4 mb-1" />
                   <span>www.{data.isp}fiber.com</span>
                </div>
                <div className="flex flex-col items-center">
                   <Phone className="w-4 h-4 mb-1" />
                   <span>1800-123-4567</span>
                </div>
                <div>
                   <p>This is a system generated invoice.</p>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
});

InternetPreview.displayName = 'InternetPreview';