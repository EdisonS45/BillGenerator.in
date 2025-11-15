'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS_CATEGORIES } from '@/config/tools';
import clsx from 'clsx';
import { ChevronRight, Sparkles, ArrowRight, MessageSquarePlus, Lightbulb, Send, CheckCircle, Loader2 } from 'lucide-react'; // Added new iconsimport clsx from 'clsx';
import { useState } from 'react'; // Import useState
function FeedbackWidget() {
  const [suggestion, setSuggestion] = useState('');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    
    // --- PASTE YOUR FORM SPREE URL HERE ---
    const FORM_ENDPOINT = 'https://formspree.io/f/myzlekwo'; 
    // ----------------------------------------

    try {
      const response = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ suggestion: suggestion }),
      });

      if (response.ok) {
        setStatus('success');
        setSuggestion('');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
    }
  };
  
  // Success Message
  if (status === 'success') {
    return (
      <div className="relative overflow-hidden rounded-2xl border border-green-200 bg-gradient-to-br from-green-50 to-teal-50 p-5 mx-1 shadow-sm text-center">
         <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-3" />
         <h3 className="text-sm font-bold text-gray-900 mb-1">
            Thank you!
         </h3>
         <p className="text-xs text-gray-600 leading-relaxed">
            Your feedback has been sent.
         </p>
      </div>
    )
  }

  // Main Form
  return (
    <form 
      onSubmit={handleSubmit}
      className="relative overflow-hidden rounded-2xl border border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50 p-5 mx-1 shadow-sm"
    >
      <div className="absolute -right-2 -bottom-2 opacity-10">
         <Lightbulb className="w-24 h-24 text-amber-500" />
      </div>
      
      <div className="relative z-10">
         <h3 className="text-sm font-bold text-gray-900 flex items-center gap-2 mb-2">
            <MessageSquarePlus className="w-4 h-4 text-amber-600" />
            <span>Have an idea?</span>
         </h3>
         <p className="text-xs text-gray-600 leading-relaxed mb-4">
            We are building new tools every week. Tell us what you need next!
         </p>
         
         <textarea
           value={suggestion}
           onChange={(e) => setSuggestion(e.target.value)}
           placeholder="I wish you had a tool for..."
           required
           rows={3}
           className="block w-full text-xs p-2 rounded-lg border-amber-200 shadow-sm focus:ring-amber-500 focus:border-amber-500 transition-colors"
         />
         
         {/* Send Button */}
         <button 
           type="submit"
           disabled={status === 'loading'}
           className="mt-3 inline-flex items-center justify-center w-full px-4 py-2 bg-white border border-amber-200 rounded-lg text-xs font-bold text-amber-700 shadow-sm hover:bg-amber-50 transition-colors disabled:opacity-50"
         >
           {status === 'loading' ? (
             <Loader2 className="w-4 h-4 animate-spin" />
           ) : (
             <>
               Send Suggestion <Send className="w-3 h-3 ml-2" />
             </>
           )}
         </button>
         
         {status === 'error' && (
           <p className="text-[10px] text-red-600 mt-2 text-center">Oops! Something went wrong. Please try again.</p>
         )}
      </div>
    </form>
  )
}
export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      
      {/* --- REPLACEMENT FOR AD SPACE: FEATURED WIDGET --- */}
      {/* This drives traffic to your high-value tool until you get AdSense */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 p-5 text-white shadow-lg">
        <div className="absolute -right-4 -top-4 h-24 w-24 rounded-full bg-white/10 blur-2xl"></div>
        
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles className="w-4 h-4 text-yellow-300" />
            <span className="text-xs font-bold uppercase tracking-wider text-blue-100">New Arrival</span>
          </div>
          
          <h3 className="text-lg font-bold leading-tight mb-2">GST Invoice Maker</h3>
          <p className="text-xs text-blue-100 mb-4 leading-relaxed">
            Create professional B2B invoices with automatic tax calculations.
          </p>
          
          <Link 
            href="/gst-invoice-generator"
            className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs font-bold text-white backdrop-blur-sm transition-colors hover:bg-white hover:text-blue-600"
          >
            Try Now <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* --- NAVIGATION LINKS --- */}
      {TOOLS_CATEGORIES.map((category) => (
        <div key={category.title}>
          <h3 className="font-bold text-gray-900 mb-3 px-2 text-sm uppercase tracking-wider opacity-80">
            {category.title}
          </h3>
          <ul className="space-y-1">
            {category.tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200',
                      isActive
                        ? 'bg-blue-50 text-blue-700 shadow-sm ring-1 ring-blue-100'
                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    )}
                  >
                    <div className="flex items-center">
                      <tool.icon className={clsx("w-4 h-4 mr-3", isActive ? "text-blue-600" : "text-gray-400")} />
                      {tool.title}
                    </div>
                    {isActive && <ChevronRight className="w-3 h-3" />}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      ))}


      {/* --- WIDGET 2: FEEDBACK BOX (NEW) --- */}
      <FeedbackWidget />
    </aside>
  );
}