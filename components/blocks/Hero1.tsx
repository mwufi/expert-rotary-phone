export function PrimaryButton({ href, text }) {
    return (
        <a href={href} className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300">
            {text}
        </a>
    )
}

export function SecondaryButton({ href, text }) {
    return (
        <a href={href} className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300">
            {text}
        </a>
    )
}

export default function Hero({ title, subtitle, buttons, img }) {
    return (

        <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center justify-between">
                <div className="md:w-1/2 mb-8 md:mb-0">
                    <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                        {title}
                    </h1>
                    <p className="text-xl md:text-2xl mb-8">
                        {subtitle}
                    </p>
                    <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                        {buttons}
                    </div>
                </div>
                <div className="md:w-1/2">
                    <img
                        src={img}
                        alt="App Screenshot"
                        className="rounded-lg shadow-2xl"
                    />
                </div>
            </div>
        </section>
    )
}