import { createClient } from '@supabase/supabase-js';

// Safely access environment variables
// This prevents the "Cannot read properties of undefined (reading 'VITE_SUPABASE_URL')" error
const getEnv = (key: string) => {
  let value = '';
  try {
    // Check if import.meta.env exists (Vite)
    // Cast to any to avoid TS errors about missing env property on ImportMeta
    if (typeof import.meta !== 'undefined' && (import.meta as any).env) {
      value = (import.meta as any).env[key] || '';
    }
    // Check if process.env exists (Standard Node/Webpack/Sandbox)
    else if (typeof process !== 'undefined' && process.env) {
      value = process.env[key] || '';
    }
  } catch (e) {
    console.warn('Error reading environment variable:', key);
  }
  
  // Clean up whitespace which often happens during copy-paste
  return value ? value.trim() : '';
};

const supabaseUrl = getEnv('VITE_SUPABASE_URL');
const supabaseAnonKey = getEnv('VITE_SUPABASE_ANON_KEY');

// Only export the client if keys exist, otherwise return null
export const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export const isSupabaseConfigured = !!supabase;