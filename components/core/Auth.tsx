"use client"

import { signIn, signOut, useSession } from "next-auth/react"
import { useState } from "react"
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function Auth() {
  const { data: session, status } = useSession()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSignIn = async () => {
    setLoading(true)
    setError(null)
    try {
      await signIn()
    } catch (err) {
      setError("サインインに失敗しました。再試行してください。")
    } finally {
      setLoading(false)
    }
  }

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p>読み込み中...</p>
      </div>
    )
  }

  if (session) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Card className="w-96 text-center">
          <CardHeader>
            <CardTitle>こんにちは, {session.user?.name}</CardTitle>
            <CardDescription>あなたは現在サインインしています。</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button variant="destructive" onClick={() => signOut()}>
              サインアウト
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
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
          <Button onClick={handleSignIn} disabled={loading}>
            {loading ? "サインイン中..." : "サインイン"}
          </Button>
          <Button variant="secondary" onClick={() => signIn()}>
            サインアップ
          </Button>
          {error && <p className="text-red-500">{error}</p>}
        </CardContent>
      </Card>
    </div>
  )
}