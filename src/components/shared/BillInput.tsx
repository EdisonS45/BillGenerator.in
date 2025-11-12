import React from 'react';
import { LucideIcon } from 'lucide-react';

interface BillInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  Icon?: LucideIcon;
  wrapperClassName?: string;
}

export function BillInput({
  label,
  Icon,
  id,
  wrapperClassName = '',
  ...props
}: BillInputProps) {
  return (
    <div className={`w-full ${wrapperClassName}`}>
      <label
        htmlFor={props.name}
        className="block text-sm font-medium text-gray-700 mb-1"
      >
        {label}
      </label>
      <div className="relative rounded-lg shadow-sm">
        {Icon && (
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Icon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
        )}
        <input
          {...props}
          id={props.name}
          className={`block w-full rounded-lg border border-gray-300 bg-white focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 ${
            Icon ? 'pl-10' : 'pl-4'
          } pr-4`}
        />
      </div>
    </div>
  );
}