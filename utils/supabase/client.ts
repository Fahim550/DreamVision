import { Database } from "@/types/types";
import { createBrowserClient } from "@supabase/ssr";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error("Missing Supabase environment variables");
}

let client: ReturnType<typeof createBrowserClient<Database>> | null = null;

export function createClient() {
  if (!client) {
    client = createBrowserClient<Database>(supabaseUrl!, supabaseKey!);
  }

  return client;
}

// export const createClient = () => {
//   console.trace("Supabase Browser Client Called");
//   if (typeof window === "undefined") {
//     throw new Error(
//       "Supabase browser client can only be created in the browser",
//     );
//   }

//   return createBrowserClient<Database>(supabaseUrl, supabaseKey, {
//     auth: {
//       storage: window.localStorage,
//       persistSession: true,
//       autoRefreshToken: true,
//     },
//   });
// };
