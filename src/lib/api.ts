import { NewPost, Post } from "@/types/post";

const API_BASE =
  typeof window === "undefined"
    ? process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
    : "";

function getHeaders(extra: HeadersInit = {}): HeadersInit {
  if (typeof window === "undefined") return extra;

  const token = localStorage.getItem("token");
  return token
    ? { Authorization: `Bearer ${token}`, ...extra }
    : { ...extra };
}

async function handleResponse<T>(res: Response): Promise<T> {
  if (!res.ok) {
    if (res.status === 401 && typeof window !== "undefined") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.location.href = "/auth/login";
      throw new Error("Sesi habis, silakan login kembali");
    }
    const errText = await res.text();
    throw new Error(errText || "Terjadi kesalahan");
  }
  return (await res.json()) as T;
}

export async function listPosts(): Promise<Post[]> {
  const res = await fetch(`${API_BASE}/api/posts`, {
    cache: "no-store",
    headers: getHeaders(),
  });
  return handleResponse<Post[]>(res);
}

export async function getPost(id: number): Promise<Post> {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    cache: "no-store",
    headers: getHeaders(),
  });
  return handleResponse<Post>(res);
}

export async function createPost(data: NewPost): Promise<Post> {
  const res = await fetch(`${API_BASE}/api/posts`, {
    method: "POST",
    headers: getHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return handleResponse<Post>(res);
}

export async function updatePost(id: number, data: NewPost): Promise<Post> {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: "PUT",
    headers: getHeaders({ "Content-Type": "application/json" }),
    body: JSON.stringify(data),
  });
  return handleResponse<Post>(res);
}

export async function deletePost(id: number): Promise<{ success: boolean }> {
  const res = await fetch(`${API_BASE}/api/posts/${id}`, {
    method: "DELETE",
    headers: getHeaders(),
  });
  await handleResponse(res);
  return { success: true };
}
