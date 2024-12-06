'use client'

import React from 'react'
import { useSession, signIn, signOut } from 'next-auth/react'
import { Button } from "@src/components/ui/button"

export function Header() {
  const { data: session } = useSession()

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">Todo</h1>
      <div>
        {session ? (
          <>
            <span className="mr-4">Hello, {session.user?.email}</span>
            <Button
              onClick={() => signOut()}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              Sign Out
            </Button>
          </>
        ) : (
          <>
            <Button
              onClick={() => signIn('google')}
              className="mr-2 px-4 py-2 bg-red-500 text-white rounded"
            >
              Googleでサインイン
            </Button>
            <Button
              onClick={() => signIn('github')}
              className="px-4 py-2 bg-gray-800 text-white rounded"
            >
              GitHubでサインイン
            </Button>
          </>
        )}
      </div>
    </header>
  )
}