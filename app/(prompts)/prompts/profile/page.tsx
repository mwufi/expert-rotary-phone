import React from 'react';
import UserProfile from './UserProfile';
import CreatePromptForm from './PromptForm';

export default function ProfilePage() {
    const doNothing = async (formData: FormData) => {
        'use server'

        // Extract title, description, and tags from formData
        const title = formData.get('title') as string;
        const description = formData.get('description') as string;
        const tags = formData.get('tags') as string;

        // Log the extracted data
        console.log("Received:", { title, description, tags });
    }

    return (
        <div className="container mx-auto px-4 py-8 bg-gray-50 h-full">
            <UserProfile />
            {/* <CreatePromptForm createNewPrompt={doNothing} /> */}
        </div>
    );
}
