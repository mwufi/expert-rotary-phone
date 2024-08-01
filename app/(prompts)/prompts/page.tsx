import { Button } from "@/components/ui/button";
import Link from "next/link";

import { createClient } from '@/lib/server/importSupabase';
import EmptyState from "./EmptyState";
import { DoorClosed, Play, Search, X } from 'lucide-react'
import { Input } from "@/components/ui/input"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import cx from "clsx"

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
    const bgColors = ['bg-blue-100', 'bg-purple-100', 'bg-yellow-100', 'bg-pink-100', 'bg-indigo-100', 'bg-orange-100'];
    const randomBgColor = bgColors[Math.floor(Math.random() * bgColors.length)];
    return (
        <div key={prompt.id} className={cx(randomBgColor, 'flex items-center justify-between p-4 space-x-4 rounded-lg shadow')}>
            <div className="flex items-center space-x-4">
                <Avatar>
                    <AvatarImage src="/placeholder-user.jpg" />
                    <AvatarFallback>{prompt.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                    <span className="font-bold text-green-700">{prompt.name}</span>
                    <span className="text-green-600">Created: {new Date(prompt.created_at).toLocaleDateString()}</span>
                </div>
            </div>
            <Button variant="ghost" className="text-green-700 hover:bg-green-200">
                <Play className="w-6 h-6" />
            </Button>
        </div>
    );
}

export default async function Page() {
    const prompts = await getPrompts();

    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
            <header className="flex items-center justify-between w-full p-4 bg-purple-100">
                <h1 className="text-xl font-bold text-purple-600">Prompts</h1>
                <Button asChild>
                    <Link href="/prompts/new">Add Prompt</Link>
                </Button>
            </header>
            <main className="flex flex-col items-center w-full p-4 space-y-4 bg-blue-50">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-8 pr-8 py-2 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-300"
                    />
                    <DoorClosed className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                {prompts.length > 0 ? (
                    <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
                        {prompts.map((prompt) => (
                            <Prompt key={prompt.id} prompt={prompt} />
                        ))}
                    </div>
                ) : (
                    <EmptyState />
                )}
            </main>
        </div>
    );
}