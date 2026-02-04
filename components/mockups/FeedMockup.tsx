
import React from 'react';
import { AdSetData } from '../../types';
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal, Play } from 'lucide-react';

interface FeedMockupProps {
  data: AdSetData['mockupData'];
}

export const FeedMockup: React.FC<FeedMockupProps> = ({ data }) => {
  const isVideo = data.mainImage?.match(/\.(mp4|webm|ogg)$/i);

  return (
    <div className="relative w-[320px] aspect-square bg-white rounded-md shadow-lg overflow-hidden border border-gray-200 flex flex-col mx-auto">
      {/* Instagram Header */}
      <div className="h-12 px-4 flex items-center justify-between border-b border-gray-100 bg-white z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-gradient-to-tr from-yellow-400 to-purple-600 p-[2px] rounded-full">
            <div className="w-full h-full bg-white rounded-full p-[2px]">
               <div className="w-full h-full bg-gray-200 rounded-full"></div>
            </div>
          </div>
          <span className="text-xs font-semibold text-gray-900">next_safety</span>
        </div>
        <MoreHorizontal size={20} className="text-gray-600" />
      </div>

      {/* Content Area */}
      <div className="flex-1 bg-gray-100 relative flex flex-col items-center justify-center text-center overflow-hidden group">
        
        {data.mainImage ? (
           isVideo ? (
             <div className="w-full h-full relative">
                <video 
                  src={data.mainImage} 
                  className="w-full h-full object-cover" 
                  controls 
                  playsInline
                />
                {/* Play Button Overlay (Visible only before play if we were customizing controls, simply relying on browser controls for now for reliability) */}
             </div>
           ) : (
             <img src={data.mainImage} className="w-full h-full object-cover" alt="Feed Post" />
           )
        ) : (
          <>
            <div className="absolute inset-0 bg-blue-50/50"></div>
            <div className="z-10 relative w-full p-6">
              {data.tagline && (
                <span className="text-primary font-bold text-[10px] tracking-[0.2em] uppercase mb-4 block">
                  {data.tagline}
                </span>
              )}
              
              <h2 className="text-2xl font-bold text-gray-900 mb-5 leading-tight">
                {data.title?.split('vs.').map((part, i) => (
                   <span key={i}>
                     {part}
                     {i === 0 && <span className="text-gray-400 font-light px-1">vs.</span>}
                   </span>
                ))}
              </h2>
            </div>
          </>
        )}

        {/* Carousel Dots (Simulated) */}
        {!isVideo && (
          <div className="absolute bottom-4 flex gap-1.5 z-10">
            <div className="w-1.5 h-1.5 rounded-full bg-blue-500 shadow-sm"></div>
            <div className="w-1.5 h-1.5 rounded-full bg-white/70 shadow-sm"></div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="h-12 px-4 flex items-center justify-between bg-white border-t border-gray-50 z-10">
        <div className="flex gap-4">
          <Heart size={22} className="text-gray-800 hover:text-red-500 cursor-pointer transition-colors" />
          <MessageCircle size={22} className="text-gray-800 hover:text-blue-500 cursor-pointer transition-colors" />
          <Send size={22} className="text-gray-800 hover:text-green-500 cursor-pointer transition-colors" />
        </div>
        <Bookmark size={22} className="text-gray-800" />
      </div>
    </div>
  );
};
