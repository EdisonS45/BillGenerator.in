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
    serviceCharge: number;
  };
}

export const RestaurantPreview = forwardRef<HTMLDivElement, RestaurantPreviewProps>(({ data }, ref) => {
  const subtotal = data.items.reduce((sum, item) => sum + item.price * item.qty, 0);
  const gstAmount = data.gstEnabled ? subtotal * 0.05 : 0;
  const serviceAmount = subtotal * (data.serviceCharge / 100);
  const total = subtotal + gstAmount + serviceAmount;

  return (
    <div className="w-full flex justify-center bg-gray-100 p-8">
      <div
        ref={ref}
        className="bg-white shadow-md text-gray-800"
        style={{
          width: '320px',
          fontFamily: '"Courier New", monospace',
          fontSize: '12px',
          color: '#111',
        }}
      >
        <div className="p-5">
          {/* ===== Header ===== */}
          <div className="text-center mb-4">
            <div className="flex justify-center mb-2">
              <div className="border border-black rounded-full p-2">
                <UtensilsCrossed className="w-5 h-5 text-black" />
              </div>
            </div>
            <h1 className="font-extrabold uppercase tracking-wide text-[14px]">
              {data.restaurantName || 'Empire Restaurant'}
            </h1>
            <p className="text-[11px] leading-snug mt-1">
              {data.address || 'Church Street, Bangalore - 560001'}
            </p>
            <p className="text-[11px]">Ph: 080-22334455 | FSSAI: 11223344556677</p>
            {data.gstEnabled && <p className="text-[11px]">GSTIN: 29AABCE9988M1ZB</p>}
          </div>

          {/* ===== Metadata ===== */}
          <div className="text-[11px] mb-2 border-t border-b border-dashed border-gray-400 py-1">
            <div className="flex justify-between">
              <span>BILL NO: {data.orderId || 'BIL23871'}</span>
              <span>{data.date || '12/11/2025'}</span>
            </div>
            <div className="flex justify-between">
              <span>TIME: {data.time || '09:45 PM'}</span>
              <span>DINE IN</span>
            </div>
          </div>

          {/* ===== Items ===== */}
          <div className="mb-3">
            <div className="flex justify-between border-b border-gray-400 border-dashed pb-1 font-bold">
              <span className="w-1/2">ITEM</span>
              <span className="w-1/6 text-center">QTY</span>
              <span className="w-1/3 text-right">AMOUNT</span>
            </div>

            {data.items.map((item) => (
              <div key={item.id} className="flex justify-between py-[2px]">
                <span className="w-1/2 truncate">{item.name}</span>
                <span className="w-1/6 text-center">{item.qty}</span>
                <span className="w-1/3 text-right">{(item.price * item.qty).toFixed(2)}</span>
              </div>
            ))}
          </div>

          {/* ===== Totals ===== */}
          <div className="border-t border-dashed border-gray-400 pt-2 space-y-[2px]">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>{subtotal.toFixed(2)}</span>
            </div>
            {data.gstEnabled && (
              <>
                <div className="flex justify-between">
                  <span>CGST (2.5%)</span>
                  <span>{(gstAmount / 2).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>SGST (2.5%)</span>
                  <span>{(gstAmount / 2).toFixed(2)}</span>
                </div>
              </>
            )}
            {data.serviceCharge > 0 && (
              <div className="flex justify-between">
                <span>Service Chg ({data.serviceCharge}%)</span>
                <span>{serviceAmount.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-extrabold border-t border-b border-dashed border-gray-500 py-2 mt-1">
              <span>GRAND TOTAL</span>
              <span>₹ {total.toFixed(2)}</span>
            </div>
          </div>

          {/* ===== Footer ===== */}
          <div className="mt-4 space-y-1 text-center text-[11px]">
            <p>Thank You! Visit Again</p>
          </div>

          {/* ===== Signature Block ===== */}
          <div className="mt-4 text-[10px] text-gray-500">
            <div className="flex justify-between">
              <span>Cashier: Ramesh</span>
              <span>Server: Ankit</span>
            </div>

          </div>
        </div>

        {/* ===== Zig-Zag Cut Pattern ===== */}
        <div
          className="w-full h-[10px]"
          style={{
            backgroundImage:
              'repeating-linear-gradient(135deg, #fff 0 8px, transparent 8px 16px)',
            backgroundColor: '#9ca3af',
          }}
        />
      </div>
    </div>
  );
});

RestaurantPreview.displayName = 'RestaurantPreview';
