import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

// TODO: Replace with your actual Supabase URL and Anon Key
const SUPABASE_URL = 'https://qsiesedffeeejdgrrnqx.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzaWVzZWRmZmVlZWpkZ3JybnF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjUzNzM4NTksImV4cCI6MjA4MDk0OTg1OX0.x1EBum96MUUOj7Rpj2F5HXo_hE-G6CjaVk2NdqBjJ1g';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
