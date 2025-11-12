import Link from 'next/link';
import { FileText } from 'lucide-react';
import { Logo } from '@/components/shared/Logo';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">

              <Logo />
            </Link>
          </div>
<div className="flex items-center space-x-4">
            {/* The Upgraded "All Tools" Button */}
            <Link 
              href="/#tools" 
              className="group flex items-center space-x-2 bg-gray-50 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-700 px-4 py-2 rounded-full transition-all duration-200 text-sm font-medium"
            >
              <span>All Tools</span>
              <div className="bg-gray-200 group-hover:bg-blue-200 rounded-full p-1 transition-colors">
                {/* Grid Icon */}
                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                </svg>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}