"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight, Lock, Mail } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("analyst@example.com");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Set mock session for preview / demo environments
      if (typeof window !== "undefined") {
        localStorage.setItem(
          "warrantywise_user",
          JSON.stringify({
            id: "user-usr-8921-prod",
            email,
            full_name: "Alex Vance",
          })
        );
      }
      router.push("/dashboard");
    } catch {
      setError("Failed to sign in. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link href="/" className="inline-flex items-center gap-2.5">
          <div className="h-10 w-10 rounded-xl bg-[#14233B] flex items-center justify-center text-white shadow-sm">
            <ShieldAlert className="h-6 w-6 text-[#3867E8]" />
          </div>
          <span className="font-extrabold text-2xl tracking-tight text-[#14233B]">WarrantyWise</span>
        </Link>
        <h2 className="mt-6 text-2xl font-bold tracking-tight text-[#14233B]">
          Sign in to your account
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Or{" "}
          <Link href="/signup" className="font-semibold text-[#3867E8] hover:underline">
            create a new dispute investigation workspace
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded-lg font-medium">
                  {error}
                </div>
              )}

              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@domain.com"
              />

              <Input
                label="Password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
              />

              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 text-slate-600">
                  <input type="checkbox" defaultChecked className="rounded border-slate-300 text-[#3867E8] focus:ring-[#3867E8]" />
                  Remember this device
                </label>
                <Link href="/forgot-password" className="text-[#3867E8] hover:underline font-medium">
                  Forgot password?
                </Link>
              </div>

              <Button type="submit" variant="primary" className="w-full mt-2" isLoading={loading}>
                Sign in to Workspace
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100 text-center">
              <span className="text-xs text-slate-400">
                Protected by PostgreSQL Row-Level Security & encrypted storage.
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

