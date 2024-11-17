'use client'

import React from 'react'
import { signIn, signOut, useSession } from 'next-auth/react'

export function Header() {
  const { data: session, status } = useSession()

  return (
    <header className="flex justify-between items-center p-4 bg-gray-100">
      <h1 className="text-2xl font-bold">タスク管理アプリ</h1>
      <div>
        {status === "loading" ? (
          <p>認証状態を確認中...</p>
        ) : session ? (
          <>
            <span className="mr-4">こんにちは, {session.user?.name}</span>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="px-4 py-2 bg-red-500 text-white rounded"
            >
              サインアウト
            </button>
          </>
        ) : (
          <button
            onClick={() => signIn('github')}
            className="px-4 py-2 bg-blue-500 text-white rounded"
          >
            サインイン
          </button>
        )}
      </div>
    </header>
  )
}