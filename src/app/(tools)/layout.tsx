import { Sidebar } from '@/components/layout/Sidebar';

export default function ToolsLayout({
  tool, // <--- RENAMED from children
  seo,  // <--- ADDED this new slot
}: {
  tool: React.ReactNode;
  seo: React.ReactNode;
}) {
  return (
    // This is your main page container
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      
      {/* SECTION 1: THE TOOL (Sidebar + Page) */}
      <div className="flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar */}
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        
        {/* Main Page Content */}
        <main className="flex-1 min-w-0">
          {tool} {/* <-- This renders the @tool slot */}
        </main>

        {/* Mobile Sidebar */}
        <div className="lg:hidden mt-12">
            <h3 className="font-bold text-lg mb-4">More Tools</h3>
            <Sidebar />
        </div>
      </div>

      {/* SECTION 2: SEO CONTENT (Full-width) */}
      {/* This is now OUTSIDE the flex container and will be centered */}
      <div className="mt-24"> {/* Added margin here from your <section> */}
        {seo} {/* <-- This renders the @seo slot */}
      </div>

    </div>
  );
}