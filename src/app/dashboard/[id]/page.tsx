import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPost } from "@/lib/api";

/* eslint-disable @typescript-eslint/no-explicit-any */
interface DetailPageProps {
  params: any;
}
/* eslint-enable @typescript-eslint/no-explicit-any */

export default async function DetailPage({ params }: DetailPageProps) {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  if (!token) redirect("/auth/login");

  const post = await getPost(Number(params.id));

  return (
    <div className="bg-white rounded-2xl shadow p-6">
      <h1 className="text-xl font-bold mb-2">{post.title}</h1>
      <p className="text-gray-700">{post.content}</p>
    </div>
  );
}

