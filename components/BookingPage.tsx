import React, { useState, useRef, useEffect } from 'react';
import { AlertCircle, Check, Loader2, Sparkles, Home, Mail, Cake, ChevronDown, Calendar as CalendarIcon } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { Link } from './SimpleRouter';
import { BookingCalendar } from './booking/BookingCalendar';
import { ServiceSelector } from './booking/ServiceSelector';
import { useBookings } from '../context/BookingContext';

export const BookingPage: React.FC = () => {
  const { addBooking, getBookedSlots } = useBookings();
  const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    birthday: '',
    date: '',
    time: '',
    type: 'Consultation',
    notes: ''
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  // Popover States
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [isDobOpen, setIsDobOpen] = useState(false);
  
  const calendarWrapperRef = useRef<HTMLDivElement>(null);
  const dobWrapperRef = useRef<HTMLDivElement>(null);

  // Computed unavailable slots based on selected date
  const blockedTimes = formState.date ? getBookedSlots(formState.date) : [];

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarWrapperRef.current && !calendarWrapperRef.current.contains(event.target as Node)) {
        setIsCalendarOpen(false);
      }
      if (dobWrapperRef.current && !dobWrapperRef.current.contains(event.target as Node)) {
        setIsDobOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    if (digits.length > 11) return;

    let formatted = digits;
    if (digits.length > 7) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else if (digits.length > 4) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }

    setFormState(prev => ({ ...prev, phone: formatted }));

    if (digits.length > 0 && digits.length < 11) {
      setErrors(prev => ({ ...prev, phone: "Mobile number must be 11 digits (e.g., 0912 345 6789)" }));
    } else {
      setErrors(prev => { const n = {...prev}; delete n.phone; return n; });
    }
  };

  const validateEmail = (value: string) => {
    if (!value) return ""; 
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) return "Please enter a valid email address";
    return "";
  };

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setFormState(prev => ({ ...prev, email: val }));
    const errorMsg = validateEmail(val);
    setErrors(prev => {
       const newErrors = { ...prev };
       if (errorMsg && val.length > 0) newErrors.email = errorMsg;
       else delete newErrors.email;
       return newErrors;
    });
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};
    if (!formState.name.trim()) newErrors.name = "Name is required";
    const phoneDigits = formState.phone.replace(/\D/g, '');
    if (phoneDigits.length !== 11) newErrors.phone = "Please enter a valid 11-digit mobile number";
    const emailError = validateEmail(formState.email);
    if (emailError) newErrors.email = emailError;
    if (!formState.birthday) newErrors.birthday = "Complete date of birth is required";
    if (!formState.date) newErrors.date = "Please select a date from the calendar";
    if (!formState.time) newErrors.time = "Please select a time slot";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
       window.scrollTo({ top: 100, behavior: 'smooth' });
       return;
    }
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Save to Context
    addBooking({
      name: formState.name,
      phone: formState.phone,
      email: formState.email,
      service: formState.type,
      date: formState.date,
      time: formState.time,
      notes: formState.notes
    });

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const resetForm = () => {
    setFormState({
      name: '', phone: '', email: '', birthday: '',
      date: '', time: '', type: 'Consultation', notes: ''
    });
    setIsSuccess(false);
  };

  const handleDateTimeSelect = (date: string, time: string) => {
    setFormState(prev => ({ ...prev, date, time }));
    if (errors.date) setErrors(prev => { const n = {...prev}; delete n.date; return n; });
    if (time && errors.time) setErrors(prev => { const n = {...prev}; delete n.time; return n; });
    
    if (date && time) setIsCalendarOpen(false);
  };

  const handleBirthdaySelect = (date: string) => {
    setFormState(prev => ({ ...prev, birthday: date }));
    if (errors.birthday) setErrors(prev => { const n = {...prev}; delete n.birthday; return n; });
    setIsDobOpen(false);
  };

  if (isSuccess) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-lg">
          <FadeIn>
            <div className="bg-white rounded-[2rem] shadow-2xl p-10 text-center border border-teal-100 relative overflow-hidden">
               <div className="absolute inset-0 bg-teal-50/50 -z-10"></div>
               <div className="w-20 h-20 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-6 text-teal-600 animate-bounce">
                 <Check size={40} strokeWidth={4} />
               </div>
               <h2 className="text-3xl font-serif font-bold text-slate-900 mb-2">Booking Requested!</h2>
               <p className="text-slate-600 mb-6 leading-relaxed">
                 Thank you, <strong>{formState.name}</strong>. <br/>
                 We have reserved your slot for a <strong>{formState.type}</strong> on <strong>{formState.date}</strong> at <strong>{formState.time}</strong>.
               </p>
               <div className="space-y-3">
                 <Link to="/" className="block w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition-all flex items-center justify-center gap-2">
                   <Home size={18} /> Back to Home
                 </Link>
                 <button onClick={resetForm} className="block w-full bg-white text-slate-600 font-bold py-4 rounded-xl border border-slate-200 hover:bg-slate-50 transition-all">
                   Book Another Appointment
                 </button>
               </div>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 max-w-3xl">
        <FadeIn>
          <div className="text-center mb-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm text-teal-600 text-sm font-bold uppercase tracking-wider mb-4 border border-teal-100">
               <Sparkles size={16} /> Online Booking
            </div>
            <h1 className="text-4xl md:text-5xl font-serif font-bold text-slate-900 mb-4">Secure Your Smile</h1>
            <p className="text-slate-600 text-lg">Select a service and date below. We'll send a confirmation to your email.</p>
          </div>
        </FadeIn>

        <FadeIn delay={0.1}>
          <div className="bg-white rounded-[2.5rem] shadow-xl shadow-slate-200/60 overflow-hidden border border-slate-100 relative">
            <div className="h-2 bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 w-full" />
            
            <div className="p-6 md:p-10">
              <form onSubmit={handleSubmit} className="space-y-10">
                
                {/* 1. Service Selection */}
                <div className="space-y-4">
                   <div className="flex items-center gap-3 mb-2">
                     <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">1</span>
                     <label className="text-lg font-bold text-slate-800">Select Service</label>
                   </div>
                   <ServiceSelector 
                      selected={formState.type} 
                      onSelect={(val) => setFormState({...formState, type: val})} 
                   />
                </div>

                {/* 2. Date & Time Selection (Dropdown Style) */}
                <div className="space-y-4" ref={calendarWrapperRef}>
                  <div className="flex items-center gap-3 mb-2">
                     <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">2</span>
                     <label className="text-lg font-bold text-slate-800">Choose Date & Time</label>
                   </div>
                  
                  <div className="relative">
                      <button
                        type="button"
                        onClick={() => { setIsCalendarOpen(!isCalendarOpen); setIsDobOpen(false); }}
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border flex items-center justify-between transition-all outline-none text-left
                            ${(errors.date || errors.time) ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'}
                            ${isCalendarOpen ? 'border-teal-500 ring-4 ring-teal-500/10 bg-white' : 'hover:bg-white'}
                        `}
                      >
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-0.5">
                                {formState.date ? 'Appointment Date' : 'Select Date'}
                            </span>
                            {formState.date ? (
                                <span className="font-medium text-lg text-slate-900">
                                    {new Date(formState.date).toLocaleDateString('en-US', { weekday: 'short', month: 'long', day: 'numeric' })}
                                    {formState.time && <span className="text-teal-600"> @ {formState.time}</span>}
                                </span>
                            ) : (
                                <span className="font-medium text-base text-slate-400">
                                    Tap to view calendar
                                </span>
                            )}
                        </div>
                        <CalendarIcon size={24} className={`transition-colors ${isCalendarOpen || formState.date ? 'text-teal-600' : 'text-slate-400'}`} /> 
                      </button>

                      {isCalendarOpen && (
                        <div className="absolute top-[calc(100%+12px)] left-0 w-full z-30 animate-in fade-in slide-in-from-top-4 duration-200">
                            <div className="shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
                                <BookingCalendar 
                                    selectedDate={formState.date}
                                    selectedTime={formState.time}
                                    onDateTimeSelect={handleDateTimeSelect}
                                    error={errors.date || errors.time}
                                    enableTime={true}
                                    blockedTimes={blockedTimes}
                                />
                            </div>
                        </div>
                      )}
                  </div>
                </div>

                {/* 3. Personal Info */}
                <div className="space-y-4">
                  <div className="flex items-center gap-3 mb-4">
                     <span className="bg-teal-100 text-teal-700 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm">3</span>
                     <label className="text-lg font-bold text-slate-800">Your Details</label>
                   </div>
                  
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Full Name</label>
                      <input 
                        type="text" 
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border ${errors.name ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 hover:bg-white`}
                        placeholder="Juan dela Cruz"
                        value={formState.name}
                        onChange={(e) => {
                          setFormState({...formState, name: e.target.value});
                          if(e.target.value) setErrors(prev => { const n = {...prev}; delete n.name; return n; });
                        }}
                      />
                      {errors.name && <p className="text-red-500 text-xs ml-1">{errors.name}</p>}
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Mobile Number</label>
                      <input 
                        type="tel" 
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border ${errors.phone ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 hover:bg-white`}
                        placeholder="0912 345 6789"
                        value={formState.phone}
                        onChange={handlePhoneChange}
                      />
                      {errors.phone && <p className="text-red-500 text-xs ml-1">{errors.phone}</p>}
                    </div>

                    <div className="space-y-2">
                      <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email Address (Optional)</label>
                      <input 
                        type="email" 
                        className={`w-full px-5 py-4 rounded-xl bg-slate-50 border ${errors.email ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400 hover:bg-white`}
                        placeholder="juan@example.com"
                        value={formState.email}
                        onChange={handleEmailChange}
                      />
                      {errors.email && <p className="text-red-500 text-xs ml-1">{errors.email}</p>}
                    </div>

                    {/* Date of Birth Field */}
                    <div className="space-y-2" ref={dobWrapperRef}>
                       <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 flex items-center gap-1">
                          Date of Birth <Cake size={12} className="text-teal-500"/>
                       </label>
                       
                       <div className="relative">
                          <button
                            type="button"
                            onClick={() => { setIsDobOpen(!isDobOpen); setIsCalendarOpen(false); }}
                            className={`w-full px-5 py-4 rounded-xl bg-slate-50 border flex items-center justify-between transition-all outline-none text-left
                                ${errors.birthday ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'}
                                ${isDobOpen ? 'border-teal-500 ring-4 ring-teal-500/10 bg-white' : 'hover:bg-white'}
                            `}
                          >
                            <span className={`font-medium ${formState.birthday ? 'text-slate-900' : 'text-slate-400'}`}>
                              {formState.birthday 
                                ? new Date(formState.birthday).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
                                : "MM / DD / YYYY"
                              }
                            </span>
                            <ChevronDown 
                              size={16} 
                              className={`text-slate-400 flex-shrink-0 transition-transform duration-300 ${isDobOpen ? 'rotate-180 text-teal-500' : ''}`} 
                            />
                          </button>

                          {isDobOpen && (
                            <div className="absolute top-[calc(100%+8px)] left-0 w-full z-30 animate-in fade-in slide-in-from-top-4 duration-200">
                                <div className="shadow-2xl rounded-2xl overflow-hidden ring-1 ring-black/5">
                                    <BookingCalendar 
                                        selectedDate={formState.birthday}
                                        onDateTimeSelect={(d) => handleBirthdaySelect(d)}
                                        enableTime={false}
                                    />
                                </div>
                            </div>
                          )}
                       </div>
                       
                       {errors.birthday && <p className="text-red-500 text-xs ml-1">{errors.birthday}</p>}
                    </div>
                  </div>

                  <div className="space-y-2">
                     <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Notes (Optional)</label>
                     <textarea 
                        className="w-full px-5 py-4 rounded-xl bg-slate-50 border border-slate-200 focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all min-h-[120px] font-medium text-slate-800 placeholder:text-slate-400 resize-none hover:bg-white"
                        placeholder="Any specific concerns, pain points, or previous history?"
                        value={formState.notes}
                        onChange={(e) => setFormState({...formState, notes: e.target.value})}
                     ></textarea>
                  </div>
                </div>

                <div className="pt-4">
                  <button type="submit" disabled={isSubmitting} className="w-full bg-teal-600 disabled:bg-teal-400 text-white font-bold text-lg py-5 rounded-xl hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-500/20 transform hover:-translate-y-1 active:translate-y-0 transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group">
                    {isSubmitting ? <><Loader2 size={24} className="animate-spin" /><span>Submitting...</span></> : <><span>Confirm Booking</span><div className="bg-white/20 rounded-full p-1 group-hover:bg-white/30 transition-colors"><Check size={16} strokeWidth={3} /></div></>}
                  </button>
                  <p className="text-center text-xs text-slate-400 mt-4">By booking, you agree to our clinic policies. Payment is done at the clinic.</p>
                </div>
              </form>
            </div>
          </div>
        </FadeIn>
      </div>
    </div>
  );
};