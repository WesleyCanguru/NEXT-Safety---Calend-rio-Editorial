import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'large', className = '' }) => {
  // Ajuste de tamanhos:
  // 'small' é usado no Header e Footer (aumentado para w-36 para dar mais destaque no cabeçalho)
  // 'large' para usos em destaque maior
  const widthClass = size === 'large' ? 'w-64' : 'w-36';

  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="https://i.postimg.cc/pXb0TrJ7/Next-Safety-Logo.png"
        alt="NEXT Safety Logo"
        className={`${widthClass} h-auto object-contain`}
      />
    </div>
  );
};