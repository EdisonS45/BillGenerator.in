import Link from 'next/link';
import { Logo } from '@/components/shared/Logo';
import { LayoutGrid } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center hover:opacity-90 transition-opacity">
              <Logo />
            </Link>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center space-x-3">
            {/* Responsive "All Tools" Button */}
            <Link 
              href="/#tools" 
              className="group flex items-center gap-2 bg-gray-100 hover:bg-blue-50 border border-gray-200 hover:border-blue-200 text-gray-700 hover:text-blue-700 px-3 py-2 md:px-4 md:py-2 rounded-full transition-all duration-200"
              aria-label="View All Tools"
            >
              {/* Text: Hidden on Mobile, Visible on Medium screens+ */}
              <span className="hidden md:inline text-sm font-semibold">All Tools</span>
              
              {/* Icon: Always Visible */}
              <div className="bg-white group-hover:bg-blue-100 rounded-full p-1 shadow-sm transition-colors">
                <LayoutGrid className="w-4 h-4" />
              </div>
            </Link>
          </div>
          
        </div>
      </div>
    </nav>
  );
}