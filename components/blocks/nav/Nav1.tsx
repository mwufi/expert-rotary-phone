export default function Nav1() {
    return (
        <nav id="main-nav" className="fixed top-0 left-0 right-0 z-50 transition-all duration-300">

            <script dangerouslySetInnerHTML={{
                __html: `
          document.addEventListener('DOMContentLoaded', function() {
            const nav = document.getElementById('main-nav');
            window.addEventListener('scroll', function() {
              if (window.scrollY > 100) {
                nav.classList.add('bg-purple-600/50');
              } else {
                nav.classList.remove('bg-purple-600/50');
              }
            });
          });
        `
            }} />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center py-6">
                    <div className="flex items-center">
                        <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium">Home</a>
                            <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium">About</a>
                            <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium">Services</a>
                            <a href="#" className="text-white hover:bg-white hover:bg-opacity-20 px-3 py-2 rounded-md text-sm font-medium">Contact</a>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}