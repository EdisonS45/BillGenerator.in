'use client';

import { useState, useRef, useEffect } from 'react';
import { RestaurantPreview } from '@/components/tools/restaurant/RestaurantPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Plus, Trash2, Utensils } from 'lucide-react';
import RestaurantBillSEOSection from "@/components/seo/RestaurantBillSEOSection";


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
<RestaurantBillSEOSection />

    </div>
  );
}