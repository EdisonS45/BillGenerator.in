'use client';

import { useState, useRef, useEffect } from 'react';
import { LTAPreview } from '@/components/tools/lta/LTAPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Plane, Plus, Trash2, User, Calendar, Briefcase } from 'lucide-react';

export default function LTAPage() {
  const billRef = useRef<HTMLDivElement>(null);
  
  // 1. Static Initial State
  const [formData, setFormData] = useState({
    agencyName: 'Global Travels Pvt Ltd',
    customerName: 'Amit Verma',
    bookingId: 'BKG-882910',
    bookingDate: '2024-01-10',
    travelMode: 'Flight' as 'Flight' | 'Train',
    origin: 'Delhi',
    destination: 'Port Blair',
    travelDate: '2024-01-25',
    blockYear: '2022-2025',
    baseFare: 8500,
    taxes: 1200,
    passengers: [
      { name: 'Amit Verma', age: 34, relation: 'Self' },
      { name: 'Priya Verma', age: 32, relation: 'Spouse' }
    ]
  });

  // 2. Client-Side Dynamic Logic
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      bookingId: 'BKG-' + Math.floor(100000 + Math.random() * 900000)
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Passenger Management Logic
  const addPassenger = () => {
    setFormData(prev => ({
      ...prev,
      passengers: [...prev.passengers, { name: 'New Passenger', age: 0, relation: 'Child' }]
    }));
  };

  const updatePassenger = (index: number, field: string, value: string | number) => {
    const newPax = [...formData.passengers];
    newPax[index] = { ...newPax[index], [field]: value };
    setFormData(prev => ({ ...prev, passengers: newPax }));
  };

  const removePassenger = (index: number) => {
    if (formData.passengers.length > 1) {
      setFormData(prev => ({
        ...prev,
        passengers: prev.passengers.filter((_, i) => i !== index)
      }));
    }
  };

  return (
    <div className="space-y-8">
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900">LTA/LTC Invoice Generator</h1>
        <p className="text-gray-600 mt-2">Generate valid flight or train invoices for Leave Travel Allowance tax exemption claims.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        
        {/* INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
           
           {/* Agency & Block Year */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
             <BillInput label="Travel Agency Name" name="agencyName" value={formData.agencyName} onChange={handleChange} Icon={Briefcase} />
             <div>
               <label className="block text-sm font-medium text-gray-700 mb-1">Block Year</label>
               <select 
                 name="blockYear" 
                 value={formData.blockYear} 
                 onChange={handleChange}
                 className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
               >
                 <option>2022-2025</option>
                 <option>2018-2021</option>
               </select>
             </div>
           </div>

           {/* Trip Details */}
           <div className="border-t border-gray-100 pt-4">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Trip Details</h3>
              <div className="grid grid-cols-2 gap-4 mb-4">
                 <BillInput label="Origin" name="origin" value={formData.origin} onChange={handleChange} />
                 <BillInput label="Destination" name="destination" value={formData.destination} onChange={handleChange} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                 <BillInput label="Travel Date" name="travelDate" type="date" value={formData.travelDate} onChange={handleChange} Icon={Calendar} />
                 <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Travel Mode</label>
                    <select 
                      name="travelMode" 
                      value={formData.travelMode} 
                      onChange={handleChange}
                      className="block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 py-2.5 px-3 border"
                    >
                      <option>Flight</option>
                      <option>Train</option>
                    </select>
                 </div>
              </div>
           </div>

           {/* Passenger List (Killer Feature) */}
           <div className="border-t border-gray-100 pt-4">
              <div className="flex justify-between items-center mb-3">
                 <h3 className="text-sm font-semibold text-gray-900">Passengers</h3>
                 <button onClick={addPassenger} className="text-sm text-blue-600 font-medium flex items-center hover:bg-blue-50 px-2 py-1 rounded">
                    <Plus className="w-4 h-4 mr-1" /> Add
                 </button>
              </div>
              <div className="space-y-3">
                 {formData.passengers.map((p, idx) => (
                    <div key={idx} className="flex gap-2 items-center bg-gray-50 p-2 rounded-lg">
                       <User className="w-4 h-4 text-gray-400" />
                       <input 
                         value={p.name}
                         onChange={(e) => updatePassenger(idx, 'name', e.target.value)}
                         className="flex-1 text-sm bg-transparent border-none focus:ring-0 p-0"
                         placeholder="Name"
                       />
                       <input 
                         value={p.relation}
                         onChange={(e) => updatePassenger(idx, 'relation', e.target.value)}
                         className="w-20 text-sm bg-transparent border-none focus:ring-0 p-0 text-gray-500"
                         placeholder="Relation"
                       />
                       <button onClick={() => removePassenger(idx)} className="text-red-400 hover:text-red-600">
                          <Trash2 className="w-4 h-4" />
                       </button>
                    </div>
                 ))}
              </div>
           </div>

           {/* Costing */}
           <div className="grid grid-cols-2 gap-4 border-t border-gray-100 pt-4">
              <BillInput label="Per Person Fare (₹)" name="baseFare" type="number" value={formData.baseFare} onChange={handleChange} />
              <BillInput label="Taxes Per Person (₹)" name="taxes" type="number" value={formData.taxes} onChange={handleChange} />
           </div>

        </div>

        {/* PREVIEW AREA */}
        <div className="space-y-6">
           <div className="bg-gray-800 p-4 rounded-t-xl flex items-center justify-between">
              <span className="text-white font-medium">Live Preview</span>
              <span className="text-xs text-gray-400 bg-gray-700 px-2 py-1 rounded">Formal Invoice</span>
           </div>
           
           <div className="border-x border-b border-gray-200 bg-gray-50 p-4 rounded-b-xl overflow-hidden flex justify-center">
              <div className="scale-[0.6] origin-top">
                 <LTAPreview ref={billRef} data={formData} />
              </div>
           </div>

           <DownloadButton billRef={billRef} fileName={`LTA_Invoice_${formData.customerName}.pdf`} />
        </div>

      </div>
      
      {/* SEO CONTENT */}
      <article className="prose prose-blue max-w-none bg-white p-8 rounded-xl border border-gray-200">
        <h2>LTA Exemption Rules (2025)</h2>
        <p>Leave Travel Allowance (LTA) exemption is available for two journeys in a block of four years. The current block is **2022-2025**. Ensure your invoice contains:</p>
        <ul>
            <li>**Travel Details:** Origin, destination, and travel dates are mandatory.</li>
            <li>**Family Members:** Only spouse, children (up to 2), and dependent parents/siblings are covered.</li>
            <li>**Economy Class:** For flights, only economy fare is exempt.</li>
        </ul>
      </article>
    </div>
  );
}