import { createClient } from '@supabase/supabase-js';

// The '||' acts as a safety net so the build engine doesn't crash if keys are hidden during compilation
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder-to-bypass-build.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
