import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className = "" }) => (
  <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
    {/* Tooth Body */}
    <path 
      d="M25 35 C25 15, 75 15, 75 35 C 75 55, 65 60, 65 75 C 65 85, 55 90, 50 82 C 45 90, 35 85, 35 75 C 35 60, 25 55, 25 35 Z" 
      stroke="currentColor" 
      strokeWidth="5" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    />
    
    {/* Toothpaste / Hat */}
    <path 
      d="M35 15 Q 35 5, 50 5 Q 65 5, 65 15" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round"
    />
    <path 
      d="M65 15 Q 75 12, 75 8" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round"
    />

    {/* Smile */}
    <path 
      d="M38 48 Q 50 58, 62 48" 
      stroke="currentColor" 
      strokeWidth="4" 
      strokeLinecap="round" 
    />
    
    {/* Eyes */}
    <circle cx="40" cy="38" r="3" fill="currentColor" />
    <circle cx="60" cy="38" r="3" fill="currentColor" />
    
    {/* Sparkles */}
    <path d="M15 25 L 21 25 M 18 22 L 18 28" stroke="currentColor" strokeWidth="2.5" />
    <path d="M78 65 L 84 65 M 81 62 L 81 68" stroke="currentColor" strokeWidth="2.5" />
  </svg>
);