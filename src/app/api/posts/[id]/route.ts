import { NextRequest, NextResponse } from "next/server";

const BASE = "https://jsonplaceholder.typicode.com";

export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const res = await fetch(`${BASE}/posts/${id}`, { cache: "no-store" });

  if (!res.ok)
    return NextResponse.json({ message: "Not found" }, { status: 404 });

  const p = await res.json();

  return NextResponse.json({
    id: p.id,
    title: p.title,
    content: p.body,
    userId: p.userId,
  });
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  const { title, content } = await req.json();

  const res = await fetch(`${BASE}/posts/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, body: content, userId: 1 }),
  });

  if (!res.ok) {
    const errorText = await res.text();
    return NextResponse.json(
      { error: `Failed to update: ${errorText}` },
      { status: res.status }
    );
  }

  const p = await res.json();

  return NextResponse.json({
    id: Number(id),
    title: p.title,
    content: p.body,
    userId: p.userId,
  });
}

export async function DELETE(
  _req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  await fetch(`${BASE}/posts/${id}`, { method: "DELETE" });
  return NextResponse.json({ success: true });
}
