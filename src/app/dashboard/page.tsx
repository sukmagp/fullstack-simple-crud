import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import DashboardClient from "./ui/page";

export default async function DashboardPage() {
  const cookieStore = await cookies(); 
  const token = cookieStore.get("token")?.value;

  if (!token) redirect("/auth/login");

  return <DashboardClient />;
}
