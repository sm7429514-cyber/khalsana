"use client";

import { useState } from "react";
import { LogIn, Package } from "lucide-react";

type AdminLoginProps = {
  onLogin: (token: string) => void;
};

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      onLogin(password);
    } else {
      setError("كلمة المرور غير صحيحة");
    }
    setLoading(false);
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-24">
      <div className="mx-auto max-w-sm rounded-xl border border-zinc-800 bg-zinc-900 p-8">
        <div className="mb-6 text-center">
          <Package className="mx-auto h-10 w-10 text-zinc-400" />
          <h1 className="mt-4 text-xl font-bold text-white">لوحة التحكم</h1>
          <p className="mt-1 text-sm text-zinc-500">PrimeSolution</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="كلمة المرور"
            className="w-full rounded-lg border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-400 text-center"
            autoFocus
          />
          {error && <p className="text-sm text-red-400 text-center">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-medium text-black transition-all hover:bg-zinc-200 disabled:opacity-50"
          >
            {loading ? "جاري التحقق..." : "دخول"}
          </button>
        </form>
      </div>
    </div>
  );
}