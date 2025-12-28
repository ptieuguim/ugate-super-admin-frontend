import React from 'react';
import { Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  leftIcon?: React.ElementType;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  leftIcon: LeftIcon,
  className = '',
  disabled,
  ...props
}) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.98] rounded-lg";
  
  const variants = {
    primary: "bg-[#1877F2] text-white hover:bg-[#1465D6] shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-visible:ring-[#1877F2]/20",
    secondary: "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 hover:text-gray-900 shadow-sm focus-visible:ring-gray-200",
    danger: "bg-white text-red-600 border border-red-200 hover:bg-red-50 hover:border-red-300 focus-visible:ring-red-100",
    ghost: "text-gray-600 hover:bg-gray-100 hover:text-gray-900",
    outline: "bg-transparent border border-[#1877F2] text-[#1877F2] hover:bg-blue-50 focus-visible:ring-[#1877F2]/20"
  };

  const sizes = {
    sm: "h-8 px-3 text-xs gap-1.5",
    md: "h-10 px-4 text-sm gap-2",
    lg: "h-12 px-6 text-base gap-2.5"
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 animate-spin" />}
      {!isLoading && LeftIcon && <LeftIcon className="w-4 h-4" />}
      {children}
    </button>
  );
};
