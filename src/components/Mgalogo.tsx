import React from 'react';
import mgaLogoSvg from '../assets/images/mga_official_logo.svg';
import mgaLogoPng from '../assets/images/mga_official_logo.png';

interface MgalogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}

export const Mgalogo: React.FC<MgalogoProps> = ({ className = '', size = 'md' }) => {
  const heightClass =
    size === 'sm'
      ? 'h-7'
      : size === 'lg'
      ? 'h-12'
      : size === 'xl'
      ? 'h-16'
      : 'h-9 sm:h-10';

  return (
    <div className={`inline-flex items-center select-none ${className}`}>
      <img
        src={mgaLogoSvg}
        onError={(e) => {
          e.currentTarget.onerror = null;
          e.currentTarget.src = mgaLogoPng;
        }}
        alt="MGA Entertainment"
        className={`${heightClass} w-auto object-contain block`}
        loading="eager"
      />
    </div>
  );
};
