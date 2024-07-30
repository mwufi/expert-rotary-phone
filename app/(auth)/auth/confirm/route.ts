import { createClient } from "@/lib/server/importSupabase"
import { EmailOtpType } from "@supabase/supabase-js"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {

    // myapp.io/auth/confirm?token_hash=...
    const { searchParams } = new URL(request.url)
    const token_hash = searchParams.get('token_hash')
    const type = searchParams.get('type') as EmailOtpType | null
    const next = '/account'

    // create redirect link without the secert tken
    const redirectto = request.nextUrl.clone()
    redirectto.pathname = next;
    redirectto.searchParams.delete('token_hash')
    redirectto.searchParams.delete('type')

    if (token_hash && type) {
        const supabase = createClient()
        const { error } = await supabase.auth.verifyOtp({
            type, token_hash
        })
        if (!error) {
            redirectto.searchParams.delete('next')
            return NextResponse.redirect(redirectto)
        }
    }

    redirectto.pathname = '/error'
    return NextResponse.redirect(redirectto)



}