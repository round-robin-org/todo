'use client'

import React from 'react'
import { supabase } from '@/lib/supabase'

export function Header() {
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) {
      console.error('サインアウトに失敗しました:', error)
    }
  }

  const user = supabase.auth.getUser()

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">タスク管理アプリ</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">こんにちは, {user.user?.email}</span>
            <button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              サインアウト
            </button>
          </>
        ) : (
          <button
            onClick={() => supabase.auth.signInWithOAuth({ provider: 'github' })}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            サインイン
          </button>
        )}
      </div>
    </header>
  )
}