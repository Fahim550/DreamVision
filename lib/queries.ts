import { createClient } from "@/utils/supabase/client";

const supabase = createClient();
export type DBProduct = {
  id: string;
  slug: string;
  name: string;
  model: string | null;
  short_description: string | null;
  hero_image: string | null;
  images: string[];
  highlights: string[];
  blocks: any[];
  brochure_url: string | null;
  featured: boolean;
  category: { id: string; slug: string; name: string } | null;
  brand: { id: string; slug: string; name: string } | null;
};

function normalizeProduct(row: any): DBProduct {
  return {
    ...row,
    images: Array.isArray(row.images) ? row.images : [],
    highlights: Array.isArray(row.highlights) ? row.highlights : [],
    blocks: Array.isArray(row.blocks) ? row.blocks : [],
    category: row.categories ?? null,
    brand: row.brands ?? null,
  };
}

export async function fetchProducts(): Promise<DBProduct[]> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id,slug,name), brands(id,slug,name)")
    .eq("published", true)
    .order("created_at", { ascending: false });
  if (error) throw error;
  return (data ?? []).map(normalizeProduct);
}

export async function fetchProductBySlug(
  slug: string,
): Promise<DBProduct | null> {
  const { data, error } = await supabase
    .from("products")
    .select("*, categories(id,slug,name), brands(id,slug,name)")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data ? normalizeProduct(data) : null;
}

export type DBProject = {
  id: string;
  slug: string;
  title: string;
  location: string | null;
  client: string | null;
  completion_year: number | null;
  short_description: string | null;
  description: string | null;
  hero_image: string | null;
  images: string[];
  equipment: string[];
  featured: boolean;
};

export async function fetchProjects(): Promise<DBProject[]> {
  const { data, error } = await supabase
    .from("projects")
    .select("*")
    .order("completion_year", { ascending: false });
  if (error) throw error;
  return (data ?? []).map((r: any) => ({
    ...r,
    images: Array.isArray(r.images) ? r.images : [],
    equipment: Array.isArray(r.equipment) ? r.equipment : [],
  }));
}

export async function fetchBrands(): Promise<string[]> {
  const { data, error } = await supabase
    .from("brands")
    .select("name")
    .order("name");
  if (error) throw error;
  return (data ?? []).map((b) => b.name);
}
