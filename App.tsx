import React, { useState } from 'react';
import { RouterProvider, useRouter } from './components/SimpleRouter';
import { Navigation } from './components/Navigation';
import { Hero } from './components/Hero';
import { Services } from './components/Services';
import { WhyUs } from './components/WhyUs';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { Footer } from './components/Footer';
import { BookingPage } from './components/BookingPage';
import { LocationSection } from './components/LocationSection';
import { AdminPage } from './components/AdminPage';
import { BookingProvider } from './context/BookingContext';
import { Phone, ShieldCheck } from 'lucide-react';

const HomePage = () => (
  <>
    <Hero />
    <Services />
    <WhyUs />
    <Gallery />
    <LocationSection />
    <FAQ />
  </>
);

function AppContent() {
  const { path, navigate } = useRouter();
  const isAdmin = path === '/admin';

  const toggleAdmin = () => {
    if (isAdmin) {
      navigate('/');
    } else {
      navigate('/admin');
    }
  };

  return (
    <div className="font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900 flex flex-col min-h-screen relative">
      {!isAdmin && <Navigation />}
      
      <main className="flex-grow">
        {path === '/' && <HomePage />}
        {path === '/booking' && <BookingPage />}
        {path === '/admin' && <AdminPage />}
      </main>

      {/* Floating Admin Button */}
      <button 
        onClick={toggleAdmin}
        className={`fixed bottom-6 right-20 lg:right-6 z-[60] w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-500 transform hover:scale-110 group
          ${isAdmin ? 'bg-red-500 shadow-red-500/30 rotate-180' : 'bg-slate-900 shadow-slate-900/40'}
        `}
      >
        <ShieldCheck size={24} className="text-white transition-all duration-300" />
        
        {/* Tooltip */}
        <span className="absolute right-full mr-4 bg-white text-slate-900 text-xs font-bold px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
          {isAdmin ? 'Exit Admin' : 'Admin Portal'}
        </span>
      </button>

      {/* Sticky Mobile Call Button (Hidden on Admin) */}
      {!isAdmin && (
        <div className="fixed bottom-6 right-6 lg:hidden z-40">
          <a 
            href="tel:09332366403" 
            className="flex items-center justify-center w-14 h-14 bg-teal-600 text-white rounded-full shadow-xl shadow-teal-500/40 animate-bounce"
          >
            <Phone size={24} />
          </a>
        </div>
      )}

      {!isAdmin && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BookingProvider>
      <RouterProvider>
        <AppContent />
      </RouterProvider>
    </BookingProvider>
  );
}

export default App;