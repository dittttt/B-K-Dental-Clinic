import React, { useState } from 'react';
import { Phone, Calendar, Clock, FileText, User, Search, History } from 'lucide-react';
import { FadeIn } from './ui/FadeIn';

// Mock Data
const MOCK_HISTORY = [
  { id: 1, date: '2023-10-15', service: 'Cleaning', doctor: 'Dr. Kim Daclan', notes: 'Routine prophylaxis. No cavities found.' },
  { id: 2, date: '2023-06-20', service: 'Consultation', doctor: 'Dr. Kim Daclan', notes: 'Discussed potential braces. X-rays taken.' },
];

const MOCK_UPCOMING = [
  { id: 3, date: '2023-12-05', time: '10:00 AM', service: 'Orthodontics Adjustment', doctor: 'Dr. Kim Daclan' }
];

export const PatientPortal: React.FC = () => {
  const [phone, setPhone] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState('');

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

    // 4. Validation
    if (digits.length > 0 && digits.length < 11) {
        setError("Mobile number looks too short");
    } else {
        setError("");
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanPhone = phone.replace(/\D/g, '');
    if (cleanPhone.length < 10) {
      setError('Please enter a valid mobile number');
      return;
    }
    // Simulate login for any valid-ish phone number
    setIsLoggedIn(true);
    setError('');
  };

  if (!isLoggedIn) {
    return (
      <div className="pt-32 pb-20 min-h-screen bg-slate-50 flex items-center justify-center">
        <div className="container mx-auto px-4 max-w-md">
          <FadeIn>
            <div className="bg-white rounded-2xl shadow-xl p-8 border border-slate-100">
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4 text-teal-600">
                  <User size={32} />
                </div>
                <h1 className="text-2xl font-serif font-bold text-slate-900">Patient Portal</h1>
                <p className="text-slate-500 text-sm mt-2">Enter your registered mobile number to view your history and upcoming appointments.</p>
              </div>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Mobile Number</label>
                  <div className="relative">
                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      className={`w-full pl-12 pr-4 py-3 rounded-xl bg-slate-50 border ${error ? 'border-red-300 ring-1 ring-red-100' : 'border-slate-200'} focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all`}
                      placeholder="0912 345 6789"
                    />
                  </div>
                  {error && <p className="text-red-500 text-xs mt-2">{error}</p>}
                </div>
                <button 
                  type="submit"
                  className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-colors flex items-center justify-center gap-2"
                >
                  <Search size={18} /> Access Records
                </button>
              </form>
            </div>
          </FadeIn>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-20 min-h-screen bg-slate-50">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="flex justify-between items-end mb-8">
           <div>
             <h1 className="text-3xl font-serif font-bold text-slate-900">Welcome Back</h1>
             <p className="text-slate-600">Patient Records for <span className="font-bold text-teal-600">{phone}</span></p>
           </div>
           <button onClick={() => setIsLoggedIn(false)} className="text-sm text-slate-500 underline hover:text-slate-800">
             Log Out
           </button>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="md:col-span-2 space-y-8">
            
            {/* Upcoming Section */}
            <FadeIn>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                 <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <Calendar className="text-teal-500" size={20} /> Upcoming Appointments
                 </h2>
                 
                 {MOCK_UPCOMING.length > 0 ? (
                   <div className="space-y-3">
                     {MOCK_UPCOMING.map(apt => (
                       <div key={apt.id} className="bg-teal-50 border border-teal-100 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                          <div className="flex items-center gap-4">
                             <div className="bg-white w-14 h-14 rounded-lg flex flex-col items-center justify-center text-teal-700 shadow-sm">
                               <span className="text-xs font-bold uppercase">{new Date(apt.date).toLocaleString('default', { month: 'short' })}</span>
                               <span className="text-xl font-bold leading-none">{new Date(apt.date).getDate()}</span>
                             </div>
                             <div>
                               <h3 className="font-bold text-slate-900">{apt.service}</h3>
                               <p className="text-sm text-slate-500 flex items-center gap-1">
                                 <Clock size={12} /> {apt.time} &bull; {apt.doctor}
                               </p>
                             </div>
                          </div>
                          <span className="bg-teal-200 text-teal-800 text-xs font-bold px-3 py-1 rounded-full self-start sm:self-center">
                            Confirmed
                          </span>
                       </div>
                     ))}
                   </div>
                 ) : (
                   <p className="text-slate-500 italic">No upcoming appointments.</p>
                 )}
              </div>
            </FadeIn>

            {/* History Section */}
            <FadeIn delay={0.1}>
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
                <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                   <History className="text-slate-500" size={20} /> Treatment History
                 </h2>
                 <div className="space-y-4">
                   {MOCK_HISTORY.map(record => (
                     <div key={record.id} className="border-l-2 border-slate-200 pl-4 py-1">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-bold text-slate-800">{record.service}</h3>
                          <span className="text-xs text-slate-400">{record.date}</span>
                        </div>
                        <p className="text-sm text-slate-600 mb-2">{record.doctor}</p>
                        <div className="bg-slate-50 p-3 rounded-lg text-sm text-slate-500 italic flex gap-2">
                           <FileText size={16} className="flex-shrink-0 mt-0.5" />
                           {record.notes}
                        </div>
                     </div>
                   ))}
                 </div>
              </div>
            </FadeIn>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-1">
             <FadeIn delay={0.2}>
               <div className="bg-slate-900 text-white rounded-2xl p-6 shadow-xl relative overflow-hidden">
                 <div className="relative z-10">
                   <h3 className="font-serif font-bold text-xl mb-2">Need Help?</h3>
                   <p className="text-slate-300 text-sm mb-6">Contact our support team if you need to reschedule or have questions about your records.</p>
                   <a href="tel:09332366403" className="block w-full bg-teal-600 text-center py-3 rounded-xl font-bold hover:bg-teal-500 transition-colors">
                     Call Clinic
                   </a>
                 </div>
                 {/* Decor */}
                 <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/20 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               </div>
             </FadeIn>
          </div>
        </div>
      </div>
    </div>
  );
};