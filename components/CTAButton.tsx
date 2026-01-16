
import React from 'react';

interface CTAButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'gold';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

export const CTAButton: React.FC<CTAButtonProps> = ({ 
  variant = 'primary', 
  className = '', 
  children,
  onClick 
}) => {
  const baseStyles = "px-7 py-4 rounded-2xl font-extrabold transition-all duration-300 text-center inline-block active:scale-[0.97] tracking-tight text-[1.05rem]";
  
  const variants = {
    primary: "bg-athena-blue text-white hover:bg-blue-900 shadow-lg hover:shadow-2xl",
    secondary: "bg-athena-pink text-white hover:bg-pink-800 shadow-lg hover:shadow-2xl",
    gold: "bg-[#AF8F2C] text-white hover:bg-[#8C7123] shadow-lg hover:shadow-[0_10px_30px_rgba(175,143,44,0.4)]",
    outline: "border-[2.5px] border-slate-300 dark:border-slate-600 text-slate-800 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-400 shadow-sm"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
};
