import { FileText, CheckCircle2 } from 'lucide-react';

export function Logo({ className = "w-8 h-8", textSize = "text-xl" }: { className?: string, textSize?: string }) {
  return (
    <div className="flex items-center gap-2.5">
      <div className="relative flex items-center justify-center">
        {/* Main Icon */}
        <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-2 rounded-xl shadow-lg shadow-blue-200">
          <FileText className={`${className} text-white`} strokeWidth={2.5} />
        </div>
        {/* Status Indicator (The "Trust" Dot) */}
        <div className="absolute -bottom-1 -right-1 bg-white rounded-full p-0.5">
          <CheckCircle2 className="w-4 h-4 text-green-500 fill-green-50" />
        </div>
      </div>
      
      {/* Text Logo */}
      <div className={`font-extrabold text-slate-900 tracking-tight ${textSize}`}>
        BillGenerator<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">.in</span>
      </div>
    </div>
  );
}