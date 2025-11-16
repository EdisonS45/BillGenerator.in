"use client";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function InternetBillSEOSection() {
  const faqs = [
    {
      q: "Is this internet bill generator free?",
      a: "Yes. It is 100% free — you can generate unlimited broadband bills without login.",
    },
    {
      q: "Can I download the broadband bill in PDF?",
      a: "Yes. High-resolution PDF and image downloads are supported for reimbursement and documentation.",
    },
    {
      q: "Can I customize the ISP provider name and logo?",
      a: "Yes. You can choose from JioFiber, Airtel Xstream, ACT, BSNL or enter a generic ISP name.",
    },
    {
      q: "Does the bill include GST breakdown?",
      a: "Yes. Telecom GST with CGST + SGST (9% + 9%) is automatically calculated.",
    },
    {
      q: "Is this bill accepted for office reimbursement claims?",
      a: "Yes. The generated broadband bill includes customer ID, billing cycle, tax invoice, plan name and address — compliant for reimbursement submission.",
    },
  ];

  return (
    <section className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-16">

        {/* SECTION 1 — INTRO */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-blue-200/20 via-indigo-200/10 to-cyan-200/20 opacity-100 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              Online Internet Bill Generator — Free Broadband Bill PDF Creator
            </h2>
            <ul className="list-disc text-gray-600 space-y-3 pl-5 text-lg leading-relaxed">
              <li>
                Create broadband bills and Wi-Fi tax invoices online that look identical to real ISP billing formats.
              </li>
              <li>
                Supports major providers — JioFiber, Airtel Xstream, ACT, BSNL, Hathway or custom ISP entry.
              </li>
              <li>
                Ideal for reimbursement submission, home-office VPN allowance, remote-work billing, and address proof.
              </li>
              <li>
                Add billing period, plan name, bill number, customer ID, GST and download instantly.
              </li>
              <li>
                Export in premium-quality **PDF / JPG** format — zero signup, zero watermark.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 — FEATURES & HOW TO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">
              Internet Bill Generator Features
            </h3>
            <ul className="space-y-3">
              {[
                "Supports JioFiber, Airtel, ACT, BSNL & custom ISP branding",
                "Auto-calculates GST (CGST + SGST 9% each)",
                "A4 professional invoice layout — ready for reimbursement",
                "Add billing cycle, customer ID, account number & plan name",
                "Optional QR payment / Paid stamp / Online payment indicator",
                "Download as PDF or high-resolution image",
                "No login, no watermark — generate unlimited bills",
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
              How to Generate a Broadband Bill Online
            </h3>
            <ol className="space-y-4">
              {[
                { title: "Choose ISP", desc: "Select JioFiber, Airtel, ACT, BSNL or Generic Provider." },
                { title: "Enter Customer Details", desc: "Add customer name, address, account ID and bill number." },
                { title: "Select Billing Period", desc: "Enter start & end date along with plan name and amount." },
                { title: "Download Bill", desc: "Export your internet bill as PDF / JPG instantly." },
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

        {/* SECTION 3 — USE CASES & FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12 border-t border-gray-200">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">
              Who Uses This Internet/Broadband Bill Generator?
            </h3>
            <ul className="space-y-3">
              {[
                "Employees claiming WFH or internet reimbursement",
                "Remote workers submitting broadband allowance",
                "Freelancers who need invoice proof for clients",
                "Students submitting hostel Wi-Fi allowance",
                "Temporary ISP users who lost original bills",
                "Rental agreement address proof submissions",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-blue-50 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white/80 rounded-lg p-4 cursor-pointer">
                  <summary className="font-semibold text-gray-900 flex justify-between items-center list-none">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-90 text-blue-600">›</span>
                  </summary>
                  <p className="text-sm text-gray-700 leading-relaxed mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 — RELATED TOOLS */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            Popular Tools Searchers Also Look For
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a className="text-blue-600 hover:underline" href="#">Online Internet Bill Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Broadband Bill Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Wi-Fi Bill Creator PDF</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">ISP Invoice Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Tax Invoice for Internet Reimbursement</a></li>
          </ul>
        </div>

        {/* SECTION 5 — CLOSING */}
        <div className="text-center text-gray-500 max-w-4xl mx-auto pt-12 border-t border-gray-200">
          <p className="text-sm leading-relaxed">
            The Online Internet Bill Generator recreates lost broadband invoices instantly —
            built for reimbursement approval, home-office allowances and verification purposes.
            Download a professional tax invoice with GST breakdown in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
