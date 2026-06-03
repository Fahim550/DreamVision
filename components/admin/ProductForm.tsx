"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { ProductBlock } from "@/data/product";
import { slugify } from "@/lib/slug";
import { createClient } from "@/utils/supabase/client";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { ArrowLeft, ExternalLink, Plus, Save, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { BlockBuilder } from "../common/BlockBuilder";
import { ImageUploader } from "../common/ImaeUploader";

type Form = {
  name: string;
  slug: string;
  model: string;
  brand_id: string | null;
  category_id: string | null;
  short_description: string;
  hero_image: string;
  images: string[];
  highlights: string[];
  blocks: ProductBlock[];
  brochure_url: string;
  featured: boolean;
  published: boolean;
};

const empty: Form = {
  name: "",
  slug: "",
  model: "",
  brand_id: null,
  category_id: null,
  short_description: "",
  hero_image: "",
  images: [],
  highlights: [""],
  blocks: [],
  brochure_url: "",
  featured: false,
  published: true,
};

const ProductForm = () => {
  const { id } = useParams();
  const isNew = !id || id === "new";
  const supabase = createClient();
  const router = useRouter();
  const qc = useQueryClient();
  const [f, setF] = useState<Form>(empty);
  const [slugTouched, setSlugTouched] = useState(false);

  const { data: cats } = useQuery({
    queryKey: ["cats"],
    queryFn: async () =>
      (await supabase.from("categories").select("id,name").order("name"))
        .data ?? [],
  });
  const { data: brands } = useQuery({
    queryKey: ["brands-all"],
    queryFn: async () =>
      (await supabase.from("brands").select("id,name").order("name")).data ??
      [],
  });

  const { isLoading } = useQuery({
    queryKey: ["product", id],
    enabled: !isNew,
    queryFn: async () => {
      const { data, error } = await supabase
        .from("products")
        .select("*")
        .eq("id", id as string)
        .maybeSingle();
      if (error) throw error;
      if (data) {
        setF({
          name: data.name || "",
          slug: data.slug || "",
          model: data.model || "",
          brand_id: data.brand_id,
          category_id: data.category_id,
          short_description: data.short_description || "",
          hero_image: data.hero_image || "",
          images: Array.isArray(data.images) ? (data.images as string[]) : [],
          highlights:
            Array.isArray(data.highlights) && data.highlights.length
              ? (data.highlights as string[])
              : [""],
          blocks: Array.isArray(data.blocks)
            ? (data.blocks as unknown as ProductBlock[])
            : [],
          brochure_url: data.brochure_url || "",
          featured: !!data.featured,
          published: data.published !== false,
        });
        setSlugTouched(true);
      }
      return data;
    },
  });

  // Auto-generate slug
  useEffect(() => {
    if (!slugTouched && isNew) setF((s) => ({ ...s, slug: slugify(s.name) }));
  }, [f.name, slugTouched, isNew]);

  const save = useMutation({
    mutationFn: async () => {
      if (!f.name.trim()) throw new Error("Name is required");
      if (!f.slug.trim()) throw new Error("Slug is required");
      const payload = {
        name: f.name.trim(),
        slug: f.slug.trim(),
        model: f.model.trim() || null,
        brand_id: f.brand_id,
        category_id: f.category_id,
        short_description: f.short_description || null,
        hero_image: f.hero_image || (f.images[0] ?? null),
        images: f.images,
        highlights: f.highlights.filter((h) => h.trim()),
        blocks: f.blocks as any,
        brochure_url: f.brochure_url || null,
        featured: f.featured,
        published: f.published,
      };
      if (isNew) {
        const { data, error } = await supabase
          .from("products")
          .insert(payload)
          .select("id")
          .single();
        if (error) throw error;
        return data.id as string;
      }
      const { error } = await supabase
        .from("products")
        .update(payload)
        .eq("id", id as string);
      if (error) throw error;
      return id!;
    },
    onSuccess: (newId) => {
      qc.invalidateQueries({ queryKey: ["admin-products"] });
      toast.success("Saved");
      if (isNew) router.push(`/admin/products/${newId}`);
    },
    onError: (e: Error) => toast.error(e.message),
  });

  if (!isNew && isLoading)
    return (
      <div className="space-y-3">
        <Skeleton className="h-10 w-64" />
        <Skeleton className="h-64 w-full" />
      </div>
    );

  return (
    <div className="space-y-6 max-w-5xl">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" asChild>
            <Link href="/admin/products">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <h1 className="font-display text-2xl font-bold">
            {isNew ? "New product" : f.name || "Edit product"}
          </h1>
        </div>
        <div className="flex gap-2">
          {!isNew && f.slug && (
            <Button variant="outline" asChild>
              <a href={`/products/${f.slug}`} target="_blank" rel="noreferrer">
                <ExternalLink className="h-4 w-4" /> Preview
              </a>
            </Button>
          )}
          <Button
            variant="cta"
            onClick={() => save.mutate()}
            disabled={save.isPending}
          >
            <Save className="h-4 w-4" /> {save.isPending ? "Saving…" : "Save"}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="basics">
        <TabsList>
          <TabsTrigger value="basics">Basics</TabsTrigger>
          <TabsTrigger value="media">Media</TabsTrigger>
          <TabsTrigger value="highlights">Highlights</TabsTrigger>
          <TabsTrigger value="blocks">Content blocks</TabsTrigger>
        </TabsList>

        <TabsContent value="basics" className="space-y-4 mt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label>Name *</Label>
                <Input
                  value={f.name}
                  onChange={(e) => setF({ ...f, name: e.target.value })}
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
                <Label>Model</Label>
                <Input
                  value={f.model}
                  onChange={(e) => setF({ ...f, model: e.target.value })}
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Brand</Label>
                <Select
                  value={f.brand_id ?? "none"}
                  onValueChange={(v) =>
                    setF({ ...f, brand_id: v === "none" ? null : v })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {brands?.map((b: any) => (
                      <SelectItem key={b.id} value={b.id}>
                        {b.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Category</Label>
                <Select
                  value={f.category_id ?? "none"}
                  onValueChange={(v) =>
                    setF({ ...f, category_id: v === "none" ? null : v })
                  }
                >
                  <SelectTrigger className="mt-1">
                    <SelectValue placeholder="—" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">—</SelectItem>
                    {cats?.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>
                        {c.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Brochure PDF URL</Label>
                <Input
                  value={f.brochure_url}
                  onChange={(e) => setF({ ...f, brochure_url: e.target.value })}
                  className="mt-1"
                  placeholder="https://…"
                />
              </div>
              <div className="sm:col-span-2">
                <Label>Short description</Label>
                <Textarea
                  rows={3}
                  value={f.short_description}
                  onChange={(e) =>
                    setF({ ...f, short_description: e.target.value })
                  }
                  className="mt-1"
                />
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={f.featured}
                  onCheckedChange={(v) => setF({ ...f, featured: v })}
                  id="featured"
                />
                <Label htmlFor="featured">Featured</Label>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={f.published}
                  onCheckedChange={(v) => setF({ ...f, published: v })}
                  id="published"
                />
                <Label htmlFor="published">Published</Label>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="media" className="space-y-4 mt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-6">
            <div>
              <Label>Hero image URL</Label>
              <Input
                value={f.hero_image}
                onChange={(e) => setF({ ...f, hero_image: e.target.value })}
                className="mt-1"
                placeholder="Leave empty to use first gallery image"
              />
              {f.hero_image && (
                <Image
                  src={f.hero_image}
                  alt=""
                  height={500}
                  width={500}
                  className="mt-2 h-32 rounded-lg border border-border object-cover"
                />
              )}
            </div>
            <ImageUploader
              bucket="product-images"
              values={f.images}
              onChange={(v) => setF({ ...f, images: v })}
              label="Gallery images"
            />
          </div>
        </TabsContent>

        <TabsContent value="highlights" className="mt-4">
          <div className="rounded-xl border border-border bg-card p-6 space-y-3">
            {f.highlights.map((h, i) => (
              <div key={i} className="flex gap-2">
                <Input
                  value={h}
                  onChange={(e) => {
                    const next = [...f.highlights];
                    next[i] = e.target.value;
                    setF({ ...f, highlights: next });
                  }}
                  placeholder="e.g. 15-inch touchscreen"
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() =>
                    setF({
                      ...f,
                      highlights: f.highlights.filter((_, j) => j !== i),
                    })
                  }
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setF({ ...f, highlights: [...f.highlights, ""] })}
            >
              <Plus className="h-4 w-4" /> Add highlight
            </Button>
          </div>
        </TabsContent>

        <TabsContent value="blocks" className="mt-4">
          <BlockBuilder
            value={f.blocks}
            onChange={(v) => setF({ ...f, blocks: v })}
          />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ProductForm;
