import { forwardRef } from 'react';
import { Hotel, Star, MapPin, Phone, Mail } from 'lucide-react';

interface HotelPreviewProps {
  data: {
    hotelName: string;
    address: string;
    gstin: string;
    guestName: string;
    bookingId: string;
    checkIn: string;
    checkOut: string;
    roomType: string;
    roomRate: number;
    nights: number;
    foodAmount: number;
    extraAmount: number;
  };
}

export const HotelPreview = forwardRef<HTMLDivElement, HotelPreviewProps>(({ data }, ref) => {
  // Calculations
  const roomTotal = data.roomRate * data.nights;
  const taxable = roomTotal + Number(data.foodAmount) + Number(data.extraAmount);
  
  // Hotel GST is typically 12% for rooms < 7500
  const cgst = roomTotal * 0.06; 
  const sgst = roomTotal * 0.06;
  
  // Food GST is 5%
  const foodTax = Number(data.foodAmount) * 0.05;
  
  const grandTotal = taxable + cgst + sgst + foodTax;

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* A4 Container */}
      <div 
        ref={ref}
        className="bg-white shadow-2xl text-gray-800 relative flex flex-col"
        style={{ 
          width: '595px', // A4 Width
          minHeight: '842px', // A4 Height
          fontFamily: 'Times New Roman, serif' // Classic Hotel Font
        }}
      >
        {/* HEADER */}
        <div className="p-8 border-b-4 border-double border-gray-800">
           <div className="flex justify-between items-start">
              <div className="flex gap-4">
                 <div className="bg-gray-900 text-white p-3 rounded-none flex items-center justify-center">
                    <Hotel className="w-8 h-8" />
                 </div>
                 <div>
                    <h1 className="text-3xl font-bold uppercase tracking-wider">{data.hotelName}</h1>
                    <div className="flex items-center gap-1 text-yellow-500 mt-1">
                       <Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" /><Star className="w-3 h-3 fill-current" />
                    </div>
                    <div className="text-xs text-gray-500 mt-2 space-y-1 font-sans">
                       <p className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {data.address}</p>
                       <p className="flex items-center gap-1"><Phone className="w-3 h-3" /> +91 8800-123-456</p>
                       <p className="font-bold">GSTIN: {data.gstin}</p>
                    </div>
                 </div>
              </div>
              <div className="text-right">
                 <h2 className="text-xl font-bold text-gray-400 uppercase">Tax Invoice</h2>
                 <p className="text-sm font-bold mt-1">#{data.bookingId}</p>
              </div>
           </div>
        </div>

        {/* GUEST & STAY DETAILS */}
        <div className="p-8 font-sans">
           <div className="grid grid-cols-2 gap-8 mb-8 p-4 bg-gray-50 border border-gray-200">
              <div>
                 <p className="text-xs text-gray-500 uppercase font-bold">Guest Details</p>
                 <p className="font-bold text-lg">{data.guestName}</p>
                 <p className="text-sm text-gray-600">India</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div>
                    <p className="text-xs text-gray-500">Check-In</p>
                    <p className="font-bold">{data.checkIn}</p>
                    <p className="text-xs text-gray-400">12:00 PM</p>
                 </div>
                 <div>
                    <p className="text-xs text-gray-500">Check-Out</p>
                    <p className="font-bold">{data.checkOut}</p>
                    <p className="text-xs text-gray-400">11:00 AM</p>
                 </div>
              </div>
           </div>

           {/* CHARGES TABLE */}
           <table className="w-full text-left mb-8">
              <thead className="border-b-2 border-gray-800 text-xs uppercase">
                 <tr>
                    <th className="py-2">Description</th>
                    <th className="py-2 text-center">HSN/SAC</th>
                    <th className="py-2 text-center">Rate</th>
                    <th className="py-2 text-center">Nights/Qty</th>
                    <th className="py-2 text-right">Total</th>
                 </tr>
              </thead>
              <tbody className="text-sm">
                 <tr className="border-b border-gray-100">
                    <td className="py-3">
                       <p className="font-bold">{data.roomType}</p>
                       <p className="text-xs text-gray-500">Room Charges</p>
                    </td>
                    <td className="text-center text-gray-500">9963</td>
                    <td className="text-center">{data.roomRate.toFixed(2)}</td>
                    <td className="text-center">{data.nights}</td>
                    <td className="text-right font-bold">{roomTotal.toFixed(2)}</td>
                 </tr>
                 {data.foodAmount > 0 && (
                    <tr className="border-b border-gray-100">
                       <td className="py-3">Restaurant / Room Service</td>
                       <td className="text-center text-gray-500">9963</td>
                       <td className="text-center">-</td>
                       <td className="text-center">1</td>
                       <td className="text-right">{data.foodAmount.toFixed(2)}</td>
                    </tr>
                 )}
                 {data.extraAmount > 0 && (
                    <tr className="border-b border-gray-100">
                       <td className="py-3">Laundry / Extra Bed</td>
                       <td className="text-center text-gray-500">9963</td>
                       <td className="text-center">-</td>
                       <td className="text-center">1</td>
                       <td className="text-right">{data.extraAmount.toFixed(2)}</td>
                    </tr>
                 )}
              </tbody>
           </table>

           {/* TOTALS */}
           <div className="flex justify-end">
              <div className="w-1/2 space-y-2 text-sm">
                 <div className="flex justify-between">
                    <span className="text-gray-600">Taxable Amount</span>
                    <span>{taxable.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-600">CGST (6%)</span>
                    <span>{cgst.toFixed(2)}</span>
                 </div>
                 <div className="flex justify-between">
                    <span className="text-gray-600">SGST (6%)</span>
                    <span>{sgst.toFixed(2)}</span>
                 </div>
                 {data.foodAmount > 0 && (
                    <div className="flex justify-between">
                        <span className="text-gray-600">Food GST (5%)</span>
                        <span>{foodTax.toFixed(2)}</span>
                    </div>
                 )}
                 <div className="flex justify-between border-t-2 border-gray-800 pt-2 mt-2 text-lg font-bold">
                    <span>Grand Total</span>
                    <span>₹ {grandTotal.toFixed(2)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* FOOTER */}
        <div className="mt-auto p-8 border-t border-gray-200 font-sans">
           <div className="flex justify-between items-end">
              <div className="text-xs text-gray-500 w-1/2">
                 <p className="font-bold mb-1 uppercase">Terms & Conditions</p>
                 <p>1. Cheques subject to realization.</p>
                 <p>2. Check-out time is 12 Noon.</p>
              </div>
              <div className="text-center">
                 <div className="font-calendary-hand text-xl text-blue-900 mb-1">Manager Sign</div>
                 <p className="text-xs font-bold uppercase border-t border-gray-400 pt-1">Authorized Signatory</p>
              </div>
           </div>
           <div className="text-center text-[10px] text-gray-400 mt-6">
              System Generated Invoice • {data.hotelName} • Thank you for your patronage
           </div>
        </div>

      </div>
    </div>
  );
});

HotelPreview.displayName = 'HotelPreview';