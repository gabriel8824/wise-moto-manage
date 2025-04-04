
import { createClient } from '@supabase/supabase-js';
import { Database } from './database.types';

const supabaseUrl = 'https://uocgiyeeodrfqhiagiud.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVvY2dpeWVlb2RyZnFoaWFnaXVkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDM3NjUzNzksImV4cCI6MjA1OTM0MTM3OX0.MxohrjNPlSjHbckriSM6WNuKMMg6wwXy2EMbbggozY0';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    storage: localStorage
  }
});
