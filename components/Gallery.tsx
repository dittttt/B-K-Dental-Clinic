import React from 'react';
import { FadeIn } from './ui/FadeIn';

export const Gallery: React.FC = () => {
  // Using placeholder images that represent the dental theme
  const images = [
    "https://images.unsplash.com/photo-1606811971618-4486d14f3f72?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
  ];

  return (
    <section id="gallery" className="py-24 bg-slate-50">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center mb-16">
            <h2 className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Our Results</h2>
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900">Smiles Transformed</h3>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((src, idx) => (
            <FadeIn key={idx} delay={idx * 0.1}>
              <div className="group relative overflow-hidden rounded-2xl aspect-square shadow-md cursor-pointer">
                <img 
                  src={src} 
                  alt={`Gallery ${idx + 1}`} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-teal-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <p className="text-white font-serif font-bold text-lg">B&K Smile</p>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
        
        <FadeIn className="text-center mt-12">
            <p className="text-slate-600 italic">"Your teeth work hard for you every day—return the favor."</p>
        </FadeIn>
      </div>
    </section>
  );
};