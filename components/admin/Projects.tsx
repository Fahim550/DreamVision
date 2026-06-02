"use client";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Star, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";

const AdminProjects = () => {
  const qc = useQueryClient();
  const supabase = createClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });
  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("projects").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Projects</h1>
          <p className="text-muted-foreground">
            Hospital & clinic installations.
          </p>
        </div>
        <Button variant="cta" asChild>
          <Link href="/admin/projects/new">
            <Plus className="h-4 w-4" /> New project
          </Link>
        </Button>
      </div>

      {isLoading ? (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
          <Skeleton className="h-48" />
        </div>
      ) : data?.length === 0 ? (
        <div className="rounded-xl border border-border bg-card p-12 text-center">
          <p className="text-muted-foreground">No projects yet.</p>
          <Button variant="cta" asChild className="mt-4">
            <Link href="/admin/projects/new">
              <Plus className="h-4 w-4" /> Add your first project
            </Link>
          </Button>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {data?.map((p: any) => (
            <div
              key={p.id}
              className="rounded-xl border border-border bg-card overflow-hidden flex flex-col"
            >
              <div className="aspect-video bg-muted">
                {p.hero_image && (
                  <Image
                    src={p.hero_image}
                    width={400}
                    height={200}
                    loading="eager"
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <div className="p-4 flex-1 flex flex-col">
                <div className="flex items-start justify-between gap-2">
                  <h3 className="font-display font-semibold">{p.title}</h3>
                  {p.featured && (
                    <Badge>
                      <Star className="h-3 w-3" />
                    </Badge>
                  )}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                  {p.client || "—"} · {p.location || "—"}
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  {p.completion_year || ""}
                </div>
                <div className="flex gap-1 mt-auto pt-3">
                  <Button
                    size="sm"
                    variant="outline"
                    asChild
                    className="flex-1"
                  >
                    <Link href={`/admin/projects/${p.id}`}>
                      <Pencil className="h-4 w-4" /> Edit
                    </Link>
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id);
                    }}
                  >
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminProjects;
