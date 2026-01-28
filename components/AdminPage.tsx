import React, { useState } from 'react';
import { Lock, Search, Calendar, Users, Clock, LogOut, CheckCircle, Eye, EyeOff, Wifi, WifiOff, Database } from 'lucide-react';
import { useBookings } from '../context/BookingContext';
import { FadeIn } from './ui/FadeIn';
import { isSupabaseConfigured } from '../lib/supabaseClient';

export const AdminPage: React.FC = () => {
  const { bookings, cancelBooking } = useBookings();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState<'upcoming' | 'past'>('upcoming');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === 'mugimugi123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
        <FadeIn>
          <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-200">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                <Lock size={32} />
              </div>
              <h1 className="text-2xl font-serif font-bold text-slate-900">Admin Portal</h1>
              <p className="text-slate-500 text-sm">Restricted access only.</p>
            </div>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 bg-white text-slate-900 placeholder:text-slate-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-200 outline-none transition-all pr-12"
                  placeholder="Enter Password"
                  autoFocus
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              {error && <p className="text-red-500 text-xs text-center font-medium">{error}</p>}
              
              <button
                type="submit"
                className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/20"
              >
                Access Dashboard
              </button>
            </form>
          </div>
        </FadeIn>
      </div>
    );
  }

  const today = new Date().toISOString().split('T')[0];
  
  const upcomingBookings = bookings
    .filter(b => b.date >= today && b.status !== 'cancelled')
    .sort((a, b) => new Date(a.date + ' ' + a.time).getTime() - new Date(b.date + ' ' + b.time).getTime());

  const pastBookings = bookings
    .filter(b => b.date < today || b.status === 'cancelled')
    .sort((a, b) => new Date(b.date + ' ' + b.time).getTime() - new Date(a.date + ' ' + a.time).getTime());

  const displayBookings = activeTab === 'upcoming' ? upcomingBookings : pastBookings;

  return (
    <div className="min-h-screen bg-slate-50 pt-24 pb-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
             <h1 className="text-3xl font-serif font-bold text-slate-900">Clinic Dashboard</h1>
             <div className="flex items-center gap-2 mt-1">
               <p className="text-slate-500">Manage appointments and schedules</p>
               <span className="text-slate-300">|</span>
               <div className={`flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-bold border ${isSupabaseConfigured ? 'bg-teal-50 text-teal-700 border-teal-200' : 'bg-orange-50 text-orange-700 border-orange-200'}`}>
                  {isSupabaseConfigured ? <Wifi size={12} /> : <WifiOff size={12} />}
                  {isSupabaseConfigured ? 'Cloud Connected' : 'Local Mode'}
               </div>
             </div>
          </div>
          <button 
            onClick={() => setIsAuthenticated(false)}
            className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-red-500 transition-colors bg-white px-4 py-2 rounded-lg border border-slate-200 shadow-sm"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-teal-100 text-teal-600 rounded-xl flex items-center justify-center">
              <Calendar size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Today's Bookings</p>
              <p className="text-2xl font-bold text-slate-900">
                {bookings.filter(b => b.date === today && b.status !== 'cancelled').length}
              </p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-xl flex items-center justify-center">
              <Users size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Upcoming</p>
              <p className="text-2xl font-bold text-slate-900">{upcomingBookings.length}</p>
            </div>
          </div>
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex items-center gap-4">
            <div className="w-12 h-12 bg-slate-100 text-slate-600 rounded-xl flex items-center justify-center">
              <Clock size={24} />
            </div>
            <div>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-wider">Total History</p>
              <p className="text-2xl font-bold text-slate-900">{bookings.length}</p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-xl border border-slate-100 overflow-hidden min-h-[500px]">
          {/* Tabs */}
          <div className="border-b border-slate-100 flex">
            <button 
              onClick={() => setActiveTab('upcoming')}
              className={`px-8 py-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'upcoming' ? 'border-teal-500 text-teal-600 bg-teal-50/50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Upcoming Schedule
            </button>
            <button 
              onClick={() => setActiveTab('past')}
              className={`px-8 py-4 font-bold text-sm transition-colors border-b-2 ${activeTab === 'past' ? 'border-slate-500 text-slate-800 bg-slate-50' : 'border-transparent text-slate-500 hover:text-slate-800'}`}
            >
              Past & Cancelled
            </button>
          </div>

          {/* List */}
          <div className="p-0">
            {displayBookings.length === 0 ? (
              <div className="text-center py-20 text-slate-400">
                <p>No bookings found in this category.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 text-slate-500 text-xs uppercase font-bold tracking-wider">
                    <tr>
                      <th className="px-6 py-4">Date & Time</th>
                      <th className="px-6 py-4">Patient</th>
                      <th className="px-6 py-4">Service</th>
                      <th className="px-6 py-4">Contact</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {displayBookings.map((booking) => (
                      <tr key={booking.id} className="hover:bg-slate-50/50 transition-colors">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="font-bold text-slate-900">{new Date(booking.date).toLocaleDateString()}</div>
                          <div className="text-sm text-slate-500">{booking.time}</div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="font-bold text-slate-900">{booking.name}</div>
                          {booking.notes && (
                            <div className="text-xs text-slate-400 italic max-w-[150px] truncate" title={booking.notes}>{booking.notes}</div>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className="px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 text-xs font-bold">
                            {booking.service}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                           <div className="text-sm text-slate-600">{booking.phone}</div>
                           <div className="text-xs text-slate-400">{booking.email}</div>
                        </td>
                        <td className="px-6 py-4">
                          {booking.status === 'confirmed' ? (
                            <span className="flex items-center gap-1 text-teal-600 font-bold text-sm">
                              <CheckCircle size={14} /> Confirmed
                            </span>
                          ) : (
                            <span className="text-slate-400 font-bold text-sm capitalize">{booking.status}</span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          {booking.status === 'confirmed' && (
                            <button 
                              onClick={() => cancelBooking(booking.id)}
                              className="text-red-500 hover:text-red-700 text-xs font-bold border border-red-200 hover:border-red-400 px-3 py-1 rounded-lg transition-colors"
                            >
                              Cancel
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};