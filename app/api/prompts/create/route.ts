import { NextResponse } from 'next/server';
import { createClient } from '@/lib/server/importSupabase';

export async function POST(request: Request) {
    try {
        const supabase = createClient();

        // Get the current user's session
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get the profile for the current user
        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
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

        console.log("ok", newPrompt)

        if (error) {
            console.log(error)
            return NextResponse.json({ error: error.message }, { status: 400 });
        }

        return NextResponse.json(newPrompt, { status: 200 });

    } catch (error) {
        console.error('Error creating prompt:');
        return NextResponse.json({ error: 'Failed to create prompt' }, { status: 500 });
    }
}
