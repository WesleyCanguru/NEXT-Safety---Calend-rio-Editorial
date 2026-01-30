
import React from 'react';

interface AgencyLogoProps {
  className?: string;
}

export const AgencyLogo: React.FC<AgencyLogoProps> = ({ className = '' }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="https://i.postimg.cc/ZRYDpRWD/Rebranding-Canguru-Digital-(5000-x-2500-px).png"
        alt="Canguru Digital"
        // Aumentando altura de h-14 para h-16 e atualizando a URL
        className="h-16 w-auto object-contain"
      />
    </div>
  );
};
