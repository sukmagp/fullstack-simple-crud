import { NextRequest, NextResponse } from "next/server";

const BASE = "https://jsonplaceholder.typicode.com";

interface JsonPlaceholderPost {
  id: number;
  title: string;
  body: string;
  userId: number;
}

interface Post {
  id: number;
  title: string;
  content: string;
  userId: number;
}

export async function GET() {
  const res = await fetch(`${BASE}/posts?_limit=10`, { cache: "no-store" });
  const rows: JsonPlaceholderPost[] = await res.json();

  const posts: Post[] = rows.map((p) => ({
    id: p.id,
    title: p.title,
    content: p.body,
    userId: p.userId,
  }));

  return NextResponse.json(posts);
}

export async function POST(req: NextRequest) {
  const { title, content }: { title: string; content: string } = await req.json();

  if (!title || !content) {
    return NextResponse.json(
      { success: false, message: "Title & content wajib diisi" },
      { status: 400 }
    );
  }

  const res = await fetch(`${BASE}/posts`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body: content, userId: 1 }),
  });

  const p: JsonPlaceholderPost = await res.json();

  const newPost: Post = {
    id: p.id ?? Math.floor(Math.random() * 100000),
    title,
    content,
    userId: 1,
  };

  return NextResponse.json(newPost);
}
