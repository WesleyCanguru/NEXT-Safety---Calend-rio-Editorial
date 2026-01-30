import React from 'react';

interface LogoProps {
  size?: 'small' | 'large';
  className?: string;
}

export const Logo: React.FC<LogoProps> = ({ size = 'large', className = '' }) => {
  const textSize = size === 'large' ? 'text-4xl' : 'text-xl';
  const subTextSize = size === 'large' ? 'text-[0.9rem] ml-[4.5rem] -mt-2' : 'text-[0.5rem] ml-[2.2rem] -mt-1';
  const supTop = size === 'large' ? '-top-4' : '-top-2';
  const supSize = size === 'large' ? 'text-[0.6rem]' : 'text-[0.4rem]';

  return (
    <div className={`flex flex-col relative pt-1 ${className}`}>
      <div className="flex items-center tracking-tighter leading-none select-none">
        <span className={`${textSize} font-extrabold text-[#363A40]`}>NE</span>
        <span className={`${textSize} font-extrabold text-brand-green mx-[1px]`}>X</span>
        <span className={`${textSize} font-extrabold text-[#363A40]`}>T</span>
        <sup className={`${supSize} font-bold text-[#363A40] ${supTop} ml-0.5`}>®</sup>
      </div>
      <span className={`${subTextSize} font-medium tracking-[0.1em] text-[#363A40] uppercase leading-none select-none`}>
        Safety
      </span>
    </div>
  );
};