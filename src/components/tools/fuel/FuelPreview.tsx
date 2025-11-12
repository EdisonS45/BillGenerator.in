import { forwardRef } from 'react';
import { Droplets } from 'lucide-react';

interface FuelPreviewProps {
  data: {
    stationName: string;
    address: string;
    fuelType: string;
    amount: number;
    rate: number;
    date: string;
    time: string;
    vehicleNumber: string;
    invoiceNo: string;
  };
}

export const FuelPreview = forwardRef<HTMLDivElement, FuelPreviewProps>(({ data }, ref) => {
  // Safe calculation to avoid NaN
  const safeAmount = Number(data.amount) || 0;
  const safeRate = Number(data.rate) || 1;
  const quantity = (safeAmount / safeRate).toFixed(2);
  const amountStr = safeAmount.toFixed(2);

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      {/* THE THERMAL PAPER CONTAINER */}
      <div 
        ref={ref}
        className="bg-white text-black font-mono text-xs relative shadow-xl"
        style={{ 
          width: '320px', 
          minHeight: 'auto',
          fontFamily: '"Courier Prime", "Courier New", monospace' // Enforce thermal font
        }}
      >
        {/* Top Padding */}
        <div className="p-5 pb-2">
          
          {/* HEADER SECTION */}
          <div className="text-center border-b-2 border-dotted border-black pb-3 mb-3">
            <div className="flex justify-center mb-2">
              {/* Generic Pump Logo */}
              <div className="border-2 border-black rounded-full p-1.5">
                <Droplets className="w-6 h-6 text-black fill-current" />
              </div>
            </div>
            <h1 className="text-lg font-bold uppercase tracking-wider leading-tight mb-1">
              {data.stationName || "FUEL STATION"}
            </h1>
            <p className="uppercase px-4 leading-tight mb-1">
              {data.address || "Highway Road, City Center"}
            </p>
            <p className="text-[10px]">GSTIN: 27AABCU9603R1ZM</p>
            <p className="text-[10px]">VAT TIN: 27360346664V</p>
          </div>

          {/* METADATA GRID */}
          <div className="space-y-1.5 mb-3 pb-3 border-b-2 border-dotted border-black">
            <div className="flex justify-between">
              <span>Invc No:</span>
              <span className="font-bold">{data.invoiceNo}</span>
            </div>
            <div className="flex justify-between">
              <span>Date: {data.date}</span>
              <span>Time: {data.time}</span>
            </div>
            <div className="flex justify-between">
              <span>Vh.No:</span>
              <span className="font-bold text-sm">{data.vehicleNumber.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Nozzle: 2</span>
              <span>Pump: 1</span>
            </div>
            <div className="flex justify-between">
              <span>Type:</span>
              <span>{data.fuelType.toUpperCase()}</span>
            </div>
            <div className="flex justify-between">
              <span>Density:</span>
              <span>745.8 Kg/m3</span>
            </div>
          </div>

          {/* PRODUCT TABLE */}
          <div className="mb-3 pb-3 border-b-2 border-black">
            <div className="flex justify-between font-bold mb-1">
              <span className="w-1/3">RATE/Ltr</span>
              <span className="w-1/3 text-center">VOLUME</span>
              <span className="w-1/3 text-right">AMOUNT</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="w-1/3">₹ {data.rate}</span>
              <span className="w-1/3 text-center">{quantity} L</span>
              <span className="w-1/3 text-right font-bold">₹ {amountStr}</span>
            </div>
          </div>

          {/* TOTALS SECTION */}
          <div className="mb-6">
            <div className="flex justify-between items-end mb-1">
              <span className="font-bold text-lg">NET AMT:</span>
              <span className="font-bold text-xl border-b-2 border-black border-double">
                ₹ {amountStr}
              </span>
            </div>
            <p className="text-[10px] mt-1 uppercase">
              (Rate inclusive of all taxes)
            </p>
          </div>

          {/* FOOTER & BARCODE */}
          <div className="text-center space-y-2">
             <p className="italic">*** SAVE FUEL, SAVE EARTH ***</p>
             <p className="text-[10px]">Thank you for visiting!</p>
             
             {/* CSS GENERATED BARCODE */}
             <div className="h-10 w-3/4 mx-auto mt-2" style={{
               backgroundImage: `repeating-linear-gradient(
                 90deg,
                 #000 0px,
                 #000 2px,
                 transparent 2px,
                 transparent 4px,
                 #000 4px,
                 #000 5px,
                 transparent 5px,
                 transparent 7px
               )`
             }}></div>
             <p className="text-[8px] tracking-[0.3em]">{data.invoiceNo}</p>
          </div>
        </div>
        
        {/* JAGGEED PAPER EDGE EFFECT (Bottom) */}
         <div 
              className="w-full h-2 mt-4"
              style={{
                  background: 'linear-gradient(45deg, transparent 50%, #fff 50%), linear-gradient(-45deg, transparent 50%, #fff 50%)',
                  backgroundSize: '10px 10px',
                  backgroundRepeat: 'repeat-x',
                  backgroundColor: '#e5e7eb', // Matches the gray background to create the "cut" illusion
                  height: '10px'
              }}
          ></div>

      </div>
    </div>
  );
});

FuelPreview.displayName = 'FuelPreview';