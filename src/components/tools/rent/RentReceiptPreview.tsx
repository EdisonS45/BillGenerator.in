import { forwardRef } from 'react';
import { IndianRupee } from 'lucide-react';

interface RentReceiptPreviewProps {
  data: {
    tenantName: string;
    landlordName: string;
    landlordPan: string;
    address: string;
    amount: number;
    receiptNo: string;
    date: string;
    periodStart: string;
    periodEnd: string;
    paymentMode: 'Cash' | 'Cheque' | 'UPI' | 'Bank Transfer';
  };
}

export const RentReceiptPreview = forwardRef<HTMLDivElement, RentReceiptPreviewProps>(({ data }, ref) => {
  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* Receipt Container - Landscape-ish Legal format */}
      <div 
        ref={ref}
        className="bg-white shadow-xl text-gray-900 relative flex flex-col"
        style={{ 
          width: '600px', 
          minHeight: '350px', // Short and wide
          fontFamily: '"Times New Roman", serif',
          border: '1px solid #e5e7eb'
        }}
      >
        {/* BORDER FRAME */}
        <div className="m-2 border-4 border-double border-gray-800 h-full p-6 flex flex-col relative">
           
           {/* HEADER */}
           <div className="flex justify-between items-start border-b border-gray-300 pb-4 mb-6">
              <div>
                 <h1 className="text-3xl font-bold uppercase tracking-widest text-gray-800">Rent Receipt</h1>
                 <p className="text-xs text-gray-500 mt-1">Generated for HRA Exemption U/S 10(13A)</p>
              </div>
              <div className="text-right text-sm">
                 <p><strong>Receipt No:</strong> {data.receiptNo}</p>
                 <p><strong>Date:</strong> {data.date}</p>
              </div>
           </div>

           {/* BODY TEXT */}
           <div className="space-y-6 text-lg leading-relaxed flex-grow">
              <p>
                 Received with thanks from <strong>{data.tenantName}</strong> the sum of 
                 <span className="bg-gray-100 px-2 py-1 mx-2 font-bold font-mono border border-gray-300 rounded">
                    ₹ {Number(data.amount).toLocaleString()}
                 </span>
                 towards rent for the period <strong>{data.periodStart}</strong> to <strong>{data.periodEnd}</strong>.
              </p>
              
              <p>
                 For the property situated at:<br/>
                 <span className="italic text-gray-600 border-b border-gray-300 block w-full pb-1 mt-1">
                    {data.address}
                 </span>
              </p>

              <div className="flex gap-8 text-sm pt-2">
                 <p><strong>Payment Mode:</strong> {data.paymentMode}</p>
                 <p><strong>Landlord PAN:</strong> {data.landlordPan || 'N/A'}</p>
              </div>
           </div>

           {/* FOOTER & STAMP */}
           <div className="mt-8 flex justify-between items-end">
              <div className="text-xs text-gray-400 w-1/2">
                 * This document acts as valid proof of rent payment for income tax purposes.
              </div>
              
              <div className="relative pl-8">
                 {/* THE REVENUE STAMP VISUAL */}
                 <div className="absolute -top-12 left-0 w-20 h-24 border-2 border-gray-300 bg-pink-50 flex flex-col items-center justify-center text-center p-1 shadow-inner transform -rotate-2">
                    <div className="w-full h-full border border-dashed border-pink-200 flex flex-col items-center justify-center">
                        <div className="rounded-full bg-pink-200 p-1 mb-1">
                            <IndianRupee className="w-4 h-4 text-pink-700" />
                        </div>
                        <span className="text-[8px] font-bold text-pink-800 uppercase leading-tight">Revenue<br/>Stamp<br/>₹ 1.00</span>
                    </div>
                 </div>
                 
                 {/* Signature Line */}
                 <div className="relative z-10 mt-6">
                    <div className="font-script text-2xl text-blue-900 -mb-2 ml-4 transform -rotate-3">
                        {data.landlordName}
                    </div>
                    <div className="border-t-2 border-gray-800 w-48 pt-1 text-center font-bold text-sm">
                       {data.landlordName}
                       <span className="block text-[10px] font-normal uppercase">(Landlord)</span>
                    </div>
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
});

RentReceiptPreview.displayName = 'RentReceiptPreview';