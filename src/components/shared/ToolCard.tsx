import Link from 'next/link';
import { LucideIcon } from 'lucide-react';

interface ToolCardProps {
  title: string;
  description: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
}

export function ToolCard({ title, description, href, icon: Icon, badge }: ToolCardProps) {
  return (
    <Link 
      href={href} 
      className="group relative block p-6 bg-white border border-gray-200 rounded-xl hover:border-blue-600 hover:shadow-lg transition-all duration-200"
    >
      {badge && (
        <span className="absolute top-3 right-3 px-2 py-1 text-xs font-bold text-blue-700 bg-blue-50 rounded-full">
          {badge}
        </span>
      )}
      <div className="flex items-center justify-center w-12 h-12 mb-4 rounded-lg bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors">
        <Icon size={24} />
      </div>
      <h3 className="text-lg font-bold text-gray-900 group-hover:text-blue-600">
        {title}
      </h3>
      <p className="mt-2 text-sm text-gray-500 line-clamp-2">
        {description}
      </p>
    </Link>
  );
}