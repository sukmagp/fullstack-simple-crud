import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { getPost } from "@/lib/api";

export default async function DetailPage({ params }: { params: { id: string } }) {
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
