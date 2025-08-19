"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { login as apiLogin, logout as apiLogout, me } from "@/lib/auth";

export interface User {
  username: string;
  name: string;
  email: string;
}

export function useAuth() {
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      const lsToken =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;

      if (lsToken) {
        const r = await me();
        setAuthenticated(!!r.authenticated);

        if (r.user) {
          setUser(r.user as User);
        } else {
          const storedUser = localStorage.getItem("user");
          if (storedUser) {
            setUser(JSON.parse(storedUser) as User);
          }
        }
      }

      setLoading(false);
    })();
  }, []);

  const login = async (username: string, password: string) => {
    setLoading(true);
    try {
      const data = await apiLogin(username, password);
      setAuthenticated(true);
      setUser(data.user as User);
    } catch (e: unknown) {
      if (e instanceof Error) {
        setMessage(e.message || "Login failed");
      } else {
        setMessage("Login failed");
      }
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await apiLogout();
    setAuthenticated(false);
    setUser(null);
    setMessage("Logout berhasil");

    router.push("auth/login");
  };

  return { authenticated, user, loading, message, login, logout };
}
