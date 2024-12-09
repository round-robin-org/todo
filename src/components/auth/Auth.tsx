"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@src/components/ui/card"
import { Button } from "@src/components/ui/button"
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { useRouter } from 'next/navigation'

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()
  const supabase = createClientComponentClient()

  const handleSignIn = async () => {
    try {
      setLoading(true)
      console.log('Signing in with redirect URL:', `${window.location.origin}/auth/callback`)
      
      const { error, data } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
          scopes: 'email profile'
        }
      })
      
      console.log('Sign in response:', { error, data })
      
      if (error) throw error
    } catch (error: any) {
      console.error('Sign in error:', error)
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen space-y-6">
      <Image src="/favicon.ico" alt="Favicon" width={64} height={64} />
      <Card className="w-96">
        <CardHeader className="text-center">
          <CardTitle>Welcome</CardTitle>
          <CardDescription>Please sign in or sign up.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign in with Google"}
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}