import { Sidebar } from '@/components/layout/Sidebar';

export default function ToolsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar (Desktop) / Bottom (Mobile) */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>

        {/* Main Tool Area */}
        <main className="flex-1 min-w-0">
          {children}
        </main>

        {/* Mobile Sidebar (Shows at bottom for mobile users) */}
        <div className="lg:hidden mt-12">
           <h3 className="font-bold text-lg mb-4">More Tools</h3>
           <Sidebar />
        </div>
      </div>
    </div>
  );
}