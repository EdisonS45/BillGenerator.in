export function StatsStrip() {
  return (
    <div className="border-y border-gray-200 bg-gray-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4 text-center">
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">100%</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Free to Use</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">5+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Premium Tools</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">15k+</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Bills Generated</div>
          </div>
          <div className="space-y-1">
            <div className="text-4xl font-extrabold text-blue-600 tracking-tight">0%</div>
            <div className="text-sm font-medium text-gray-500 uppercase tracking-wide">Data Stored</div>
          </div>
        </div>
      </div>
    </div>
  );
}