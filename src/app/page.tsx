"use client"; // Required for the Filter Toggle to work

import { useState } from "react";
import Link from "next/link";
import { TOOLS_CATEGORIES } from "@/config/tools";
import {
  ShieldCheck,
  Zap,
  Download,
  FileCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
} from "lucide-react";
import clsx from "clsx";
import { HeroHeading } from "@/components/shared/HeroHeading"; // Import the new component
// --- COMPONENTS (Unchanged Style) ---

const ToolCard = ({
  icon: Icon,
  title,
  description,
  href,
  badge,
}: {
  icon: any;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) => (
  <Link
    href={href}
    className="group relative flex flex-col h-full rounded-xl bg-white p-5 shadow-md ring-1 ring-gray-100 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-500/20"
  >
    {badge && (
      <span className="absolute top-3 right-3 inline-flex items-center rounded-full bg-red-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-wide text-red-600 ring-1 ring-inset ring-red-600/10">
        {badge}
      </span>
    )}
    <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50 text-blue-600 transition-colors group-hover:bg-blue-600 group-hover:text-white">
      <Icon className="h-5 w-5" strokeWidth={2.5} />
    </div>
    <h3 className="mb-1 text-base font-bold text-gray-900 group-hover:text-blue-600 transition-colors">
      {title}
    </h3>
    <p className="flex-grow text-xs text-gray-500 leading-relaxed">
      {description}
    </p>
  </Link>
);

const FeatureCard = ({
  icon: Icon,
  title,
  description,
}: {
  icon: any;
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-center text-center p-6 rounded-2xl bg-gray-50">
    <div className="mb-4 p-3 bg-white rounded-full shadow-sm text-blue-600 ring-1 ring-gray-100">
      <Icon className="h-6 w-6" />
    </div>
    <h3 className="font-bold text-gray-900 mb-2">{title}</h3>
    <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
  </div>
);

// --- MAIN PAGE ---

export default function Home() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Filter Logic
  const filteredCategories = TOOLS_CATEGORIES.filter((category) => {
    if (activeFilter === "All") return true;
    if (activeFilter === "Travel") return category.title.includes("Transport");
    if (activeFilter === "Tax") return category.title.includes("Tax");
    if (activeFilter === "Office") return category.title.includes("Utilities");
    if (activeFilter === "Food") return category.title.includes("Food");
    return true;
  });

  const tabs = [
    { id: "All", label: "All Tools" },
    { id: "Travel", label: "Travel" },
    { id: "Tax", label: "Tax & Business" },
    { id: "Office", label: "Office" },
    { id: "Food", label: "Food" },
  ];

  return (
    <main className="min-h-screen bg-white font-sans">
      {/* --- HERO: COMPACT & DENSE (iLovePDF Style) --- */}
      <section
        className="
    text-white pt-7 pb-7 relative overflow-hidden
    bg-[linear-gradient(180deg,#020B29,#03103D,#03103D)]
    sm:bg-[linear-gradient(135deg,#020B29,#03103D 40%,#05154F 70%,#0A1F6C 100%)]
  "
        style={{
          background:
            "linear-gradient(135deg, #020B29 0%, #03103D 40%, #05154F 70%, #0A1F6C 100%)",
        }}
      >
        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center ">
          {/* 1. STATIC HEADING + ANIMATED PART */}
          <div className="mb-6">
            <HeroHeading />
          </div>

          {/* 2. SUB-TEXT + INLINE TRUST BADGE (Mobile Friendly) */}
          <p className="text-lg text-blue-200/80 max-w-2xl mx-auto font-light leading-relaxed">
            Generate compliant fuel, taxi, restaurant, and office receipts
            instantly.
            {/* The "Inline" Badge for Mobile/Flow - Doesn't take extra vertical space */}
          </p>
          <div className="inline-flex items-center gap-2 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-1.5 text-xs font-bold text-green-300 mt-3 shadow-[0_0_15px_rgba(34,197,94,0.2)] backdrop-blur-md cursor-default transition-transform hover:scale-105">
            <ShieldCheck className="w-4 h-4 fill-current" />
            <span className="tracking-wide">
              100% FREE • NO SIGNUP • SECURE
            </span>
          </div>
        </div>
      </section>

      {/* --- TOOL GRID SECTION --- */}
      <section
        id="tools"
        className="relative bg-[#F9FAFD] overflow-hidden pt-2"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]
    bg-[linear-gradient(115deg,rgba(232,238,255,0.75)_0%,rgba(245,248,255,0.55)_35%,rgba(255,255,255,0)_75%)]"
        ></div>

        {/* Layer 2 — Big circle right */}
        <div
          className="pointer-events-none absolute top-[-120px] right-[-180px] w-[520px] h-[520px]
      bg-[radial-gradient(circle,rgba(185,205,255,0.45),rgba(185,205,255,0))] rounded-full blur-[60px]"
        ></div>

        {/* Layer 3 — Rounded blob left */}
        <div
          className="pointer-events-none absolute bottom-[-200px] left-[-160px] w-[660px] h-[460px]
      bg-[radial-gradient(circle,rgba(205,220,255,0.38),rgba(205,220,255,0))] rounded-[65px] blur-[55px]"
        ></div>

        {/* Layer 4 — Polygon highlight */}
        <div
          className="pointer-events-none absolute top-[320px] right-[18%] w-[620px] h-[420px]
      bg-[radial-gradient(circle,rgba(225,235,255,0.45),rgba(225,235,255,0))]
      clip-path-[polygon(0_0,100%_20%,82%_100%,12%_85%)] blur-[48px]"
        ></div>

        {/* Slight grain overlay — premium feel */}
        <div className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* --- FLOATING FILTER BAR (Functional) --- */}
          <div className="max-w-4xl mx-auto px-4 mt-6 mb-8 relative z-[10]">
            <div className="flex flex-wrap gap-3 justify-center ">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveFilter(tab.id)}
                  className={clsx(
                    "px-4 py-2 rounded-full text-sm font-bold transition-all border shadow-sm", // Changed font-medium to font-bold for sharper text
                    activeFilter === tab.id
                      ? "bg-black text-white border-black" // Active: Pure Black BG, Pure White Text
                      : "bg-white text-black border-gray-200 hover:border-gray-400 hover:bg-gray-50" // Inactive: White BG, Pure Black Text
                  )}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* --- DENSE GRID --- */}
          <div className="space-y-12 pb-20">
            {filteredCategories.map((category) => (
              <div
                key={category.title}
                className="animate-in fade-in slide-in-from-bottom-4 duration-500"
              >
                {/* Minimal Category Header */}
                {activeFilter === "All" && (
                  <div className="flex items-center gap-4 mb-6">
                    <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">
                      {category.title}
                    </h2>
                    <div className="h-px bg-gray-100 flex-grow"></div>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                  {category.tools.map((tool) => (
                    <ToolCard key={tool.href} {...tool} />
                  ))}
                </div>
              </div>
            ))}

            {filteredCategories.length === 0 && (
              <div className="text-center py-20 text-gray-400">
                No tools found for this category.
              </div>
            )}
          </div>
        </div>
      </section>


      <section className="py-24 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-16 md:text-center max-w-3xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4 tracking-tight">
              Why use BillGenerator?
            </h2>
            <p className="text-lg text-slate-500 leading-relaxed">
              Create valid, accurate bills in seconds. No design skills needed.
            </p>
          </div>

          {/* BENTO GRID */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
            {/* Card 1: AUTHENTICITY (Wide Card) - FOCUS: HR APPROVAL */}
            <div className="md:col-span-2 relative overflow-hidden rounded-3xl bg-slate-50 border border-slate-100 p-8 md:p-10 group">
              <div className="relative z-10 max-w-md">
                <div className="inline-flex items-center gap-2 rounded-full bg-white border border-slate-200 px-3 py-1 text-xs font-bold text-blue-600 mb-4 shadow-sm">
                  <FileCheck className="w-3 h-3" /> 100% Original Look
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3">
                  Passes the "Eye Test"
                </h3>
                <p className="text-slate-500 leading-relaxed">
                  We don't generate generic PDFs. Our tools replicate{" "}
                  <strong>
                    thermal paper fonts, dot-matrix printing, and authentic POS
                    layouts
                  </strong>{" "}
                  used by real Indian shops. Your bills look exactly like the
                  originals.
                </p>
              </div>

              {/* Visual: Fake Receipt Sliding Up */}
              <div
                className="absolute right-8 -bottom-12 w-48 h-64 bg-white backdrop-blur-[2px] sm:backdrop-blur-0
 shadow-2xl border border-gray-200 rounded-t-xl transform rotate-6 translate-y-8 translate-x-8 group-hover:translate-x-4 group-hover:translate-y-4 group-hover:rotate-3 transition-all duration-700 ease-out"
              >
                {/* Thermal Top */}
                <div className="h-1.5 w-full bg-gray-800 rounded-t-xl opacity-80"></div>
                <div className="p-5 space-y-3 opacity-60">
                  <div className="flex justify-center mb-2">
                    <div className="w-8 h-8 rounded-full border-2 border-gray-300"></div>
                  </div>
                  <div className="h-2 bg-gray-200 rounded w-3/4 mx-auto"></div>
                  <div className="h-2 bg-gray-100 rounded w-1/2 mx-auto"></div>

                  <div className="border-t-2 border-dashed border-gray-300 my-3"></div>

                  <div className="flex justify-between">
                    <div className="h-2 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-2 bg-gray-300 rounded w-1/4"></div>
                  </div>
                  <div className="flex justify-between">
                    <div className="h-2 bg-gray-100 rounded w-1/2"></div>
                    <div className="h-2 bg-gray-200 rounded w-1/4"></div>
                  </div>

                  {/* Total Box */}
                  <div className="mt-4 p-2 bg-slate-50 border border-slate-100 rounded flex justify-between items-center">
                    <div className="h-2 w-8 bg-gray-300 rounded"></div>
                    <div className="h-3 w-12 bg-gray-800 rounded"></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Card 2: PRIVACY (Tall/Square) - FOCUS: SAFETY */}
            <div
              className="md:col-span-1 relative overflow-hidden rounded-3xl p-8 text-white flex flex-col justify-between group"
              style={{
                background:
                  "linear-gradient(135deg, #020B29 0%, #03103D 40%, #05154F 70%, #0A1F6C 100%)",
              }}
            >
              <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-blue-500 rounded-full blur-3xl opacity-20"></div>

              <div>
                <div className="mb-4 inline-flex p-3 bg-white/10 rounded-2xl text-green-400 backdrop-blur-sm">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-2">Safe & Private</h3>
                <p className="text-blue-200 text-sm leading-relaxed">
                  Everything happens in your browser. We{" "}
                  <strong>never see or store</strong> your data. It's completely
                  anonymous.
                </p>
              </div>

              <div className="mt-8 flex justify-center">
                <div className="relative">
                  <div className="absolute inset-0 bg-green-500 blur-xl opacity-20"></div>
                  <ShieldCheck
                    className="w-24 h-24 text-green-500 opacity-80 group-hover:scale-110 transition-transform duration-500"
                    strokeWidth={1}
                  />
                </div>
              </div>
            </div>

            {/* Card 3: INSTANT (Wide) - FOCUS: SPEED & FORMATS */}
            <div className="md:col-span-3 relative overflow-hidden rounded-3xl bg-blue-600 p-8 md:p-10 text-white shadow-xl shadow-blue-900/10 group">
              <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
              <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-blue-500 to-transparent opacity-50"></div>

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-blue-500 border border-blue-400 px-3 py-1 text-xs font-bold text-white mb-4">
                    <Download className="w-3 h-3 fill-current" /> Instant Export
                  </div>
                  <h3 className="text-2xl font-bold mb-3">
                    Download in Any Format
                  </h3>
                  <p className="text-blue-100 leading-relaxed max-w-xl">
                    Need a PDF for email? Or a JPEG image to send via WhatsApp?
                    We give you both options in high resolution.{" "}
                    <strong>Print-ready and pixel-perfect.</strong>
                  </p>
                </div>

                {/* Visual: Floating File Badges */}
                <div className="flex gap-4 transform group-hover:scale-105 transition-transform duration-500">
                  <div className="w-24 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center justify-center">
                    <div className="bg-red-500/20 p-3 rounded-lg mb-2 text-red-200 font-bold text-xs">
                      PDF
                    </div>
                    <div className="w-12 h-1 bg-white/20 rounded mb-1"></div>
                    <div className="w-8 h-1 bg-white/20 rounded"></div>
                  </div>
                  <div className="w-24 h-32 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl flex flex-col items-center justify-center translate-y-4">
                    <div className="bg-blue-500/20 p-3 rounded-lg mb-2 text-blue-200 font-bold text-xs">
                      JPG
                    </div>
                    <div className="w-12 h-1 bg-white/20 rounded mb-1"></div>
                    <div className="w-8 h-1 bg-white/20 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
