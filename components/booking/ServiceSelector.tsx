import React from 'react';
import { Smile, Sparkles, HeartPulse, Stethoscope, AlertTriangle, Info } from 'lucide-react';
import { FadeIn } from '../ui/FadeIn';

interface ServiceSelectorProps {
  selected: string;
  onSelect: (service: string) => void;
}

export const ServiceSelector: React.FC<ServiceSelectorProps> = ({ selected, onSelect }) => {
  const services = [
    {
      id: 'Consultation',
      title: 'Consultation',
      icon: <Stethoscope size={24} />,
      desc: 'Thorough check-up and treatment planning.',
      image: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&q=80&w=400',
      color: 'text-blue-500',
      bg: 'bg-blue-50'
    },
    {
      id: 'Braces / Ortho',
      title: 'Orthodontics',
      icon: <Smile size={24} />,
      desc: 'Braces, expanders, and alignment.',
      image: 'https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=400',
      color: 'text-indigo-500',
      bg: 'bg-indigo-50'
    },
    {
      id: 'Cleaning',
      title: 'Cleaning',
      icon: <Sparkles size={24} />,
      desc: 'Prophylaxis and stain removal.',
      image: 'https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=400',
      color: 'text-teal-500',
      bg: 'bg-teal-50'
    },
    {
      id: 'Tooth Restoration',
      title: 'Restoration',
      icon: <HeartPulse size={24} />,
      desc: 'Fillings, crowns, and repairs.',
      image: 'https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=400',
      color: 'text-emerald-500',
      bg: 'bg-emerald-50'
    },
    {
      id: 'Pain / Emergency',
      title: 'Emergency',
      icon: <AlertTriangle size={24} />,
      desc: 'Urgent care for toothaches.',
      image: 'https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=400',
      color: 'text-orange-500',
      bg: 'bg-orange-50'
    }
  ];

  const selectedService = services.find(s => s.id === selected) || services[0];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {services.map((s) => (
          <button
            key={s.id}
            type="button"
            onClick={() => onSelect(s.id)}
            className={`flex flex-col items-center justify-center p-4 rounded-xl border-2 transition-all duration-200 ${selected === s.id ? `border-${s.color.split('-')[1]}-500 ${s.bg} shadow-md scale-105` : 'border-slate-100 bg-white hover:border-slate-200 hover:bg-slate-50'}`}
          >
            <div className={`mb-2 ${selected === s.id ? s.color : 'text-slate-400'}`}>
              {s.icon}
            </div>
            <span className={`text-xs font-bold text-center ${selected === s.id ? 'text-slate-800' : 'text-slate-500'}`}>
              {s.title}
            </span>
          </button>
        ))}
      </div>

      <FadeIn key={selected} className="bg-white rounded-2xl border border-slate-100 overflow-hidden flex flex-col md:flex-row shadow-sm">
        <div className="md:w-1/3 h-32 md:h-auto relative">
           <img src={selectedService.image} alt={selectedService.title} className="w-full h-full object-cover" />
           <div className="absolute inset-0 bg-slate-900/10" />
        </div>
        <div className="p-5 md:w-2/3 flex flex-col justify-center">
          <div className="flex items-center gap-2 mb-2">
            <span className={`p-1.5 rounded-lg ${selectedService.bg} ${selectedService.color}`}>
              {selectedService.icon}
            </span>
            <h4 className="font-bold text-lg text-slate-800">{selectedService.title} Service</h4>
          </div>
          <p className="text-slate-600 text-sm mb-3">
            {selectedService.desc} includes professional assessment by Dr. Kim Daclan.
          </p>
          <div className="flex items-center gap-2 text-xs text-slate-400 bg-slate-50 p-2 rounded-lg self-start">
            <Info size={14} />
            <span>Duration varies by case severity</span>
          </div>
        </div>
      </FadeIn>
    </div>
  );
};