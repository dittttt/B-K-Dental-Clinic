import React, { useState } from 'react';
import { Phone, Calendar, Clock, FileText, User, Search, History, LogOut, AlertCircle, CheckCircle } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';
import { useBookings } from '../context/BookingContext';
import { Link } from './SimpleRouter';

export const PatientPortal: React.FC = () => {
  const { getPatientBookings } = useBookings();
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'history'>('upcoming');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. Strip non-numeric
    const digits = e.target.value.replace(/\D/g, '');
    
    // 2. Lock to 11 digits
    if (digits.length > 11) return;

    // 3. Format
    let formatted = digits;
    if (digits.length > 7) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
    } else if (digits.length > 4) {
      formatted = `${digits.slice(0, 4)} ${digits.slice(4)}`;
    }

    setPhone(formatted);
    setError("");
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    setIsLoggedIn(true);
    setError('');
  };

  // Logic to fetch and sort bookings
  const myBookings = isLoggedIn ? getPatientBookings(phone) : [];
  
  const today = new Date().toISOString().split('T')[0];

  const upcoming = myBookings
    .filter(b => b.date >= today && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const history = myBookings
    .filter(b => b.date < today || b.status === 'cancelled')
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  const displayedBookings = activeTab === 'upcoming' ? upcoming : history;

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <FadeIn>
            <div className="bg-white rounded-[2rem] shadow-xl p-8 border border-slate-100 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
              
              <div className="text-center mb-8 relative z-10">
                <div className="w-16 h-16 bg-teal-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-teal-600 shadow-sm transform rotate-3">
                  <User size={32} />
                </div>
                <h1 className="text-2xl font-serif font-bold text-slate-900">Patient Portal</h1>
                <p className="text-slate-500 text-sm mt-2">Enter your registered mobile number to view your history and upcoming appointments.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4 relative z-10">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1 ml-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full pl-12 pr-4 py-3.5 rounded-xl bg-slate-50 border ${error ? 'border-red-300 ring-2 ring-red-100' : 'border-slate-200'} focus:border-teal-500 focus:ring-4 focus:ring-teal-500/10 outline-none transition-all font-medium text-slate-800 placeholder:text-slate-400`}
                      placeholder="0912 345 6789"
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs mt-2 ml-1 flex items-center gap-1"><AlertCircle size={12}/> {error}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-slate-900/20"
                >
                  <Search size={18} /> Access Records
                </button>
              </form>
              
              <div className="mt-6 text-center text-xs text-slate-400 relative z-10">
                 Not yet registered? <Link to="/booking" className="text-teal-600 font-bold hover:underline">Book an appointment</Link>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <FadeIn>
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
                <h1 className="text-3xl font-serif font-bold text-slate-900">My Appointments</h1>
                <p className="text-slate-600">Viewing records for <span className="font-bold text-teal-600">{phone}</span></p>
            </div>
            <button 
                onClick={() => { setIsLoggedIn(false); setPhone(''); }} 
                className="text-sm font-bold text-slate-500 hover:text-red-500 transition-colors flex items-center gap-2 bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
            >
                <LogOut size={16} /> Log Out
            </button>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
                
                {/* Tabs */}
                <div className="flex p-1 bg-white rounded-xl border border-slate-200 shadow-sm mb-6">
                    <button 
                        onClick={() => setActiveTab('upcoming')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'upcoming' ? 'bg-teal-50 text-teal-700 shadow-sm ring-1 ring-teal-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <Calendar size={16} /> Upcoming <span className="bg-white/50 px-1.5 rounded-md text-xs">{upcoming.length}</span>
                    </button>
                    <button 
                        onClick={() => setActiveTab('history')}
                        className={`flex-1 py-2.5 text-sm font-bold rounded-lg transition-all flex items-center justify-center gap-2 ${activeTab === 'history' ? 'bg-slate-100 text-slate-700 shadow-sm ring-1 ring-slate-200' : 'text-slate-500 hover:text-slate-700'}`}
                    >
                        <History size={16} /> History
                    </button>
                </div>

                {displayedBookings.length > 0 ? (
                    <div className="space-y-4">
                        {displayedBookings.map(apt => (
                        <div key={apt.id} className="bg-white border border-slate-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                            {/* Status Bar */}
                            <div className={`absolute left-0 top-0 bottom-0 w-1.5 ${apt.status === 'confirmed' ? 'bg-teal-500' : apt.status === 'cancelled' ? 'bg-red-300' : 'bg-slate-300'}`} />
                            
                            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pl-3">
                                <div className="flex items-start gap-4">
                                    <div className="bg-slate-50 w-16 h-16 rounded-2xl flex flex-col items-center justify-center text-slate-700 border border-slate-100 flex-shrink-0">
                                        <span className="text-xs font-bold uppercase tracking-wider">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                                        <span className="text-2xl font-serif font-bold leading-none">{new Date(apt.date).getDate()}</span>
                                        <span className="text-[10px] font-medium text-slate-400">{new Date(apt.date).getFullYear()}</span>
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 text-lg">{apt.service}</h3>
                                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                                            <Clock size={14} className="text-teal-500" /> {apt.time}
                                        </p>
                                        <p className="text-xs text-slate-400 mt-2">ID: #{apt.id.toUpperCase()}</p>
                                    </div>
                                </div>
                                <div className="flex flex-row sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2">
                                    {apt.status === 'confirmed' && (
                                        <span className="bg-teal-100 text-teal-700 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                                            <CheckCircle size={12} /> Confirmed
                                        </span>
                                    )}
                                    {apt.status === 'cancelled' && (
                                        <span className="bg-red-50 text-red-500 text-xs font-bold px-3 py-1 rounded-full">
                                            Cancelled
                                        </span>
                                    )}
                                    {apt.status === 'completed' && (
                                        <span className="bg-slate-100 text-slate-500 text-xs font-bold px-3 py-1 rounded-full">
                                            Completed
                                        </span>
                                    )}
                                </div>
                            </div>
                            {apt.notes && (
                                <div className="mt-4 pl-3 pt-3 border-t border-slate-50 text-sm text-slate-500 italic flex gap-2">
                                    <FileText size={16} className="flex-shrink-0 mt-0.5 text-slate-400" />
                                    "{apt.notes}"
                                </div>
                            )}
                        </div>
                        ))}
                    </div>
                ) : (
                    <div className="bg-white rounded-2xl p-12 text-center border border-slate-100 border-dashed">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-300">
                           <Calendar size={32} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900 mb-1">No appointments found</h3>
                        <p className="text-slate-500 text-sm mb-6">You don't have any {activeTab} bookings linked to this number.</p>
                        {activeTab === 'upcoming' && (
                            <Link to="/booking" className="inline-flex items-center gap-2 bg-teal-600 text-white font-bold px-6 py-3 rounded-xl hover:bg-teal-700 transition-colors">
                                Book New Appointment
                            </Link>
                        )}
                    </div>
                )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
                <div className="bg-slate-900 text-white rounded-[2rem] p-8 shadow-xl relative overflow-hidden">
                    <div className="relative z-10">
                        <h3 className="font-serif font-bold text-2xl mb-2">Need Assistance?</h3>
                        <p className="text-slate-300 text-sm mb-8 leading-relaxed">
                            Need to reschedule or cancel? Give us a call directly and we'll help you sort it out.
                        </p>
                        <a href="tel:09332366403" className="block w-full bg-white text-slate-900 text-center py-4 rounded-xl font-bold hover:bg-teal-50 transition-colors shadow-lg">
                            <span className="flex items-center justify-center gap-2"><Phone size={18}/> Call Clinic</span>
                        </a>
                        <p className="text-center text-xs text-slate-500 mt-4">Available Mon-Sat, 9AM-5PM</p>
                    </div>
                    {/* Decor */}
                    <div className="absolute top-0 right-0 w-40 h-40 bg-teal-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                    <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>
                </div>
            </div>
            </div>
        </FadeIn>
      </div>
    </div>
  );
};