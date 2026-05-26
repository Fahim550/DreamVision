import { Database } from "@/types/types";
import { createBrowserClient as createBrowserClientInternal } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

export const createClient = () => {
  if (typeof window === "undefined") {
    throw new Error(
      "Supabase browser client can only be created in the browser",
    );
  }

  return createBrowserClientInternal<Database>(supabaseUrl, supabaseKey, {
    auth: {
      storage: window.localStorage,
      persistSession: true,
      autoRefreshToken: true,
    },
  });
};
