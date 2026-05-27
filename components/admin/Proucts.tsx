"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ExternalLink, Pencil, Plus, Search, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

const PAGE_SIZE = 20;

const AdminProducts = () => {
  const qc = useQueryClient();
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [featured, setFeatured] = useState("all");
  const [page, setPage] = useState(0);
  const supabase = createClient();

  const { data: cats } = useQuery({
    queryKey: ["categories", "all"],
    queryFn: async () => {
      const { data } = await supabase
        .from("categories")
        .select("id,name")
        .order("name");
      return data ?? [];
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["admin-products", search, category, featured, page],
    queryFn: async () => {
      let q = supabase
        .from("products")
        .select(
          "id,name,slug,hero_image,featured,published,created_at,brand:brands(name),category:categories(name)",
          { count: "exact" },
        )
        .order("created_at", { ascending: false })
        .range(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE - 1);
      if (search.trim()) q = q.ilike("name", `%${search.trim()}%`);
      if (category !== "all") q = q.eq("category_id", category);
      if (featured !== "all") q = q.eq("featured", featured === "yes");
      const { data, error, count } = await q;
      if (error) throw error;
      return { rows: data ?? [], count: count ?? 0 };
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("products").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const toggleFeatured = useMutation({
    mutationFn: async ({ id, val }: { id: string; val: boolean }) => {
      const { error } = await supabase
        .from("products")
        .update({ featured: val })
        .eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-products"] }),
  });

  const totalPages = Math.max(1, Math.ceil((data?.count ?? 0) / PAGE_SIZE));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Products</h1>
          <p className="text-muted-foreground">{data?.count ?? 0} total</p>
        </div>
        <Button variant="cta" asChild>
          <Link href="/admin/products/new">
            <Plus className="h-4 w-4" /> New product
          </Link>
        </Button>
      </div>

      <div className="grid gap-3 sm:grid-cols-[1fr_200px_160px]">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by name…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9"
          />
        </div>
        <Select
          value={category}
          onValueChange={(v) => {
            setCategory(v);
            setPage(0);
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {cats?.map((c: any) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={featured}
          onValueChange={(v) => {
            setFeatured(v);
            setPage(0);
          }}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="yes">Featured</SelectItem>
            <SelectItem value="no">Not featured</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
            <Skeleton className="h-14 w-full" />
          </div>
        ) : data?.rows.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No products yet.</p>
            <Button variant="cta" asChild className="mt-4">
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4" /> Add your first product
              </Link>
            </Button>
          </div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="p-3">Image</th>
                <th className="p-3">Name</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Category</th>
                <th className="p-3">Featured</th>
                <th className="p-3 w-36">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.rows.map((p: any) => (
                <tr key={p.id} className="border-t border-border">
                  <td className="p-3">
                    {p.hero_image ? (
                      <Image
                        src={p.hero_image}
                        alt=""
                        className="h-12 w-12 rounded object-cover"
                      />
                    ) : (
                      <div className="h-12 w-12 rounded bg-muted" />
                    )}
                  </td>
                  <td className="p-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-xs text-muted-foreground">
                      {p.slug}
                    </div>
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {p.brand?.name || "—"}
                  </td>
                  <td className="p-3 text-muted-foreground">
                    {p.category?.name || "—"}
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() =>
                        toggleFeatured.mutate({ id: p.id, val: !p.featured })
                      }
                      aria-label="Toggle featured"
                    >
                      <Star
                        className={`h-5 w-5 ${p.featured ? "fill-primary text-primary" : "text-muted-foreground"}`}
                      />
                    </button>
                  </td>
                  <td className="p-3 flex gap-1">
                    <Button size="sm" variant="ghost" asChild>
                      <a
                        href={`/products/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button size="sm" variant="ghost" asChild>
                      <Link href={`/admin/products/${p.id}`}>
                        <Pencil className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${p.name}"?`)) del.mutate(p.id);
                      }}
                    >
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between">
          <span className="text-sm text-muted-foreground">
            Page {page + 1} of {totalPages}
          </span>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page >= totalPages - 1}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
