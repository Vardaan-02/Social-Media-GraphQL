import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '' }) => {
  return (
    <div 
      className={`bg-slate-900/90 backdrop-blur-xl border border-white/10 rounded-xl 
                 shadow-xl animate-scaleIn ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;