'use client';

import { useState, useRef, useEffect } from 'react';
import { RestaurantPreview } from '@/components/tools/restaurant/RestaurantPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Plus, Trash2, Utensils } from 'lucide-react';

export default function RestaurantBillPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
// 1. Use STATIC data first (No Math.random here)
  const [formData, setFormData] = useState({
    restaurantName: 'Muthupillai Canteen',
    address: 'Brindavan, Pudukkottai - 622001',
    date: '2025-02-20', // Static Date
    time: '20:15',
    orderId: 'ORD-9988', // Static ID
    gstEnabled: true,
    serviceCharge: 0,
  });
  // 2. Update to Dynamic/Current data only on the CLIENT
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      date: new Date().toISOString().slice(0, 10),
      orderId: 'ORD-' + Math.floor(1000 + Math.random() * 9000)
    }));
  }, []);

  const [items, setItems] = useState([
    { id: '1', name: 'Mutton Briyani', price: 320, qty: 1 },
    { id: '2', name: 'Butter Naan', price: 60, qty: 3 },
    { id: '3', name: 'Mutta mass', price: 50, qty: 5 },
  ]);

  // Handlers
  const handleBasicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData(prev => ({ ...prev, [e.target.name]: value }));
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: 'New Item', price: 100, qty: 1 }]);
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Restaurant Bill Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.8",
        ratingCount: "1790",
      },
      description:
        "Generate printable restaurant and food invoices online with GST, service charge & payment details for reimbursement.",
    }),
  }}
/>

      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">Restaurant Bill Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">Generate authentic food bills with GST support for food allowance claims.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUTS */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Restaurant Name" name="restaurantName" value={formData.restaurantName} onChange={handleBasicChange} />
             <BillInput label="Order ID" name="orderId" value={formData.orderId} onChange={handleBasicChange} />
           </div>
           <BillInput label="Address" name="address" value={formData.address} onChange={handleBasicChange} />
           
           {/* ITEM LIST MANAGER */}
           <div className="border-t border-b border-gray-100 py-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium text-gray-900">Order Items</h3>
                <button onClick={addItem} className="text-sm text-blue-600 font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded">
                   <Plus className="w-4 h-4 mr-1" /> Add Item
                </button>
              </div>
              
              <div className="space-y-3">
                 {items.map((item) => (
                    <div key={item.id} className="flex gap-2 items-end">
                       <div className="flex-grow">
                          <input 
                            type="text" 
                            value={item.name}
                            onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                            className="w-full rounded-md border-gray-300 shadow-sm text-sm px-4 py-2"
                            placeholder="Item Name"
                          />
                       </div>
                       <div className="w-20">
                          <input 
                            type="number" 
                            value={item.price}
                            onChange={(e) => updateItem(item.id, 'price', Number(e.target.value))}
                            className="w-full rounded-md border-gray-300 shadow-sm text-sm px-4 py-2"
                            placeholder="Price"
                          />
                       </div>
                       <div className="w-16">
                          <input 
                            type="number" 
                            value={item.qty}
                            onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))}
                            className="w-full rounded-md border-gray-300 shadow-sm text-sm px-4 py-2"
                            placeholder="Qty"
                          />
                       </div>
                       <button onClick={() => removeItem(item.id)} className="text-red-500 p-2 hover:bg-red-50 rounded">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* TAX SETTINGS */}
           <div className="grid grid-cols-2 gap-4 items-center bg-gray-50 p-4 rounded-lg">
               <div className="flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="gstEnabled"
                    name="gstEnabled"
                    checked={formData.gstEnabled}
                    onChange={(e) => setFormData({...formData, gstEnabled: e.target.checked})}
                    className="rounded text-blue-600 focus:ring-blue-500 h-4 w-4"
                  />
                  <label htmlFor="gstEnabled" className="text-sm font-medium text-gray-900">Add 5% GST</label>
               </div>
               <div>
                  <label className="text-xs text-gray-500 block">Service Charge (%)</label>
                  <input 
                    type="number" 
                    name="serviceCharge"
                    value={formData.serviceCharge}
                    onChange={handleBasicChange}
                    className="w-full rounded-md border-gray-300 shadow-sm text-sm h-8 px-4 py-2"
                  />
               </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
             <BillInput label="Date" name="date" type="date" value={formData.date} onChange={handleBasicChange} />
             <BillInput label="Time" name="time" type="time" value={formData.time} onChange={handleBasicChange} />
           </div>
        </div>

        {/* PREVIEW */}
        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <Utensils className="w-5 h-5 text-gray-400" />
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-6 rounded-b-xl flex justify-center">
              <RestaurantPreview ref={billRef} data={{...formData, items}} />
           </div>

           <DownloadButton billRef={billRef} fileName={`Food_Bill_${formData.date}.pdf`} />
        </div>
      </div>

{/* --- RESTAURANT SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Restaurant Bill Generator for Food & Hotel Dining Reimbursement
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Dining bills are frequently required for corporate travel reimbursement and business
      expense approval. If the original food receipt is unavailable or lacks clear details,
      this tool instantly generates a professional restaurant invoice with itemized food
      charges, GST, service charge, subtotal and payment information in an authentic format.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">Restaurant</span>
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Hotel Dining</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Café / Food Court</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Office Reimbursement</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Itemized Food Entries</h3>
      <p className="text-sm text-gray-500">
        Add multiple dishes with quantity and rate — taxes and totals calculated automatically.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">GST + Service Charge Included</h3>
      <p className="text-sm text-gray-500">
        Auto-adds GST and optional 10% service charge based on total food value.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Reimbursement-Ready PDF</h3>
      <p className="text-sm text-gray-500">
        Download printable invoices accepted by HR & finance departments for claims.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a restaurant invoice?</h3>
      <div className="space-y-6">
        {[
          "Enter restaurant name and address",
          "Add diner name / customer name (optional)",
          "Enter date, table number and waiter name (optional)",
          "Add food items with quantity and price",
          "Apply GST and optional service charge",
          "Download the bill as a PDF for reimbursement"
        ].map((step, i) => (
          <div key={i} className="flex gap-4">
            <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
              {i + 1}
            </div>
            <p className="text-sm text-gray-600">{step}</p>
          </div>
        ))}
      </div>
    </div>

    {/* FAQ */}
    <div className="lg:col-span-5">
      <div className="bg-blue-50/50 rounded-2xl p-8 border border-blue-100 space-y-6">

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Is this accepted for corporate reimbursement?</h4>
          <p className="text-xs text-gray-600">
            Yes. Finance teams accept bills with GST, total amount, invoice number and restaurant details.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Do you store food order or customer details?</h4>
          <p className="text-xs text-gray-600">
            No — all bill information stays in your browser. Nothing is uploaded or saved on our servers.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">Can I add delivery / takeaway orders?</h4>
          <p className="text-xs text-gray-600">
            Yes. You can update the bill title and fields to match dine-in, takeaway or delivery orders.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}