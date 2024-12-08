import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export async function setSupabaseAuth(token: string) {
  const { error } = await supabase.auth.setSession({
    access_token: token,
    refresh_token: ''
  })
  
  if (error) {
    console.error('Supabase auth error:', error)
  }
} 