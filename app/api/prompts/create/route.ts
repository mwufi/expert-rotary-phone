import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server/importSupabase';

const supabase = createClient();

export async function POST(request: Request) {
    try {
        const {
            data: { user },
        } = await supabase.auth.getUser()

        // Get the profile ID for the current user
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('id')
            .eq('id', user?.id)
            .single();

        if (profileError || !profile) {
            return new Response(JSON.stringify({ error: 'Profile not found' }), {
                status: 404,
                headers: { 'Content-Type': 'application/json' },
            });
        }


        const { name, settings, promptText, input_vars } = await request.json();

        // Insert the new prompt with the profile ID
        const { data: newPrompt, error } = await supabase
            .from('prompts')
            .insert({
                profile_id: profile.id,
                name,
                settings,
                prompt_text: promptText,
                input_vars,
            })
            .select()
            .single();

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), {
                status: 400,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        return new Response(JSON.stringify(newPrompt), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        console.error('Error creating prompt:', error);
        return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
    }
}
