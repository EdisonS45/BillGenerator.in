import { forwardRef } from 'react';
import { UtensilsCrossed } from 'lucide-react';

interface OrderItem {
  id: string;
  name: string;
  price: number;
  qty: number;
}

interface RestaurantPreviewProps {
  data: {
    restaurantName: string;
    address: string;
    date: string;
    time: string;
    orderId: string;
    items: OrderItem[];
    gstEnabled: boolean;
    serviceCharge: number; // in percent
  };
}

export const RestaurantPreview = forwardRef<HTMLDivElement, RestaurantPreviewProps>(({ data }, ref) => {
  // Calculations
  const subtotal = data.items.reduce((sum, item) => sum + (item.price * item.qty), 0);
  const gstAmount = data.gstEnabled ? subtotal * 0.05 : 0; // 5% GST
  const serviceAmount = (subtotal * (data.serviceCharge / 100));
  const total = subtotal + gstAmount + serviceAmount;

  return (
    <div className="w-full flex justify-center bg-gray-200/50 p-8">
      <div 
        ref={ref}
        className="bg-white shadow-xl text-xs text-gray-800"
        style={{ 
          width: '360px', // Wider than fuel bill
          minHeight: 'auto',
          fontFamily: '"Roboto Mono", monospace' 
        }}
      >
        <div className="p-6">
          
          {/* HEADER */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
               <div className="border-2 border-gray-800 rounded-full p-2">
                 <UtensilsCrossed className="w-6 h-6 text-gray-800" />
               </div>
            </div>
            <h1 className="text-xl font-bold uppercase tracking-wide mb-2">{data.restaurantName || "THE SPICE GARDEN"}</h1>
            <p className="text-gray-500 px-4 leading-relaxed">{data.address || "12, Park Street, Bangalore - 560001"}</p>
            {data.gstEnabled && <p className="text-[10px] mt-1">GSTIN: 29AABCU9603R1ZM</p>}
          </div>

          {/* METADATA */}
          <div className="flex justify-between border-b border-dashed border-gray-300 pb-3 mb-3 text-[11px]">
            <div className="text-left">
                <p>Date: {data.date}</p>
                <p>Order #: {data.orderId}</p>
            </div>
            <div className="text-right">
                <p>Time: {data.time}</p>
                <p>Table: 4</p>
            </div>
          </div>

          {/* ITEMS TABLE */}
          <div className="mb-4">
            <div className="flex font-bold border-b-2 border-gray-800 pb-2 mb-2">
                <span className="w-1/2">ITEM</span>
                <span className="w-1/6 text-center">QTY</span>
                <span className="w-1/3 text-right">AMT</span>
            </div>
            <div className="space-y-2">
                {data.items.map((item) => (
                    <div key={item.id} className="flex">
                        <span className="w-1/2 truncate pr-2">{item.name}</span>
                        <span className="w-1/6 text-center">{item.qty}</span>
                        <span className="w-1/3 text-right font-medium">{(item.price * item.qty).toFixed(2)}</span>
                    </div>
                ))}
            </div>
          </div>

          {/* TOTALS */}
          <div className="border-t border-dashed border-gray-300 pt-3 space-y-1">
            <div className="flex justify-between">
                <span>Subtotal</span>
                <span>{subtotal.toFixed(2)}</span>
            </div>
            
            {data.gstEnabled && (
                <>
                  <div className="flex justify-between text-gray-500 text-[10px]">
                      <span>CGST (2.5%)</span>
                      <span>{(gstAmount / 2).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-500 text-[10px]">
                      <span>SGST (2.5%)</span>
                      <span>{(gstAmount / 2).toFixed(2)}</span>
                  </div>
                </>
            )}

            {data.serviceCharge > 0 && (
                 <div className="flex justify-between text-gray-500 text-[10px]">
                    <span>Svc Chg ({data.serviceCharge}%)</span>
                    <span>{serviceAmount.toFixed(2)}</span>
                </div>
            )}

            <div className="flex justify-between font-bold text-lg border-t-2 border-gray-800 pt-2 mt-2">
                <span>GRAND TOTAL</span>
                <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* FOOTER */}
          <div className="text-center mt-8 space-y-1 text-[10px] text-gray-500">
            <p>Thank you for dining with us!</p>
            <p>This is a computer generated receipt.</p>
          </div>

        </div>
        
        {/* Cut Pattern */}
        <div className="h-2 w-full bg-[url('https://raw.githubusercontent.com/gijsroge/zigzag/master/zigzag.svg')] opacity-50"></div>
      </div>
    </div>
  );
});

RestaurantPreview.displayName = 'RestaurantPreview';