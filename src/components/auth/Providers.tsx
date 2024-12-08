"use client";

import { SessionProvider, useSession } from "next-auth/react";
import { ReactNode, useEffect } from "react";
import { setSupabaseAuth } from '@src/lib/supabase'

interface ProvidersProps {
  children: ReactNode;
}

function SupabaseAuthHandler() {
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.accessToken) {
      setSupabaseAuth(session.accessToken)
    }
  }, [session]);

  return null;
}

export default function Providers({ children }: ProvidersProps) {
  return (
    <SessionProvider>
      <SupabaseAuthHandler />
      {children}
    </SessionProvider>
  );
}