import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL ?? 'no key'
const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_KEY ?? 'no key'

if (SUPABASE_URL === 'no key' || SUPABASE_KEY === 'no key') {
  throw new Error('No Supabase URL or KEY')
}

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
