import React from 'react';
import { MapPin, Phone, Clock, Mail, ExternalLink, Navigation } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

export const LocationSection: React.FC = () => {
  return (
    <section className="py-24 bg-slate-50 relative overflow-hidden" id="location">
      {/* Decorative Background Element */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-teal-100 rounded-full blur-3xl -z-10 opacity-60 transform translate-x-1/2 -translate-y-1/2" />

      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Visit Us</h2>
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">Find Our Clinic</h3>
            <p className="text-slate-600 mt-4 max-w-2xl mx-auto">
              Conveniently located in the heart of Lapu-Lapu City. We offer ample parking and a comfortable waiting area.
            </p>
          </div>
        </FadeIn>

        <div className="grid lg:grid-cols-3 gap-8 items-start">
          
          {/* Contact Info Card */}
          <div className="lg:col-span-1 h-full">
            <FadeIn delay={0.1} className="h-full">
              <div className="bg-white rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col overflow-hidden relative group">
                 
                 {/* Decorative background blob inside card */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-teal-100 transition-colors duration-500 pointer-events-none" />

                 <div className="relative z-10 flex flex-col h-full">
                    
                    {/* Address Group */}
                    <div className="p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 shadow-sm mt-1">
                                 <MapPin size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-900 mb-2">Our Location</h4>
                                <p className="text-slate-600 text-sm leading-relaxed mb-3">
                                  2nd Floor, Antigua's Place,<br />
                                  S. Osmeña Street, Gun-ob,<br />
                                  Lapu-Lapu City, 6015
                                </p>
                                <a 
                                  href="https://maps.google.com/maps?q=Antigua's+Place+Lapu-Lapu+City" 
                                  target="_blank" 
                                  rel="noopener noreferrer"
                                  className="text-teal-600 text-xs font-bold uppercase tracking-wider inline-flex items-center gap-1 hover:text-teal-800 transition-colors border-b border-transparent hover:border-teal-600"
                                >
                                  Get Directions <ExternalLink size={12} />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Contact Group */}
                    <div className="p-6 border-b border-slate-100 hover:bg-slate-50/50 transition-colors">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 shadow-sm mt-1">
                                 <Phone size={20} />
                            </div>
                            <div>
                                <h4 className="font-bold text-base text-slate-900 mb-2">Contact Details</h4>
                                <p className="text-slate-900 font-bold text-lg mb-1 hover:text-teal-600 transition-colors">
                                    <a href="tel:09332366403">0933 236 6403</a>
                                </p>
                                <p className="text-slate-500 text-xs mb-3">Available on Mobile & Viber</p>
                                <a href="mailto:kimmakiling@yahoo.com" className="flex items-center gap-2 text-sm text-slate-600 hover:text-teal-600 transition-colors">
                                    <Mail size={14} /> kimmakiling@yahoo.com
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Hours Group */}
                    <div className="p-6 hover:bg-slate-50/50 transition-colors flex-grow">
                        <div className="flex gap-4 items-start">
                            <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center text-teal-600 shadow-sm mt-1">
                                 <Clock size={20} />
                            </div>
                            <div className="w-full">
                                <h4 className="font-bold text-base text-slate-900 mb-2">Opening Hours</h4>
                                <ul className="text-sm text-slate-600 space-y-3 mt-1">
                                    <li className="flex items-center justify-between w-full border-b border-dashed border-slate-200 pb-2">
                                        <span className="text-slate-500 font-medium">Mon - Sat</span>
                                        <span className="font-bold text-slate-900">9:00 AM - 5:00 PM</span>
                                    </li>
                                    <li className="flex items-center justify-between w-full pt-1">
                                        <span className="text-slate-500 font-medium">Sunday</span>
                                        <span className="font-bold text-teal-600 bg-teal-50 px-2 py-0.5 rounded text-xs">Closed</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Interactive Map */}
          <div className="lg:col-span-2 h-full min-h-[500px] lg:min-h-0">
            <FadeIn delay={0.3} className="h-full">
              <div className="w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white relative group min-h-[500px]">
                <iframe 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, minHeight: '500px' }}
                  loading="lazy"
                  allowFullScreen
                  referrerPolicy="no-referrer-when-downgrade"
                  src="https://maps.google.com/maps?q=Antigua's+Place+Lapu-Lapu+City&t=&z=15&ie=UTF8&iwloc=&output=embed"
                  title="B&K Dental Clinic Location Map"
                  className="grayscale-[0%] group-hover:grayscale-0 transition-all duration-500 w-full h-full"
                ></iframe>
                
                {/* Clickable Overlay Link */}
                <a 
                  href="https://maps.google.com/maps?q=Antigua's+Place+Lapu-Lapu+City" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-800 text-xs font-bold px-4 py-3 rounded-xl shadow-lg border border-slate-200 flex items-center gap-2 hover:bg-slate-900 hover:text-white transition-all transform hover:scale-105 group-hover:shadow-xl"
                >
                  <Navigation size={14} /> Open in Google Maps
                </a>
              </div>
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  );
};