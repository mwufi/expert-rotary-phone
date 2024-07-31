import { Button } from "@/components/ui/button";
import Link from "next/link";

import { createClient } from '@/lib/server/importSupabase';
import EmptyState from "./EmptyState";

async function getPrompts() {
    const supabase = createClient();
    const { data: prompts, error } = await supabase
        .from('prompts')
        .select('*')
        .order('created_at', { ascending: false });

    if (error) {
        console.error('Error fetching prompts:', error);
        return [];
    }
    return prompts;
}

function Prompt({ prompt }: { prompt: any }) {
    return (
        <Link href={`/prompts/${prompt.id}`} className="block">
            <div className="border rounded-lg p-4 mb-4 hover:bg-gray-50 transition-colors">
                <h3 className="text-lg font-semibold">{prompt.name}</h3>
                <p className="text-sm text-gray-500 mt-1">
                    Created: {new Date(prompt.created_at).toLocaleDateString()}
                    {/* Add more stats here when available, e.g.: */}
                    {/* • Times run: {prompt.times_run} */}
                </p>
            </div>
        </Link>
    );
}

export default async function Page() {
    const prompts = await getPrompts();

    return (
        <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
            <div className="flex items-center justify-between">
                <h1 className="text-lg font-semibold md:text-2xl">Prompts</h1>
                <Button asChild>
                    <Link href="/prompts/new">Add Prompt</Link>
                </Button>
            </div>
            {prompts.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {prompts.map((prompt) => (
                        <Prompt key={prompt.id} prompt={prompt} />
                    ))}
                </div>
            ) : (
                <EmptyState />
            )}
        </main>
    );
}