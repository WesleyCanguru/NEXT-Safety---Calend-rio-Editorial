
import React from 'react';
import { SOCIAL_STRATEGY } from '../constants';
import { 
  Instagram, 
  Facebook, 
  Linkedin, 
  CalendarCheck, 
  Lightbulb, 
  Check, 
  Youtube, 
  Twitter, 
  Share2,
  PieChart,
  Globe
} from 'lucide-react';
import { useAuth } from '../lib/supabase';

const getSocialIcon = (name: string, size = 16) => {
  const n = name.toLowerCase();
  if (n.includes('instagram')) return <Instagram size={size} className="text-pink-600" />;
  if (n.includes('facebook')) return <Facebook size={size} className="text-blue-600" />;
  if (n.includes('linkedin')) return <Linkedin size={size} className="text-[#0077B5]" />;
  if (n.includes('youtube')) return <Youtube size={size} className="text-red-600" />;
  if (n.includes('twitter') || n.includes('x')) return <Twitter size={size} className="text-gray-900" />;
  if (n.includes('tiktok')) return <Share2 size={size} className="text-black" />;
  if (n.includes('pinterest')) return <Globe size={size} className="text-red-500" />;
  return <Share2 size={size} className="text-gray-400" />;
};

export const DistributionAnalysis: React.FC = () => {
  const { activeClient } = useAuth();
  
  const networks = activeClient?.social_networks && activeClient.social_networks.length > 0
    ? activeClient.social_networks
    : ['Instagram', 'Facebook', 'LinkedIn'];

  const percentage = Math.floor(100 / networks.length);

  return (
    <div className="animate-in fade-in duration-500 mt-8">
      
      {/* Introduction */}
      <div className="mb-6 text-center md:text-left flex items-center justify-between">
        <div className="flex items-center gap-3">
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
             <span className="w-1.5 h-1.5 rounded-full bg-brand-dark"></span>
             Análise de Distribuição
          </h2>
          <span className="hidden md:inline text-gray-300">|</span>
          <p className="text-gray-500 text-xs md:text-sm">Definição estratégica dos dias de postagem para maximizar o alcance B2B.</p>
        </div>
      </div>

      {/* Social Mix Distribution */}
      <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-8">
        <div className="flex items-center gap-2 mb-6 text-brand-dark">
          <PieChart size={18} />
          <h3 className="text-sm font-bold uppercase tracking-wider">Mix de Canais Ativos</h3>
        </div>
        
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4">
          {networks.map((network, idx) => (
            <div key={idx} className="flex flex-col items-center p-4 rounded-xl bg-gray-50 border border-black/[0.02] hover:shadow-md transition-all group">
              <div className="mb-3 p-2 bg-white rounded-lg shadow-sm group-hover:scale-110 transition-transform">
                {getSocialIcon(network, 20)}
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1 text-center">{network}</span>
              <span className="text-lg font-bold text-brand-dark">{percentage}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Strategy Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-8">
        {SOCIAL_STRATEGY.map((platform) => {
          const isMeta = platform.id === 'meta';
          
          // Check if this platform card is relevant to the client's networks
          const isRelevant = isMeta 
            ? networks.some(n => n.toLowerCase().includes('instagram') || n.toLowerCase().includes('facebook'))
            : networks.some(n => n.toLowerCase().includes('linkedin'));

          if (!isRelevant && activeClient?.social_networks?.length > 0) return null;

          return (
            <div 
              key={platform.id} 
              className={`bg-white rounded-xl shadow-sm border overflow-hidden flex flex-col ${isMeta ? 'border-purple-100' : 'border-blue-100'}`}
            >
              {/* Header */}
              <div className={`p-4 ${isMeta ? 'bg-gradient-to-br from-purple-50 to-pink-50' : 'bg-gradient-to-br from-blue-50 to-indigo-50'} flex justify-between items-center`}>
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg shadow-sm bg-white text-gray-800`}>
                    {isMeta ? (
                      <div className="flex gap-1">
                        {networks.some(n => n.toLowerCase().includes('instagram')) && <Instagram size={16} className="text-pink-600" />}
                        {networks.some(n => n.toLowerCase().includes('facebook')) && <Facebook size={16} className="text-blue-600" />}
                        {!networks.some(n => n.toLowerCase().includes('instagram') || n.toLowerCase().includes('facebook')) && (
                          <>
                            <Instagram size={16} className="text-pink-600" />
                            <Facebook size={16} className="text-blue-600" />
                          </>
                        )}
                      </div>
                    ) : (
                      <Linkedin size={16} className="text-[#0077B5]" />
                    )}
                  </div>
                  <h3 className="text-sm font-bold text-gray-900 uppercase tracking-wide">{platform.name}</h3>
                </div>
                
                <div className="flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-white/60 px-2 py-1 rounded-md border border-white/50">
                  <CalendarCheck size={14} className="text-gray-500" />
                  <span>{platform.schedule}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-5 flex-grow flex flex-col">
                <p className="text-gray-600 text-xs font-medium mb-5 italic border-l-2 pl-3 py-0.5 border-gray-200">
                  "{platform.description}"
                </p>

                <div className="space-y-4">
                  {platform.bestDays.map((dayData, idx) => (
                    <div key={idx} className="relative pl-4">
                       {/* Timeline-like line */}
                      <div className={`absolute left-0 top-0 bottom-0 w-px ${idx === platform.bestDays.length -1 ? 'h-2' : 'h-full'} bg-gray-100`}></div>
                      <div className={`absolute left-[-1.5px] top-1.5 w-1 h-1 rounded-full ${isMeta ? 'bg-purple-400' : 'bg-blue-400'}`}></div>

                      <h4 className="font-bold text-gray-900 text-xs mb-1">{dayData.day}</h4>
                      <div className="space-y-0.5">
                        {dayData.reason.map((r, rIdx) => (
                          <div key={rIdx} className="flex items-start gap-1.5 text-[11px] text-gray-500 leading-tight">
                             <Check size={10} className={`mt-0.5 flex-shrink-0 ${isMeta ? 'text-purple-500' : 'text-blue-500'}`} />
                             <span>{r}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Tip Section (mostly for LinkedIn) */}
                {platform.tip && (
                  <div className="mt-5 bg-amber-50 rounded-lg p-3 border border-amber-100 flex gap-2 items-start">
                    <Lightbulb className="text-amber-500 flex-shrink-0 mt-0.5" size={14} />
                    <p className="text-[10px] text-amber-800 font-medium leading-snug">
                      <span className="font-bold text-amber-600 uppercase tracking-wide mr-1">Dica:</span>
                      {platform.tip}
                    </p>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
