"use client"

import React, { useState } from 'react'
import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { signIn } from 'next-auth/react'

export function Auth() {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setLoading(true)
    try {
      await signIn('github')
    } catch (e) {
      setError('Sign in failed.')
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
          <CardDescription>Please choose to sign in or sign up.</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col space-y-4">
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? "Signing in..." : "Sign In"}
          </Button>
          <Button variant="secondary" onClick={() => signIn('github')}>
            Sign Up
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}