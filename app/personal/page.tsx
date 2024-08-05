import { Merriweather } from 'next/font/google';

const merriweather = Merriweather({
    weight: ['300', '400', '700'],
    subsets: ['latin'],
});

const PersonalPage = () => {
    const IndexLink = ({ url, title }) => {
        return (
            <li className="flex items-center justify-start group">
                <a href={url} className="relative group">
                    <span className="relative z-10 transition-all duration-300 hover:tracking-wider">{title}</span>
                    <span className="absolute inset-0 bg-amber-300 opacity-0 blur-md transition-all duration-100 group-hover:opacity-50"></span>
                </a>
                <span className="text-gray-400 text-xs ml-2">{url}</span>
            </li>
        )
    }

    return (
        <div className="min-h-screen">
            <div className="relative h-screen w-screen overflow-hidden">
                <img
                    src="https://plus.unsplash.com/premium_photo-1698578278424-295e2ce74510?q=80&w=3784&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Background"
                    className="absolute top-0 left-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-1000 ease-in-out animate-fadeIn">
                    <h1 className="text-6xl font-bold text-white">
                        hello, there
                    </h1>
                </div>
            </div>
            <div className={`${merriweather.className} max-w-2xl mx-auto px-4 py-16`}>
                <h2 className="text-3xl font-light mb-8">Recent Posts</h2>
                <ul className="space-y-4">
                    {[
                        { title: "Web Development Journey", date: "2023-06-15", emoji: "ʕ •ᴥ•ʔ" },
                        { title: "Minimalism in Design", date: "2023-06-01", emoji: "◻️" },
                        { title: "Latest JavaScript Features", date: "2023-05-20", emoji: "🚀" },
                        { title: "Responsive Layouts with Tailwind", date: "2023-05-10", emoji: "🎨" },
                    ].map((post, index) => (
                        <li key={index} className="group">
                            <a href="#" className="flex items-center space-x-4">
                                <span className="text-gray-500 w-24 relative group">
                                    <span className="relative z-10">{post.date}</span>
                                </span>
                                <span className="mr-1 relative group">
                                    <span className="relative z-10">{post.emoji}</span>
                                    <span className="absolute inset-0 bg-amber-300 opacity-0 blur-md transition-all duration-100 group-hover:opacity-50"></span>
                                </span>
                                <span className="relative group">
                                    <span className="relative z-10 transition-all duration-300 hover:tracking-wider">{post.title}</span>
                                </span>
                            </a>
                        </li>
                    ))}
                </ul>
                <h2 className="text-3xl font-light mt-16 mb-8">Links</h2>
                <ul className="space-y-2">
                    <IndexLink url="/image_explorer" title="Image Explorer" />
                    <IndexLink url="/glowing/profile" title="A glowing profile page" />
                    <IndexLink url="/sandbox" title="Tailwind UI Kit" />
                    <IndexLink url="/domains" title="Search for domains (WIP)" />
                    <IndexLink url="/typingscreen" title="Type things" />
                    <IndexLink url="/swiping" title="Mobile PWA (WIP)" />
                    <li>
                        <span className="hover:underline cursor-pointer">Account</span>
                        <ul className="ml-4 mt-2 space-y-2">
                            <IndexLink url="/login" title="Login" />
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default PersonalPage;