import { NextResponse } from "next/server"
import { createServerClient } from "@/lib/supabase/server"

export async function POST(request: Request) {
  try {
    const { userId, userData } = await request.json()

    // Create a Supabase client with the service role key
    const supabase = await createServerClient()

    // Insert the profile using the service role key (bypasses RLS)
    const { error } = await supabase.from("profiles").insert({
      id: userId,
      name: userData.name,
      email: userData.email,
      profile_type: userData.profile_type,
      phone: userData.phone,
      address: userData.address,
      cpf: userData.cpf || null,
      cnpj: userData.cnpj || null,
      company_name: userData.company_name || null,
    })

    if (error) {
      console.error("Error creating profile:", error)
      return NextResponse.json({ message: `Error creating profile: ${error.message}` }, { status: 500 })
    }

    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error("Error in create-profile route:", error)
    return NextResponse.json({ message: error.message || "Internal server error" }, { status: 500 })
  }
}
