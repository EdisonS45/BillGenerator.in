'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { TOOLS_CATEGORIES } from '@/config/tools';
import { ChevronRight } from 'lucide-react';
import clsx from 'clsx';

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-full lg:w-64 shrink-0 space-y-8">
      {/* Ad Space Placeholder - SmallSEOTools Strategy */}
      <div className="bg-gray-100 rounded-lg p-4 text-center text-sm text-gray-400 h-32 flex items-center justify-center border border-dashed border-gray-300">
        Ad Space (Sidebar)
      </div>

      {TOOLS_CATEGORIES.map((category) => (
        <div key={category.title}>
          <h3 className="font-bold text-gray-900 mb-3 px-2">{category.title}</h3>
          <ul className="space-y-1">
            {category.tools.map((tool) => {
              const isActive = pathname === tool.href;
              return (
                <li key={tool.href}>
                  <Link
                    href={tool.href}
                    className={clsx(
                      'flex items-center justify-between px-3 py-2 rounded-lg text-sm font-medium transition-colors',
                      isActive
                        ? 'bg-blue-50 text-blue-700'
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