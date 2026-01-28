import React from 'react';
import { MapPin, Phone, Clock, Facebook, Instagram, Mail, Lock, User } from 'lucide-react';
import { Link } from './SimpleRouter';
import { Logo } from './ui/Logo';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-slate-900 text-slate-300 pt-20 pb-10">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-12 border-b border-slate-800 pb-12 mb-12">
          
          {/* Brand */}
          <div className="space-y-6">
            <div className="flex items-center gap-3">
               <div className="w-10 h-10 text-teal-500">
                 <Logo className="w-full h-full" />
               </div>
               <span className="font-serif text-2xl font-bold text-white tracking-tight">
                 B&K
               </span>
            </div>
            <p className="text-sm leading-relaxed text-slate-400 max-w-xs">
              Restoring confidence one smile at a time. Expert dental care combining modern technology with a holistic approach.
            </p>
            <div className="flex gap-4 pt-2">
               <a href="https://www.facebook.com/BKDentalClinicLLC" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-[#1877F2] hover:text-white transition-all transform hover:-translate-y-1">
                  <Facebook size={18} />
               </a>
               <a href="https://www.instagram.com/bandkdentalclinic/?hl=en" target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-800 rounded-full hover:bg-[#E4405F] hover:text-white transition-all transform hover:-translate-y-1">
                  <Instagram size={18} />
               </a>
             </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold mb-6">Quick Links</h4>
            <ul className="space-y-4 text-sm">
              <li><Link to="/" className="hover:text-teal-400 transition-colors">Home</Link></li>
              <li><a href="/#services" className="hover:text-teal-400 transition-colors">Services</a></li>
              <li><Link to="/booking" className="hover:text-teal-400 transition-colors">Book Appointment</Link></li>
              <li><Link to="/portal" className="hover:text-teal-400 transition-colors flex items-center gap-2"><User size={14}/> Patient Portal</Link></li>
              <li><a href="/#faq" className="hover:text-teal-400 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h4 className="text-white font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="text-teal-500 flex-shrink-0 mt-1" size={18} />
                <span>2nd Floor, Antigua's Place,<br/>Osmeña St, Gun-ob,<br/>Lapu-Lapu City, 6015</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-teal-500 flex-shrink-0" size={18} />
                <a href="tel:09332366403" className="hover:text-teal-400 transition-colors">0933 236 6403</a>
              </li>
              <li className="flex items-center gap-3">
                 <Mail className="text-teal-500 flex-shrink-0" size={18} />
                 <a href="mailto:kimmakiling@yahoo.com" className="hover:text-teal-400 transition-colors break-all">kimmakiling@yahoo.com</a>
              </li>
            </ul>
          </div>

          {/* Hours & CTA */}
          <div>
            <h4 className="text-white font-bold mb-6">Clinic Hours</h4>
            <ul className="space-y-3 text-sm mb-6">
              <li className="flex justify-between border-b border-slate-800 pb-2">
                <span>Mon - Sat</span>
                <span className="text-white font-medium">9:00 AM – 5:00 PM</span>
              </li>
              <li className="flex justify-between pb-2">
                <span>Sunday</span>
                <span className="text-teal-500 font-medium">Closed</span>
              </li>
            </ul>
             <Link to="/booking" className="block w-full bg-teal-600 hover:bg-teal-700 text-white text-center py-3 rounded-xl font-bold transition-all shadow-lg shadow-teal-900/20">
               Book Now
             </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-slate-600 pt-4 border-t border-slate-800/50">
          <p>&copy; {new Date().getFullYear()} B&K Dental Clinic. All rights reserved.</p>
          <div className="mt-2 md:mt-0 flex items-center gap-6">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span>
              Dr. Kim Daclan
            </span>
            <Link to="/admin" className="flex items-center gap-1 hover:text-teal-500 transition-colors opacity-50 hover:opacity-100">
              <Lock size={10} /> Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};