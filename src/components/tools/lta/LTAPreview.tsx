import { forwardRef } from 'react';
import { Plane, Train, CheckCircle2 } from 'lucide-react';

interface Passenger {
  name: string;
  age: number;
  relation: string;
}

interface LTAPreviewProps {
  data: {
    agencyName: string;
    customerName: string;
    bookingId: string;
    bookingDate: string;
    travelMode: 'Flight' | 'Train';
    origin: string;
    destination: string;
    travelDate: string;
    blockYear: string;
    passengers: Passenger[];
    baseFare: number;
    taxes: number;
  };
}

export const LTAPreview = forwardRef<HTMLDivElement, LTAPreviewProps>(({ data }, ref) => {
  const totalFare = (data.baseFare + data.taxes) * data.passengers.length;

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* A4 Container */}
      <div 
        ref={ref}
        className="bg-white shadow-xl text-gray-800 relative"
        style={{ 
          width: '595px', // A4 Width
          minHeight: '842px', // A4 Height
          fontFamily: 'Arial, sans-serif' 
        }}
      >
        {/* HEADER BAND */}
        <div className="bg-blue-900 h-24 w-full flex items-center px-10 justify-between text-white">
           <div>
              <div className="flex items-center space-x-2">
                 {data.travelMode === 'Flight' ? <Plane className="w-8 h-8" /> : <Train className="w-8 h-8" />}
                 <h1 className="text-2xl font-bold uppercase tracking-wide">{data.agencyName}</h1>
              </div>
              <p className="text-xs text-blue-200 mt-1">GSTIN: 07AABCT1234Q1Z5</p>
           </div>
           <div className="text-right">
              <h2 className="text-xl font-semibold">INVOICE</h2>
              <p className="text-sm opacity-80">Original for Recipient</p>
           </div>
        </div>

        <div className="p-10">
           
           {/* BOOKING INFO GRID */}
           <div className="grid grid-cols-2 gap-8 mb-8 border-b border-gray-200 pb-8">
              <div>
                 <p className="text-xs text-gray-500 uppercase font-bold mb-1">Billed To</p>
                 <p className="font-bold text-lg text-gray-900">{data.customerName}</p>
                 <p className="text-sm text-gray-600">Employee Code: EMP-{Math.floor(Math.random()*1000)}</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                 <div>
                    <p className="text-gray-500">Invoice No</p>
                    <p className="font-semibold">{data.bookingId}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Booking Date</p>
                    <p className="font-semibold">{data.bookingDate}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">LTA Block Year</p>
                    <p className="font-semibold text-blue-700">{data.blockYear}</p>
                 </div>
                 <div>
                    <p className="text-gray-500">Payment Status</p>
                    <p className="font-semibold text-green-600 flex items-center">
                       <CheckCircle2 className="w-3 h-3 mr-1" /> Paid
                    </p>
                 </div>
              </div>
           </div>

           {/* ITINERARY */}
           <div className="bg-blue-50 rounded-lg p-6 mb-8 border border-blue-100">
              <h3 className="text-sm font-bold text-blue-900 uppercase mb-4">Itinerary Details</h3>
              <div className="flex justify-between items-center">
                 <div className="text-center w-1/3">
                    <p className="text-2xl font-bold text-gray-800">{data.origin.substring(0,3).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{data.origin}</p>
                 </div>
                 <div className="flex-1 flex flex-col items-center px-4">
                     <p className="text-xs text-gray-500 mb-1">{data.travelDate}</p>
                     <div className="w-full h-px bg-gray-400 relative">
                        <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 bg-blue-50 px-2">
                           {data.travelMode === 'Flight' ? <Plane className="w-4 h-4 text-gray-400" /> : <Train className="w-4 h-4 text-gray-400" />}
                        </div>
                     </div>
                     <p className="text-xs text-gray-500 mt-1">Non-Stop</p>
                 </div>
                 <div className="text-center w-1/3">
                    <p className="text-2xl font-bold text-gray-800">{data.destination.substring(0,3).toUpperCase()}</p>
                    <p className="text-xs text-gray-500">{data.destination}</p>
                 </div>
              </div>
           </div>

           {/* PASSENGER TABLE */}
           <div className="mb-8">
              <table className="w-full text-sm text-left">
                 <thead className="bg-gray-100 text-gray-600 font-semibold">
                    <tr>
                       <th className="p-3 rounded-l-lg">Passenger Name</th>
                       <th className="p-3">Type/Relation</th>
                       <th className="p-3 text-right rounded-r-lg">Ticket Number</th>
                    </tr>
                 </thead>
                 <tbody className="text-gray-700">
                    {data.passengers.map((p, idx) => (
                       <tr key={idx} className="border-b border-gray-50">
                          <td className="p-3 font-medium">{p.name}</td>
                          <td className="p-3 capitalize">{p.relation} ({p.age} yrs)</td>
                          <td className="p-3 text-right font-mono text-xs text-gray-500">TK-{Math.floor(Math.random() * 10000000)}</td>
                       </tr>
                    ))}
                 </tbody>
              </table>
           </div>

           {/* FARE BREAKDOWN */}
           <div className="flex justify-end">
              <div className="w-1/2">
                 <div className="flex justify-between py-2 text-sm border-b border-gray-100">
                    <span className="text-gray-600">Base Fare ({data.passengers.length} Pax)</span>
                    <span>₹ {(data.baseFare * data.passengers.length).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between py-2 text-sm border-b border-gray-100">
                    <span className="text-gray-600">Taxes & Fees</span>
                    <span>₹ {(data.taxes * data.passengers.length).toLocaleString()}</span>
                 </div>
                 <div className="flex justify-between py-3 text-xl font-bold text-blue-900 mt-2">
                    <span>Grand Total</span>
                    <span>₹ {totalFare.toLocaleString()}</span>
                 </div>
                 <p className="text-[10px] text-gray-400 text-right mt-1">(Inclusive of all taxes)</p>
              </div>
           </div>

        </div>

        {/* FOOTER */}
        <div className="absolute bottom-0 w-full bg-gray-100 p-6 text-center text-xs text-gray-500 border-t border-gray-200">
           <p>This is an electronic invoice generated for LTA/LTC claim purposes.</p>
           <p>{data.agencyName}, Registered Office: Connaught Place, New Delhi - 110001</p>
        </div>
      </div>
    </div>
  );
});

LTAPreview.displayName = 'LTAPreview';