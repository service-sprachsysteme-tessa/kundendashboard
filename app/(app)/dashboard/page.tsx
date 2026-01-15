import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (!data.user) redirect("/auth/login");

  // Beispiel: Calls count (funktioniert erst, wenn Tabelle existiert + RLS passt)
  // const { count } = await supabase.from("calls").select("*", { count: "exact", head: true });

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold">Dashboard</h1>
      <p className="text-muted-foreground">Logged in as: {data.user.email}</p>
    </div>
  );
}
