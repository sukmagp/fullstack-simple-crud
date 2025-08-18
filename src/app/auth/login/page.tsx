"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import Image from "next/image";

export default function LoginPage() {
  const { login, loading, message } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const savedUsername = localStorage.getItem("username");
    if (savedUsername) {
      setUsername(savedUsername);
      setRemember(true);
    }
  }, []);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (remember) {
      localStorage.setItem("username", username);
    } else {
      localStorage.removeItem("username");
    }

    await login(username, password);
    router.replace("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#120c20] p-4">
      <div className="flex w-full max-w-5xl bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="w-full md:w-1/2 p-10 flex flex-col justify-center">
          <div className="mb-8">
            <span className="block text-[#500091] font-bold text-sm mb-2">
              Simply Crud here..
            </span>
            <h1 className="text-3xl text-[#120c20] font-bold">
              Hello, Welcome Back!
            </h1>
          </div>

          <form onSubmit={submit} className="space-y-4">
            <input
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#500091] text-[#120c20]"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="password"
              className="w-full border rounded-lg px-3 py-3 focus:outline-none focus:ring-1 focus:ring-[#500091] text-[#120c20]"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-[#120c20]">
                <input
                  type="checkbox"
                  className="accent-purple-600"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                />
                Remember me
              </label>
            </div>

            <button
              disabled={loading}
              className="w-full bg-[#500091] text-white rounded-lg py-3 font-medium hover:bg-[#120c20] disabled:opacity-50"
            >
              {loading ? "Loading..." : "Sign In"}
            </button>

            {message && <p className="text-sm text-red-600">{message}</p>}
          </form>
        </div>

        <div className="hidden md:flex w-1/2 bg-gradient-to-tr from-[#500091] to-indigo-500 items-center justify-center relative">
          <Image
            src="/loginImage.png"
            alt="Login Illustration"
            width={400}
            height={400}
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
