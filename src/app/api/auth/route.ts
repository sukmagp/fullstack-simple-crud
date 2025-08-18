import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { username, password } = await req.json();

  if (username === "admin" && password === "123") {
    const res = NextResponse.json({
      success: true,
      token: "mock-token-123",
      user: { username: "admin", name: "Sukma Giri Pratama", email: "admin@example.com" },
    });
    res.cookies.set("token", "mock-token-123", {
      httpOnly: true,
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24,
    });
    return res;
  }

  return NextResponse.json(
    { success: false, message: "Invalid credentials" },
    { status: 401 }
  );
}
