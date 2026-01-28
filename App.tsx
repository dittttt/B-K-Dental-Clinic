import React from 'react';
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
import { Phone } from 'lucide-react';

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
  const { path } = useRouter();

  return (
    <div className="font-sans text-slate-900 selection:bg-teal-100 selection:text-teal-900 flex flex-col min-h-screen">
      <Navigation />
      
      <main className="flex-grow">
        {path === '/' && <HomePage />}
        {path === '/booking' && <BookingPage />}
      </main>

      {/* Sticky Mobile Call Button */}
      <div className="fixed bottom-6 right-6 lg:hidden z-40">
        <a 
          href="tel:09332366403" 
          className="flex items-center justify-center w-14 h-14 bg-teal-600 text-white rounded-full shadow-xl shadow-teal-500/40 animate-bounce"
        >
          <Phone size={24} />
        </a>
      </div>

      <Footer />
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <AppContent />
    </RouterProvider>
  );
}

export default App;