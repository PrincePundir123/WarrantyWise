"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardContent } from "@/components/ui/Card";

export default function SignUpPage() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    if (typeof window !== "undefined") {
      localStorage.setItem(
        "warrantywise_user",
        JSON.stringify({
          id: "user-new-" + Date.now(),
          email,
          full_name: fullName,
        })
      );
    }
    router.push("/onboarding");
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
          Create your dispute workspace
        </h2>
        <p className="mt-2 text-sm text-slate-500">
          Already have an account?{" "}
          <Link href="/login" className="font-semibold text-[#3867E8] hover:underline">
            Sign in
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full name"
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Jane Doe"
              />

              <Input
                label="Email address"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jane@example.com"
              />

              <Input
                label="Create a password"
                type="password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Minimum 8 characters"
              />

              <Button type="submit" variant="primary" className="w-full mt-2" isLoading={loading}>
                Create Account & Continue
                <ArrowRight className="h-4 w-4 ml-1" />
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

