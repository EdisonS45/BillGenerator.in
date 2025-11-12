import { TOOLS_CATEGORIES } from '@/config/tools';
import { ToolCard } from '@/components/shared/ToolCard';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      {/* Hero Section - SST Style */}
      <div className="bg-white border-b border-gray-200 pb-12 pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 sm:text-5xl">
            Free Invoice & <span className="text-blue-600">Bill Generators</span>
          </h1>
          <p className="mt-4 text-xl text-gray-500 max-w-2xl mx-auto">
            The #1 suite of tools for Indian professionals. Generate accurate receipts for Fuel, Food, Travel, and Internet reimbursement in seconds.
          </p>
        </div>
      </div>

      {/* The "SmallSEOTools" Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {TOOLS_CATEGORIES.map((category) => (
          <div key={category.title} className="mb-12">
            <div className="flex items-center space-x-2 mb-6">
              <div className="h-6 w-1 bg-blue-600 rounded-full"></div>
              <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {category.tools.map((tool) => (
                <ToolCard key={tool.href} {...tool} />
              ))}
            </div>
          </div>
        ))}
      </div>
      
      {/* SEO Content Block (Required for ranking) */}
      <div className="bg-white border-t border-gray-200 py-16">
        <div className="max-w-4xl mx-auto px-6">
           <h2 className="text-2xl font-bold mb-4">Why use our Bill Generators?</h2>
           <p className="text-gray-600 mb-4">
             Managing expenses for corporate reimbursement can be tricky. Whether you lost your petrol bill or need a proforma invoice for your LTA claim, our suite of free tools helps you generate compliant, realistic formats instantly.
           </p>
        </div>
      </div>
    </main>
  );
}