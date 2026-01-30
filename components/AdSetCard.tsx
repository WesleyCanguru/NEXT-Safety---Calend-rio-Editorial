import React, { useState } from 'react';
import { AdSetData } from '../types';
import { StoryMockup } from './mockups/StoryMockup';
import { FeedMockup } from './mockups/FeedMockup';
import { CheckCircle2, AlertCircle, Clock, ChevronLeft, ChevronRight, Layers } from 'lucide-react';

interface AdSetCardProps {
  adSet: AdSetData;
  index: number;
}

export const AdSetCard: React.FC<AdSetCardProps> = ({ adSet, index }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const getStatusBadge = (status: AdSetData['status']) => {
    switch (status) {
      case 'approved':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <CheckCircle2 size={12} /> Aprovado
          </span>
        );
      case 'review':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
             <Clock size={12} /> Em Revisão
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
             <AlertCircle size={12} /> Rascunho
          </span>
        );
    }
  };

  const getBorderColor = (id: string) => {
      return id === 'A' ? 'bg-primary' : 'bg-secondary';
  };

  // Logic for carousel
  const images = [adSet.mockupData.mainImage];
  if (adSet.mockupData.secondaryImage) {
    images.push(adSet.mockupData.secondaryImage);
  }
  const hasMultipleImages = images.length > 1;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const currentMockupData = {
      ...adSet.mockupData,
      mainImage: images[currentImageIndex]
  };

  // Determine if layout should be reversed (Image Right, Text Left)
  // Even index (0, 2...): Image Left (Default) -> isReversed = false
  // Odd index (1, 3...): Image Right -> isReversed = true
  const isReversed = index % 2 !== 0;

  return (
    <div className="bg-surface-light rounded-xl shadow-sm border border-gray-200 p-6 mb-8 hover:shadow-md transition-shadow duration-300">
      
      {/* Card Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 border-b border-gray-100 pb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-900 flex items-center gap-3">
            <span className={`w-1.5 h-8 ${getBorderColor(adSet.id)} rounded-full inline-block`}></span>
            {adSet.title}
          </h2>
          <p className="text-sm text-gray-500 mt-1 ml-4.5 pl-0.5">
            <span className="font-semibold">Objetivo:</span> {adSet.objective} • <span className="font-semibold">Formato:</span> {adSet.format}
          </p>
        </div>
        <div className="mt-4 sm:mt-0 self-end sm:self-auto">
             {getStatusBadge(adSet.status)}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        
        {/* Left Column: Visual Mockup */}
        <div className={`flex flex-col gap-4 ${isReversed ? 'lg:order-2' : ''}`}>
           
           {/* Message for multiple images */}
           {hasMultipleImages && (
            <div className="flex items-center gap-2 text-sm text-blue-700 bg-blue-50 px-4 py-3 rounded-lg border border-blue-100 shadow-sm">
                <Layers size={18} className="flex-shrink-0" />
                <span className="font-medium">
                    Existem {images.length} variações para este anúncio. Clique nas setas abaixo para visualizar.
                </span>
            </div>
           )}

           <div className="relative flex items-center justify-center bg-gray-50 rounded-xl p-8 border border-gray-200/60 group">
              
              {hasMultipleImages && (
                <button 
                    onClick={prevImage}
                    className="absolute left-2 sm:left-4 z-20 p-2.5 rounded-full bg-white text-gray-700 shadow-lg border border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Imagem anterior"
                >
                    <ChevronLeft size={24} />
                </button>
              )}

              <div className="transition-all duration-300 ease-in-out transform">
                 {adSet.mockupData.type === 'story' ? (
                   <StoryMockup data={currentMockupData} />
                 ) : (
                   <FeedMockup data={currentMockupData} />
                 )}
              </div>

              {hasMultipleImages && (
                <button 
                    onClick={nextImage}
                    className="absolute right-2 sm:right-4 z-20 p-2.5 rounded-full bg-white text-gray-700 shadow-lg border border-gray-100 hover:bg-gray-50 hover:text-blue-600 transition-all focus:outline-none focus:ring-2 focus:ring-blue-500"
                    aria-label="Próxima imagem"
                >
                    <ChevronRight size={24} />
                </button>
              )}

              {/* Dots Indicator */}
              {hasMultipleImages && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2 z-20">
                    {images.map((_, idx) => (
                        <div 
                            key={idx}
                            className={`w-2 h-2 rounded-full transition-all duration-300 shadow-sm ${
                                idx === currentImageIndex ? 'bg-blue-600 w-4' : 'bg-gray-300'
                            }`}
                        />
                    ))}
                </div>
              )}
           </div>
        </div>

        {/* Right Column: Copy Details */}
        <div className={`flex flex-col space-y-6 ${isReversed ? 'lg:order-1' : ''}`}>
          
          {/* Headline */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2 flex items-center gap-2">
                Headline (Título)
            </h3>
            <div className="p-5 bg-white rounded-lg border border-gray-200 text-gray-900 text-lg font-bold leading-tight shadow-sm">
              {adSet.content.headline}
            </div>
          </div>

          {/* Primary Text */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">
                Primary Text (Legenda)
            </h3>
            <div 
                className="p-5 bg-white rounded-lg border border-gray-200 text-gray-600 text-sm leading-normal whitespace-pre-line shadow-sm"
                dangerouslySetInnerHTML={{ __html: adSet.content.primaryText }}
            />
          </div>

          {/* CTA */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">CTA (Botão)</h3>
            <div className="inline-block px-5 py-3 bg-blue-50 text-blue-700 rounded-lg border border-blue-100 text-sm font-bold">
              {adSet.content.cta}
            </div>
          </div>

          {/* Audience */}
          <div>
            <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-2">Público Alvo</h3>
            <div className="p-5 bg-white rounded-lg border border-gray-200 text-gray-700 text-sm font-medium whitespace-pre-line leading-relaxed shadow-sm">
              {adSet.content.targetAudience}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};