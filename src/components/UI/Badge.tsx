import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'emerald' | 'teal' | 'dark' | 'outline' | 'veg' | 'nonveg';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'emerald',
  className = ''
}) => {
  const getStyles = () => {
    switch (variant) {
      case 'emerald':
        return 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30 shadow-md shadow-[#10B981]/10';
      case 'teal':
        return 'bg-[#06B6D4]/15 text-[#06B6D4] border border-[#06B6D4]/30 shadow-md shadow-[#06B6D4]/10';
      case 'dark':
        return 'bg-[#0F172A]/80 text-[#9CA3AF] border border-white/10';
      case 'outline':
        return 'bg-transparent text-[#F9FAFB] border border-[#10B981]/30';
      case 'veg':
        return 'bg-emerald-950/70 text-emerald-400 border border-emerald-500/40';
      case 'nonveg':
        return 'bg-rose-950/70 text-rose-400 border border-rose-500/40';
      default:
        return 'bg-[#10B981]/15 text-[#10B981] border border-[#10B981]/30';
    }
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold tracking-wide ${getStyles()} ${className}`}>
      {children}
    </span>
  );
};
