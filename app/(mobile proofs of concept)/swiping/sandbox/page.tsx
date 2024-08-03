'use client'

import React, { useState } from 'react';
import { Home, Search, Bell, User, Heart, BarChart2, Bookmark, MessageCircle, RefreshCw } from 'lucide-react';
import Link from 'next/link';

// Sections for the sliding header:
// - Buttons
// - Navigation
// - Forms
// - Cards
// - Lists
// - Modals
// - Other Components

const SandboxPage = () => {
    const [activeTab, setActiveTab] = useState('Buttons');
    const tabs = ['Movie', 'Insta', 'Twitter', 'Movie2', 'Buttons', 'Navigation', 'Forms', 'Cards', 'Lists', 'Modals', 'Other'];

    return (
        <div className="flex flex-col h-screen bg-white overflow-hidden">
            {/* Minimal Header for Designers */}
            <header className="bg-white p-4 border-b border-gray-200">
                {/* <h1 className="text-2xl font-light mb-4 text-gray-800">Design Sandbox</h1> */}
                <div className="flex overflow-x-auto">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            className={`px-4 py-2 mr-4 text-lg ${activeTab === tab
                                ? 'font-bold text-gray-800'
                                : 'font-light text-gray-500 hover:text-gray-800'
                                }`}
                            onClick={() => setActiveTab(tab)}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </header>

            {/* Main Content Area */}
            <main className="flex-grow pb-[60px] overflow-auto">
                {/* <h2 className="text-xl font-semibold mb-4 text-gray-800">{activeTab}</h2> */}
                {/* Add component examples here based on the active tab */}

                {activeTab === 'Movie2' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-2">Movie Details</h3>
                        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                            <img src="https://via.placeholder.com/400x200" alt="Movie Poster" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h4 className="text-xl font-bold mb-2">Movie Title</h4>
                                <p className="text-gray-600 mb-4">2023 | Action, Adventure | 2h 15min</p>
                                <p className="text-gray-700 mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-yellow-500">★★★★☆</span>
                                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Insta' && (
                    <div className="space-y-4 p-4 bg-green-50">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center">
                                <div className="w-16 h-16 rounded-full overflow-hidden mr-4 border-2 border-green-300">
                                    <img src="https://picsum.photos/200" alt="Profile" className="w-full h-full object-cover" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-green-800">@bookworm</h4>
                                    <p className="text-green-600">Literary Adventures</p>
                                </div>
                            </div>
                            <button className="bg-green-400 hover:bg-green-500 text-white font-semibold py-1 px-4 rounded-full transition duration-300">
                                Follow
                            </button>
                        </div>
                        <div className="flex justify-between mb-4 bg-white rounded-lg p-3 shadow-sm">
                            <div className="text-center">
                                <span className="font-semibold text-green-700">487</span>
                                <p className="text-green-600">Posts</p>
                            </div>
                            <div className="text-center">
                                <span className="font-semibold text-green-700">28.3k</span>
                                <p className="text-green-600">Followers</p>
                            </div>
                            <div className="text-center">
                                <span className="font-semibold text-green-700">1,024</span>
                                <p className="text-green-600">Following</p>
                            </div>
                        </div>
                        <p className="text-green-700 mb-4 bg-white rounded-lg p-3 shadow-sm">
                            📚 Exploring worlds through pages! 🌿 Book lover, nature enthusiast, and storyteller.
                            Join me on this literary journey through forests of imagination! #BookishGreen
                        </p>
                        <div className="grid grid-cols-3 gap-2">
                            {[...Array(9)].map((_, index) => (
                                <div key={index} className="aspect-square rounded-lg overflow-hidden shadow-sm hover:shadow-md transition duration-300">
                                    <img src={`https://picsum.photos/300?random=${index}`} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {activeTab === 'Twitter' && (
                    <div className="bg-gray-100 min-h-screen">
                        {/* Header Image */}
                        <div className="h-48 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/1200/400')" }}></div>

                        {/* Profile Section */}
                        <div className="bg-white shadow-lg rounded-lg -mt-20 mx-4 p-6">
                            <div className="flex flex-col sm:flex-row items-center justify-between mb-6">
                                <div className="flex flex-col sm:flex-row items-center">
                                    <img src="https://picsum.photos/200" alt="Profile" className="w-24 h-24 rounded-full border-4 border-white shadow-md mb-4 sm:mb-0 sm:mr-6" />
                                    <div className="text-center sm:text-left">
                                        <h4 className="text-2xl font-bold text-gray-800">@stellarscribe</h4>
                                        <p className="text-gray-600">Astrophysicist | Science Communicator | Stargazer</p>
                                    </div>
                                </div>
                                <button className="mt-4 sm:mt-0 bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-full text-sm transition duration-300">
                                    Follow
                                </button>
                            </div>
                            <p className="text-gray-700 mb-6">
                                Exploring the cosmos through research and writing. Sharing the wonders of the universe one tweet at a time.
                                Let's embark on a celestial journey together! 🌟🔭 #AstroEnthusiast
                            </p>
                            <div className="flex justify-between text-sm text-gray-600 mb-6">
                                <span><strong>1,245</strong> Posts</span>
                                <span><strong>18.3K</strong> Followers</span>
                                <span><strong>892</strong> Following</span>
                            </div>

                            {/* Pinned Items */}
                            <div className="flex flex-wrap gap-4 mb-6">
                                <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300">
                                    🌐 Personal Website
                                </a>
                                <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300">
                                    📺 YouTube Channel
                                </a>
                                <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300">
                                    📝 Latest Article
                                </a>
                                <a href="#" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-full text-sm transition duration-300">
                                    🔬 Research
                                </a>
                            </div>
                        </div>

                        {/* Posts Section */}
                        <div className="mt-8 mx-4">
                            <h2 className="text-2xl font-bold text-gray-800 mb-4">Recent Posts</h2>
                            <div className="space-y-6">
                                {[
                                    {
                                        title: "The Mystery of Dark Matter",
                                        excerpt: "Exploring the invisible force that shapes our universe...",
                                        image: "https://picsum.photos/400/300?random=1",
                                        likes: 1243,
                                        comments: 89
                                    },
                                    {
                                        title: "Exoplanets: Worlds Beyond Our Solar System",
                                        excerpt: "Discovering potentially habitable planets in distant star systems...",
                                        image: "https://picsum.photos/400/300?random=2",
                                        likes: 958,
                                        comments: 72
                                    },
                                    {
                                        title: "The Life Cycle of Stars",
                                        excerpt: "From cosmic nurseries to spectacular supernovae...",
                                        image: "https://picsum.photos/400/300?random=3",
                                        likes: 1576,
                                        comments: 104
                                    }
                                ].map((post, index) => (
                                    <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                        <img src={post.image} alt={post.title} className="w-full h-48 object-cover" />
                                        <div className="p-6">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">{post.title}</h3>
                                            <p className="text-gray-600 mb-4">{post.excerpt}</p>
                                            <div className="flex justify-between text-sm text-gray-500">
                                                <span>{post.likes} Likes</span>
                                                <span>{post.comments} Comments</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Other' && (
                    <div className="space-y-6">
                        <h3 className="text-lg font-semibold mb-2">Profile Update View</h3>
                        <div className="max-w-md mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                            <div className="p-4">
                                <div className="flex items-center justify-center mb-4">
                                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                                        <User size={48} className="text-gray-600" />
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
                                        <input type="text" id="name" name="name" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="John Doe" />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                                        <input type="email" id="email" name="email" className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="john@example.com" />
                                    </div>
                                    <div>
                                        <label htmlFor="bio" className="block text-sm font-medium text-gray-700">Bio</label>
                                        <textarea id="bio" name="bio" rows={3} className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" placeholder="Tell us about yourself"></textarea>
                                    </div>
                                    <div>
                                        <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                            Update Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Buttons' && (
                    <div className="space-y-6">
                        {/* Default Buttons */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Default Buttons</h3>
                            <div className="flex space-x-4">
                                <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">
                                    Primary
                                </button>
                                <button className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
                                    Secondary
                                </button>
                                <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded">
                                    Success
                                </button>
                                <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                    Danger
                                </button>
                            </div>
                        </div>

                        {/* Outlined Buttons */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Outlined Buttons</h3>
                            <div className="flex space-x-4">
                                <button className="border border-blue-500 text-blue-500 hover:bg-blue-100 font-bold py-2 px-4 rounded">
                                    Primary
                                </button>
                                <button className="border border-gray-500 text-gray-500 hover:bg-gray-100 font-bold py-2 px-4 rounded">
                                    Secondary
                                </button>
                                <button className="border border-green-500 text-green-500 hover:bg-green-100 font-bold py-2 px-4 rounded">
                                    Success
                                </button>
                                <button className="border border-red-500 text-red-500 hover:bg-red-100 font-bold py-2 px-4 rounded">
                                    Danger
                                </button>
                            </div>
                        </div>

                        {/* Rounded Buttons */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Rounded Buttons</h3>
                            <div className="flex space-x-4">
                                <button className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-full">
                                    Primary
                                </button>
                                <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded-full">
                                    Secondary
                                </button>
                                <button className="bg-pink-500 hover:bg-pink-600 text-white font-bold py-2 px-4 rounded-full">
                                    Tertiary
                                </button>
                            </div>
                        </div>

                        {/* Icon Buttons */}
                        <div>
                            <h3 className="text-lg font-semibold mb-2">Icon Buttons</h3>
                            <div className="flex space-x-4">
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full">
                                    <Home size={24} />
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full">
                                    <Search size={24} />
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full">
                                    <Bell size={24} />
                                </button>
                                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold p-2 rounded-full">
                                    <User size={24} />
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {activeTab === 'Movie' && (
                    <div className="space-y-4">
                        {/* Movie Recommendation Card */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/400x200" alt="Movie poster" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Inception</h3>
                                <div className="flex items-center mb-2">
                                    <span className="text-yellow-500 mr-1">★</span>
                                    <span className="text-gray-600">8.8/10</span>
                                    <span className="text-gray-400 ml-2">(2.2M reviews)</span>
                                </div>
                                <p className="text-gray-600 mb-4">A thief who enters the dreams of others to steal secrets from their subconscious.</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-sm text-gray-500">Recommended for you</span>
                                    <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                        Watch Now
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Similar Movies Section */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-4">Similar Movies</h4>
                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                {['The Matrix', 'Interstellar', 'The Prestige'].map((movie) => (
                                    <div key={movie} className="flex-shrink-0 w-32">
                                        <img src="https://via.placeholder.com/128x192" alt={movie} className="w-full h-48 object-cover rounded-lg shadow-md" />
                                        <p className="mt-2 text-sm font-medium text-center">{movie}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* User Reviews Section */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-4">User Reviews</h4>
                            <div className="space-y-4">
                                {[
                                    { user: 'Alice', rating: 5, comment: 'Mind-bending and visually stunning!' },
                                    { user: 'Bob', rating: 4, comment: 'Great concept, but a bit confusing at times.' },
                                    { user: 'Charlie', rating: 5, comment: 'One of Nolan\'s best works. A must-watch!' }
                                ].map((review, index) => (
                                    <div key={index} className="bg-gray-50 rounded-lg p-4">
                                        <div className="flex items-center mb-2">
                                            <span className="font-medium mr-2">{review.user}</span>
                                            <div className="flex text-yellow-500">
                                                {[...Array(review.rating)].map((_, i) => (
                                                    <span key={i}>★</span>
                                                ))}
                                            </div>
                                        </div>
                                        <p className="text-gray-600">{review.comment}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Cast Section */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-4">Cast</h4>
                            <div className="flex space-x-4 overflow-x-auto pb-4">
                                {[
                                    { name: 'Leonardo DiCaprio', role: 'Cobb' },
                                    { name: 'Joseph Gordon-Levitt', role: 'Arthur' },
                                    { name: 'Ellen Page', role: 'Ariadne' },
                                    { name: 'Tom Hardy', role: 'Eames' }
                                ].map((actor) => (
                                    <div key={actor.name} className="flex-shrink-0 w-24 text-center">
                                        <img src="https://via.placeholder.com/96x96" alt={actor.name} className="w-24 h-24 rounded-full mx-auto mb-2" />
                                        <p className="text-sm font-medium">{actor.name}</p>
                                        <p className="text-xs text-gray-500">{actor.role}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Trivia Section */}
                        <div className="mt-6">
                            <h4 className="text-lg font-semibold mb-4">Movie Trivia</h4>
                            <ul className="list-disc list-inside space-y-2 text-gray-600">
                                <li>The movie's runtime is exactly 2 hours and 28 minutes.</li>
                                <li>Christopher Nolan wrote the first draft of the script in 2002.</li>
                                <li>The rotating hallway scene took 3 weeks to film.</li>
                                <li>The movie won 4 Academy Awards, including Best Visual Effects.</li>
                            </ul>
                        </div>
                    </div>
                )}

                {activeTab === 'Cards' && (
                    <div className="space-y-4">
                        {/* Basic Card */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold mb-2">Basic Card</h3>
                            <p className="text-gray-600">This is a simple card with some content.</p>
                        </div>

                        {/* Card with Image */}
                        <div className="bg-white rounded-lg shadow-md overflow-hidden">
                            <img src="https://via.placeholder.com/400x200" alt="Card image" className="w-full h-48 object-cover" />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Card with Image</h3>
                                <p className="text-gray-600">This card includes an image at the top.</p>
                            </div>
                        </div>

                        {/* Card with Action */}
                        <div className="bg-white rounded-lg shadow-md p-4">
                            <h3 className="text-lg font-semibold mb-2">Card with Action</h3>
                            <p className="text-gray-600 mb-4">This card has a button for user interaction.</p>
                            <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                                Take Action
                            </button>
                        </div>

                        {/* Horizontal Card */}
                        <div className="bg-white rounded-lg shadow-md flex">
                            <img src="https://via.placeholder.com/150" alt="Card thumbnail" className="w-1/3 object-cover rounded-l-lg" />
                            <div className="p-4 w-2/3">
                                <h3 className="text-lg font-semibold mb-2">Horizontal Card</h3>
                                <p className="text-gray-600">This card has a side-by-side layout.</p>
                            </div>
                        </div>
                    </div>
                )}
            </main>

            {/* Bottom Navigation Bar */}
            <nav className="bg-white border-t border-gray-200 fixed bottom-0 w-full">
                <div className="flex justify-around">
                    {[
                        { icon: Home, label: 'Home', href: '/swiping' },
                        { icon: Search, label: 'Sandbox', href: '/swiping/sandbox' },
                        { icon: Bell, label: 'Notifications', href: '/swiping/notifications' },
                        { icon: User, label: 'Profile', href: '/swiping/profile' },
                    ].map(({ icon: Icon, label, href }) => (
                        <Link
                            key={label}
                            href={href}
                            className="flex flex-col items-center p-2 text-gray-600"
                        >
                            <Icon size={24} />
                            <span className="text-xs mt-1">{label}</span>
                        </Link>
                    ))}
                </div>
            </nav>
        </div>
    );
};

export default SandboxPage;
