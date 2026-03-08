
import React from 'react';
import { MonthPlan, MonthColor } from '../types';
import { CalendarDays, MapPin, Target, Pin } from 'lucide-react';

interface MonthCardProps {
  data: MonthPlan;
  onClick?: () => void;
  postCount?: number;
}

const colorStyles: Record<MonthColor, { border: string; bg: string; text: string; badge: string }> = {
  blue: {
    border: 'border-blue-500',
    bg: 'bg-blue-50',
    text: 'text-blue-700',
    badge: 'bg-blue-100 text-blue-800'
  },
  yellow: {
    border: 'border-yellow-500',
    bg: 'bg-yellow-50',
    text: 'text-yellow-700',
    badge: 'bg-yellow-100 text-yellow-800'
  },
  red: {
    border: 'border-red-600',
    bg: 'bg-red-50',
    text: 'text-red-700',
    badge: 'bg-red-100 text-red-800'
  },
  green: {
    border: 'border-brand-green',
    bg: 'bg-green-50',
    text: 'text-green-700',
    badge: 'bg-green-100 text-green-800'
  }
};

export const MonthCard: React.FC<MonthCardProps> = ({ data, onClick, postCount = 0 }) => {
  const style = colorStyles[data.color];

  return (
    <div 
      onClick={onClick}
      className={`bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden flex flex-col h-full hover:shadow-lg hover:-translate-y-1 transition-all duration-300 relative cursor-pointer group`}
    >
      {/* Top Border Indicator */}
      <div className={`h-1.5 w-full ${style.bg.replace('bg-', 'bg-opacity-100 bg-')}`}></div>
      
      <div className="p-6 flex-grow flex flex-col">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div>
            <span className={`inline-block px-2.5 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider mb-2 ${style.badge}`}>
              {data.month}
            </span>
            <h3 className="text-lg font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition-colors">
              {data.title}
            </h3>
          </div>
          {postCount > 0 && (
            <div className="flex flex-col items-center justify-center bg-gray-50 border border-gray-100 rounded-lg px-3 py-1.5 shadow-sm">
              <span className="text-lg font-black text-gray-800 leading-none">{postCount}</span>
              <span className="text-[9px] font-bold text-gray-400 uppercase tracking-wider mt-0.5">Posts</span>
            </div>
          )}
        </div>

        {/* Function */}
        <div className="flex items-center gap-2 mb-6 text-sm text-gray-500 font-medium">
          <Target size={16} className={style.text} />
          <span>{data.function}</span>
        </div>

        {/* Events Section */}
        {data.events && data.events.length > 0 && (
          <div className="mb-5 bg-gray-50 rounded-lg p-3 border border-gray-100">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <CalendarDays size={12} /> Eventos
            </h4>
            <div className="space-y-2">
              {data.events.map((event, idx) => (
                <div key={idx} className="flex items-start gap-2 text-sm">
                  <MapPin size={14} className="mt-0.5 text-gray-400 flex-shrink-0" />
                  <div>
                    <span className="font-bold text-gray-800">{event.name}</span>
                    <span className="text-gray-500 text-xs ml-1.5 font-mono bg-white px-1 rounded border border-gray-200">
                      {event.date}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Deliverables List */}
        <div className="space-y-2 mb-6 flex-grow">
          {data.deliverables.map((item, idx) => (
            <div key={idx} className="flex items-start gap-2.5">
              <div className={`w-1.5 h-1.5 rounded-full mt-1.5 flex-shrink-0 ${style.bg.replace('bg-', 'bg-opacity-100 bg-')}`}></div>
              <p className="text-sm text-gray-600 leading-snug">{item}</p>
            </div>
          ))}
        </div>

        {/* Takeaways Footer */}
        <div className={`mt-auto pt-4 border-t border-gray-100`}>
          <div className="flex flex-wrap gap-2">
            {data.takeaways.map((takeaway, idx) => (
              <span key={idx} className="inline-flex items-center gap-1 text-xs font-semibold text-gray-600 bg-gray-50 px-2 py-1 rounded border border-gray-100">
                <Pin size={10} className={style.text} />
                {takeaway}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
