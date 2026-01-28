import React, { useState } from 'react';
import { Home, Calendar, Lock, User, X, LayoutGrid } from 'lucide-react';
import { useRouter } from './SimpleRouter';

export const SandboxNavigation: React.FC = () => {
  const { navigate, path } = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {!isOpen && (
        <button 
          onClick={() => setIsOpen(true)}
          className="fixed bottom-4 left-4 z-[100] bg-slate-900 text-white w-12 h-12 flex items-center justify-center rounded-full shadow-xl hover:bg-slate-800 transition-all hover:scale-110 border-2 border-slate-700 hover:border-white group"
          title="Open Navigation Menu"
        >
          <LayoutGrid size={20} className="group-hover:rotate-90 transition-transform" />
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-4 left-4 z-[100] bg-slate-900/95 backdrop-blur-md text-white p-4 rounded-2xl shadow-2xl border border-slate-700 animate-in slide-in-from-bottom-5 fade-in duration-200 min-w-[200px]">
          <div className="flex items-center justify-between mb-4 pb-2 border-b border-slate-700">
             <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Site Map</span>
             <button onClick={() => setIsOpen(false)} className="text-slate-400 hover:text-white transition-colors">
               <X size={16} />
             </button>
          </div>
          
          <div className="flex flex-col gap-2">
            <NavBtn label="Home" to="/" icon={<Home size={16}/>} current={path} navigate={navigate} />
            <NavBtn label="Booking Page" to="/booking" icon={<Calendar size={16}/>} current={path} navigate={navigate} />
            <NavBtn label="Patient Portal" to="/portal" icon={<User size={16}/>} current={path} navigate={navigate} />
            <NavBtn label="Admin Dashboard" to="/admin" icon={<Lock size={16}/>} current={path} navigate={navigate} />
          </div>
        </div>
      )}
    </>
  );
};

const NavBtn = ({ label, to, icon, current, navigate }: any) => (
  <button 
    onClick={() => navigate(to)}
    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-bold transition-all w-full text-left
      ${current === to 
        ? 'bg-teal-600 text-white shadow-lg shadow-teal-900/20' 
        : 'text-slate-400 hover:bg-slate-800 hover:text-white'
      }
    `}
  >
    {icon} {label}
  </button>
);