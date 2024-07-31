export default function VideoHero() {
    return (

        <section className="min-h-screen relative overflow-hidden">
            
            <video
                className="absolute top-0 left-0 w-full h-full object-cover"
                autoPlay
                loop
                muted
                playsInline
            >
                <source src="https://storage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
                Your browser does not support the video tag.
            </video>
            <div className="absolute inset-0 bg-black bg-opacity-50"></div>
            <div className="relative z-10 flex items-center justify-center min-h-screen">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-6xl font-extrabold mb-6 animate-fade-in-up">
                        PromptLibrary V0
                    </h1>
                    <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
                        Experience the power of AI
                    </p>
                    <a
                        href="#"
                        className="inline-flex items-center bg-white text-black font-semibold px-8 py-3 rounded-full hover:bg-opacity-90 transition duration-300 animate-fade-in-up animation-delay-600"
                    >
                        <span className="mr-2">Explore Our Models</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right">
                            <path d="m9 18 6-6-6-6" />
                        </svg>
                    </a>
                </div>
            </div>
        </section>

    )
}