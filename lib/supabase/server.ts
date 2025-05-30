import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export function createServerClient() {
  const cookieStore = cookies();
  return createServerComponentClient(
    {
      cookies: () => cookieStore,
    },
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );
}

export async function createServerClientWithAuth() {
  const cookieStore = cookies(); // Isso agora é assíncrono
  return createServerComponentClient(
    { cookies: () => cookieStore }, // Simplificado
    {
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL!,
      supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    }
  );
}
