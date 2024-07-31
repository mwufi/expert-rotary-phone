import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/server/importSupabase';

async function getPrompt(id: string) {
    const supabase = createClient();
    const { data: prompt, error } = await supabase
        .from('prompts')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        console.error('Error fetching prompt:', error);
        return null;
    }
    return prompt;
}

export default async function Prompt({ params }: { params: { id: string } }) {
    const prompt = await getPrompt(params.id);

    if (!prompt) {
        return <div>Prompt not found</div>;
    }

    return (
        <div className="mx-auto p-6 bg-white max-w-4xl">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-indigo-600">🧙‍♂️ Wizard's Riddle Generator</h1>
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white">Try Now!</Button>
            </div>

            <div className="mb-8">
                <img src="/placeholder-wizard.jpg" alt="Wizard" className="w-full h-64 object-cover rounded-lg mb-4" />
                <p className="text-lg text-gray-700">Create mind-bending riddles worthy of the greatest wizards! Perfect for dungeon masters, puzzle enthusiasts, and aspiring Gandalfs.</p>
            </div>

            <div className="grid grid-cols-3 gap-4 mb-8">
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">⭐ 4.8 Rating</h3>
                    <p className="text-sm text-gray-600">1,234 reviews</p>
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">🧠 10k+ Riddles</h3>
                    <p className="text-sm text-gray-600">Generated</p>
                </div>
                <div className="text-center">
                    <h3 className="font-semibold text-lg mb-2">🌟 Featured</h3>
                    <p className="text-sm text-gray-600">Editor's Choice</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">Sample Riddle</h2>
                <div className="bg-gray-100 p-4 rounded-lg">
                    <p className="text-lg italic">"I speak without a mouth and hear without ears. I have no body, but I come alive with the wind. What am I?"</p>
                    <p className="mt-2 text-indigo-600 font-semibold">Answer: An echo</p>
                </div>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">How It Works</h2>
                <ol className="list-decimal list-inside space-y-2">
                    <li>Choose your riddle difficulty</li>
                    <li>Select a theme (fantasy, sci-fi, nature, etc.)</li>
                    <li>Optionally add keywords or concepts</li>
                    <li>Let the wizard work his magic!</li>
                </ol>
            </div>

            <div className="mb-8">
                <h2 className="text-2xl font-semibold mb-4">User Reviews</h2>
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <img src="/placeholder-avatar1.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <h4 className="font-semibold">DungeonMaster42</h4>
                                <div className="flex text-yellow-400">
                                    {'★'.repeat(5)}
                                </div>
                            </div>
                        </div>
                        <p>"This app is a game-changer for my D&D campaigns. My players love the creative riddles!"</p>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg">
                        <div className="flex items-center mb-2">
                            <img src="/placeholder-avatar2.jpg" alt="User Avatar" className="w-10 h-10 rounded-full mr-3" />
                            <div>
                                <h4 className="font-semibold">PuzzleLover99</h4>
                                <div className="flex text-yellow-400">
                                    {'★'.repeat(4)}{'☆'.repeat(1)}
                                </div>
                            </div>
                        </div>
                        <p>"Great app! Would love to see more themed riddle packs in the future."</p>
                    </div>
                </div>
            </div>

            <div className="flex justify-center">
                <Button className="bg-indigo-500 hover:bg-indigo-600 text-white text-lg px-8 py-3">Download Now</Button>
            </div>
        </div>
    );
}