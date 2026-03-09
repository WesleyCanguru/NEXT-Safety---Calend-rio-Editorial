
import React from 'react';

interface AgencyLogoProps {
  className?: string;
}

export const AgencyLogo: React.FC<AgencyLogoProps> = ({ className = 'h-16' }) => {
  return (
    <div className="flex items-center justify-center">
      <img
        src="https://i.postimg.cc/ZRYDpRWD/Rebranding-Canguru-Digital-(5000-x-2500-px).png"
        alt="Canguru Digital"
        className={`${className} w-auto object-contain`}
      />
    </div>
  );
};
