import React from 'react';
import { Calendar, ShieldCheck, UserCheck } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

export const WhyUs: React.FC = () => {
  return (
    <section id="why-us" className="py-24 bg-teal-900 text-white relative overflow-hidden">
      {/* Background patterns */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute right-0 top-0 w-96 h-96 bg-teal-400 rounded-full blur-[100px]" />
        <div className="absolute left-0 bottom-0 w-64 h-64 bg-teal-200 rounded-full blur-[80px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <FadeIn>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?auto=format&fit=crop&q=80&w=800" 
                alt="Modern Dental Clinic Equipment" 
                className="rounded-2xl shadow-2xl relative z-10"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-xl shadow-xl z-20 hidden md:block">
                <p className="text-teal-900 font-bold text-lg">Dr. Kim Daclan</p>
                <p className="text-teal-600 text-sm">Lead Dentist</p>
              </div>
              <div className="absolute top-6 -left-6 w-24 h-24 bg-teal-500/20 rounded-full -z-10" />
            </div>
          </FadeIn>

          <FadeIn delay={0.2}>
            <h2 className="text-teal-400 font-bold tracking-wider uppercase text-sm mb-2">Why Choose B&K</h2>
            <h3 className="text-3xl lg:text-5xl font-serif font-bold mb-6">Your Comfort is Our Priority</h3>
            <p className="text-teal-100 text-lg mb-8 leading-relaxed">
              At B&K Dental Clinic, we believe oral health is the foundation of overall health. 
              We don't just treat teeth; we treat people.
            </p>

            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="bg-teal-800 p-3 rounded-lg h-fit">
                  <Calendar className="text-teal-300" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Appointment Based Only</h4>
                  <p className="text-teal-200 text-sm">We respect your time. No overcrowded waiting rooms. Every slot is dedicated entirely to you.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-teal-800 p-3 rounded-lg h-fit">
                  <ShieldCheck className="text-teal-300" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Conservative Approach</h4>
                  <p className="text-teal-200 text-sm">No extractions unless absolutely necessary. We prioritize keeping your natural smile intact.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="bg-teal-800 p-3 rounded-lg h-fit">
                  <UserCheck className="text-teal-300" size={24} />
                </div>
                <div>
                  <h4 className="text-xl font-bold mb-1">Personalized Care</h4>
                  <p className="text-teal-200 text-sm">Proper case diagnosis and treatment planning tailored to your specific physiology.</p>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
};