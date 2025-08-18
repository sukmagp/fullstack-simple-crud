export async function login(username: string, password: string) {
  const res = await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error("Incorrect username / password!");
  const data = await res.json();
  localStorage.setItem("token", data.token);
  localStorage.setItem("user", JSON.stringify(data.user));
  return data;
}

export async function logout() {
  await fetch("/api/auth/logout", { method: "POST" });
  localStorage.removeItem("token");
  localStorage.removeItem("user");
}

export async function me() {
  const res = await fetch("/api/auth/me", { cache: "no-store" });
  return res.ok ? res.json() : { authenticated: false };
}
