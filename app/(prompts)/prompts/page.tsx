'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import EmptyState from './EmptyState';
import { FetchedPrompt } from './types';

export default function PromptsPage() {
    const [prompts, setPrompts] = useState<FetchedPrompt[]>([]);

    useEffect(() => {
        const storedPrompts = localStorage.getItem('prompts');
        if (storedPrompts) {
            const parsedPrompts = JSON.parse(storedPrompts);
            const sortedPrompts = parsedPrompts.sort((a: FetchedPrompt, b: FetchedPrompt) => b.createdAt - a.createdAt);
            setPrompts(sortedPrompts);
        }
    }, []);

    if (prompts.length === 0) {
        return <EmptyState />;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold">Your Prompts</h1>
                <Button asChild>
                    <Link href="/prompts/play">Add New Prompt</Link>
                </Button>
            </div>
            <ul className="space-y-4">
                {prompts.map((prompt) => (
                    <li key={prompt.id} className="border p-4 rounded-lg shadow-sm hover:bg-gray-50 transition-colors duration-200">
                        <Link href={`/prompts/${prompt.id}`} className="block">
                            <h2 className="text-xl font-semibold">
                                {prompt.name || 'Untitled Prompt'}
                            </h2>
                            <p className="text-sm text-gray-500 mt-1">
                                Created: {new Date(prompt.createdAt).toLocaleString()}
                            </p>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
