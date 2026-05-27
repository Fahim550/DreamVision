"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { slugify } from "@/lib/slug";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Pencil, Plus, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
  website: string | null;
};

const AdminBrands = () => {
  const qc = useQueryClient();
  const [open, setOpen] = useState(false);
  const [editing, setEditing] = useState<Brand | null>(null);
  const supabase = createClient();

  const { data, isLoading } = useQuery({
    queryKey: ["brands"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("brands")
        .select("*")
        .order("name");
      if (error) throw error;
      return data as Brand[];
    },
  });

  const upsert = useMutation({
    mutationFn: async (b: Partial<Brand>) => {
      const payload = { ...b, slug: b.slug || slugify(b.name || "") };
      if (b.id) {
        const { error } = await supabase
          .from("brands")
          .update(payload)
          .eq("id", b.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("brands").insert(payload as any);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Saved");
      setOpen(false);
      setEditing(null);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("brands").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["brands"] });
      toast.success("Deleted");
    },
    onError: (e: Error) => toast.error(e.message),
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    upsert.mutate({
      id: editing?.id,
      name: String(fd.get("name")),
      slug: String(fd.get("slug") || ""),
      logo_url: String(fd.get("logo_url") || "") || null,
      website: String(fd.get("website") || "") || null,
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-display text-3xl font-bold">Brands</h1>
          <p className="text-muted-foreground">Manage equipment brands.</p>
        </div>
        <Button
          variant="cta"
          onClick={() => {
            setEditing(null);
            setOpen(true);
          }}
        >
          <Plus className="h-4 w-4" /> New brand
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card overflow-hidden">
        {isLoading ? (
          <div className="p-4 space-y-2">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </div>
        ) : data?.length === 0 ? (
          <p className="p-8 text-center text-muted-foreground">
            No brands yet.
          </p>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left">
              <tr>
                <th className="p-3">Logo</th>
                <th className="p-3">Name</th>
                <th className="p-3">Website</th>
                <th className="p-3 w-32">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((b) => (
                <tr key={b.id} className="border-t border-border">
                  <td className="p-3">
                    {b.logo_url ? (
                      <img
                        src={b.logo_url}
                        alt=""
                        className="h-8 w-8 object-contain"
                      />
                    ) : (
                      "—"
                    )}
                  </td>
                  <td className="p-3 font-medium">{b.name}</td>
                  <td className="p-3 text-muted-foreground truncate max-w-xs">
                    {b.website || "—"}
                  </td>
                  <td className="p-3 flex gap-1">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setEditing(b);
                        setOpen(true);
                      }}
                    >
                      <Pencil className="h-4 w-4" />
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        if (confirm(`Delete "${b.name}"?`)) del.mutate(b.id);
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

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editing ? "Edit brand" : "New brand"}</DialogTitle>
          </DialogHeader>
          <form onSubmit={onSubmit} className="space-y-3">
            <div>
              <Label>Name</Label>
              <Input name="name" required defaultValue={editing?.name} />
            </div>
            <div>
              <Label>Slug (auto if empty)</Label>
              <Input name="slug" defaultValue={editing?.slug} />
            </div>
            <div>
              <Label>Logo URL</Label>
              <Input name="logo_url" defaultValue={editing?.logo_url || ""} />
            </div>
            <div>
              <Label>Website</Label>
              <Input name="website" defaultValue={editing?.website || ""} />
            </div>
            <DialogFooter>
              <Button type="submit" variant="cta" disabled={upsert.isPending}>
                Save
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AdminBrands;
