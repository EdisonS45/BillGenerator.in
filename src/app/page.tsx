import Link from 'next/link';
import { TOOLS_CATEGORIES } from '@/config/tools';
import { ToolCard } from '@/components/shared/ToolCard';
import { FeatureCard } from '@/components/shared/FeatureCard';
import { StatsStrip } from '@/components/shared/StatsStrip';
import { ShieldCheck, Zap, Download, FileCheck, ChevronRight, Star } from 'lucide-react';

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
                New: LTA Assistant Added
              </div>
              
              <h1 className="text-5xl font-extrabold tracking-tight text-slate-900 sm:text-6xl mb-6 leading-[1.1]">
                Generate Professional <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  Invoices in Seconds.
                </span>
              </h1>
              
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The #1 suite of free tools for Indian professionals. Create compliant Fuel, Food, Travel, and Internet receipts for reimbursement claims instantly.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                 <Link href="/fuel-bill-generator" className="inline-flex justify-center items-center bg-blue-600 text-white px-8 py-4 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200">
                   Start Generating <ChevronRight className="ml-2 w-5 h-5" />
                 </Link>
                 <Link href="#tools" className="inline-flex justify-center items-center bg-white text-slate-700 border border-slate-200 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                   View All Templates
                 </Link>
              </div>

              <div className="mt-8 flex items-center text-sm text-slate-500 font-medium">
                 <ShieldCheck className="w-5 h-5 text-green-500 mr-2" />
                 Client-side generation. No data stored on our servers.
              </div>
            </div>

            {/* Right: Visual Composition (CSS Cards) */}
            <div className="relative hidden lg:block">
               <div className="relative w-full max-w-md mx-auto">
                  {/* Floating Card 1 (Back) */}
                  <div className="absolute top-0 right-0 w-64 h-80 bg-white rounded-2xl shadow-xl border border-gray-100 transform rotate-6 translate-x-12 opacity-60 z-0"></div>
                  
                  {/* Floating Card 2 (Middle) */}
                  <div className="absolute top-4 right-8 w-64 h-80 bg-white rounded-2xl shadow-xl border border-gray-100 transform rotate-3 translate-x-6 opacity-80 z-10"></div>
                  
                  {/* Main Card (Front) */}
                  <div className="relative w-72 h-96 bg-white rounded-2xl shadow-2xl border border-gray-200 z-20 p-6 transform hover:-translate-y-2 transition-transform duration-500">
                     {/* Mock Receipt UI */}
                     <div className="flex justify-center mb-6">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                           <Zap className="w-6 h-6 text-blue-600" />
                        </div>
                     </div>
                     <div className="space-y-3">
                        <div className="h-4 bg-gray-100 rounded w-3/4 mx-auto"></div>
                        <div className="h-3 bg-gray-50 rounded w-1/2 mx-auto"></div>
                     </div>
                     <div className="mt-8 space-y-4">
                        <div className="flex justify-between">
                           <div className="h-3 bg-gray-100 rounded w-1/3"></div>
                           <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        </div>
                        <div className="flex justify-between">
                           <div className="h-3 bg-gray-100 rounded w-1/2"></div>
                           <div className="h-3 bg-gray-100 rounded w-1/4"></div>
                        </div>
                        <div className="h-px bg-gray-100 my-4"></div>
                        <div className="flex justify-between items-center">
                           <div className="h-4 bg-gray-200 rounded w-1/3"></div>
                           <div className="h-8 bg-blue-50 rounded w-1/3 text-blue-600 font-bold flex items-center justify-center text-sm">₹ 2,500</div>
                        </div>
                     </div>
                     {/* Badge */}
                     <div className="absolute -right-4 top-10 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
                        Paid
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
             <h2 className="text-3xl font-bold text-slate-900 sm:text-4xl mb-4">Everything you need for reimbursement</h2>
             <p className="text-lg text-slate-600">Select a tool below to start generating compliant bills instantly.</p>
          </div>

          {TOOLS_CATEGORIES.map((category) => (
            <div key={category.title} className="mb-16 last:mb-0">
              <div className="flex items-center space-x-3 mb-8">
                <div className="h-8 w-1 bg-blue-600 rounded-full"></div>
                <h2 className="text-2xl font-bold text-slate-900">{category.title}</h2>
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
             <h2 className="text-3xl font-bold text-slate-900 mb-4">Why use our Bill Generators?</h2>
             <p className="text-slate-600">We don't just make PDFs. We build tools that mimic real-world systems to ensure your receipts pass the eye test.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             <FeatureCard 
               icon={Zap}
               title="Smart Auto-Fill"
               description="Don't know the petrol price in Mumbai last week? Our tools auto-fetch historical rates and calculate taxes for you."
             />
             <FeatureCard 
               icon={FileCheck}
               title="Authentic Templates"
               description="We replicate thermal printer fonts, jagged paper edges, and POS layouts so your bills look 100% original."
             />
             <FeatureCard 
               icon={Download}
               title="Instant Export"
               description="Download high-resolution PDFs or JPEGs optimized for WhatsApp sharing and HR portal uploads."
             />
          </div>
        </div>
      </section>

      {/* --- SEO FOOTER CONTENT --- */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-6 prose prose-blue">
           <h3>How to claim reimbursement using these bills?</h3>
           <p>
             Managing expenses for corporate reimbursement can be tricky. Whether you lost your petrol bill or need a proforma invoice for your LTA claim, our suite of free tools helps you generate compliant, realistic formats instantly.
           </p>
           <p>
             Simply select a category above, enter your transaction details (or let our smart defaults fill them in), and download your receipt. All calculations for GST, VAT, and service charges are handled automatically according to Indian accounting standards.
           </p>
        </div>
      </section>

    </main>
  );
}