"use client"

import { useEffect, useState } from "react"
import { createClient } from "@/utils/supabase/client"

export default function TestPage() {
  const [out, setOut] = useState<any>(null)

  useEffect(() => {
    ;(async () => {
      const supabase = createClient()
      // 1) Settings call (zeigt: URL+Key funktionieren)
      const { data, error } = await supabase.auth.getSession()
      setOut({ session: data?.session ?? null, error: error?.message ?? null })
    })()
  }, [])

  return (
    <main style={{ padding: 24 }}>
      <h1>Supabase Test</h1>
      <pre>{JSON.stringify(out, null, 2)}</pre>
    </main>
  )
}
