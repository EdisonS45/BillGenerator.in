'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS_CATEGORIES } from '@/config/tools';
import { ChevronRight, Sparkles, ArrowRight } from 'lucide-react';
import clsx from 'clsx';

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
    </aside>
  );
}