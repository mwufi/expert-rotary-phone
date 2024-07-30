'use server'

import { createClient } from '@/lib/server/importSupabase'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

export async function login(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        return redirect('/login?error=Invalid email or password')
    }

    revalidatePath('/', 'layout')
    return redirect('/account')
}

export async function signup(formData: FormData) {
    const email = formData.get('email') as string
    const password = formData.get('password') as string

    const supabase = createClient()

    const { error } = await supabase.auth.signUp({
        email,
        password,
    })

    if (error) {
        console.log("this is the error", error)
        return redirect('/login?error=Failed to sign up')
    }

    revalidatePath('/', 'layout')
    return redirect('/account')
}