import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { FaqItem } from '../types';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      question: "Do you accept walk-in patients?",
      answer: "No, B&K Dental Clinic operates on a strict appointment-only basis. This ensures we can dedicate our full attention and time to your treatment without rushing."
    },
    {
      question: "What are your operating hours?",
      answer: "We are open Monday through Saturday from 9:00 AM to 5:00 PM. We are closed on Sundays."
    },
    {
      question: "Do you offer braces without tooth extraction?",
      answer: "Yes! Dr. Kim Daclan specializes in non-extraction orthodontics, utilizing expanders and braces with proper case diagnosis to create beautiful, broad smiles without removing healthy teeth whenever possible."
    },
    {
      question: "Where is the clinic located?",
      answer: "We are located at Antigua's Place, S. Osmeña Street, Lapu-Lapu, 6015 Cebu (Postal Code 8X34+7F7)."
    }
  ];

  return (
    <section id="faq" className="py-24 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <div className="text-center mb-12">
            <h2 className="text-teal-600 font-bold tracking-wider uppercase text-sm mb-2">Common Questions</h2>
            <h3 className="text-3xl font-serif font-bold text-slate-900">Frequently Asked Questions</h3>
          </div>
        </FadeIn>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <FadeIn key={index} delay={index * 0.1}>
              <div 
                className={`border rounded-2xl transition-all duration-300 ${openIndex === index ? 'border-teal-200 bg-teal-50/50' : 'border-slate-200 bg-white hover:border-teal-200'}`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <span className={`font-semibold text-lg ${openIndex === index ? 'text-teal-800' : 'text-slate-800'}`}>
                    {faq.question}
                  </span>
                  {openIndex === index ? (
                    <Minus className="text-teal-600 flex-shrink-0" />
                  ) : (
                    <Plus className="text-slate-400 flex-shrink-0" />
                  )}
                </button>
                <div 
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${openIndex === index ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}
                >
                  <div className="p-6 pt-0 text-slate-600 leading-relaxed">
                    {faq.answer}
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
};