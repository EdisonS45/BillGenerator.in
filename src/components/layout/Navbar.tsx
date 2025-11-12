import Link from 'next/link';
import { FileText } from 'lucide-react';

export function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2">
              <div className="bg-blue-600 p-2 rounded-lg">
                <FileText className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900">BillGenerator<span className="text-blue-600">.in</span></span>
            </Link>
          </div>
          <div className="flex items-center space-x-4">
            {/* Add Auth buttons or Search here later */}
            <Link href="/" className="text-sm font-medium text-gray-500 hover:text-blue-600">All Tools</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}