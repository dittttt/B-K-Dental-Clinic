import React from 'react';
import { Smile, Sparkles, HeartPulse, Stethoscope, ArrowRight } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Link } from './SimpleRouter';

export const Services: React.FC = () => {
  const services = [
    {
      icon: <Smile className="w-6 h-6 text-white" />,
      title: "Orthodontics",
      description: "Non-extraction approach using expanders and braces. We focus on proper diagnosis and long-term stability for a natural smile.",
      image: "https://images.unsplash.com/photo-1598256989800-fe5f95da9787?auto=format&fit=crop&q=80&w=600",
      color: "bg-blue-500"
    },
    {
      icon: <Sparkles className="w-6 h-6 text-white" />,
      title: "Cosmetic Dentistry",
      description: "From whitening to veneers, we help restore your confidence. Honest, healthy, and strong enhancements for your teeth.",
      image: "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&q=80&w=600",
      color: "bg-purple-500"
    },
    {
      icon: <HeartPulse className="w-6 h-6 text-white" />,
      title: "Holistic Oral Health",
      description: "Treating the mouth as the foundation of your well-being. We understand how oral health affects heart and digestion.",
      image: "https://images.unsplash.com/photo-1571772996211-2f02c9727629?auto=format&fit=crop&q=80&w=600",
      color: "bg-green-500"
    },
    {
      icon: <Stethoscope className="w-6 h-6 text-white" />,
      title: "Preventive Care",
      description: "Regular checkups and cleanings are the best investment. A little care now prevents a lot of trouble later.",
      image: "https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=600",
      color: "bg-teal-500"
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <FadeIn>
          <div className="text-center max-w-2xl mx-auto mb-16">
            <h2 className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Our Expertise</h2>
            <h3 className="text-3xl lg:text-4xl font-serif font-bold text-slate-900 mb-4">Comprehensive Care</h3>
            <p className="text-slate-600">
              Personalized treatments by Dr. Kim Daclan. We combine modern dental science with a holistic approach to ensure your long-term health.
            </p>
          </div>
        </FadeIn>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <FadeIn key={index} delay={index * 0.1} className="h-full">
              <div className="group h-full bg-white rounded-2xl overflow-hidden shadow-lg border border-slate-100 hover:shadow-2xl hover:border-teal-200 transition-all duration-500 flex flex-col">
                
                {/* Image Header */}
                <div className="relative h-48 overflow-hidden">
                  <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-slate-900/0 transition-colors z-10" />
                  <img 
                    src={service.image} 
                    alt={service.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Floating Icon */}
                  <div className={`absolute -bottom-6 right-6 ${service.color} p-4 rounded-xl shadow-lg z-20 group-hover:-translate-y-2 transition-transform duration-300`}>
                    {service.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 pt-10 flex flex-col flex-grow">
                  <h4 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-teal-600 transition-colors">
                    {service.title}
                  </h4>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6 flex-grow">
                    {service.description}
                  </p>
                  
                  <Link 
                    to="/booking" 
                    className="inline-flex items-center text-sm font-bold text-teal-600 hover:text-teal-700 group/link"
                  >
                    Book This Service 
                    <ArrowRight size={16} className="ml-1 transform group-hover/link:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};