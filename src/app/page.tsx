import Link from "next/link";
import { TOOLS_CATEGORIES } from "@/config/tools";
import { ToolCard } from "@/components/shared/ToolCard";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { StatsStrip } from "@/components/shared/StatsStrip";
import {
  ShieldCheck,
  Zap,
  Download,
  FileCheck,
  ChevronRight,
  Star,
  Car,
  Utensils,
  IndianRupee,
  CheckCircle2,
} from "lucide-react";

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-20 lg:pt-32 lg:pb-28">
        {/* Background Mesh Gradient (CSS Only - No Image needed) */}
        <div className="absolute top-0 left-1/2 w-full -translate-x-1/2 h-full z-0">
          <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
          <div className="absolute top-0 left-0 -ml-20 -mt-20 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
          <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-100 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left: Text Content */}
            <div className="max-w-2xl">
              <div className="inline-flex items-center rounded-full border border-blue-100 bg-blue-50 px-3 py-1 text-sm font-medium text-blue-800 mb-6">
                <span className="flex h-2 w-2 rounded-full bg-blue-600 mr-2"></span>
                New: LTA Bill Generator Added
              </div>

              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-[1.1]">
                Generate <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Bills & Receipts
                </span>{" "}
                <br />
                in Seconds.
              </h1>

              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The #1 free <strong>Bill Generator</strong> for Indian
                professionals. Create compliant{" "}
                <strong>Fuel, Restaurant, Taxi, and Internet</strong> receipts
                for reimbursement claims instantly.
              </p>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/fuel-bill-generator"
                  className="inline-flex justify-center items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200"
                >
                  Create a Bill Free <ChevronRight className="ml-2 w-5 h-5" />
                </Link>
                <Link
                  href="#tools"
                  className="group inline-flex justify-center items-center bg-white text-slate-600 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:border-blue-300 hover:text-blue-600 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
                >
                  <span className="mr-2">View Templates</span>
                  {/* Animated Grid Icon */}
                  <div className="flex gap-0.5 opacity-50 group-hover:opacity-100 transition-opacity">
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                    <div className="w-1 h-1 bg-current rounded-full"></div>
                  </div>
                </Link>
              </div>

              <div className="mt-8 flex items-center text-sm text-slate-500 font-medium">
                <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                Client-side generation. No data stored on our servers.
              </div>
            </div>

            {/* Right: The "Reimbursement Stack" Visual (Ola Hero Variant) */}
            <div className="relative hidden lg:block h-[550px]">
              {/* Background Glows */}
              <div className="absolute top-20 right-10 w-72 h-72 bg-green-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob"></div>
              <div className="absolute bottom-20 left-10 w-72 h-72 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-60 animate-blob animation-delay-2000"></div>

              <div className="relative w-full h-full flex items-center justify-center perspective-1000">
                {/* --- FLOATING BADGES --- */}

                {/* Badge 1: Status */}
                <div className="absolute top-24 right-0 z-40 bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 animate-bounce-slow border border-green-100">
                  <div className="bg-green-100 p-2 rounded-full">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Status
                    </p>
                    <p className="text-sm font-bold text-green-700">
                      Approved by HR
                    </p>
                  </div>
                </div>

                {/* Badge 2: Total */}
                <div className="absolute bottom-32 -left-4 z-40 bg-white p-3 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center gap-3 animate-bounce-slow animation-delay-1500 border border-blue-100">
                  <div className="bg-blue-100 p-2 rounded-full">
                    <IndianRupee className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-medium uppercase">
                      Total Saved
                    </p>
                    <p className="text-sm font-bold text-gray-900">
                      ₹ 15,240.00
                    </p>
                  </div>
                </div>

                {/* --- THE RECEIPT STACK --- */}

                {/* Card 1: FUEL BILL (Moved to Back Left) */}
                <div className="absolute w-64 h-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-10 transform -rotate-12 -translate-x-20 translate-y-4 opacity-90 hover:z-50 hover:scale-105 transition-all duration-300">
                  <div className="h-1.5 bg-gray-800 w-full rounded-t-2xl"></div>
                  <div className="p-4 text-center">
                    <div className="inline-flex items-center justify-center w-8 h-8 bg-gray-100 rounded-full mb-2">
                      <Zap className="w-4 h-4 text-gray-600" />
                    </div>
                    <h3 className="font-mono font-bold text-sm text-gray-900">
                      FUEL STATION
                    </h3>
                    <div className="my-3 space-y-2">
                      <div className="flex justify-between text-xs font-mono text-gray-500">
                        <span>PUMP</span>
                        <span>02</span>
                      </div>
                      <div className="flex justify-between text-xs font-mono text-gray-500">
                        <span>RATE</span>
                        <span>106.31</span>
                      </div>
                    </div>
                    <div className="border-t border-dashed border-gray-300 pt-2">
                      <span className="text-xl font-bold font-mono">
                        ₹ 2,500
                      </span>
                    </div>
                    {/* Barcode */}
                    <div
                      className="h-8 w-full mt-3 opacity-30"
                      style={{
                        backgroundImage:
                          "repeating-linear-gradient(90deg, #000 0px, #000 2px, transparent 2px, transparent 4px)",
                      }}
                    ></div>
                  </div>
                </div>

                {/* Card 2: RESTAURANT BILL (Back Right - Unchanged) */}
                <div className="absolute w-64 h-80 bg-white rounded-2xl shadow-xl border border-gray-200 z-20 transform rotate-6 translate-x-20 translate-y-8 opacity-90 hover:z-50 hover:scale-105 transition-all duration-300">
                  <div className="p-4 text-center border-b border-dashed border-gray-200">
                    <div className="mx-auto w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center mb-2">
                      <Utensils className="w-4 h-4 text-orange-600" />
                    </div>
                    <div className="h-2 w-24 bg-gray-200 rounded mx-auto mb-1"></div>
                  </div>
                  <div className="p-4 space-y-2">
                    <div className="flex justify-between text-xs text-gray-400">
                      <div className="w-12 h-2 bg-gray-100 rounded"></div>
                      <div className="w-8 h-2 bg-gray-100 rounded"></div>
                    </div>
                    <div className="flex justify-between text-xs text-gray-400">
                      <div className="w-16 h-2 bg-gray-100 rounded"></div>
                      <div className="w-8 h-2 bg-gray-100 rounded"></div>
                    </div>
                  </div>
                  <div className="p-4 border-t border-dashed border-gray-200">
                    <div className="flex justify-between items-center font-bold text-sm text-orange-600">
                      <span>Grand Total</span>
                      <span>₹ 1,240.00</span>
                    </div>
                  </div>
                </div>

                {/* Card 3: OLA CAB APP (Front Center - The NEW Hero) */}
                <div className="relative w-72 h-[420px] bg-white rounded-3xl shadow-2xl border-[6px] border-gray-900 z-30 overflow-hidden transform hover:-translate-y-2 transition-transform duration-500">
                  {/* Phone Status Bar */}
                  <div className="bg-gray-900 h-6 w-full flex justify-between items-center px-4">
                    <div className="w-8 h-1 bg-gray-700 rounded"></div>
                    <div className="flex gap-1">
                      <div className="w-3 h-3 bg-gray-700 rounded-full"></div>
                    </div>
                  </div>

                  {/* Map Header */}
                  <div className="h-40 bg-gray-100 relative overflow-hidden">
                    {/* Fake Map Design */}
                    <div
                      className="absolute inset-0"
                      style={{
                        backgroundImage:
                          "linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6), linear-gradient(45deg, #f3f4f6 25%, transparent 25%, transparent 75%, #f3f4f6 75%, #f3f4f6)",
                        backgroundSize: "20px 20px",
                        backgroundPosition: "0 0, 10px 10px",
                      }}
                    ></div>
                    {/* Route Line */}
                    <svg className="absolute inset-0 w-full h-full drop-shadow-md">
                      <path
                        d="M 40 100 Q 100 80 140 60 T 240 40"
                        fill="none"
                        stroke="black"
                        strokeWidth="3"
                        strokeDasharray="6 3"
                      />
                      <circle cx="40" cy="100" r="4" fill="#22c55e" />{" "}
                      {/* Pickup Green */}
                      <rect
                        x="235"
                        y="35"
                        width="10"
                        height="10"
                        fill="#ef4444"
                      />{" "}
                      {/* Drop Red */}
                    </svg>
                    {/* Floating Price Pill */}
                    <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur px-3 py-1 rounded-full text-xs font-bold shadow-sm border border-gray-200">
                      CRN 84920192
                    </div>
                  </div>

                  {/* Content Body */}
                  <div className="p-5">
                    {/* Date & Car */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">
                          Wed, 12 Nov, 02:30 PM
                        </p>
                        <h3 className="font-bold text-lg text-gray-900">
                          Mini
                        </h3>
                      </div>
                      <div className="w-10 h-10 bg-lime-100 rounded-full flex items-center justify-center">
                        <Car className="w-5 h-5 text-lime-700" />
                      </div>
                    </div>

                    {/* Driver Info */}
                    <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
                      <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-xs font-bold text-gray-600">
                        VS
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-gray-900">
                          Vikram Singh
                        </p>
                        <p className="text-[10px] text-gray-500">
                          White Swift Dzire
                        </p>
                      </div>
                      <div className="flex items-center text-xs font-bold text-gray-900 bg-gray-50 px-2 py-1 rounded">
                        <Star className="w-3 h-3 text-yellow-400 mr-1 fill-current" />{" "}
                        4.9
                      </div>
                    </div>

                    {/* Total */}
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-[10px] text-gray-500 font-medium">
                          Total Bill
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          ₹ 450.00
                        </p>
                      </div>
                      <div className="bg-black text-white text-xs font-bold px-4 py-2 rounded-lg">
                        Download
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- STATS SECTION --- */}
      <StatsStrip />

      {/* --- TOOLS GRID SECTION --- */}
      <section id="tools" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">
              Everything you need for reimbursement
            </h2>
            <p className="text-lg text-slate-600">
              Select a tool below to start generating compliant bills instantly.
            </p>
          </div>

          {TOOLS_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-16 last:mb-0">
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">
                  {category.title}
                </h2>
              </div>

              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {category.tools.map((tool) => (
                  <ToolCard key={tool.href} {...tool} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- FEATURES / WHY US --- */}
      <section className="py-20 bg-slate-50 border-y border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">
              Why use our Bill Generators?
            </h2>
            <p className="text-slate-600">
              We don't just make PDFs. We build tools that mimic real-world
              systems to ensure your receipts pass the eye test.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={Zap}
              title="Auto-Fill Prices"
              description="We automatically find the correct fuel rates and calculate taxes for you. No math required."
            />
            <FeatureCard
              icon={FileCheck}
              title="Real Receipt Looks"
              description="Our templates use the exact same fonts and layouts as real shops, so they look 100% original."
            />
            <FeatureCard
              icon={Download}
              title="Download & Share"
              description="Get a high-quality PDF or Image instantly. Ready to share on WhatsApp or upload to HR portals."
            />
          </div>
        </div>
      </section>

      {/* --- SEO FOOTER CONTENT --- */}
      {/* --- HOW IT WORKS / SEO CONTENT --- */}
{/* --- HOW IT WORKS --- */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">How it works</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Generate a valid receipt in 3 simple steps.
            </p>
          </div>

          {/* The 3-Step Visual Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            
            {/* Connecting Line (Desktop Only) */}
            <div className="hidden md:block absolute top-8 left-1/6 right-1/6 h-0.5 bg-gradient-to-r from-blue-100 via-blue-500 to-blue-100 z-0"></div>

            {/* Step 1 */}
            <div className="relative z-10 text-center bg-white p-6 rounded-xl">
               <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200">
                 1
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Pick a Template</h3>
               <p className="text-slate-600 leading-relaxed">
                 Choose the type of bill you need—Fuel, Food, Taxi, Internet, or LTA.
               </p>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 text-center bg-white p-6 rounded-xl">
               <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200">
                 2
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Enter Details</h3>
               <p className="text-slate-600 leading-relaxed">
                 Type in the amount and date. Our tool automatically handles the tax and math for you.
               </p>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 text-center bg-white p-6 rounded-xl">
               <div className="w-16 h-16 mx-auto bg-blue-600 text-white rounded-2xl flex items-center justify-center text-2xl font-bold mb-6 shadow-lg shadow-blue-200">
                 3
               </div>
               <h3 className="text-xl font-bold text-slate-900 mb-3">Download PDF</h3>
               <p className="text-slate-600 leading-relaxed">
                 Get your bill instantly. Print it or upload it directly to your company portal.
               </p>
            </div>

          </div>

          {/* SEO Keywords Block (Simplified) */}
          <div className="mt-16 bg-slate-50 rounded-2xl p-8 border border-slate-100 text-center">
             <p className="text-sm text-slate-500 leading-relaxed">
               <span className="font-bold text-slate-700">Popular Tools:</span> Petrol Bill Generator • Restaurant Bill Maker • Cab Receipt Generator • LTA Proof • Internet Bill • Rent Receipt
             </p>
          </div>

        </div>
      </section>
    </main>
  );
}
