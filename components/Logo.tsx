import React from 'react';
import { motion } from 'motion/react';
import { useAgency } from '../contexts/AgencyContext';

interface LogoProps {
  size?: 'small' | 'medium' | 'large';
  className?: string;
  showAgency?: boolean;
}

export const Logo: React.FC<LogoProps> = ({ size = 'large', className = '', showAgency = true }) => {
  const { agency } = useAgency();

  let sizeClass = 'text-3xl';
  if (size === 'medium') sizeClass = 'text-4xl';
  if (size === 'large') sizeClass = 'text-6xl';

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center"
      >
        <div className="flex items-center justify-center">
          {agency && agency.logo_url ? (
            <img
              src={agency.logo_url}
              alt={agency.name}
              className={`object-contain mix-blend-multiply ${size === 'large' ? 'h-16' : size === 'medium' ? 'h-12' : 'h-8'} ${!showAgency ? 'mb-0 mt-0' : ''}`}
            />
          ) : (
            <span className={`font-serif italic text-brand-dark tracking-tighter ${sizeClass}`}>
              {agency ? agency.name : 'Bolsa'}
            </span>
          )}
        </div>
        
        {showAgency && (
          <div className="flex items-center gap-2 mt-1 opacity-40">
            <span className="text-[8px] uppercase tracking-[0.4em] font-bold">powered by</span>
            <span className="text-[10px] font-bold">{agency ? agency.name : 'Canguru Digital'}</span>
          </div>
        )}
      </motion.div>
    </div>
  );
};
