"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewPromptPage() {
    const [name, setName] = useState("");
    const [defaultModel, setDefaultModel] = useState("");
    const [promptText, setPromptText] = useState("");
    const [inputVars, setInputVars] = useState<{ [key: string]: string }>({});
    const [newVarKey, setNewVarKey] = useState("");

    const handleAddVar = () => {
        if (newVarKey) {
            setInputVars(prev => ({ ...prev, [newVarKey]: "" }));
            setNewVarKey("");
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const response = await fetch("/api/prompts/create", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                settings: { defaultModel },
                promptText,
                input_vars: inputVars,
            }),
        });
        if (response.ok) {
            // Handle successful creation (e.g., redirect or show message)
        } else {
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                />
            </div>

            <div>
                <label htmlFor="defaultModel" className="block text-sm font-medium text-gray-700">Default Model</label>
                <Select onValueChange={setDefaultModel} required>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a model" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="claude-sonnet">Claude Sonnet</SelectItem>
                        <SelectItem value="gpt-4">GPT-4</SelectItem>
                        {/* Add more model options as needed */}
                    </SelectContent>
                </Select>
            </div>

            <div>
                <label htmlFor="promptText" className="block text-sm font-medium text-gray-700">Prompt Text</label>
                <Textarea
                    id="promptText"
                    value={promptText}
                    onChange={(e) => setPromptText(e.target.value)}
                    rows={5}
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700">Input Variables</label>
                {Object.entries(inputVars).map(([key, value]) => (
                    <div key={key} className="mt-2">
                        <Input
                            value={value}
                            onChange={(e) => setInputVars(prev => ({ ...prev, [key]: e.target.value }))}
                            placeholder={key}
                        />
                    </div>
                ))}
                <div className="mt-2 flex">
                    <Input
                        value={newVarKey}
                        onChange={(e) => setNewVarKey(e.target.value)}
                        placeholder="New variable name"
                        className="mr-2"
                    />
                    <Button type="button" onClick={handleAddVar}>Add</Button>
                </div>
            </div>

            <Button type="submit">Create Prompt</Button>
        </form>
    );
}
