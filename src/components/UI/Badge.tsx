import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'blue' | 'cyan' | 'dark' | 'outline' | 'veg' | 'nonveg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'blue',
  className = ''
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'blue':
        return 'bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/30';
      case 'cyan':
        return 'bg-[#22D3EE]/15 text-[#22D3EE] border border-[#22D3EE]/30';
      case 'dark':
        return 'bg-[#111214] text-[#A1A1A6] border border-white/10';
      case 'outline':
        return 'bg-transparent text-[#F5F5F7] border border-white/15';
      case 'veg':
        return 'bg-emerald-950/60 text-emerald-400 border border-emerald-500/40';
      case 'nonveg':
        return 'bg-red-950/60 text-red-400 border border-red-500/40';
      default:
        return 'bg-[#0A84FF]/15 text-[#0A84FF] border border-[#0A84FF]/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold tracking-wide ${getStyles()} ${className}`}>
      {children}
    </span>
  );
};
