import React from 'react';
import { AdSetData } from '../../types';

interface StoryMockupProps {
  data: AdSetData['mockupData'];
}

export const StoryMockup: React.FC<StoryMockupProps> = ({ data }) => {
  return (
    // Increased width from 300px to 360px for larger visual impact
    <div className="relative w-[360px] aspect-[9/16] bg-black rounded-3xl shadow-[0_20px_50px_-12px_rgba(0,0,0,0.5)] overflow-hidden border-[6px] border-gray-900 flex flex-col mx-auto group">
      {/* Phone Status Bar Simulation - Minimalist */}
      <div className="h-6 absolute top-2 w-full z-20 flex justify-between items-center px-6 opacity-80">
         <div className="w-8 h-1 bg-white/40 rounded-full"></div>
         <div className="w-8 h-1 bg-white/40 rounded-full"></div>
         <div className="w-8 h-1 bg-white/40 rounded-full"></div>
      </div>

      {/* Full Screen Image Only */}
      <div className="absolute inset-0 bg-gray-900">
         {data.mainImage ? (
            <img 
              src={data.mainImage} 
              alt="Story Ad Creative" 
              className="w-full h-full object-contain"
            />
         ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500 bg-gray-100">
              [Imagem não encontrada]
            </div>
         )}
      </div>
      
      {/* Swipe Up Arrow (Minimal UI hint) */}
      <div className="absolute bottom-6 left-0 w-full flex justify-center z-20 opacity-60">
        <div className="w-6 h-6 border-t-2 border-l-2 border-white transform rotate-45"></div>
      </div>
    </div>
  );
};