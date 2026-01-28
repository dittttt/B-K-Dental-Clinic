import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabaseClient';

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
  addBooking: (booking: Omit<Booking, 'id' | 'timestamp' | 'status'>) => Promise<void>;
  getBookedSlots: (date: string) => string[];
  cancelBooking: (id: string) => Promise<void>;
  getPatientBookings: (phone: string) => Booking[];
  isLoading: boolean;
}

const BookingContext = createContext<BookingContextType | undefined>(undefined);

export const BookingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Initial Fetch
  useEffect(() => {
    const fetchBookings = async () => {
      setIsLoading(true);
      
      if (isSupabaseConfigured && supabase) {
        try {
          const { data, error } = await supabase
            .from('bookings')
            .select('*');
            
          if (error) throw error;
          
          if (data) {
            // Map DB fields to our internal types
            const formatted: Booking[] = data.map((b: any) => ({
              ...b,
              timestamp: new Date(b.created_at).getTime()
            }));
            setBookings(formatted);
          }
        } catch (err) {
          console.error("Error fetching from Supabase:", err);
          // Fallback to local if fetch fails
          loadFromLocal();
        }
      } else {
        loadFromLocal();
      }
      setIsLoading(false);
    };

    fetchBookings();
  }, []);

  const loadFromLocal = () => {
    const stored = localStorage.getItem('bk_bookings');
    if (stored) {
      setBookings(JSON.parse(stored));
    } else {
      // Seed dummy data if empty
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const dateStr = tomorrow.toISOString().split('T')[0];

      setBookings([
        {
          id: '1',
          name: 'Sarah Connor (Demo)',
          phone: '0917 123 4567',
          email: 'sarah@test.com',
          service: 'Consultation',
          date: dateStr,
          time: '10:00 AM',
          status: 'confirmed',
          timestamp: Date.now()
        }
      ]);
    }
  };

  const addBooking = async (data: Omit<Booking, 'id' | 'timestamp' | 'status'>) => {
    // Prepare local fallback object just in case
    const localFallbackId = Math.random().toString(36).substr(2, 9);
    const newBooking: Booking = {
      ...data,
      status: 'confirmed',
      id: localFallbackId,
      timestamp: Date.now()
    };

    if (isSupabaseConfigured && supabase) {
      try {
        // Insert and SELECT the returned data to get the real ID
        const { data: insertedData, error } = await supabase
          .from('bookings')
          .insert([{
             name: data.name,
             phone: data.phone,
             email: data.email,
             service: data.service,
             date: data.date,
             time: data.time,
             notes: data.notes,
             status: 'confirmed'
          }])
          .select()
          .single();

        if (error) throw error;

        if (insertedData) {
          // Use the real data from DB
          const confirmedBooking: Booking = {
            ...insertedData,
            timestamp: new Date(insertedData.created_at).getTime()
          };
          setBookings(prev => [...prev, confirmedBooking]);
        }
      } catch (err) {
        console.error("Supabase insert error:", err);
        // Fallback to local on error so the user doesn't think it failed completely
        setBookings(prev => {
          const updated = [...prev, newBooking];
          localStorage.setItem('bk_bookings', JSON.stringify(updated));
          return updated;
        });
      }
    } else {
      // Local Only Mode
      setBookings(prev => {
        const updated = [...prev, newBooking];
        localStorage.setItem('bk_bookings', JSON.stringify(updated));
        return updated;
      });
    }
  };

  const cancelBooking = async (id: string) => {
    if (isSupabaseConfigured && supabase) {
        try {
            const { error } = await supabase
                .from('bookings')
                .update({ status: 'cancelled' })
                .eq('id', id);
            
            if (error) throw error;

            setBookings(prev => prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b));
        } catch (err) {
            console.error("Error cancelling:", err);
            alert("Failed to cancel booking. Please try refreshing the page.");
        }
    } else {
        setBookings(prev => {
            const updated = prev.map(b => b.id === id ? { ...b, status: 'cancelled' as const } : b);
            localStorage.setItem('bk_bookings', JSON.stringify(updated));
            return updated;
        });
    }
  };

  const getBookedSlots = (date: string) => {
    return bookings
      .filter(b => b.date === date && b.status !== 'cancelled')
      .map(b => b.time);
  };

  const getPatientBookings = (phone: string) => {
    const cleanSearch = phone.replace(/\D/g, '');
    return bookings.filter(b => b.phone.replace(/\D/g, '') === cleanSearch);
  };

  return (
    <BookingContext.Provider value={{ bookings, addBooking, getBookedSlots, cancelBooking, getPatientBookings, isLoading }}>
      {children}
    </BookingContext.Provider>
  );
};

export const useBookings = () => {
  const context = useContext(BookingContext);
  if (!context) throw new Error('useBookings must be used within a BookingProvider');
  return context;
};