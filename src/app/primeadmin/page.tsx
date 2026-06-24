"use client";

import { useEffect, useState } from "react";
import AdminLogin from "./login";
import AdminDashboard from "./dashboard";

export default function PrimeAdminPage() {
  const [token, setToken] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const t = localStorage.getItem("primeadmin_token");
    setToken(t);
    setReady(true);
  }, []);

  function handleLogin(password: string) {
    localStorage.setItem("primeadmin_token", password);
    setToken(password);
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <p className="text-cyan-400/60">جاري التحميل...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black">
      {token ? (
        <AdminDashboard />
      ) : (
        <AdminLogin onLogin={handleLogin} />
      )}
    </div>
  );
}