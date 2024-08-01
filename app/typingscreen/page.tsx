"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

export default function TypingScreen() {
    const [notes, setNotes] = useState("");
    const [aiComments, setAiComments] = useState("");

    const handleNotesChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(event.target.value);
    };

    const generateAiComments = async () => {
        // This is a placeholder. In a real application, you would call an AI service here.
        setAiComments("AI comments will appear here. This is a placeholder.");
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-2xl font-bold mb-4">Note-taking Interface</h1>
            <div className="space-y-4">
                <div>
                    <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-2">Your Notes</label>
                    <Textarea
                        id="notes"
                        value={notes}
                        onChange={handleNotesChange}
                        placeholder="Start typing your notes here..."
                        className="w-full h-64"
                    />
                </div>
                <Button onClick={generateAiComments}>Generate AI Comments</Button>
                <div>
                    <h2 className="text-xl font-semibold mb-2">AI Comments</h2>
                    <div className="bg-gray-100 p-4 rounded-lg">
                        {aiComments || "AI comments will appear here after generation."}
                    </div>
                </div>
            </div>
        </div>
    );
}
