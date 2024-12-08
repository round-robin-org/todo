import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables')
}

// クライアントコンポーネント用のSupabaseクライアントを作成
export const supabase = createClientComponentClient()

// 認証済みセッションを使用するためのヘルパー関数
export async function getAuthenticatedClient() {
  const {
    data: { session },
  } = await supabase.auth.getSession()
  
  if (!session) {
    throw new Error('No authenticated session')
  }
  
  return supabase
} 