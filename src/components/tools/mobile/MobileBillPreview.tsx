import { forwardRef } from 'react';
import { Smartphone, Globe, BarChart3 } from 'lucide-react';
import clsx from 'clsx';

const PROVIDERS: Record<string, { color: string; label: string; logoPath?: string }> = {
  jio: { color: 'text-[#0f3cc9]', label: 'Reliance Jio Infocomm', logoPath: '/logos/jio.svg' },
  airtel: { color: 'text-[#e40000]', label: 'Bharti Airtel Limited', logoPath: '/logos/airtel.svg' },
  vi: { color: 'text-[#ffc600]', label: 'Vodafone Idea Limited', logoPath: '/logos/vi.svg' }, // Need vi.png
  bsnl: { color: 'text-[#00863c]', label: 'BSNL Mobile', logoPath: '/logos/bsnl.svg' },
};

interface MobileBillPreviewProps {
  data: {
    provider: string;
    name: string;
    mobileNo: string;
    accountNo: string;
    billNo: string;
    billDate: string;
    dueDate: string;
    planAmount: number;
    address: string;
  };
}

export const MobileBillPreview = forwardRef<HTMLDivElement, MobileBillPreviewProps>(({ data }, ref) => {
  const theme = PROVIDERS[data.provider] || PROVIDERS.jio;
  const taxable = Number(data.planAmount);
  const gst = taxable * 0.18;
  const total = taxable + gst;

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      <div ref={ref} className="bg-white shadow-2xl text-gray-900 relative flex flex-col" style={{ width: '595px', minHeight: '842px', fontFamily: 'Arial, sans-serif', fontSize: '11px' }}>
        
        {/* HEADER */}
        <div className="p-8 border-b border-gray-200 flex justify-between items-center">
           <div className="flex items-center gap-3">
              {theme.logoPath ? <img src={theme.logoPath} className="h-12 w-auto" /> : <Smartphone className="w-10 h-10" />}
              <h1 className={clsx("text-xl font-bold uppercase", theme.color)}>{theme.label}</h1>
           </div>
           <div className="text-right">
              <h2 className="text-2xl font-bold text-gray-800">Postpaid Bill</h2>
              <p className="text-gray-500">Original for Recipient</p>
           </div>
        </div>

        {/* SUMMARY STRIP */}
        <div className="bg-gray-100 p-4 flex justify-between items-center border-b border-gray-300">
           <div>
              <p className="text-gray-500 uppercase text-[10px] font-bold">Amount Payable</p>
              <p className="text-2xl font-bold">₹ {Math.ceil(total)}.00</p>
           </div>
           <div>
              <p className="text-gray-500 uppercase text-[10px] font-bold">Due Date</p>
              <p className="text-lg font-bold text-red-600">{data.dueDate}</p>
           </div>
           <div>
              <p className="text-gray-500 uppercase text-[10px] font-bold">Account Number</p>
              <p className="text-lg font-bold">{data.accountNo}</p>
           </div>
        </div>

        {/* BILL DETAILS */}
        <div className="p-8 grid grid-cols-2 gap-12">
           <div>
              <h3 className={clsx("font-bold uppercase border-b pb-1 mb-2", theme.color)}>Customer Details</h3>
              <p className="font-bold text-lg">{data.name}</p>
              <p className="font-bold">{data.mobileNo}</p>
              <p className="text-gray-600 w-2/3 mt-2">{data.address}</p>
           </div>
           <div>
              <h3 className={clsx("font-bold uppercase border-b pb-1 mb-2", theme.color)}>Bill Summary</h3>
              <div className="space-y-2 text-xs">
                 <div className="flex justify-between"><span>Previous Balance</span><span>0.00</span></div>
                 <div className="flex justify-between"><span>Payments</span><span>0.00</span></div>
                 <div className="flex justify-between font-bold pt-2 border-t border-dashed border-gray-300">
                    <span>Current Charges</span><span>{total.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* USAGE GRAPH (Visual Realism) */}
        <div className="px-8 py-4">
           <h3 className="font-bold text-gray-700 mb-4 flex items-center gap-2">
              <BarChart3 className="w-4 h-4" /> Usage Summary
           </h3>
           <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 p-3 rounded border border-blue-100 text-center">
                 <p className="text-xs text-gray-500">Data</p>
                 <div className="h-16 flex items-end justify-center gap-1 my-2">
                    <div className="w-2 bg-blue-400 h-3/4 rounded-t"></div>
                    <div className="w-2 bg-blue-400 h-1/2 rounded-t"></div>
                    <div className="w-2 bg-blue-600 h-full rounded-t"></div>
                 </div>
                 <p className="font-bold text-blue-700">45.2 GB</p>
              </div>
              <div className="bg-green-50 p-3 rounded border border-green-100 text-center">
                 <p className="text-xs text-gray-500">Voice</p>
                 <div className="h-16 flex items-end justify-center gap-1 my-2">
                    <div className="w-2 bg-green-400 h-1/2 rounded-t"></div>
                    <div className="w-2 bg-green-600 h-full rounded-t"></div>
                    <div className="w-2 bg-green-400 h-2/3 rounded-t"></div>
                 </div>
                 <p className="font-bold text-green-700">Unlimited</p>
              </div>
              <div className="bg-yellow-50 p-3 rounded border border-yellow-100 text-center">
                 <p className="text-xs text-gray-500">SMS</p>
                 <div className="h-16 flex items-end justify-center gap-1 my-2">
                    <div className="w-2 bg-yellow-400 h-1/4 rounded-t"></div>
                    <div className="w-2 bg-yellow-400 h-1/3 rounded-t"></div>
                    <div className="w-2 bg-yellow-600 h-1/2 rounded-t"></div>
                 </div>
                 <p className="font-bold text-yellow-700">12 SMS</p>
              </div>
           </div>
        </div>

        {/* ITEMIZED CHARGES */}
        <div className="p-8">
           <table className="w-full text-left">
              <thead className="bg-gray-100 text-gray-600 border-y border-gray-300">
                 <tr><th className="py-2 pl-2">Description</th><th className="text-right pr-2">Amount</th></tr>
              </thead>
              <tbody className="text-xs">
                 <tr className="border-b border-gray-100"><td className="py-3 pl-2">Monthly Rentals (Plan 499)</td><td className="text-right pr-2">{taxable.toFixed(2)}</td></tr>
                 <tr className="border-b border-gray-100"><td className="py-3 pl-2">Value Added Services</td><td className="text-right pr-2">0.00</td></tr>
                 <tr className="font-bold"><td className="py-3 pl-2">Total Taxable Value</td><td className="text-right pr-2">{taxable.toFixed(2)}</td></tr>
                 <tr><td className="py-1 pl-2 text-gray-500">CGST (9%)</td><td className="text-right pr-2 text-gray-500">{(gst/2).toFixed(2)}</td></tr>
                 <tr><td className="py-1 pl-2 text-gray-500">SGST (9%)</td><td className="text-right pr-2 text-gray-500">{(gst/2).toFixed(2)}</td></tr>
              </tbody>
           </table>
        </div>

        {/* FOOTER */}
        <div className="mt-auto bg-gray-50 p-6 text-[10px] text-center text-gray-500 border-t border-gray-200">
           <p>This is a computer generated invoice.</p>
           <p>Registered Office: {theme.label}, Mumbai, India.</p>
        </div>
      </div>
    </div>
  );
});

MobileBillPreview.displayName = 'MobileBillPreview';