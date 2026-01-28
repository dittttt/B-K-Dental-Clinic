import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Clock, ChevronDown, Lock } from 'lucide-react';

interface BookingCalendarProps {
  selectedDate: string;
  selectedTime?: string;
  onDateTimeSelect: (date: string, time: string) => void;
  error?: string;
  enableTime?: boolean;
  blockedTimes?: string[]; // New prop for unavailable slots
}

const TIME_SLOTS = [
  "09:00 AM", "09:30 AM",
  "10:00 AM", "10:30 AM",
  "11:00 AM", "11:30 AM",
  "12:00 PM", "12:30 PM",
  "01:00 PM", "01:30 PM",
  "02:00 PM", "02:30 PM",
  "03:00 PM", "03:30 PM",
  "04:00 PM", "04:30 PM"
];

export const BookingCalendar: React.FC<BookingCalendarProps> = ({ 
  selectedDate, 
  selectedTime = '', 
  onDateTimeSelect, 
  error,
  enableTime = true,
  blockedTimes = []
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [view, setView] = useState<'days' | 'years'>('days');

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const handlePrevMonth = () => {
    const today = new Date();
    if (enableTime) {
         if (currentMonth.getMonth() > today.getMonth() || currentMonth.getFullYear() > today.getFullYear()) {
             setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
         }
    } else {
         setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    }
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const dateStr = `${year}-${month}-${d}`;
    
    // Pass empty time if time is disabled or reset it
    onDateTimeSelect(dateStr, '');
  };

  const isDateDisabled = (day: number) => {
    const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    const today = new Date();
    today.setHours(0,0,0,0);

    // If enabling time (booking), disable past dates and Sundays
    if (enableTime) {
        if (date < today) return true;
        if (date.getDay() === 0) return true; // Sunday is 0
    }
    // If birthday (no time), allow past dates, usually allow all dates for birthday
    // Just disable future dates for birthdays
    if (!enableTime) {
        if (date > today) return true;
    }

    return false;
  };

  // Logic to check if a specific time slot has passed for the selected day
  const isTimeSlotPast = (timeStr: string) => {
    if (!selectedDate) return false;

    // 1. Get current time
    const now = new Date();
    
    // 2. Format today as YYYY-MM-DD to compare with selectedDate
    const todayYear = now.getFullYear();
    const todayMonth = String(now.getMonth() + 1).padStart(2, '0');
    const todayDay = String(now.getDate()).padStart(2, '0');
    const todayStr = `${todayYear}-${todayMonth}-${todayDay}`;

    // 3. If selected date is in future, it's not past
    if (selectedDate > todayStr) return false;
    
    // 4. If selected date is in past (though calendar disables this), it's past
    if (selectedDate < todayStr) return true;

    // 5. If today, check time with 10 minute grace period
    const [time, modifier] = timeStr.split(' ');
    let [hours, minutes] = time.split(':').map(Number);
    if (modifier === 'PM' && hours < 12) hours += 12;
    if (modifier === 'AM' && hours === 12) hours = 0;
    
    const slotDate = new Date();
    slotDate.setHours(hours, minutes, 0, 0);
    
    // Grace period: Allow booking until slotTime + 10 minutes
    const gracePeriod = 10 * 60 * 1000;
    
    // If Now > Slot + 10mins, then it is past/unavailable
    if (now.getTime() > (slotDate.getTime() + gracePeriod)) {
        return true;
    }
    
    return false;
  };

  const renderCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth); 
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-10 w-10" />);
    }

    for (let d = 1; d <= daysInMonth; d++) {
      const isDisabled = isDateDisabled(d);
      
      const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), d);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const dayVal = String(date.getDate()).padStart(2, '0');
      const currentDateStr = `${year}-${month}-${dayVal}`;
      
      const isSelected = selectedDate === currentDateStr;

      days.push(
        <button
          key={d}
          type="button"
          disabled={isDisabled}
          onClick={() => handleDateClick(d)}
          className={`h-9 w-9 md:h-10 md:w-10 rounded-full flex items-center justify-center text-sm font-medium transition-all duration-200
            ${isSelected ? 'bg-slate-900 text-white shadow-lg shadow-slate-900/20' : ''}
            ${!isSelected && !isDisabled ? 'hover:bg-slate-100 text-slate-700' : ''}
            ${isDisabled ? 'text-slate-300 cursor-not-allowed' : ''}
          `}
        >
          {d}
        </button>
      );
    }
    return days;
  };

  const renderYears = () => {
      const currentYear = new Date().getFullYear();
      const years = [];
      const yStart = enableTime ? currentYear : 1920;
      const yEnd = enableTime ? currentYear + 5 : currentYear;
      
      if (!enableTime) {
          for (let y = yEnd; y >= yStart; y--) years.push(y);
      } else {
          for (let y = yStart; y <= yEnd; y++) years.push(y);
      }

      return (
          <div className="grid grid-cols-4 gap-2 max-h-[280px] overflow-y-auto pr-2 custom-scrollbar">
               <style>
                {`
                .custom-scrollbar::-webkit-scrollbar { width: 4px; }
                .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
                .custom-scrollbar::-webkit-scrollbar-thumb { background: #cbd5e1; border-radius: 4px; }
                `}
               </style>
               {years.map(y => (
                   <button
                    key={y}
                    type="button"
                    onClick={() => {
                        const newDate = new Date(currentMonth);
                        newDate.setFullYear(y);
                        setCurrentMonth(newDate);
                        setView('days');
                    }}
                    className={`py-2 rounded-lg text-sm font-bold border transition-all ${currentMonth.getFullYear() === y ? 'bg-slate-900 text-white border-slate-900' : 'bg-white text-slate-600 border-slate-100 hover:border-slate-300'}`}
                   >
                       {y}
                   </button>
               ))}
          </div>
      );
  };

  const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  return (
    <div className={`bg-white p-6 ${error ? 'border-2 border-red-100' : ''}`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <button 
            type="button"
            onClick={() => setView(view === 'days' ? 'years' : 'days')}
            className="font-bold text-slate-900 text-lg flex items-center gap-1 hover:bg-slate-50 px-2 py-1 -ml-2 rounded-lg transition-colors"
        >
          {view === 'days' ? `${monthNames[currentMonth.getMonth()]} ${currentMonth.getFullYear()}` : 'Select Year'}
          <ChevronDown size={16} className={`text-slate-400 transition-transform ${view === 'years' ? 'rotate-180' : ''}`} />
        </button>

        {view === 'days' && (
            <div className="flex gap-1">
            <button type="button" onClick={handlePrevMonth} className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full text-slate-600 transition-colors">
                <ChevronLeft size={18} />
            </button>
            <button type="button" onClick={handleNextMonth} className="w-8 h-8 flex items-center justify-center hover:bg-slate-50 rounded-full text-slate-600 transition-colors">
                <ChevronRight size={18} />
            </button>
            </div>
        )}
      </div>

      {view === 'days' ? (
          <>
            <div className="grid grid-cols-7 mb-2 text-center">
                {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                <div key={i} className="text-xs font-bold text-slate-400 pb-2">
                    {day}
                </div>
                ))}
            </div>
            <div className="grid grid-cols-7 gap-y-1 justify-items-center mb-6">
                {renderCalendarDays()}
            </div>
          </>
      ) : (
          renderYears()
      )}

      {/* Time Slots */}
      {enableTime && selectedDate && view === 'days' && (
        <div className="animate-in slide-in-from-top-2 fade-in pt-4 border-t border-slate-100">
          <div className="flex items-center gap-2 mb-3">
             <Clock size={16} className="text-teal-600" />
             <span className="text-sm font-bold text-slate-800">Available Slots</span>
          </div>
          <div className="grid grid-cols-3 sm:grid-cols-4 gap-2">
            {TIME_SLOTS.map(time => {
              const isBlocked = blockedTimes.includes(time);
              const isPast = isTimeSlotPast(time);
              const isDisabled = isBlocked || isPast;

              return (
                <button
                  key={time}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => onDateTimeSelect(selectedDate, time)}
                  className={`px-3 py-2 rounded-lg text-xs font-bold border transition-all flex items-center justify-center gap-1 relative overflow-hidden
                    ${selectedTime === time 
                      ? 'bg-slate-900 text-white border-slate-900 shadow-md' 
                      : isDisabled
                        ? 'bg-slate-50 text-slate-300 border-slate-100 cursor-not-allowed'
                        : 'bg-white text-slate-600 border-slate-200 hover:border-slate-900 hover:text-slate-900'
                    }
                  `}
                >
                  {isBlocked && !isPast && <div className="absolute inset-0 bg-slate-200/50 flex items-center justify-center"><div className="w-[120%] h-[1px] bg-slate-400 rotate-12"></div></div>}
                  {time.replace(' ', '')}
                </button>
              );
            })}
          </div>
        </div>
      )}
      {error && <p className="text-red-500 text-xs mt-3 flex items-center gap-1"><Clock size={12}/> {error}</p>}
    </div>
  );
};