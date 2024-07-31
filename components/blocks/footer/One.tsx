export default function Footer1() {
    return (
        < footer className="bg-gray-800 text-white py-8" >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Company Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Playground V0</h3>
                        <p className="text-sm text-gray-300">Make your ideas come to life</p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Home</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">About</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Services</a></li>
                            <li><a href="#" className="text-sm text-gray-300 hover:text-white transition">Contact</a></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
                        <p className="text-sm text-gray-300 mb-2">Email: info@playground.com</p>
                        <p className="text-sm text-gray-300">Phone: (123) 456-7890</p>
                    </div>
                </div>

                {/* Copyright */}
                <div className="mt-8 pt-8 border-t border-gray-700 text-center">
                    <p className="text-sm text-gray-300">&copy; 2024 Playground V0. All rights reserved.</p>
                </div>
            </div>
        </footer >
    )
}