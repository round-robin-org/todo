import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClientComponentClient()

export async function getAuthenticatedClient() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('No authenticated session')
  }
  
  return supabase
} 