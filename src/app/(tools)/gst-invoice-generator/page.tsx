'use client';

import { useState, useRef, useEffect } from 'react';
import { GSTPreview } from '@/components/tools/gst/GSTPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Plus, Trash2, Upload, Briefcase, User, CreditCard, Wallet, Landmark } from 'lucide-react';

export default function GSTInvoicePage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  // --- STATE ---
  const [items, setItems] = useState([
    { id: '1', desc: 'Consulting Services', hsn: '9983', qty: 1, rate: 15000, tax: 18 },
  ]);

  const [formData, setFormData] = useState({
    logoUrl: null as string | null,
    companyName: 'WebWonderWorks',
    companyAddress: 'Kalapatti, Coimbatore - 641048',
    companyGstin: '29AAACH1234K1Z5',
    clientName: 'Beta Retail Pvt Ltd',
    clientAddress: 'Connaught Place, New Delhi',
    clientGstin: '',
    invoiceNo: 'INV-001',
    date: new Date().toISOString().slice(0, 10),
    supplyType: 'intra' as 'intra' | 'inter',
    signatory: 'Alpha Designs',
    
    // NEW: Payment State
    paymentMode: 'upi' as 'upi' | 'bank',
    upiId: 'business@okhdfcbank',
    bankName: 'HDFC Bank',
    accountNo: '50100234567890',
    ifsc: 'HDFC0000123',
  });

  // ... (Keep handleLogoUpload, handleChange, item management functions exactly as before) ...
  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (ev) => {
        setFormData(p => ({ ...p, logoUrl: ev.target?.result as string }));
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), desc: '', hsn: '', qty: 1, rate: 0, tax: 18 }]);
  };

  const updateItem = (id: string, field: string, value: string | number) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    if (items.length > 1) setItems(items.filter(item => item.id !== id));
  };

  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      invoiceNo: `INV-${new Date().getFullYear()}/${Math.floor(100 + Math.random() * 900)}`,
    }));
  }, []);

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">Free GST Invoice Generator
         <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">Create professional invoices with dynamic QR codes for instant payment.
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* LEFT COLUMN: EDITOR */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           {/* 1. Company & Client Section (Same as before) */}
           <div className="bg-blue-50 p-4 rounded-lg border border-blue-100 flex items-center justify-between">
              <div className="text-sm text-blue-900 font-medium">Business Logo</div>
              <label className="cursor-pointer bg-white border border-blue-200 text-blue-600 px-3 py-1.5 rounded text-xs font-bold flex items-center hover:bg-blue-50">
                 <Upload className="w-3 h-3 mr-2" /> Upload
                 <input type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
              </label>
           </div>

           <h2 className="text-sm font-bold text-gray-900 uppercase border-b pb-1">Business Info</h2>
           <BillInput label="Company Name" name="companyName" value={formData.companyName} onChange={handleChange} Icon={Briefcase} />
           <BillInput label="Company GSTIN" name="companyGstin" value={formData.companyGstin} onChange={handleChange} />
           <BillInput label="Address" name="companyAddress" value={formData.companyAddress} onChange={handleChange} />

           <h2 className="text-sm font-bold text-gray-900 uppercase border-b pb-1 pt-4">Client Info</h2>
           <BillInput label="Client Name" name="clientName" value={formData.clientName} onChange={handleChange} Icon={User} />
           <div className="grid grid-cols-2 gap-4">
              <BillInput label="Invoice No" name="invoiceNo" value={formData.invoiceNo} onChange={handleChange} />
              <BillInput label="Date" name="date" type="date" value={formData.date} onChange={handleChange} />
           </div>

           {/* 2. Items Section (Same as before) */}
           <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center mb-2">
                 <h2 className="text-sm font-bold text-gray-900 uppercase">Items</h2>
                 <button onClick={addItem} className="text-xs flex items-center bg-blue-600 text-white px-2 py-1 rounded hover:bg-blue-700">
                    <Plus className="w-3 h-3 mr-1" /> Add Row
                 </button>
              </div>
              <div className="space-y-2">
                 {items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-2 bg-gray-50 p-2 rounded border border-gray-200 items-end">
                       <div className="col-span-4"><input className="w-full text-xs border-gray-300 rounded px-2 py-1" placeholder="Item" value={item.desc} onChange={(e) => updateItem(item.id, 'desc', e.target.value)} /></div>
                       <div className="col-span-2"><input className="w-full text-xs border-gray-300 rounded px-2 py-1" placeholder="HSN" value={item.hsn} onChange={(e) => updateItem(item.id, 'hsn', e.target.value)} /></div>
                       <div className="col-span-1"><input type="number" className="w-full text-xs border-gray-300 rounded px-1 py-1" value={item.qty} onChange={(e) => updateItem(item.id, 'qty', Number(e.target.value))} /></div>
                       <div className="col-span-2"><input type="number" className="w-full text-xs border-gray-300 rounded px-2 py-1" value={item.rate} onChange={(e) => updateItem(item.id, 'rate', Number(e.target.value))} /></div>
                       <div className="col-span-2">
                          <select className="w-full text-xs border-gray-300 rounded px-1 py-1" value={item.tax} onChange={(e) => updateItem(item.id, 'tax', Number(e.target.value))}>
                             <option value="0">0%</option><option value="5">5%</option><option value="12">12%</option><option value="18">18%</option>
                          </select>
                       </div>
                       <div className="col-span-1"><button onClick={() => removeItem(item.id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button></div>
                    </div>
                 ))}
              </div>
           </div>

           {/* 3. PAYMENT CONFIGURATION (NEW) */}
           <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
              <label className="block text-sm font-bold text-gray-900 mb-3">Payment Method (QR Generation)</label>
              
              <div className="flex gap-2 mb-4">
                 <button 
                   onClick={() => setFormData({...formData, paymentMode: 'upi'})}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${formData.paymentMode === 'upi' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-600'}`}
                 >
                   <Wallet className="w-4 h-4" /> UPI ID
                 </button>
                 <button 
                   onClick={() => setFormData({...formData, paymentMode: 'bank'})}
                   className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${formData.paymentMode === 'bank' ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-300 text-gray-600'}`}
                 >
                   <Landmark className="w-4 h-4" /> Bank Account
                 </button>
              </div>

              {formData.paymentMode === 'upi' ? (
                 <BillInput label="Your UPI ID" name="upiId" value={formData.upiId} onChange={handleChange} placeholder="e.g. yourname@oksbi" />
              ) : (
                 <div className="space-y-3">
                    <BillInput label="Bank Name" name="bankName" value={formData.bankName} onChange={handleChange} />
                    <div className="grid grid-cols-2 gap-3">
                       <BillInput label="Account No" name="accountNo" value={formData.accountNo} onChange={handleChange} />
                       <BillInput label="IFSC Code" name="ifsc" value={formData.ifsc} onChange={handleChange} />
                    </div>
                    <p className="text-[10px] text-gray-500 mt-1">* This will generate a QR code that links to this specific bank account.</p>
                 </div>
              )}
           </div>

        </div>

        {/* RIGHT COLUMN */}
        <div className="space-y-6 flex flex-col">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">GST Invoice</span>
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl flex justify-center flex-grow overflow-hidden">
              <div className="scale-[0.55] origin-top">
                 <GSTPreview ref={billRef} data={{...formData, items}} />
              </div>
           </div>

           <DownloadButton billRef={billRef} fileName={`Invoice_${formData.invoiceNo}.pdf`} />
        </div>

      </div>
    </div>
  );
}