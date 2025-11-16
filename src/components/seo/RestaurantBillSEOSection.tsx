"use client";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function RestaurantBillSEOSection() {
  const faqs = [
    {
      q: "Is this restaurant bill generator free to use?",
      a: "Yes. The tool is 100% free and requires no login — you can generate unlimited restaurant bills instantly.",
    },
    {
      q: "Can I download the food bill as PDF?",
      a: "Yes. You can download your restaurant food bill in high-resolution PDF or image format.",
    },
    {
      q: "Does the bill include GST & service charge?",
      a: "Yes. You can enable GST and add customizable service charge percentages.",
    },
    {
      q: "Does this restaurant bill generator store my data?",
      a: "No. Everything runs on your device (Client-Side). Nothing is uploaded or saved.",
    },
    {
      q: "Is this bill accepted for reimbursement purposes?",
      a: "Yes. It includes standard components like GST, restaurant name, address, and tax breakdown for reimbursement submissions.",
    },
  ];

  return (
    <section className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-16">

        {/* SECTION 1 — INTRO */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
          <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-rose-200/20 via-yellow-200/10 to-orange-200/20 opacity-100 pointer-events-none"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight text-gray-900">
              Online Restaurant Bill Generator — Free Food Bill PDF Creator
            </h2>
            <ul className="list-disc text-gray-600 space-y-3 pl-5 text-lg leading-relaxed">
              <li>
                Generate restaurant bills, hotel food bills & takeaway receipts that look identical to real restaurant invoices.
              </li>
              <li>
                Fully customizable — add restaurant name, address, GST, item list, quantity, prices and service charge.
              </li>
              <li>
                Ideal for food reimbursement, meal allowance, official expense claim submissions and accounting reports.
              </li>
              <li>
                Supports dine-in, takeaway and food delivery bill formats used by restaurants across India.
              </li>
              <li>
                Download the restaurant bill instantly in premium-quality PDF or JPG format — works without signup.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 — FEATURES & HOW TO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">
              Restaurant Bill Generator Features
            </h3>
            <ul className="space-y-3">
              {[
                "Add unlimited food items with name, quantity & price",
                "Auto-calculate subtotal, GST and service charge",
                "Modern thermal print layout for official bill format",
                "Supports dine-in, takeaway, food delivery & parcel format",
                "Restaurant name & address fully customizable",
                "GST and service charge toggle-on/off support",
                "FSSAI number, bill number and date formatting",
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
              How to Generate a Restaurant Food Bill Online
            </h3>
            <ol className="space-y-4">
              {[
                { title: "Enter Restaurant Details", desc: "Add restaurant name, address and date." },
                { title: "Add Food Items", desc: "Include item name, price and quantity." },
                { title: "Enable Taxes", desc: "Toggle GST and service charge if needed." },
                { title: "Download Bill", desc: "Export your food bill as PDF/JPG instantly." },
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
            <h3 className="text-xl font-bold text-gray-900">Who Uses This Food Bill Generator?</h3>
            <ul className="space-y-3">
              {[
                "Employees claiming corporate meal reimbursements",
                "Students submitting hostel/food reimbursement receipts",
                "Canteens and small restaurants needing printable food bills",
                "Freelancers and business travellers claiming food allowance",
                "Swiggy/Zomato order replacements needing proof of purchase",
                "Delivery riders needing official food receipts",
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
          <h3 className="text-lg font-bold text-gray-900">Popular Tools Searchers Also Look For</h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a href="#" className="text-blue-600 hover:underline">Online Restaurant Bill Generator</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Free Online Food Bill Generator</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Hotel Food Invoice Creator</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Restaurant Receipt Generator</a></li>
            <li><a href="#" className="text-blue-600 hover:underline">Food Bill PDF Generator Online</a></li>
          </ul>
        </div>

        {/* SECTION 5 — CLOSING */}
        <div className="text-center text-gray-500 max-w-4xl mx-auto pt-12 border-t border-gray-200">
          <p className="text-sm leading-relaxed">
            The Online Restaurant Bill Generator lets you recreate misplaced food bills instantly. 
            Designed for real reimbursement submissions, accounting verification and business expense claims — 
            with professional GST format and real-restaurant layout. Download as PDF in seconds.
          </p>
        </div>
      </div>
    </section>
  );
}
