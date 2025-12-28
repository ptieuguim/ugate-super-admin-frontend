import React from 'react';

type Variant = 'default' | 'success' | 'warning' | 'error' | 'outline' | 'info';

interface BadgeProps {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const baseStyles = "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border transition-colors";
  
  const variants = {
    default: "bg-gray-100 text-gray-800 border-gray-200",
    success: "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: "bg-amber-50 text-amber-700 border-amber-200",
    error: "bg-red-50 text-red-700 border-red-200",
    info: "bg-blue-50 text-[#1877F2] border-blue-200",
    outline: "bg-transparent border-gray-300 text-gray-600"
  };

  return (
    <span className={`${baseStyles} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
};
