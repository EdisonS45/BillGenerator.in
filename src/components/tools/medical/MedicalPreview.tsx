import { forwardRef } from 'react';
import { Plus, Phone, MapPin } from 'lucide-react';

interface Medicine {
  id: string;
  name: string;
  batch: string;
  exp: string;
  qty: number;
  rate: number;
}

interface MedicalPreviewProps {
  data: {
    mode?: 'basic' | 'real'; // new: selects layout
    pharmacyName: string;
    address: string;
    dlNo: string;
    gstin: string;
    patientName: string;
    doctorName: string;
    billNo: string;
    date: string;
    medicines: Medicine[];
  };
}

export const MedicalPreview = forwardRef<HTMLDivElement, MedicalPreviewProps>(({ data }, ref) => {
  const totalAmount = data.medicines.reduce((sum, item) => sum + (item.qty * item.rate), 0);
  // Approx GST distribution on typical pharmacy invoice: show CGST+SGST combined (12%)
  const gstRate = 0.12;
  const gst = +(totalAmount * gstRate).toFixed(2);
  const grandTotal = +(totalAmount + gst).toFixed(2);

  // helper to format currency
  const fmt = (n: number) => n.toFixed(2);

  // REAL (Apollo-like) layout
  if (data.mode === 'real') {
    return (
      <div className="w-full flex justify-center bg-gray-100/50 p-6">
        <div
          ref={ref}
          className="bg-white shadow-xl text-gray-900 relative"
          style={{
            width: '820px',             // wide A4-style invoice width for desktop screenshot
            fontFamily: '"Helvetica Neue", Arial, sans-serif',
            fontSize: '12px',
            border: '1px solid #e5e7eb'
          }}
        >
          {/* Top green header */}
          <div style={{ background: '#2fa34a', color: '#fff', padding: '12px 18px', display: 'flex', alignItems: 'center', gap: 20 }}>
            {/* Apollo logo left - replace with real file in /public/logos/apollo.png */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logos/apollo.svg" alt="Apollo" style={{ height: 56, objectFit: 'contain' }} />
              <div>
                <div style={{ fontSize: 20, fontWeight: 800, letterSpacing: 0.6 }}>Apollo Pharmacy</div>
                <div style={{ fontSize: 11, opacity: 0.95 }}>A unit of Apollo Pharmacies Ltd.</div>
              </div>
            </div>

            {/* Invoice summary right */}
            <div style={{ marginLeft: 'auto', textAlign: 'right' }}>
              <div style={{ fontWeight: 700, fontSize: 18 }}>INVOICE</div>
              <div style={{ fontSize: 12, marginTop: 6 }}>
                <div>Bill No: <strong>{data.billNo}</strong></div>
                <div>Date: <strong>{data.date}</strong></div>
                <div>DL: <strong>{data.dlNo}</strong></div>
              </div>
            </div>
          </div>

          {/* Sub header with branch & contact */}
          <div style={{ display: 'flex', padding: '12px 18px', borderBottom: '1px solid #e6e6e6' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 700 }}>{data.pharmacyName}</div>
              <div style={{ fontSize: 12, color: '#374151', marginTop: 4 }}>{data.address}</div>
              <div style={{ marginTop: 8, fontSize: 12 }}>
                <strong>GSTIN:</strong> {data.gstin}
              </div>
            </div>
            <div style={{ width: 300, textAlign: 'right', fontSize: 12, color: '#374151' }}>
              <div><strong>Tel:</strong> 1860 500 0101</div>
              <div style={{ marginTop: 8 }}><strong>Pharmacist / Contact:</strong> Pharmacy Desk</div>
            </div>
          </div>

          {/* Invoice table header */}
          <div style={{ padding: '8px 18px', borderBottom: '1px solid #e6e6e6' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 100px 100px 120px', gap: 8, alignItems: 'center' }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46' }}>QTY</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46' }}>ITEM NAME</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46' }}>HSN / MFR</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textAlign: 'right' }}>MRP</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textAlign: 'right' }}>GST%</div>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#065f46', textAlign: 'right' }}>TOTAL AMOUNT</div>
            </div>
          </div>

          {/* Items */}
          <div style={{ padding: '10px 18px' }}>
            {data.medicines.map((item, idx) => (
              <div key={item.id} style={{ display: 'grid', gridTemplateColumns: '80px 1fr 120px 100px 100px 120px', gap: 8, alignItems: 'center', padding: '10px 0', borderBottom: '1px dashed #eaeaea' }}>
                <div style={{ fontWeight: 700 }}>{item.qty}</div>
                <div style={{ fontWeight: 700 }}>{item.name}</div>
                <div style={{ fontSize: 11, color: '#555' }}>{item.batch}</div>
                <div style={{ textAlign: 'right' }}>{fmt(item.rate)}</div>
                <div style={{ textAlign: 'right' }}>12%</div>
                <div style={{ textAlign: 'right', fontWeight: 700 }}>{fmt(item.qty * item.rate)}</div>
              </div>
            ))}
          </div>

          {/* Totals row */}
          <div style={{ display: 'flex', padding: '14px 18px', gap: 12 }}>
            <div style={{ flex: 1, fontSize: 12, color: '#374151' }}>
              <div><strong>Patient:</strong> {data.patientName}</div>
              <div style={{ marginTop: 6 }}><strong>Doctor:</strong> Dr. {data.doctorName}</div>

              {/* small invoice notes (left) */}
              <div style={{ marginTop: 12, fontSize: 11, color: '#6b7280' }}>
                For Apollo Pharmacy - Pharmacy copy
              </div>
            </div>

            <div style={{ width: 340, background: '#f8faf8', border: '1px solid #e6eae6', padding: 12 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13 }}>
                <div>Sub Total</div>
                <div style={{ fontWeight: 700 }}>{fmt(totalAmount)}</div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, marginTop: 8 }}>
                <div>GST (12%)</div>
                <div>{fmt(gst)}</div>
              </div>
              <div style={{ borderTop: '2px solid #d1d5db', marginTop: 10, paddingTop: 10, display: 'flex', justifyContent: 'space-between', fontSize: 16, fontWeight: 800 }}>
                <div>Net Amount</div>
                <div>₹ {fmt(grandTotal)}</div>
              </div>
            </div>
          </div>

          {/* Signature & Footer */}
          <div style={{ display: 'flex', padding: '16px 18px', alignItems: 'flex-end' }}>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 11, color: '#6b7280' }}>
                Terms & Conditions: Goods once sold will not be taken back. Subject to local jurisdiction.
              </div>
            </div>

            <div style={{ width: 260, textAlign: 'center' }}>
              <div style={{ height: 50 }} />
              <div style={{ borderTop: '1px solid #9ca3af', paddingTop: 6, fontWeight: 700 }}>Authorised Signatory</div>
            </div>
          </div>

          {/* bottom small strip */}
          <div style={{ height: 8, background: '#f1f5f9' }} />
        </div>
      </div>
    );
  }

  // BASIC (simple chemist slip) layout - your existing compact design
  return (
    <div className="w-full flex justify-center bg-gray-100/50 p-8">
      <div 
        ref={ref}
        className="bg-white shadow-xl text-gray-900 relative flex flex-col font-mono"
        style={{ 
          width: '400px', 
          minHeight: 'auto',
          fontSize: '11px'
        }}
      >
        {/* HEADER */}
        <div className="p-5 border-b-2 border-dashed border-gray-300 text-center">
           <div className="flex justify-center mb-2">
              <div className="border-2 border-green-600 rounded-full p-1">
                 <Plus className="w-6 h-6 text-green-600" strokeWidth={4} />
              </div>
           </div>
           <h1 className="text-xl font-bold text-green-700 uppercase tracking-wide">{data.pharmacyName}</h1>
           <p className="text-xs text-gray-600 mt-1 px-4">{data.address}</p>
           <div className="mt-3 flex justify-center gap-4 text-[10px] font-bold text-gray-500">
              <span>DL: {data.dlNo}</span>
              <span>GSTIN: {data.gstin}</span>
           </div>
        </div>

        {/* PATIENT DETAILS */}
        <div className="p-5 border-b-2 border-dashed border-gray-300">
           <div className="grid grid-cols-2 gap-y-2 text-xs">
              <div>
                 <span className="text-gray-500 block text-[9px] uppercase">Patient Name</span>
                 <span className="font-bold">{data.patientName}</span>
              </div>
              <div className="text-right">
                 <span className="text-gray-500 block text-[9px] uppercase">Bill No</span>
                 <span className="font-bold">{data.billNo}</span>
              </div>
              <div>
                 <span className="text-gray-500 block text-[9px] uppercase">Doctor Name</span>
                 <span className="font-bold">Dr. {data.doctorName}</span>
              </div>
              <div className="text-right">
                 <span className="text-gray-500 block text-[9px] uppercase">Date</span>
                 <span className="font-bold">{data.date}</span>
              </div>
           </div>
        </div>

        {/* MEDICINE TABLE */}
        <div className="p-5 pb-2 min-h-[200px]">
           <table className="w-full text-left">
              <thead>
                 <tr className="text-[9px] text-gray-500 border-b border-gray-200 uppercase">
                    <th className="pb-2 w-5/12">Description</th>
                    <th className="pb-2 w-2/12">Batch/Exp</th>
                    <th className="pb-2 w-1/12 text-center">Qty</th>
                    <th className="pb-2 w-2/12 text-right">MRP</th>
                    <th className="pb-2 w-2/12 text-right">Total</th>
                 </tr>
              </thead>
              <tbody className="text-xs">
                 {data.medicines.map((item) => (
                    <tr key={item.id} className="border-b border-dashed border-gray-100">
                       <td className="py-2 font-bold">
                          {item.name}
                       </td>
                       <td className="py-2 text-[9px] text-gray-500">
                          {item.batch}<br/>{item.exp}
                       </td>
                       <td className="py-2 text-center">{item.qty}</td>
                       <td className="py-2 text-right">{item.rate.toFixed(2)}</td>
                       <td className="py-2 text-right font-bold">{(item.qty * item.rate).toFixed(2)}</td>
                    </tr>
                 ))}
              </tbody>
           </table>
        </div>

        {/* TOTALS */}
        <div className="px-5 pt-2">
           <div className="flex justify-end border-t-2 border-black pt-3">
              <div className="w-1/2 space-y-1 text-right">
                 <div className="flex justify-between text-gray-500 text-[10px]">
                    <span>Sub Total</span>
                    <span>{fmt(totalAmount)}</span>
                 </div>
                 <div className="flex justify-between text-gray-500 text-[10px]">
                    <span>GST (12%)</span>
                    <span>{fmt(gst)}</span>
                 </div>
                 <div className="flex justify-between font-bold text-lg mt-2">
                    <span>Net Amount</span>
                    <span>₹ {fmt(grandTotal)}</span>
                 </div>
              </div>
           </div>
        </div>

        {/* FOOTER */}
        <div className="p-5 text-center mt-auto">
           <p className="text-[10px] italic text-gray-500 mb-4">"Get Well Soon"</p>
           <div className="flex justify-between items-end">
              <div className="text-left text-[9px] text-gray-400">
                 <p>Terms & Conditions:</p>
                 <p>1. Goods once sold will not be taken back.</p>
                 <p>2. Subject to City Jurisdiction.</p>
              </div>
              <div className="text-center">
                 <p className="font-script text-lg text-blue-800">Pharmacist</p>
                 <p className="text-[9px] font-bold border-t border-gray-400 pt-1">Registered Pharmacist</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
});

MedicalPreview.displayName = 'MedicalPreview';
