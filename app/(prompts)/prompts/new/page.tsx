import NewPromptForm from "./Form";
import { redirect } from 'next/navigation';
import { createClient } from '@/lib/server/importSupabase';

export default function Page() {

    async function createNewPrompt(formData: FormData) {
        'use server'

        const data = {
            name: formData.get('name') as string,
            settings: {
                defaultModel: formData.get('defaultModel') as string,
            },
            promptText: formData.get('promptText') as string,
            input_vars: Object.fromEntries(
                Array.from(formData.entries())
                    .filter(([key]) => key.startsWith('inputVar_'))
                    .map(([key, value]) => [key.replace('inputVar_', ''), value])
            ),
        };

        console.log("You submitted", data)

        const supabase = createClient();

        const { data: { user } } = await supabase.auth.getUser();

        if (!user) {
            return { error: 'Unauthorized' };
        }

        const { data: profile, error: profileError } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (profileError || !profile) {
            return { error: 'Profile not found' };
        }

        const { name, settings, promptText, input_vars } = data;

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
            console.error(error);
            return { error: error.message };
        }

        console.log("Created new prompt:", newPrompt);
        redirect('/prompts');
    };

    return (
        <div className="p-4">
            <h1 className="text-3xl font-bold my-4">Create a new prompt</h1>
            <NewPromptForm createNewPrompt={createNewPrompt} />
        </div>
    )
}