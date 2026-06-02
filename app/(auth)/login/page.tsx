"use client";
import { useAuth } from "@/components/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Logo from "@/public/image/logo.png";
import { createClient } from "@/utils/supabase/client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

const AdminLogin = () => {
  // const [supabase, setSupabase] = useState<ReturnType<
  //   typeof createSupabaseClient
  // > | null>(null);
  const { user, isAdmin, loading } = useAuth();
  //   const navigate = useNavigate();
  const router = useRouter();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);

  // useEffect(() => {
  //   if (typeof window === "undefined") return;
  //   setSupabase(createSupabaseClient());
  // }, []);

  useEffect(() => {
    if (!loading && user && isAdmin) router.push("/admin");
  }, [user, isAdmin, loading, router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusy(true);
    try {
      // const client = supabase ?? createSupabaseClient();
      // const supabase=
      const supabase = createClient();

      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success(
          "Account created. Ask an existing admin to grant you the admin role.",
        );
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        toast.success("Signed in");
      }
    } catch (err) {
      const e = err as Error;
      toast.error(e.message);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-soft p-4">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-elevated">
        <Link
          href="/"
          className="mb-6 flex items-center gap-3 border-b border-border pb-5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white shadow-sm ring-1 ring-border">
            <Image
              src={Logo}
              alt="Dream Vision Logo"
              width={40}
              height={40}
              className="h-10 w-10 object-contain"
              priority
            />
          </div>

          <div>
            <h2 className="font-display text-lg font-bold leading-none">
              Dream Vision
            </h2>

            <p className="mt-1 text-xs text-muted-foreground">
              Medical Admin Panel
            </p>
          </div>
        </Link>
        <h1 className="font-display text-2xl font-bold">
          {mode === "signin" ? "Sign in" : "Create admin account"}
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          {mode === "signin"
            ? "Manage products, projects, and inquiries."
            : "After signup, the first account needs to be promoted to admin via the database."}
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1.5"
              autoComplete="email"
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1.5"
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
            />
          </div>
          <Button
            type="submit"
            variant="cta"
            size="lg"
            className="w-full"
            disabled={busy}
          >
            {busy
              ? "Please wait…"
              : mode === "signin"
                ? "Sign in"
                : "Create account"}
          </Button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 w-full text-center text-sm text-muted-foreground hover:text-foreground"
        >
          {mode === "signin"
            ? "Need an account? Sign up"
            : "Have an account? Sign in"}
        </button>
      </div>
    </div>
  );
};

export default AdminLogin;
