"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
export function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSignIn = async (provider: string) => {
    setLoading(true)
    try {
      const res = await signIn(provider, { callbackUrl: '/' })
      if (res?.url) {
        router.push(res.url)
      } else if (res?.error) {
        setError('サインインに失敗しました。')
      }
    } catch (e) {
      setError('サインインに失敗しました。')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <Image src="/favicon.ico" alt="Favicon" width={64} height={64} />
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>ようこそ</CardTitle>
          <CardDescription>サインインまたはサインアップを選択してください。</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={() => handleSignIn('google')} disabled={loading}>
            {loading ? "サインイン中..." : "Googleでサインイン"}
          </Button>
          <Button onClick={() => handleSignIn('github')} disabled={loading}>
            {loading ? "サインイン中..." : "GitHubでサインイン"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}