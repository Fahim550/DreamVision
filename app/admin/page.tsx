"use client";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useQuery } from "@tanstack/react-query";
import { FolderKanban, Inbox, Package, Star } from "lucide-react";
import Link from "next/link";

const StatCard = ({ icon: Icon, label, value, to }: any) => (
  <Link
    href={to}
    className="rounded-xl border border-border bg-card p-5 hover:border-primary/40 hover:shadow-card-soft transition-all"
  >
    <div className="flex items-center justify-between">
      <div>
        <div className="text-sm text-muted-foreground">{label}</div>
        <div className="mt-1 font-display text-3xl font-bold">
          {value ?? "—"}
        </div>
      </div>
      <div className="h-10 w-10 rounded-lg bg-primary-soft text-primary grid place-items-center">
        <Icon className="h-5 w-5" />
      </div>
    </div>
  </Link>
);

const AdminDashboard = () => {
  const { data, isLoading } = useQuery({
    queryKey: ["admin-stats"],
    queryFn: async () => {
      const supabase = createClient();
      const [products, projects, inquiries, featured, recentInq, recentProd] =
        await Promise.all([
          supabase.from("products").select("*", { count: "exact", head: true }),
          supabase.from("projects").select("*", { count: "exact", head: true }),
          supabase
            .from("inquiries")
            .select("*", { count: "exact", head: true }),
          supabase
            .from("products")
            .select("*", { count: "exact", head: true })
            .eq("featured", true),
          supabase
            .from("inquiries")
            .select("id,name,company,email,status,created_at")
            .order("created_at", { ascending: false })
            .limit(5),
          supabase
            .from("products")
            .select("id,name,slug,created_at,featured")
            .order("created_at", { ascending: false })
            .limit(5),
        ]);
      return {
        products: products.count ?? 0,
        projects: projects.count ?? 0,
        inquiries: inquiries.count ?? 0,
        featured: featured.count ?? 0,
        recentInq: recentInq.data ?? [],
        recentProd: recentProd.data ?? [],
      };
    },
  });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground">
          Overview of products, projects, and quote requests.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          icon={Package}
          label="Total products"
          value={data?.products}
          to="/admin/products"
        />
        <StatCard
          icon={FolderKanban}
          label="Total projects"
          value={data?.projects}
          to="/admin/projects"
        />
        <StatCard
          icon={Inbox}
          label="Total inquiries"
          value={data?.inquiries}
          to="/admin/inquiries"
        />
        <StatCard
          icon={Star}
          label="Featured products"
          value={data?.featured}
          to="/admin/products"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold">Recent inquiries</h2>
            <Link
              href="/admin/inquiries"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {isLoading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : data?.recentInq.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground text-center">
                No inquiries yet.
              </p>
            ) : (
              data?.recentInq.map((i) => (
                <div
                  key={i.id}
                  className="p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <div className="font-medium truncate">
                      {i.name}{" "}
                      <span className="text-muted-foreground text-sm">
                        · {i.company || "—"}
                      </span>
                    </div>
                    <div className="text-xs text-muted-foreground truncate">
                      {i.email}
                    </div>
                  </div>
                  <Badge
                    variant={
                      i.status === "pending"
                        ? "destructive"
                        : i.status === "contacted"
                          ? "default"
                          : "secondary"
                    }
                  >
                    {i.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card">
          <div className="p-4 border-b border-border flex items-center justify-between">
            <h2 className="font-display font-semibold">Recent products</h2>
            <Link
              href="/admin/products"
              className="text-xs text-primary hover:underline"
            >
              View all
            </Link>
          </div>
          <div className="divide-y divide-border">
            {isLoading ? (
              <div className="p-4 space-y-2">
                <Skeleton className="h-10 w-full" />
                <Skeleton className="h-10 w-full" />
              </div>
            ) : data?.recentProd.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground text-center">
                No products yet.
              </p>
            ) : (
              data?.recentProd.map((p) => (
                <Link
                  key={p.id}
                  href={`/admin/products/${p.id}`}
                  className="p-4 flex items-center justify-between hover:bg-muted/40"
                >
                  <div className="font-medium truncate">{p.name}</div>
                  {p.featured && <Badge>Featured</Badge>}
                </Link>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
