"use client";
import React from "react";
import { CheckCircle2, ChevronRight } from "lucide-react";

export default function LTABillSEOSection() {
  const faqs = [
    {
      q: "Is this LTA bill generator free?",
      a: "Yes. This tool is 100% free — generate unlimited LTA/LTC flight or train bills without login, signup or watermark.",
    },
    {
      q: "Can I download the ticket invoice as a PDF?",
      a: "Yes. You can generate and download a high-quality A4 PDF invoice instantly for reimbursement submission.",
    },
    {
      q: "Can I enter multiple passengers like spouse, children or parents?",
      a: "Yes. You can add all passengers individually with name, relation and age — as required in LTA claim documentation.",
    },
    {
      q: "Does this include LTA block year and GST bill format?",
      a: "Yes. The invoice includes booking date, travel date, LTA block year, fare breakdown, and GST invoice formatting.",
    },
    {
      q: "Are these bills accepted for HR, corporate reimbursement or government LTA/LTC?",
      a: "Yes. The generated invoice includes all required fields — itinerary, passenger list, agency details, fare summary and taxes.",
    },
  ];

  return (
    <section className="border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 lg:px-8 py-10 space-y-16">

        {/* SECTION 1 — INTRO */}
        <div className="relative overflow-hidden rounded-3xl bg-white p-10 shadow-xl">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-200/20 via-purple-200/10 to-cyan-200/20 rounded-3xl"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4 text-gray-900">
              Online LTA Bill Generator — Flight & Train Ticket Invoice for Reimbursement
            </h2>
            <ul className="list-disc text-gray-600 space-y-3 pl-5 text-lg leading-relaxed">
              <li>
                Create LTA / LTC eligible flight and train ticket invoices that match official travel invoice formatting.
              </li>
              <li>
                Designed for corporate employees, government employees and HR reimbursement submissions.
              </li>
              <li>
                Supports both <strong>Flight</strong> and <strong>Train</strong> travel modes — single or multiple passengers.
              </li>
              <li>
                Add agency name, itinerary, LTA block year, passenger list and download instantly in A4 PDF.
              </li>
              <li>
                Ideal for lost tickets, missing invoices, reimbursement resubmission and travel allowance documentation.
              </li>
            </ul>
          </div>
        </div>

        {/* SECTION 2 — FEATURES + HOW-TO */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* FEATURES */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">LTA / LTC Bill Generator Features</h3>
            <ul className="space-y-3">
              {[
                "Supports both Flight & Train LTA formats",
                "Add unlimited passengers: spouse, children, parents, dependents",
                "Includes LTA block year, booking ID, itinerary and GST bill format",
                "Auto-calculated total fare for all passengers",
                "A4 invoice PDF — reimbursement ready",
                "No login, no watermark — unlimited free usage",
                "Matches HR / corporate / central government LTA documentation format",
                "Perfect for delayed submission or lost ticket replacements",
              ].map((f, i) => (
                <li key={i} className="flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-green-500 mt-0.5" />
                  <span className="text-sm text-gray-600">{f}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* HOW-TO */}
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-gray-900 mb-5">
              How to Generate an LTA Bill in 2 Minutes
            </h3>
            <ol className="space-y-4">
              {[
                { t: "Choose Travel Mode", d: "Select Flight or Train for LTA invoice generation." },
                { t: "Enter Travel Details", d: "Fill origin, destination, travel date and agency/airline name." },
                { t: "Add Passenger List", d: "Include all passengers eligible under LTA with relation and age." },
                { t: "Download PDF Invoice", d: "Receive a professional reimbursement-ready LTA bill instantly." },
              ].map((step, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="w-8 h-8 bg-gray-900 text-white flex items-center justify-center rounded-full text-sm font-bold">
                    {i + 1}
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900">{step.t}</h4>
                    <p className="text-sm text-gray-600">{step.d}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>

        {/* SECTION 3 — USE CASES + FAQ */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 pt-12 border-t border-gray-200">
          {/* USE CASES */}
          <div className="bg-white rounded-2xl p-8 shadow-sm space-y-5">
            <h3 className="text-xl font-bold text-gray-900">Who Uses This LTA Bill Generator?</h3>
            <ul className="space-y-3">
              {[
                "Corporate employees claiming travel reimbursement",
                "IT and MNC employees availing LTA block year benefit",
                "Government employees submitting LTC claim",
                "Travelers who lost original flight or train ticket invoice",
                "HR teams requesting missing or updated invoice formats",
                "Families traveling together under LTA eligibility",
              ].map((u, i) => (
                <li key={i} className="flex items-center gap-3">
                  <ChevronRight className="w-4 h-4 text-blue-500" />
                  <span className="text-sm text-gray-600">{u}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* FAQ */}
          <div className="bg-blue-50 rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-blue-900 mb-2">
              Frequently Asked Questions
            </h3>
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details key={idx} className="bg-white/80 rounded-lg p-4 group cursor-pointer">
                  <summary className="font-semibold text-gray-900 flex justify-between items-center">
                    {faq.q}
                    <span className="transition-transform group-open:rotate-90 text-blue-600">›</span>
                  </summary>
                  <p className="text-sm text-gray-700 leading-relaxed mt-3">{faq.a}</p>
                </details>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4 — RELATED SEARCHES */}
        <div className="bg-white rounded-2xl p-8 shadow-sm space-y-4">
          <h3 className="text-lg font-bold text-gray-900">
            Popular Tools Searchers Also Look For
          </h3>
          <ul className="text-sm text-gray-600 space-y-2">
            <li><a className="text-blue-600 hover:underline" href="#">Flight Ticket Invoice Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Train Ticket PDF Receipt Generator</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">LTA Bill Generator Online</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Corporate Travel Reimbursement Bill</a></li>
            <li><a className="text-blue-600 hover:underline" href="#">Travel Allowance Claim PDF</a></li>
          </ul>
        </div>

        {/* SECTION 5 — CLOSING */}
        <div className="pt-12 border-t border-gray-200 text-center text-sm text-gray-500 max-w-4xl mx-auto">
          The LTA / LTC Bill Generator recreates flight and train ticket invoices instantly —
          designed specifically for HR reimbursement approval, corporate travel allowances and
          government LTC claims. Download a professional A4 invoice with itinerary, passenger list
          and fare summary within seconds.
        </div>
      </div>
    </section>
  );
}
