"use client";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function TaxiBillSEOSection() {
  const faqs = [
    {
      q: "Is this taxi bill generator free to use?",
      a: "Yes. It is 100% free — generate unlimited cab receipts without login or watermark.",
    },
    {
      q: "Can I choose Uber / Ola on the receipt?",
      a: "Yes. You can create bills for Uber, Ola or a generic taxi service with full customization.",
    },
    {
      q: "Are these taxi receipts accepted for reimbursement?",
      a: "Yes. The generated PDF includes fare summary, pickup & drop, distance, timing and driver details — valid for reimbursement submission.",
    },
    {
      q: "Can I download the taxi receipt as PDF?",
      a: "Yes. You can download the invoice in high-quality PDF or JPG format.",
    },
    {
      q: "Do you store my travel or personal data?",
      a: "No. This tool runs fully on your device — nothing is stored or uploaded anywhere.",
    },
  ];

  return (
    <section className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-16">

        {/* SECTION 1 — INTRO */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-200/20 via-blue-200/10 to-green-200/20 opacity-100 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              Online Taxi Receipt Generator — Free Cab Bill PDF Creator
            </h2>
            <ul className="list-disc space-y-3 pl-5 text-gray-600 text-lg leading-relaxed">
              <li>
                Create taxi receipts that look identical to Uber, Ola and corporate cab invoices.
              </li>
              <li>
                Suitable for travel reimbursement, official mileage claims, and company expense reports.
              </li>
              <li>
                Add driver name, car model, fare breakdown, pickup & drop location, distance and time.
              </li>
              <li>
                Works with taxis, airport cabs, rental cabs, outstation rides, corporate fleets and more.
              </li>
              <li>
                Download the bill instantly in **A4 PDF or JPG** — perfect for HR/Finance submissions.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 — FEATURES & HOW TO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FEATURES */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">Taxi Bill Generator Features</h3>
            <ul className="space-y-3">
              {[
                "Supports Uber, Ola & Generic taxi receipt formats",
                "Auto-calculates taxes & fare breakdown",
                "Add pickup & drop locations with route timeline",
                "Driver & vehicle information supported",
                "Offline — no data stored or uploaded",
                "Unlimited downloads in PDF / JPG",
                "Ideal for reimbursement, travel allowance & proof of travel",
                "Editable date, time, car number, distance and total amount",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HOW TO */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              How to Generate a Taxi Bill Online
            </h3>
            <ol className="space-y-4">
              {[
                { title: "Select Brand", desc: "Choose Uber, Ola or Generic Taxi." },
                { title: "Enter Ride Details", desc: "Fill pickup, drop, date, time, distance and driver info." },
                { title: "Verify Fare", desc: "Tool auto-calculates base fare, booking fee and taxes." },
                { title: "Download Invoice", desc: "Export receipt instantly as PDF or JPG." },
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
          {/* USE CASES */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">Who Uses This Taxi Receipt Generator?</h3>
            <ul className="space-y-3">
              {[
                "Corporate employees claiming travel allowance",
                "Sales & field executives submitting daily ride expenses",
                "Airport taxi reimbursement for business travel",
                "Freelancers billing clients for transport charges",
                "Students and interns claiming internship travel allowance",
                "Lost original Uber / Ola bill and need a replacement",
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-blue-500 flex-shrink-0" />
                  <span className="text-sm text-gray-600">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-yellow-50 rounded-2xl p-8 shadow-sm space-y-6">
            <h3 className="text-xl font-bold text-yellow-900 mb-2">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="group bg-white/80 rounded-lg p-4 cursor-pointer">
                  <summary className="font-semibold text-gray-900 flex justify-between items-center list-none">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-90 text-yellow-600">›</span>
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
            <li><a className="text-blue-600 hover:underline" href="#">Taxi Receipt Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Uber Bill Generator Online</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Ola Invoice Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Cab Receipt PDF Creator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Travel Reimbursement Bill Template</a></li>
          </ul>
        </div>

        {/* SECTION 5 — CLOSING */}
        <div className="text-center text-gray-500 max-w-4xl mx-auto pt-12 border-t border-gray-200">
          <p className="text-sm leading-relaxed">
            Generate taxi bills instantly when the original receipt is lost or unavailable.
            Perfect for HR reimbursement approval, business travel documentation and travel allowance claims.
            Download a premium, professional looking taxi invoice in seconds — free forever.
          </p>
        </div>
      </div>
    </section>
  );
}
