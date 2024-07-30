import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export function createClient() {
    const cookieStore = cookies()
    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return cookieStore.getAll()
                },
                setAll(cookiesToSet) {
                    try {
                        cookiesToSet.forEach((cookie) => {
                            cookieStore.set(cookie)
                        })
                    } catch (error) {
                        console.error('Error setting cookies:', error)
                    }
                }
            },
        }
    )
}