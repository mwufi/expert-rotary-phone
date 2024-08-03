import Link from 'next/link';
import { fetchInitialLeetCodeQuestions } from './server';
import LeetCodeSwiper from './Swiper';
import { Home, Search, Bell, User, Heart, BarChart2, Bookmark, MessageCircle, RefreshCw } from 'lucide-react';


const Page: React.FC = async () => {
    const questions = await fetchInitialLeetCodeQuestions()
    return (
        <>
            <LeetCodeSwiper questions={questions} />

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
        </>
    )
};

export default Page;