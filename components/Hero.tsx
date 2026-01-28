import React from 'react';
import { CheckCircle2, Star, ArrowRight } from 'lucide-react';
import { Link } from './SimpleRouter';
import { FadeIn } from './ui/FadeIn';

export const Hero: React.FC = () => {
  
  const scrollToServices = (e: React.MouseEvent) => {
    e.preventDefault();
    const element = document.getElementById('services');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative min-h-[90vh] flex items-center bg-teal-50 overflow-hidden pt-20">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-teal-100/30 -skew-x-12 translate-x-1/4 hidden lg:block" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-200/20 rounded-full blur-3xl" />

      <div className="container mx-auto px-4 relative z-10 grid lg:grid-cols-2 gap-16 items-center">
        {/* Left Content */}
        <FadeIn className="space-y-8 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full shadow-sm border border-teal-100 text-teal-700 font-medium text-sm">
            <Star size={14} fill="currentColor" /> 5.0 Rating (6 Reviews)
          </div>
          
          <h1 className="text-4xl lg:text-7xl font-serif font-bold text-slate-900 leading-[1.1]">
            A Healthy Smile Means a <span className="text-teal-600">Healthier You</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-xl mx-auto lg:mx-0 leading-relaxed">
            Experience expert dental care with <strong>Dr. Kim Daclan</strong>. Specializing in non-extraction orthodontics and holistic oral health. 
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
             <Link 
               to="/booking"
               className="inline-flex items-center justify-center gap-2 bg-teal-600 text-white font-bold text-lg px-8 py-4 rounded-full hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-500/30 transform hover:-translate-y-1 transition-all duration-300"
             >
               Book Appointment <ArrowRight size={20} />
             </Link>
             <button 
               onClick={scrollToServices}
               className="inline-flex items-center justify-center gap-2 bg-white text-slate-700 font-bold text-lg px-8 py-4 rounded-full border border-slate-200 hover:border-teal-300 hover:text-teal-700 transition-all duration-300"
             >
               Our Services
             </button>
          </div>

          <div className="flex flex-wrap justify-center lg:justify-start gap-6 text-sm font-medium text-slate-700 pt-4 border-t border-slate-200/60 mt-8">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-teal-500" size={20} />
              <span>Proper Case Diagnosis</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="text-teal-500" size={20} />
              <span>Expanders & Braces</span>
            </div>
            <div className="flex items-center gap-2">
               <CheckCircle2 className="text-teal-500" size={20} />
               <span>Holistic Care</span>
            </div>
          </div>
        </FadeIn>

        {/* Right Image */}
        <div 
          className="relative hidden lg:block"
        >
          <FadeIn delay={0.2}>
            <div className="relative z-20 rounded-[2.5rem] overflow-hidden shadow-2xl border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1606811841689-23dfddce3e95?auto=format&fit=crop&q=80&w=800" 
                alt="Patient Smiling" 
                className="w-full h-auto object-cover transform hover:scale-105 transition-transform duration-700"
              />
               {/* Floating Badge */}
              <div className="absolute bottom-8 left-8 bg-white/95 backdrop-blur px-6 py-4 rounded-2xl shadow-lg border border-teal-50">
                 <p className="text-teal-900 font-serif font-bold text-xl">Dr. Kim Daclan</p>
                 <p className="text-teal-600 text-sm">Lead Dentist</p>
              </div>
            </div>
            
            {/* Decorative blobs behind */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-teal-400/20 rounded-full blur-3xl -z-10" />
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl -z-10" />
          </FadeIn>
        </div>
      </div>
    </section>
  );
};