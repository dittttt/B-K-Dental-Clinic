import React, { useState, useEffect } from 'react';
import { Menu, X, Phone, CalendarCheck } from 'lucide-react';
import { Link, useRouter } from './SimpleRouter';
import { Logo } from './ui/Logo';

export const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { path, navigate } = useRouter();
  const isHome = path === '/';

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Our Services', id: 'services' },
    { name: 'Why Us', id: 'why-us' },
    { name: 'Gallery', id: 'gallery' },
    { name: 'FAQ', id: 'faq' },
  ];

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    setIsOpen(false);
    
    if (isHome) {
      const element = document.getElementById(id);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    } else {
      navigate(`/#${id}`);
    }
  };

  const handleLogoClick = (e: React.MouseEvent) => {
    if (isHome) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/95 backdrop-blur-md shadow-md py-3' : 'bg-white/80 lg:bg-transparent backdrop-blur-sm py-4 lg:py-6'}`}>
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link 
          to="/" 
          onClick={handleLogoClick}
          className="flex items-center gap-3 z-50 group"
        >
           <div className="w-12 h-12 text-teal-600 group-hover:text-teal-700 transition-colors">
             <Logo className="w-full h-full" />
           </div>
           <div className="flex flex-col">
             <span className={`font-serif text-xl font-bold tracking-tight leading-none ${scrolled ? 'text-slate-900' : 'text-slate-900 lg:text-slate-900'}`}>
               B&K
             </span>
             <span className={`text-xs uppercase tracking-widest font-medium ${scrolled ? 'text-slate-500' : 'text-slate-500 lg:text-slate-600'}`}>
               Dental Clinic
             </span>
           </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden lg:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-sm font-bold text-slate-600 hover:text-teal-600 transition-colors uppercase tracking-widest cursor-pointer"
            >
              {link.name}
            </a>
          ))}
          <Link 
            to="/booking" 
            className="flex items-center gap-2 bg-slate-900 text-white px-6 py-3 rounded-full font-medium hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/30 transform hover:-translate-y-0.5"
          >
            <CalendarCheck size={18} />
            Book Now
          </Link>
        </div>

        {/* Mobile Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)} 
          className="lg:hidden p-2 text-slate-800 z-50"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div 
          className="absolute top-0 left-0 right-0 bg-white shadow-xl p-4 pt-24 pb-8 lg:hidden flex flex-col gap-4 items-center animate-in slide-in-from-top-10"
        >
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={`/#${link.id}`}
              onClick={(e) => handleNavClick(e, link.id)}
              className="text-lg font-medium text-slate-800 hover:text-teal-600 py-2 w-full text-center"
            >
              {link.name}
            </a>
          ))}
          <div className="w-full h-px bg-slate-100 my-2"></div>
          <a 
            href="tel:09332366403"
            className="flex items-center gap-2 text-slate-600 font-medium py-2"
          >
            <Phone size={18} /> 0933 236 6403
          </a>
          <Link 
            to="/booking"
            onClick={() => setIsOpen(false)} 
            className="w-full bg-teal-600 text-white py-3 rounded-xl font-bold text-center mt-2 flex items-center justify-center gap-2"
          >
            <CalendarCheck size={20} /> Book Now
          </Link>
        </div>
      )}
    </nav>
  );
};