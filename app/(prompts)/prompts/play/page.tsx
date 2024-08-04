'use client'

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import PromptPreview from './PromptPreview';
import { FetchedPrompt, InputVariable, Prompt } from '../types';
import Test from './Test'

const samplePrompt = `
you are an AI agent. please double the input:

{{input}}
`

const parseInputVariables = (template: string): InputVariable[] => {
    const regex = /{{(\w+)}}/g;
    const matches = template.match(regex) || [];
    return matches.map(match => {
        const name = match.replace('{{', '').replace('}}', '');
        return { name, type: 'string' as const }; // Default to string, can be refined later
    });
};

export default function PromptsPlayPage({ id }: { id: string }) {
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
        if (id) {
            const storedPrompts = localStorage.getItem('prompts');
            if (storedPrompts) {
                const parsedPrompts: FetchedPrompt[] = JSON.parse(storedPrompts);
                const foundPrompt = parsedPrompts.find(p => p.id === id);
                if (foundPrompt) {
                    setPromptName(foundPrompt.name);
                    setPromptContent(foundPrompt.prompt_template);
                    setFormattedPrompt(foundPrompt.formatted_prompt);
                    setOutput(foundPrompt.current_output);
                    setPrompt({
                        name: foundPrompt.name,
                        template: foundPrompt.prompt_template,
                        inputVariables: foundPrompt.variables.map(v => ({ name: v.name, type: v.type }))
                    });
                    const initialInputValues = {};
                    foundPrompt.variables.forEach(v => {
                        initialInputValues[v.name] = v.currentValue.toString();
                    });
                    setInputValues(initialInputValues);
                }
            }
        }
    }, [id]);

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
        const newPrompt: FetchedPrompt = {
            id: id || Date.now().toString(),
            name: promptName,
            prompt_template: promptContent,
            variables: prompt.inputVariables.map(variable => ({
                name: variable.name,
                type: variable.type,
                currentValue: inputValues[variable.name] || ''
            })),
            formatted_prompt: formatted_prompt,
            current_output: output,
            createdAt: Date.now()
        };

        // Get existing prompts from localStorage
        const existingPrompts = JSON.parse(localStorage.getItem('prompts') || '[]');

        // Update or add the prompt
        const updatedPrompts = id
            ? existingPrompts.map(p => p.id === id ? newPrompt : p)
            : [newPrompt, ...existingPrompts];

        // Save updated prompts back to localStorage
        localStorage.setItem('prompts', JSON.stringify(updatedPrompts));

        // Optionally, you can show a success message or redirect the user
        alert('Prompt saved successfully!');
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
            <header className="p-4 bg-gray-100 border-b">
                <div className="container mx-auto flex justify-between items-center">
                    <Link href="/prompts" className="text-blue-500 hover:text-blue-700 flex items-center">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
                        </svg>
                        Back to Prompts
                    </Link>
                    <div className="flex items-center">
                        <button onClick={handleSavePrompt} className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-600 transition-colors">Save</button>
                        <button onClick={handleViewHistory} className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors">History</button>
                    </div>
                </div>
            </header>
            <main className="flex flex-1 flex-col">
                <div className="container mx-auto p-4">
                    <input
                        type="text"
                        value={promptName}
                        onChange={(e) => setPromptName(e.target.value)}
                        placeholder="Name your prompt"
                        className="w-full border p-2 rounded mb-4 text-lg font-semibold"
                    />

                    <div className="flex justify-start mb-4">
                        <button
                            onClick={() => setMode('editing')}
                            className={`mr-2 ${mode === 'editing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded transition-colors`}
                        >
                            Editing
                        </button>
                        <button
                            onClick={() => setMode('testing')}
                            className={`${mode === 'testing' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'} px-4 py-2 rounded transition-colors`}
                        >
                            Testing
                        </button>
                    </div>
                    <div className="flex flex-1 gap-6">
                        <div className="w-1/2">
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
                        <div className="w-1/2">
                            <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-green-600 to-blue-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
                                <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
                                <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
                                    <svg className="mr-1.5 text-white" xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 32 32" fill="currentColor">
                                        <path d="M22.45,6a5.47,5.47,0,0,1,3.91,1.64,5.7,5.7,0,0,1,0,8L16,26.13,5.64,15.64a5.7,5.7,0,0,1,0-8,5.48,5.48,0,0,1,7.82,0L16,10.24l2.53-2.58A5.44,5.44,0,0,1,22.45,6m0-2a7.47,7.47,0,0,0-5.34,2.24L16,7.36,14.89,6.24a7.49,7.49,0,0,0-10.68,0,7.72,7.72,0,0,0,0,10.82L16,29,27.79,17.06a7.72,7.72,0,0,0,0-10.82A7.49,7.49,0,0,0,22.45,4Z"></path>
                                    </svg>
                                    <span className="text-white">789</span>
                                </div>
                                <div className="absolute opacity-60 text-4xl drop-shadow">🌿</div>
                                <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{ textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25);" }}>EcoAI Assistant</h4>
                            </article>
                            <PromptPreview output={output} waiting={waiting} />
                        </div>
                    </div>
                </div>
            </main>
            <footer className="p-4 bg-gray-100">
                <Link href="/prompts" className="text-blue-500">Back to Home</Link>
            </footer>
            <Test/>
        </div>
    );
}