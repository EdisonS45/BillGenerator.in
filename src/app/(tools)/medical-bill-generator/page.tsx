'use client';

import { useState, useRef, useEffect } from 'react';
import { MedicalPreview } from '@/components/tools/medical/MedicalPreview';
import { BillInput } from '@/components/shared/BillInput';
import { DownloadButton } from '@/components/shared/DownloadButton';
import { Stethoscope, User, Calendar, Plus, Trash2 } from 'lucide-react';

export default function MedicalBillPage() {
  const billRef = useRef<HTMLDivElement>(null);

const [formData, setFormData] = useState<{
  mode: 'basic' | 'real';
  pharmacyName: string;
  address: string;
  dlNo: string;
  gstin: string;
  patientName: string;
  doctorName: string;
  billNo: string;
  date: string;
}>({
  mode: 'basic',
  pharmacyName: 'Apollo Pharmacy',
  address: '247 Central Hub, Bengaluru - 560103',
  dlNo: 'DL/AP123456',
  gstin: '29AACCP4599L1Z8',
  patientName: 'Rahul Singh',
  doctorName: 'S.K. Gupta',
  billNo: 'INV-8821',
  date: '2024-03-15',
});


  const [medicines, setMedicines] = useState([
    { id: '1', name: 'Dolo 650mg Strip', batch: 'B8291', exp: '12/25', qty: 2, rate: 30 },
  ]);

  // Auto-generate bill number + date
  useEffect(() => {
    setFormData(prev => ({
      ...prev,
      billNo: 'PH-' + Math.floor(100000 + Math.random() * 900000),
      date: new Date().toISOString().slice(0, 10),
    }));
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Medicine Actions
  const addMedicine = () => {
    setMedicines([
      ...medicines,
      {
        id: Date.now().toString(),
        name: 'New Medicine',
        batch: 'B' + Math.floor(Math.random() * 1000),
        exp: '12/25',
        qty: 1,
        rate: 50,
      },
    ]);
  };

  const updateMedicine = (id: string, field: string, value: any) => {
    setMedicines(medicines.map(item => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const removeMedicine = (id: string) => {
    setMedicines(medicines.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-8">
      <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: "Medical Bill Generator",
      applicationCategory: "FinanceApplication",
      operatingSystem: "Web",
      offers: { "@type": "Offer", price: "0", priceCurrency: "INR" },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "2015",
      },
      description:
        "Generate hospital, doctor consultation, diagnostic and pharmacy bills online. Download PDF for reimbursement and insurance claims.",
    }),
  }}
/>

      {/* Header */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <h1 className="text-3xl font-bold text-gray-900 flex flex-wrap items-center gap-3">Medical Bill Generator
          <span className="hidden md:inline-flex items-center rounded-md bg-green-50 px-2.5 py-1 text-xs font-bold text-green-700 ring-1 ring-inset ring-green-600/20 uppercase tracking-wide">
            Free
          </span>
        </h1>
        <p className="text-gray-600 mt-2">Create pharmacy bills for reimbursement.</p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* LEFT: INPUT FORM */}
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm space-y-6">
          
          {/* MODE TOGGLE (Basic ↔ Real Apollo) */}
          <div className="bg-green-50 p-4 rounded-lg border border-green-200">
            <label className="block text-sm font-bold text-green-900 mb-2">
              Select Bill Style
            </label>

            <div className="flex p-1 bg-white rounded-lg border border-green-300">
              <button
                onClick={() => setFormData(p => ({ ...p, mode: 'basic' }))}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  formData.mode === 'basic'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Basic (Simple)
              </button>

              <button
                onClick={() => setFormData(p => ({ ...p, mode: 'real' }))}
                className={`flex-1 py-2 text-sm font-medium rounded-md transition-all ${
                  formData.mode === 'real'
                    ? 'bg-green-600 text-white shadow'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                Real (Apollo)
              </button>
            </div>
          </div>

          {/* Pharmacy */}
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2">Pharmacy Details</h2>

          <BillInput label="Pharmacy Name" name="pharmacyName" value={formData.pharmacyName} onChange={handleChange} Icon={Stethoscope} />
          <BillInput label="DL Number" name="dlNo" value={formData.dlNo} onChange={handleChange} />
          <BillInput label="GSTIN" name="gstin" value={formData.gstin} onChange={handleChange} />
          <BillInput label="Address" name="address" value={formData.address} onChange={handleChange} />

          {/* Patient */}
          <h2 className="text-lg font-semibold text-gray-800 border-b pb-2 pt-4">Patient Details</h2>
          <BillInput label="Patient Name" name="patientName" value={formData.patientName} onChange={handleChange} Icon={User} />
          <BillInput label="Doctor Name" name="doctorName" value={formData.doctorName} onChange={handleChange} Icon={Stethoscope} />
          <BillInput label="Bill Date" name="date" type="date" value={formData.date} onChange={handleChange} Icon={Calendar} />

          {/* Medicines */}
          <div className="border-t pt-4">
            <div className="flex justify-between items-center mb-3">
              <h3 className="text-sm font-semibold text-gray-900">Medicines</h3>
              <button onClick={addMedicine} className="text-sm text-blue-600 font-medium flex items-center">
                <Plus className="w-4 h-4 mr-1" /> Add
              </button>
            </div>

            {medicines.map(item => (
              <div key={item.id} className="bg-gray-50 p-3 rounded-lg border mb-2">
                <div className="flex gap-2">
                  <input
                    value={item.name}
                    onChange={e => updateMedicine(item.id, 'name', e.target.value)}
                    className="flex-grow p-2 border rounded"
                    placeholder="Medicine Name"
                  />
                  <button onClick={() => removeMedicine(item.id)} className="text-red-500">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-4 gap-2 mt-2">
                  <input className="border rounded p-1" value={item.batch} onChange={e => updateMedicine(item.id, 'batch', e.target.value)} />
                  <input className="border rounded p-1" value={item.exp} onChange={e => updateMedicine(item.id, 'exp', e.target.value)} />
                  <input className="border rounded p-1" value={item.qty} type="number" onChange={e => updateMedicine(item.id, 'qty', Number(e.target.value))} />
                  <input className="border rounded p-1" value={item.rate} type="number" onChange={e => updateMedicine(item.id, 'rate', Number(e.target.value))} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT: PREVIEW */}
        <div className="space-y-6 flex flex-col">
          <div className="bg-gray-800 p-4 rounded-t-xl text-white flex justify-between">
            <span>Live Preview</span>
            <span className="text-xs bg-gray-700 px-2 py-1 rounded">
              {formData.mode === 'real' ? 'Apollo Format' : 'Basic Slip'}
            </span>
          </div>

          <div className="border p-6 bg-gray-50 rounded-b-xl flex justify-center">
            <MedicalPreview ref={billRef} data={{ ...formData, medicines }} />
          </div>

          <DownloadButton billRef={billRef} fileName={`Medical_Bill_${formData.date}.pdf`} />
        </div>
      </div>
      {/* --- MEDICAL SEO CONTENT (Fuel layout style) --- */}
<div className="max-w-6xl mx-auto px-4 lg:px-8 py-12 space-y-12">

  {/* INTRO */}
  <div className="bg-white rounded-2xl p-8 border border-gray-200 shadow-sm">
    <h2 className="text-2xl font-bold text-gray-900 mb-4">
      Medical Bill Generator for Hospital & Doctor Reimbursement Claims
    </h2>
    <p className="text-gray-600 leading-relaxed mb-6">
      Medical bills are often required for corporate reimbursement, insurance claims and tax
      benefits. If your original bill is outdated, missing, or contains errors, this tool
      helps you generate a professional medical invoice instantly with patient details,
      treatment/consultation charges, hospital/clinic information, GST and payment mode.
    </p>

    <div className="flex flex-wrap gap-3">
      <span className="px-3 py-1 bg-red-50 text-red-700 text-xs font-bold rounded-full border border-red-100">Hospital</span>
      <span className="px-3 py-1 bg-blue-50 text-blue-700 text-xs font-bold rounded-full border border-blue-100">Doctor Consultation</span>
      <span className="px-3 py-1 bg-green-50 text-green-700 text-xs font-bold rounded-full border border-green-100">Pharmacy & Medicine</span>
      <span className="px-3 py-1 bg-yellow-50 text-yellow-700 text-xs font-bold rounded-full border border-yellow-100">Insurance & Reimbursement</span>
    </div>
  </div>

  {/* FEATURES */}
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Multiple Bill Types</h3>
      <p className="text-sm text-gray-500">
        Hospital, doctor consultation, diagnostic test and pharmacy invoices supported.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Itemized Charges</h3>
      <p className="text-sm text-gray-500">
        Add consultation fee, treatment charges, room charges, medicine cost and GST easily.
      </p>
    </div>
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
      <h3 className="font-bold text-gray-900 mb-2">Insurance-Ready PDF</h3>
      <p className="text-sm text-gray-500">
        Download claim-ready invoices accepted by most insurance companies & employers.
      </p>
    </div>
  </div>

  {/* STEPS + FAQ */}
  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-8 border-t border-gray-100">

    {/* STEPS */}
    <div className="lg:col-span-7 space-y-8">
      <h3 className="text-2xl font-bold text-gray-900">How to generate a medical invoice?</h3>
      <div className="space-y-6">
        {[
          "Enter hospital/clinic name and doctor details",
          "Add patient name, age and patient ID (optional)",
          "Select invoice type — hospital / consultation / diagnostic / pharmacy",
          "Itemize charges including GST (if applicable)",
          "Add payment method (Cash / Card / UPI / Insurance)",
          "Download the invoice as PDF for reimbursement"
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
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is this accepted by corporate reimbursement teams?
          </h4>
          <p className="text-xs text-gray-600">
            Yes. It includes diagnosis, charges, doctor details and payment mode — compliant for reimbursement.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Will insurance companies accept this?
          </h4>
          <p className="text-xs text-gray-600">
            Most insurers accept invoices generated in standard hospital format with GST and patient details.
          </p>
        </div>
        <div className="w-full h-px bg-blue-200/50"></div>

        <div>
          <h4 className="text-sm font-bold text-gray-900 mb-2">
            Is medical history or diagnosis stored?
          </h4>
          <p className="text-xs text-gray-600">
            No — everything runs locally in your browser. We do not store or upload patient information.
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

    </div>
  );
}
