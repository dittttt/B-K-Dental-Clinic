import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Booking {
  id: string;
  name: string;
  phone: string;
  email: string;
  service: string;
  date: string; // YYYY-MM-DD
  time: string;
  status: 'confirmed' | 'completed' | 'cancelled';
  notes?: string;
  timestamp: number;
}

interface BookingContextType {
  bookings: Booking[];
  addBooking: (booking: Omit<Booking, 'id' | 'timestamp' | 'status'>) => void;
  getBookedSlots: (date: string) => string[];
  cancelBooking: (id: string) => void;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);

  // Load from localStorage on mount (Simulating database persistence)
  useEffect(() => {
    const stored = localStorage.getItem('bk_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      // Seed some dummy data for demonstration
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      setBookings([
        {
          id: '1',
          name: 'Sarah Connor',
          phone: '09171234567',
          email: 'sarah@test.com',
          service: 'Consultation',
          date: dateStr,
          time: '10:00 AM',
          status: 'confirmed',
          timestamp: Date.now()
        }
      ]);
    }
  }, []);

  // Save to localStorage whenever bookings change
  useEffect(() => {
    localStorage.setItem('bk_bookings', JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (data: Omit<Booking, 'id' | 'timestamp' | 'status'>) => {
    const newBooking: Booking = {
      ...data,
      id: Math.random().toString(36).substr(2, 9),
      timestamp: Date.now(),
      status: 'confirmed'
    };
    setBookings(prev => [...prev, newBooking]);
  };

  const getBookedSlots = (date: string) => {
    return bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.time);
  };

  const cancelBooking = (id: string) => {
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' } : b));
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookedSlots, cancelBooking }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within a BookingProvider');
  return context;
};