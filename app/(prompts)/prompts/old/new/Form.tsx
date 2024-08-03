"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function NewPromptForm({ createNewPrompt }: { createNewPrompt: (formData: FormData) => void }) {
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

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData();
        formData.append('name', name);
        formData.append('defaultModel', defaultModel);
        formData.append('promptText', promptText);
        Object.entries(inputVars).forEach(([key, value]) => {
            formData.append(`inputVar_${key}`, value);
        });
        // Add newVarKey to formData if it's not empty
        if (newVarKey) {
            formData.append(`inputVar_${newVarKey}`, '');
        }
        createNewPrompt(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    id="name"
                    name="name"
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
                    name="promptText"
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
                            name={`inputVar_${key}`}
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

            <Button type="submit">Create Prompt!</Button>
        </form>
    );
}
