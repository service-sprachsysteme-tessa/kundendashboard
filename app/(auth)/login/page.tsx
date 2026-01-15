"use client";

import { useSearchParams } from "next/navigation";
import { useActionState } from "react";
import { signInAction } from "./actions";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const next = searchParams.get("next") || "/dashboard";

  const [state, formAction] = useActionState(signInAction as any, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-6">
      <form action={formAction} className="w-full max-w-sm space-y-4">
        <h1 className="text-2xl font-semibold">Sign in</h1>

        <input type="hidden" name="next" value={next} />

        <div className="space-y-1">
          <label className="text-sm">Email</label>
          <input className="w-full border p-2 rounded" name="email" type="email" required />
        </div>

        <div className="space-y-1">
          <label className="text-sm">Password</label>
          <input className="w-full border p-2 rounded" name="password" type="password" required />
        </div>

        <button className="w-full bg-black text-white p-2 rounded" type="submit">
          Sign in
        </button>

        {state?.ok === false && <p className="text-red-600 text-sm">{state.message}</p>}
      </form>
    </div>
  );
}
