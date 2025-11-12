import { forwardRef } from 'react';
import { Star, CarTaxiFront } from 'lucide-react';

interface TaxiPreviewProps {
  data: {
    platform: 'Uber' | 'Ola' | 'Generic';
    pickup: string;
    drop: string;
    date: string;
    time: string;
    distance: number;
    duration: number; // in minutes
    amount: number;
    driverName: string;
    carModel: string;
    carNumber: string;
  };
}

export const TaxiPreview = forwardRef<HTMLDivElement, TaxiPreviewProps>(({ data }, ref) => {
  const baseFare = 45;
  const bookingFee = 15;
  const tax = data.amount * 0.05;
  const distanceFare = data.amount - baseFare - bookingFee - tax;

  const isUber = data.platform === 'Uber';
  const accentColor = isUber ? 'bg-black' : 'bg-[#bfd630]';
  const textColor = isUber ? 'text-white' : 'text-black';

  // ✅ Get the right logo
  const getLogo = () => {
    switch (data.platform) {
      case 'Uber':
        return <img style={{ width:80,height:80 }} src="/logos/uber.svg" alt="Uber" className="h-8" />;
      case 'Ola':
        return <img style={{ width:70,height:70 }} src="/logos/ola.png" alt="Ola" className="h-8" />;
      default:
        return <h1 className="text-2xl font-bold">Taxi Receipt</h1>;
    }
  };

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      <div
        ref={ref}
        className="bg-white shadow-2xl overflow-hidden relative font-sans text-gray-900"
        style={{
          width: '375px',
          minHeight: 'auto',
        }}
      >
        {/* ===== HEADER ===== */}
        <div className="flex justify-between items-center p-6 pb-2">
          <div>
            <h1 className="text-2xl font-bold mb-1">
              {data.platform === 'Generic' ? 'Taxi Receipt' : `Receipt`}
            </h1>
            <p className="text-sm text-gray-500">
              {data.date}, {data.time}
            </p>
          </div>
          {/* Show Logo */}
          <div>{getLogo()}</div>
        </div>

        {/* ===== FAKE MAP ===== */}
        <div className="relative h-48 bg-gray-100 w-full overflow-hidden">
          <div
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage:
                'linear-gradient(45deg, transparent 45%, #9ca3af 45%, #9ca3af 55%, transparent 55%)',
              backgroundSize: '40px 40px',
            }}
          />
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path
              d="M 50 150 Q 150 150 200 100 T 320 50"
              fill="none"
              stroke="black"
              strokeWidth="4"
              strokeDasharray="8 4"
            />
            <circle cx="50" cy="150" r="6" fill="black" />
            <rect x="310" y="40" width="12" height="12" fill="black" />
          </svg>
          <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full shadow-md text-sm font-bold">
            ₹{data.amount.toFixed(0)}
          </div>
        </div>

        {/* ===== DRIVER + VEHICLE ===== */}
        <div className="p-6">
          <div className="flex items-center justify-between border-b border-gray-100 pb-6 mb-6">
            <div className="flex items-center space-x-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <CarTaxiFront className="w-6 h-6 text-gray-600" />
              </div>
              <div>
                <h3 className="font-bold text-sm">{data.carModel}</h3>
                <p className="text-xs text-gray-500">{data.carNumber}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="font-bold text-sm">{data.driverName}</p>
              <div className="flex items-center justify-end text-xs text-gray-500">
                <Star className="w-3 h-3 fill-current text-yellow-400 mr-1" />
                4.9 Rating
              </div>
            </div>
          </div>

          {/* ===== ROUTE ===== */}
          <div className="relative pl-4 space-y-8 mb-8">
            <div className="absolute left-[5px] top-2 bottom-6 w-0.5 bg-gray-300"></div>
            <div className="relative">
              <div className="absolute -left-[15px] mt-1 w-2.5 h-2.5 bg-green-500 rounded-full ring-4 ring-white"></div>
              <h4 className="text-xs text-gray-500 uppercase font-bold">Pickup</h4>
              <p className="text-sm font-medium leading-tight">{data.pickup}</p>
              <p className="text-xs text-gray-400 mt-1">{data.time}</p>
            </div>
            <div className="relative">
              <div className="absolute -left-[15px] mt-1 w-2.5 h-2.5 bg-red-500 rounded-none ring-4 ring-white"></div>
              <h4 className="text-xs text-gray-500 uppercase font-bold">Drop</h4>
              <p className="text-sm font-medium leading-tight">{data.drop}</p>
            </div>
          </div>

          {/* ===== BILL DETAILS ===== */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-2 text-sm">
            <div className="flex justify-between text-gray-600">
              <span>Base Fare</span>
              <span>₹{baseFare.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Distance ({data.distance} km)</span>
              <span>₹{distanceFare > 0 ? distanceFare.toFixed(2) : '0.00'}</span>
            </div>
            <div className="flex justify-between text-gray-600">
              <span>Booking Fee</span>
              <span>₹{bookingFee.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-gray-600 border-b border-gray-200 pb-2">
              <span>Taxes (5%)</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-1">
              <span>Total</span>
              <span>₹{data.amount.toFixed(2)}</span>
            </div>
          </div>

          {/* ===== FOOTER ===== */}
          <div className="mt-6 text-center">
            <p className="text-xs text-gray-400 mb-2">Payment via Cash/UPI</p>
            <div
              className={`w-full py-3 rounded-lg font-bold text-center ${accentColor} ${textColor}`}
            >
              Download Invoice
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

TaxiPreview.displayName = 'TaxiPreview';
