import { FetchedPrompt } from "../types";

'use client'

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { Button } from "@/components/ui/button";
import Link from 'next/link';

export default function PromptDetailPage() {
    const [prompt, setPrompt] = useState<FetchedPrompt | null>(null);
    const { id } = useParams();

    useEffect(() => {
        const storedPrompts = localStorage.getItem('prompts');
        if (storedPrompts) {
            const parsedPrompts: FetchedPrompt[] = JSON.parse(storedPrompts);
            const foundPrompt = parsedPrompts.find(p => p.id === id);
            if (foundPrompt) {
                setPrompt(foundPrompt);
            }
        }
    }, [id]);

    if (!prompt) {
        return <div>Loading...</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">{prompt.name || 'Untitled Prompt'}</h1>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Prompt Template</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {prompt.prompt_template}
                </pre>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Variables</h2>
                <ul className="list-disc pl-5">
                    {prompt.variables.map((variable, index) => (
                        <li key={index} className="mb-2">
                            <span className="font-medium">{variable.name}</span>: {variable.type}
                            {variable.currentValue && (
                                <span className="ml-2">
                                    (Current value: {JSON.stringify(variable.currentValue)})
                                </span>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Formatted Prompt</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {prompt.formatted_prompt}
                </pre>
            </div>
            <div className="bg-white shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-semibold mb-2">Current Output</h2>
                <pre className="bg-gray-100 p-4 rounded-md overflow-x-auto">
                    {prompt.current_output}
                </pre>
            </div>
            <div className="flex justify-between">
                <Button asChild>
                    <Link href="/prompts">Back to Prompts</Link>
                </Button>
                <Button asChild>
                    <Link href={`/prompts/play?id=${prompt.id}`}>Edit Prompt</Link>
                </Button>
            </div>
        </div>
    );
}
