"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { slugify } from "@/lib/slug";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, Plus, Save, Trash2 } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { ImageUploader } from "../common/ImaeUploader";

type Form = {
  slug: string;
  title: string;
  client: string;
  location: string;
  completion_year: number | null;
  short_description: string;
  description: string;
  hero_image: string;
  images: string[];
  equipment: string[];
  featured: boolean;
};
const empty: Form = {
  slug: "",
  title: "",
  client: "",
  location: "",
  completion_year: null,
  short_description: "",
  description: "",
  hero_image: "",
  images: [],
  equipment: [""],
  featured: false,
};

const ProjectForm = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const qc = useQueryClient();
  const supabase = createClient();
  const router = useRouter();
  const [f, setF] = useState<Form>(empty);
  const [slugTouched, setSlugTouched] = useState(false);

  const { isLoading } = useQuery({
    queryKey: ["project", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("projects")
        .select("*")
        .eq("id", id)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setF({
          slug: data.slug || "",
          title: data.title || "",
          client: data.client || "",
          location: data.location || "",
          completion_year: data.completion_year,
          short_description: data.short_description || "",
          description: data.description || "",
          hero_image: data.hero_image || "",
          images: Array.isArray(data.images) ? (data.images as string[]) : [],
          equipment:
            Array.isArray(data.equipment) && data.equipment.length
              ? (data.equipment as string[])
              : [""],
          featured: !!data.featured,
        });
        setSlugTouched(true);
      }
      return data;
    },
  });

  useEffect(() => {
    if (!slugTouched && isNew) setF((s) => ({ ...s, slug: slugify(s.title) }));
  }, [f.title, slugTouched, isNew]);

  const save = useMutation({
    mutationFn: async () => {
      if (!f.title.trim()) throw new Error("Title is required");
      if (!f.slug.trim()) throw new Error("Slug is required");
      const payload = {
        slug: f.slug,
        title: f.title,
        client: f.client || null,
        location: f.location || null,
        completion_year: f.completion_year,
        short_description: f.short_description || null,
        description: f.description || null,
        hero_image: f.hero_image || (f.images[0] ?? null),
        images: f.images,
        equipment: f.equipment.filter((e) => e.trim()),
        featured: f.featured,
      };
      if (isNew) {
        const { data, error } = await supabase
          .from("projects")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        return data.id as string;
      }
      const { error } = await supabase
        .from("projects")
        .update(payload)
        .eq("id", id!);
      if (error) throw error;
      return id!;
    },
    onSuccess: (newId) => {
      qc.invalidateQueries({ queryKey: ["admin-projects"] });
      toast.success("Saved");
      if (isNew) router.push(`/admin/projects/${newId}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isNew && isLoading) return <Skeleton className="h-96 w-full" />;

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/projects">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-display text-2xl font-bold">
            {isNew ? "New project" : f.title || "Edit project"}
          </h1>
        </div>
        <Button
          variant="cta"
          onClick={() => save.mutate()}
          disabled={save.isPending}
        >
          <Save className="h-4 w-4" /> Save
        </Button>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
          <div>
            <Label>Title *</Label>
            <Input
              value={f.title}
              onChange={(e) => setF({ ...f, title: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Slug *</Label>
            <Input
              value={f.slug}
              onChange={(e) => {
                setSlugTouched(true);
                setF({ ...f, slug: slugify(e.target.value) });
              }}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Client / Hospital</Label>
            <Input
              value={f.client}
              onChange={(e) => setF({ ...f, client: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Location</Label>
            <Input
              value={f.location}
              onChange={(e) => setF({ ...f, location: e.target.value })}
              className="mt-1"
            />
          </div>
          <div>
            <Label>Completion year</Label>
            <Input
              type="number"
              value={f.completion_year ?? ""}
              onChange={(e) =>
                setF({
                  ...f,
                  completion_year: e.target.value
                    ? Number(e.target.value)
                    : null,
                })
              }
              className="mt-1"
            />
          </div>
          <div className="flex items-center gap-3">
            <Switch
              checked={f.featured}
              onCheckedChange={(v) => setF({ ...f, featured: v })}
              id="pfeat"
            />
            <Label htmlFor="pfeat">Featured</Label>
          </div>
          <div className="sm:col-span-2">
            <Label>Short description</Label>
            <Textarea
              rows={2}
              value={f.short_description}
              onChange={(e) =>
                setF({ ...f, short_description: e.target.value })
              }
              className="mt-1"
            />
          </div>
          <div className="sm:col-span-2">
            <Label>Full description</Label>
            <Textarea
              rows={6}
              value={f.description}
              onChange={(e) => setF({ ...f, description: e.target.value })}
              className="mt-1"
            />
          </div>
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6">
        <Label>Hero image URL</Label>
        <Input
          value={f.hero_image}
          onChange={(e) => setF({ ...f, hero_image: e.target.value })}
          className="mt-1"
          placeholder="Leave empty to use first gallery image"
        />
        <div className="mt-6">
          <ImageUploader
            bucket="project-images"
            values={f.images}
            onChange={(v) => setF({ ...f, images: v })}
            label="Project images"
          />
        </div>
      </div>

      <div className="rounded-xl border border-border bg-card p-6 space-y-3">
        <Label>Equipment supplied</Label>
        {f.equipment.map((e, i) => (
          <div key={i} className="flex gap-2">
            <Input
              value={e}
              onChange={(ev) => {
                const next = [...f.equipment];
                next[i] = ev.target.value;
                setF({ ...f, equipment: next });
              }}
              placeholder="e.g. 12× ICU patient monitors"
            />
            <Button
              variant="ghost"
              size="icon"
              onClick={() =>
                setF({ ...f, equipment: f.equipment.filter((_, j) => j !== i) })
              }
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        ))}
        <Button
          variant="outline"
          size="sm"
          onClick={() => setF({ ...f, equipment: [...f.equipment, ""] })}
        >
          <Plus className="h-4 w-4" /> Add item
        </Button>
      </div>
    </div>
  );
};

export default ProjectForm;
