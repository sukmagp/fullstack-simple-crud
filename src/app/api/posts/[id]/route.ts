import { NextRequest, NextResponse } from "next/server";
const BASE = "https://jsonplaceholder.typicode.com";

export async function GET(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  const res = await fetch(`${BASE}/posts/${params.id}`, { cache: "no-store" });
  if (!res.ok) return NextResponse.json({ message: "Not found" }, { status: 404 });
  const p = await res.json();
  return NextResponse.json({
    id: p.id,
    title: p.title,
    content: p.body,
    userId: p.userId,
  });
}

export async function PUT(req: NextRequest, { params }: { params: { id: string } }) {
  const { title, content } = await req.json();
  const res = await fetch(`${BASE}/posts/${params.id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body: content, userId: 1 }),
  });
  const p = await res.json();
  return NextResponse.json({
    id: Number(params.id),
    title: p.title,
    content: p.body,
    userId: p.userId,
  });
}

export async function DELETE(
  _req: NextRequest,
  { params }: { params: { id: string } }
) {
  await fetch(`${BASE}/posts/${params.id}`, { method: "DELETE" });
  return NextResponse.json({ success: true });
}
