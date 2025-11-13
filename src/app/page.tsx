'use client'; // Required for the Filter Toggle to work

import { useState } from 'react';
import Link from "next/link";
import { TOOLS_CATEGORIES } from "@/config/tools";
import { 
  ShieldCheck, Zap, Download, FileCheck, 
  CheckCircle2, ArrowRight, Sparkles 
} from "lucide-react";
import clsx from 'clsx';

// --- COMPONENTS (Unchanged Style) ---

const ToolCard = ({ icon: Icon, title, description, href, badge }: {
  icon: any;
  title: string;
  description: string;
  href: string;
  badge?: string;
}) => (
  <Link 
    href={href} 
    className="group relative flex flex-col h-full rounded-xl bg-white p-5 shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:ring-blue-500/20"
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

const FeatureCard = ({ icon: Icon, title, description }: { icon: any, title: string, description: string }) => (
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
      <section className="bg-[#1B1F3B] text-white pt-12 pb-20 relative overflow-hidden">
        {/* Abstract Background Pattern (Same as before) */}
        <div className="absolute inset-0 opacity-10 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-blue-500 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-purple-500 rounded-full blur-3xl opacity-20"></div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-3">
            Every tool you need to <span className="text-blue-400">manage expenses</span>
          </h1>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto font-light leading-relaxed">
            Generate compliant fuel, taxi, restaurant, and office receipts instantly. Free & Secure.
          </p>
        </div>
      </section>

      {/* --- TOOL GRID SECTION --- */}
      <section id="tools" className="bg-white relative z-20 -mt-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* --- FLOATING FILTER BAR (Functional) --- */}
          <div className="flex justify-center mb-10">
             <div className="inline-flex bg-white p-1 rounded-full shadow-lg border border-gray-100 overflow-x-auto max-w-full">
                {tabs.map((tab) => (
                   <button 
                     key={tab.id}
                     onClick={() => setActiveFilter(tab.id)}
                     className={clsx(
                       "px-4 py-2 rounded-full text-sm font-bold transition-all whitespace-nowrap",
                       activeFilter === tab.id 
                         ? 'bg-gray-900 text-white shadow-sm' 
                         : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
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
              <div key={category.title} className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {/* Minimal Category Header */}
                {activeFilter === "All" && (
                  <div className="flex items-center gap-4 mb-6">
                     <h2 className="text-lg font-bold text-gray-900 uppercase tracking-wider">{category.title}</h2>
                     <div className="h-px bg-gray-100 flex-grow"></div>
                  </div>
                )}
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
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

      {/* --- VALUE PROPOSITION (Compact) --- */}
      <section className="py-16 bg-gray-50 border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Why professionals use BillGenerator</h2>
            <p className="text-gray-600 text-sm">We mimic real-world systems to ensure your receipts pass the eye test.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard
              icon={Zap}
              title="Smart Auto-Fill"
              description="We automatically find correct fuel rates and calculate taxes. No manual math required."
            />
            <FeatureCard
              icon={FileCheck}
              title="Authentic Templates"
              description="Thermal printer fonts, jagged edges, and POS layouts make your bills look 100% original."
            />
            <FeatureCard
              icon={ShieldCheck}
              title="Client-Side Privacy"
              description="Your data never leaves your browser. We don't store any transaction details."
            />
          </div>
        </div>
      </section>

    
    </main>
  );
}