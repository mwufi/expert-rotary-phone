
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { DoorClosed, Play, Search, X } from 'lucide-react'

export default function ExplorePage() {
    return (
        <div className="flex flex-col items-center w-full min-h-screen bg-blue-50">
            <header className="flex items-center justify-between w-full p-4 bg-purple-100">
                <h1 className="text-xl font-bold text-purple-600">Explore</h1>
            </header>
            <main className="flex flex-col items-center w-full p-4 space-y-4 bg-blue-50">
                <div className="relative w-full max-w-lg">
                    <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-400" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="w-full pl-8 pr-8 py-2 border-2 border-purple-200 rounded-full focus:outline-none focus:border-purple-300"
                    />
                    <DoorClosed className="absolute right-2.5 top-2.5 h-4 w-4 text-gray-400" />
                </div>
                <div className="flex space-x-2">
                    <Button variant="outline" className="bg-purple-200 text-purple-700 hover:bg-purple-300">
                        Bots
                    </Button>
                    <Button variant="outline" className="bg-blue-200 text-blue-700 hover:bg-blue-300">
                        People
                    </Button>
                </div>
                <div className="grid grid-cols-1 gap-4 w-full max-w-lg">
                    <div className="flex items-center justify-between p-4 space-x-4 bg-green-100 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>AB</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-bold text-green-700">AI Assistant</span>
                                <span className="text-green-600">Explore the latest AI-powered features</span>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-green-700 hover:bg-green-200">
                            <Play className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 space-x-4 bg-yellow-100 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>CD</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-bold text-yellow-700">Creative Bot</span>
                                <span className="text-yellow-600">Discover new AI-powered tools</span>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-yellow-700 hover:bg-yellow-200">
                            <Play className="w-6 h-6" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between p-4 space-x-4 bg-purple-100 rounded-lg shadow">
                        <div className="flex items-center space-x-4">
                            <Avatar>
                                <AvatarImage src="/placeholder-user.jpg" />
                                <AvatarFallback>EF</AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col">
                                <span className="font-bold text-purple-700">Task Manager</span>
                                <span className="text-purple-600">Organize your workflow efficiently</span>
                            </div>
                        </div>
                        <Button variant="ghost" className="text-purple-700 hover:bg-purple-200">
                            <Play className="w-6 h-6" />
                        </Button>
                    </div>
                </div>
            </main>
        </div>
    )
}
