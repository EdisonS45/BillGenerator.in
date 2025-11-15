"use client";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function FuelBillSEOSection() {
  const faqs = [
    {
      q: "Is this fuel bill generator free to use?",
      a: "Yes. The tool is 100% free — no account or subscription required.",
    },
    {
      q: "Can I add my own petrol station name?",
      a: "Yes. You can fully customize station name, address, invoice number and date.",
    },
    {
      q: "Do you store my vehicle or personal data?",
      a: "No. This tool runs entirely on your device (Client-Side). Nothing is uploaded or saved.",
    },
    {
      q: "Are these receipts accepted for company reimbursement?",
      a: "Yes. They include all standard fields required during reimbursement submissions.",
    },
    {
      q: "What file formats are supported for download?",
      a: "PDF and Image formats (ideal for mobile claim portals).",
    },
  ];

  return (
    <section className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 lg:py-10 space-y-16">


        {/* SECTION 1 — INTRO (Updated with bullet list) */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 md:p-12 shadow-xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-200/20 via-purple-200/10 to-blue-200/20 opacity-100 pointer-events-none"></div>

          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              Online Fuel Bill Generator (Free)
            </h2>

            {/* <-- UPDATED CONTENT --> */}
            <ul className="list-disc text-gray-600 space-y-3 pl-5 text-lg leading-relaxed">
              <li>
                Create petrol & diesel receipts online that look identical to real petrol pump bills.
              </li>
              <li>
                Perfect for reimbursement submission, travel allowance, and accounting documentation.
              </li>
              <li>
                Supports popular fuel brands — Indian Oil, Bharat Petroleum, Hindustan Petroleum (HP) and Shell.
              </li>
              <li>
                Just enter amount, fuel rate, vehicle number & station details — bill is generated instantly.
              </li>
              <li>
                Download the receipt in high-quality PDF or JPG format within seconds.
              </li>
            </ul>
          </div>
        </div>


        {/* SECTION 2 — FEATURES & HOW-TO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">
              Fuel Bill Generator Features
            </h3>
            <ul className="space-y-3">
              {[
                "Generates Petrol, Diesel, CNG and Power Petrol receipts",
                "Auto-calculates litre volume based on amount and fuel rate",
                "Realistic thermal receipt layout for reimbursement acceptance",
                "Change fuel brand logo: IOCL / BPCL / HPCL / Shell",
                "Supports custom petrol station name & address",
                "Works 100% offline in your browser — no data stored anywhere",
                "Supports wrinkles/texture to mimic used receipt appearance",
                "Barcode + invoice formatting for audit-friendly bill output",
                "Download as PDF or high-resolution image",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">
              How to Generate a Fuel Bill in 30 Seconds
            </h3>
            <ol className="space-y-4">
              {[
                { title: "Select the Brand", desc: "Choose IOCL, BPCL, HP, or Shell." },
                { title: "Enter Details", desc: "Fill in the amount, vehicle no., and station name." },
                { title: "Auto-Calculate", desc: "Volume (Liters) is calculated instantly." },
                { title: "Download", desc: "Get your fuel bill instantly in PDF/JPG." },
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-gray-900 text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{step.title}</h4>
                    <p className="text-sm text-gray-600">{step.desc}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>


        {/* SECTION 3 & 4 — BRANDS & COMPARISON */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-4 bg-white rounded-2xl p-8 shadow-sm space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Supported Brands</h3>
            <div className="flex flex-wrap gap-5">
              {[
                { name: "Indian Oil (IOCL)", color: "bg-orange-50 text-orange-700 ring-orange-100" },
                { name: "Bharat Petroleum (BPCL)", color: "bg-blue-50 text-blue-700 ring-blue-100" },
                { name: "Hindustan Petroleum (HP)", color: "bg-red-50 text-red-700 ring-red-100" },
                { name: "Shell India", color: "bg-yellow-50 text-yellow-700 ring-yellow-100" },
              ].map((brand) => (
                <span
                  key={brand.name}
                  className={`px-3 py-1.5 text-sm font-medium rounded-full ring-1 ring-inset ${brand.color}`}
                >
                  {brand.name}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 bg-white rounded-2xl p-8 shadow-sm overflow-x-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">
              Petrol vs. Diesel Bill Format
            </h3>
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className="p-3 text-left font-semibold text-gray-700 rounded-tl-lg">
                    Field
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700">
                    Petrol Receipt
                  </th>
                  <th className="p-3 text-left font-semibold text-gray-700 rounded-tr-lg">
                    Diesel Receipt
                  </th>
                </tr>
              </thead>
              <tbody className="text-gray-700">
                <tr className="border-b border-gray-100">
                  <td className="p-3">Fuel Type</td>
                  <td className="p-3">Petrol</td>
                  <td className="p-3">Diesel</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Rate per Litre</td>
                  <td className="p-3">₹106.31</td>
                  <td className="p-3">₹94.27</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="p-3">Usage</td>
                  <td className="p-3">Cars & Bikes</td>
                  <td className="p-3">Commercial & Heavy Vehicles</td>
                </tr>
                <tr>
                  <td className="p-3">Reimbursement</td>
                  <td className="p-3 text-green-600 font-medium">Accepted</td>
                  <td className="p-3 text-green-600 font-medium">Accepted</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>


        {/* SECTION 5 & 6 — USE CASES & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12 border-t border-gray-200">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">Who Uses This Tool?</h3>
            <ul className="space-y-3">
              {[
                "IT & Corporate employees for business travel reimbursements",
                "Sales executives & field staff for daily allowances",
                "Taxi / Auto / Cab drivers for claim submission",
                "Logistics & fleet companies for fuel expense reporting",
                "Students & interns claiming training/travel allowance",
                "Freelancers who travel for client meetings",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ — Now with accordions */}
          <div className="bg-blue-50 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Frequently Asked Questions
            </h3>

            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group bg-white/80 rounded-lg p-4 cursor-pointer transition-all duration-300"
                >
                  <summary className="font-semibold text-gray-900 flex justify-between items-center list-none">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-90 text-blue-600">
                      ›
                    </span>
                  </summary>
                  <p className="text-sm text-gray-700 leading-relaxed mt-3">
                    {faq.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>


        {/* SECTION 7 — CLOSING */}
        <div className="text-center text-gray-500 max-w-4xl mx-auto pt-12 border-t border-gray-200">
          <p className="text-sm leading-relaxed">
            The Online Fuel Bill Generator helps recreate misplaced petrol and diesel receipts instantly and submit
            stress-free expense reimbursements. With realistic formatting, thermal printing visuals and automated
            calculations, your receipt is ready to download within seconds.
          </p>
        </div>
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
  <h3 className="text-lg font-bold text-gray-900">
    Popular Tools Searchers Also Look For
  </h3>
  <ul className="text-sm text-gray-600 space-y-2">
    <li><a href="#" className="text-blue-600 hover:underline">Online Fuel Bill Generator</a></li>
    <li><a href="#" className="text-blue-600 hover:underline">Petrol Bill Generator Online</a></li>
    <li><a href="#" className="text-blue-600 hover:underline">Diesel Bill Generator</a></li>
    <li><a href="#" className="text-blue-600 hover:underline">Petrol Pump Bill Generator</a></li>
    <li><a href="#" className="text-blue-600 hover:underline">Fuel Receipt Generator Free</a></li>
  </ul>
</div>

      </div>
    </section>
  );
}
