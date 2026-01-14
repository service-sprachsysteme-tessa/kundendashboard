import { NextResponse } from "next/server";

export async function GET() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anon) {
    return NextResponse.json(
      {
        ok: false,
        error: "Missing env vars",
        expected: ["NEXT_PUBLIC_SUPABASE_URL", "NEXT_PUBLIC_SUPABASE_ANON_KEY"],
      },
      { status: 500 }
    );
  }

  // 1) Auth settings testen
  const authRes = await fetch(`${url}/auth/v1/settings`, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
    },
    cache: "no-store",
  });

  let authBody: any = null;
  try {
    authBody = await authRes.json();
  } catch {
    authBody = await authRes.text();
  }

  // 2) PostgREST OpenAPI testen
  const restRes = await fetch(`${url}/rest/v1/`, {
    headers: {
      apikey: anon,
      Authorization: `Bearer ${anon}`,
    },
    cache: "no-store",
  });

  const restText = await restRes.text();

  return NextResponse.json({
    ok: authRes.ok && restRes.ok,
    supabaseUrl: url,
    auth: { status: authRes.status, ok: authRes.ok, bodyPreview: authBody },
    rest: { status: restRes.status, ok: restRes.ok, bodyPreview: restText.slice(0, 200) },
  });
}
