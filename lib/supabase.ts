
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uyswfzojeuhkoaekydkh.supabase.co';
const supabaseAnonKey = 'sb_publishable_-ZG3U7sZj_Ku-mKbI_9HPA_wPFwrBQt';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
