'use client'

import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import PromptPreview from './PromptPreview';
import { callClaude, getTestResponse } from '@/lib/server/claude';

const samplePrompt = `
you are an AI agent. please double the input:

{{input}}
`

interface InputVariable {
    name: string;
    type: 'string' | 'number' | 'boolean';
    description?: string;
}

interface Prompt {
    name: string;
    template: string;
    inputVariables: InputVariable[];
}

const parseInputVariables = (template: string): InputVariable[] => {
    const regex = /{{(\w+)}}/g;
    const matches = template.match(regex) || [];
    return matches.map(match => {
        const name = match.replace('{{', '').replace('}}', '');
        return { name, type: 'string' as const }; // Default to string, can be refined later
    });
};

export default function PromptsPlayPage() {
    const [mode, setMode] = useState('editing');
    const [output, setOutput] = useState('<h1 className="text-2xl">hi there</h1>');
    const [promptName, setPromptName] = useState('');
    const [promptContent, setPromptContent] = useState(samplePrompt);
    const [formatted_prompt, setFormattedPrompt] = useState('');
    const [prompt, setPrompt] = useState<Prompt>({
        name: '',
        template: samplePrompt,
        inputVariables: parseInputVariables(samplePrompt)
    });
    const [waiting, setWaiting] = useState(false);

    const [inputValues, setInputValues] = useState<{ [key: string]: string }>({});

    useEffect(() => {
        const parsedVariables = parseInputVariables(promptContent);
        setPrompt(prev => ({
            ...prev,
            template: promptContent,
            inputVariables: parsedVariables
        }));
    }, [promptContent]);

    const replaceVariables = (content, variables) => {
        return content.replace(/\{\{(\w+)\}\}/g, (match, variable) => {
            const value = variables[variable];
            if (value === undefined) return match;

            try {
                // Attempt to parse as JSON
                const jsonValue = JSON.parse(value);
                return JSON.stringify(jsonValue, null, 2);
            } catch (e) {
                // If not valid JSON, return as is
                return value;
            }
        });
    };

    useEffect(() => {
        const formattedPrompt = replaceVariables(promptContent, inputValues);
        setFormattedPrompt(formattedPrompt);
    }, [promptContent, inputValues]);

    const handleSavePrompt = () => {
        // Logic to save the prompt
    };

    const handleViewHistory = () => {
        // Logic to view historical versions
    };

    const handleStream = async (formatted_prompt: string) => {
        try {
            setWaiting(true);
            setOutput('');
            console.log("fetching stream");
            const res = await fetch('/api/sse', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ prompt: formatted_prompt }),
            });

            if (!res.ok) throw new Error('Network response was not ok');

            const reader = res.body?.getReader();
            const decoder = new TextDecoder();

            while (true) {
                const { done, value } = await reader?.read();
                if (done) break;
                const chunk = decoder.decode(value);
                try {
                    console.log("received", chunk);
                    setWaiting(false);
                    setOutput(prevOutput => prevOutput + chunk);
                    // Handle the parsed data here
                } catch (error) {
                    console.error("Error parsing JSON:", error);
                }
            }
        } catch (err) {
            console.error('Streaming error:', err);
        } finally {
            setWaiting(false);
        }
    };

    const handleCallPrompt = React.useCallback(async () => {
        await handleStream(formatted_prompt);
    }, [formatted_prompt, handleStream]);


    const updateInputVariableType = (name: string, type: 'string' | 'number' | 'boolean') => {
        setPrompt(prev => ({
            ...prev,
            inputVariables: prev.inputVariables.map(v =>
                v.name === name ? { ...v, type } : v
            )
        }));
    };


    const handleInputChange = (name: string, value: string) => {
        setInputValues(prev => ({ ...prev, [name]: value }));
    };

    return (
        <div className="flex flex-col min-h-screen">
            <header className="p-4 bg-gray-100">
                <div className="flex justify-between items-center">
                    <input
                        type="text"
                        value={promptName}
                        onChange={(e) => setPromptName(e.target.value)}
                        placeholder="Name your prompt"
                        className="border p-2 rounded"
                    />
                    <div>
                        <button onClick={handleSavePrompt} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Save</button>
                        <button onClick={handleViewHistory} className="bg-gray-500 text-white px-4 py-2 rounded">History</button>
                    </div>
                </div>
            </header>
            <main className="flex flex-1">
                <div className="w-1/2 p-4 border-r">
                    <div className="mb-4">
                        <button
                            onClick={() => setMode('editing')}
                            className={`mr-2 ${mode === 'editing' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-4 py-2 rounded`}
                        >
                            Editing
                        </button>
                        <button
                            onClick={() => setMode('testing')}
                            className={`${mode === 'testing' ? 'bg-blue-500 text-white' : 'bg-gray-200'} px-4 py-2 rounded`}
                        >
                            Testing
                        </button>
                    </div>
                    {mode === 'editing' ? (
                        <div>
                            <textarea
                                value={promptContent}
                                onChange={(e) => setPromptContent(e.target.value)}
                                className="w-full h-64 border p-2 rounded"
                                placeholder="Enter your prompt here..."
                            />
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold">Input Variables:</h3>
                                {prompt.inputVariables.map((variable, index) => (
                                    <div key={index} className="flex items-center mt-2">
                                        <span className="mr-2">{variable.name}:</span>
                                        <select
                                            value={variable.type}
                                            onChange={(e) => updateInputVariableType(variable.name, e.target.value as 'string' | 'number' | 'boolean')}
                                            className="border p-1 rounded"
                                        >
                                            <option value="string">String</option>
                                            <option value="number">Number</option>
                                            <option value="boolean">Boolean</option>
                                        </select>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Test Inputs:</h3>
                            {prompt.inputVariables.map((variable, index) => (
                                <div key={index} className="mb-4">
                                    <label className="block mb-2">{variable.name}:</label>
                                    {variable.type === 'number' ? (
                                        <input
                                            type="number"
                                            value={inputValues[variable.name] || ''}
                                            onChange={(e) => handleInputChange(variable.name, e.target.value)}
                                            className="w-full border p-2 rounded"
                                        />
                                    ) : (
                                        <textarea
                                            value={inputValues[variable.name] || ''}
                                            onChange={(e) => handleInputChange(variable.name, e.target.value)}
                                            className="w-full border p-2 rounded"
                                            rows={3}
                                        />
                                    )}
                                </div>
                            ))}
                            <button onClick={handleCallPrompt} className="bg-green-500 text-white px-4 py-2 rounded mt-4">Call Prompt</button>
                            <div className="mt-4">
                                <h3 className="text-lg font-semibold mb-2">Full Prompt:</h3>
                                <pre className="bg-gray-100 p-3 rounded-md whitespace-pre-wrap">
                                    {formatted_prompt}
                                </pre>
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-1/2 p-4">
                    <PromptPreview output={output} waiting={waiting} />
                </div>
            </main>
            <footer className="p-4 bg-gray-100">
                <Link href="/prompts" className="text-blue-500">Back to Home</Link>
            </footer>
        </div>
    );
}