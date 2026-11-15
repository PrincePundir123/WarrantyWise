"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { ShieldCheck, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/Card";

export default function OnboardingPage() {
  const router = useRouter();
  const [country, setCountry] = useState("United States");
  const [currency, setCurrency] = useState("USD");
  const [category, setCategory] = useState("Consumer Electronics & Appliances");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] flex flex-col justify-center py-12 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-lg">
        <div className="text-center mb-8">
          <div className="mx-auto h-12 w-12 rounded-xl bg-blue-50 text-[#3867E8] flex items-center justify-center mb-3">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <h1 className="text-2xl font-bold text-[#14233B]">Welcome to WarrantyWise</h1>
          <p className="text-sm text-slate-500 mt-1">
            Let&apos;s configure your jurisdiction and currency settings for accurate consumer warranty calculations.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Country / Legal Jurisdiction"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                helperText="Statutory warranty laws and boundary dates depend on your jurisdiction."
              />

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Preferred Currency
                </label>
                <select
                  value={currency}
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#3867E8] focus:outline-none focus:ring-1 focus:ring-[#3867E8]"
                >
                  <option value="USD">USD ($ - US Dollar)</option>
                  <option value="EUR">EUR (€ - Euro)</option>
                  <option value="GBP">GBP (£ - British Pound)</option>
                  <option value="CAD">CAD ($ - Canadian Dollar)</option>
                  <option value="AUD">AUD ($ - Australian Dollar)</option>
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-semibold uppercase tracking-wider text-slate-700">
                  Primary Dispute Category
                </label>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm text-slate-900 focus:border-[#3867E8] focus:outline-none focus:ring-1 focus:ring-[#3867E8]"
                >
                  <option value="Consumer Electronics & Appliances">Consumer Electronics & Home Appliances</option>
                  <option value="Automotive & Vehicles">Automotive & Vehicle Components</option>
                  <option value="Smartphones & Laptops">Smartphones, Laptops & Tablets</option>
                  <option value="HVAC & Home Systems">HVAC & Fixed Home Equipment</option>
                </select>
              </div>

              <div className="pt-2 flex items-center justify-between gap-4">
                <Button
                  type="button"
                  variant="ghost"
                  onClick={() => router.push("/dashboard")}
                  className="text-slate-500"
                >
                  Skip for now
                </Button>
                <Button type="submit" variant="primary" isLoading={loading}>
                  Enter Workspace
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

