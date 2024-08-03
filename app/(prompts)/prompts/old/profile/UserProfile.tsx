import React from 'react';
import { User, Star, PlayCircle, Plus } from 'lucide-react';

const UserProfile = () => {
    // Mock data - in a real app, this would come from props or an API
    const userData = {
        name: "Zen Maestro",
        username: "@zenmaestro",
        avatarUrl: "https://rmaikbonpvsnqumxxufn.supabase.co/storage/v1/object/public/avatars/c014dee1-e734-4c6e-8498-456902705b3c-0.37601507741730855.jpeg",
        followers: 1024,
        following: 256,
        creds: 5000,
        topPrompts: [
            { id: 1, title: "Create a sci-fi story", likes: 342 },
            { id: 2, title: "Design a logo for a tech startup", likes: 289 },
            { id: 3, title: "Write a haiku about nature", likes: 201 },
        ],
        topReplays: [
            { id: 1, title: "Epic space battle scene", views: 10243 },
            { id: 2, title: "Dramatic movie trailer", views: 8976 },
            { id: 3, title: "Ambient nature sounds", views: 7654 },
        ],
    };

    return (
        <div className="bg-pink-50 text-gray-800 p-6 max-w-2xl mx-auto rounded-lg shadow-md">
            <div className="flex items-center mb-6">
                <img src={userData.avatarUrl} alt={userData.name} className="w-24 h-24 rounded-full mr-4 border-4 border-purple-200" />
                <div>
                    <h1 className="text-2xl font-bold text-purple-600">{userData.name}</h1>
                    <p className="text-purple-400">{userData.username}</p>
                </div>
                <button className="ml-auto bg-purple-300 hover:bg-purple-400 text-purple-800 px-4 py-2 rounded transition duration-300">Edit Profile</button>
            </div>

            <div className="flex justify-between mb-6">
                <div className="text-center">
                    <p className="font-bold text-purple-600">{userData.followers}</p>
                    <p className="text-sm text-purple-400">Followers</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-purple-600">{userData.following}</p>
                    <p className="text-sm text-purple-400">Following</p>
                </div>
                <div className="text-center">
                    <p className="font-bold text-purple-600">{userData.creds}</p>
                    <p className="text-sm text-purple-400">Creds</p>
                </div>
            </div>

            <div className="mb-6">
                <h2 className="text-xl font-bold mb-3 text-purple-700">Top Prompts</h2>
                {userData.topPrompts.map(prompt => (
                    <div key={prompt.id} className="flex items-center justify-between mb-2 bg-purple-100 p-2 rounded">
                        <p className="text-purple-700">{prompt.title}</p>
                        <span className="flex items-center text-yellow-600">
                            <Star size={16} className="mr-1" />
                            {prompt.likes}
                        </span>
                    </div>
                ))}
                <button className="text-purple-500 hover:text-purple-700 flex items-center mt-2 transition duration-300">
                    <Plus size={16} className="mr-1" /> Create New Prompt
                </button>
            </div>

            <div>
                <h2 className="text-xl font-bold mb-3 text-purple-700">Top Replays</h2>
                {userData.topReplays.map(replay => (
                    <div key={replay.id} className="flex items-center justify-between mb-2 bg-purple-100 p-2 rounded">
                        <p className="text-purple-700">{replay.title}</p>
                        <span className="flex items-center text-green-600">
                            <PlayCircle size={16} className="mr-1" />
                            {replay.views}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default UserProfile;