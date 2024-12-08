'use client'

import React from 'react'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { Button } from "@src/components/ui/button"
import { useRouter } from 'next/navigation'
import { useAuth } from '@src/hooks/useAuth'

export function Header() {
  const { user } = useAuth()
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignOut = async () => {
    await supabase.auth.signOut()
    router.refresh()
  }

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Todo</h1>
      <div>
        {user ? (
          <>
            <span className="mr-4">Hello, {user.email}</span>
            <Button
              onClick={handleSignOut}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <Button
            onClick={() => router.push('/auth/signin')}
            className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
          >
            Googleでサインイン
          </Button>
        )}
      </div>
    </header>
  )
}