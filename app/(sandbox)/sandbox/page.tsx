import React from 'react';

{/* StatCard Component */ }
const StatCard = ({ title, value, change, isPositive }) => (
  <div className="bg-white overflow-hidden shadow rounded-lg">
    <div className="px-4 py-5 sm:p-6">
      <dt className="text-sm font-medium text-gray-500 truncate">
        {title}
      </dt>
      <dd className="mt-1 text-3xl font-semibold text-gray-900">
        {value}
      </dd>
      <dd className={`mt-2 flex items-center text-sm ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
        <span className={`${isPositive ? 'bg-green-100' : 'bg-red-100'} flex-shrink-0 inline-block px-2 py-0.5 text-xs font-medium rounded-full`}>
          {change}
        </span>
        <span className="ml-2">
          {isPositive ? 'Increase' : 'Decrease'} from last month
        </span>
      </dd>
    </div>
  </div>
);

const StatisticCard = ({ number, label, icon }) => (
  <div className="flex items-center space-x-4 bg-white bg-opacity-10 rounded-lg p-6 backdrop-blur-lg">
    <div className="flex-shrink-0">
      <div className="p-3 bg-indigo-500 bg-opacity-75 rounded-full">
        {icon}
      </div>
    </div>
    <div>
      <p className="text-4xl font-bold">{number}</p>
      <p className="text-xl text-indigo-200">{label}</p>
    </div>
  </div>
);

export default function SandboxPage() {
  return (
    <div className="p-8 space-y-8">
      {/* Page Heading */}
      <h1 className="text-4xl font-bold text-gray-900">Sandbox Demo</h1>
      
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex">
              {/* Logo */}
              <div className="flex-shrink-0 flex items-center">
                <img className="h-8 w-auto" src="/logo.png" alt="Logo" />
              </div>
              {/* Navigation Links */}
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <a href="#" className="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Home
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Features
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Pricing
                </a>
                <a href="#" className="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  About
                </a>
              </div>
            </div>
            {/* CTA Button */}
            <div className="hidden sm:ml-6 sm:flex sm:items-center">
              <a href="#" className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                Sign Up
              </a>
            </div>
            {/* Mobile menu button */}
            <div className="-mr-2 flex items-center sm:hidden">
              <button type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500" aria-controls="mobile-menu" aria-expanded="false">
                <span className="sr-only">Open main menu</span>
                {/* Icon when menu is closed */}
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
                {/* Icon when menu is open */}
                <svg className="hidden h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state */}
        <div className="sm:hidden" id="mobile-menu">
          <div className="pt-2 pb-3 space-y-1">
            <a href="#" className="bg-indigo-50 border-indigo-500 text-indigo-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Home</a>
            <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Features</a>
            <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">Pricing</a>
            <a href="#" className="border-transparent text-gray-500 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-700 block pl-3 pr-4 py-2 border-l-4 text-base font-medium">About</a>
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            <a href="#" className="block px-4 py-2 text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700">Sign Up</a>
          </div>
        </div>
      </nav>

      {/* Breadcrumbs */}
      <nav className="flex" aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3">
          <li className="inline-flex items-center">
            <a href="#" className="text-gray-700 hover:text-blue-600">Home</a>
          </li>
          <li>
            <div className="flex items-center">
              <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
              <a href="#" className="ml-1 text-gray-700 hover:text-blue-600 md:ml-2">Sandbox</a>
            </div>
          </li>
        </ol>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Welcome to Our Amazing App
            </h1>
            <p className="text-xl md:text-2xl mb-8">
              Discover a new way to manage your tasks, boost productivity, and achieve your goals.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300">
                Get Started
              </a>
              <a href="#" className="inline-block bg-blue-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/path-to-your-app-screenshot.png"
              alt="App Screenshot"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Additional Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 flex flex-col md:flex-row-reverse items-center justify-between">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <h2 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Revolutionize Your Workflow
            </h2>
            <p className="text-xl md:text-2xl mb-8">
              Experience the power of AI-driven productivity tools designed to streamline your daily tasks.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-block bg-white text-green-600 font-semibold px-6 py-3 rounded-lg hover:bg-green-100 transition duration-300">
                Try It Free
              </a>
              <a href="#" className="inline-block bg-green-600 text-white font-semibold px-6 py-3 rounded-lg hover:bg-green-500 transition duration-300">
                Watch Demo
              </a>
            </div>
          </div>
          <div className="md:w-1/2">
            <img
              src="/path-to-your-feature-image.png"
              alt="AI-Powered Features"
              className="rounded-lg shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Hero Section with Words on Top */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Transform Your Ideas into Reality
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Empower your creativity with our cutting-edge platform. Build, innovate, and succeed like never before.
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-block bg-white text-purple-600 font-semibold px-6 py-3 rounded-lg hover:bg-purple-100 transition duration-300">
                Get Started
              </a>
              <a href="#" className="inline-block bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-400 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12">
            <img
              src="/path-to-your-hero-image.png"
              alt="Hero Image"
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Hero Section for NYC Hack Club */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
              Welcome to NYC Hack Club
            </h1>
            <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
              Join the coolest tech community in the Big Apple. Code, create, and connect with fellow hackers!
            </p>
            <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
              <a href="#" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded-lg hover:bg-blue-100 transition duration-300">
                Join Now
              </a>
              <a href="#" className="inline-block bg-purple-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-purple-400 transition duration-300">
                Learn More
              </a>
            </div>
          </div>
          <div className="mt-12">
            <img
              src="/nyc-skyline.jpg"
              alt="New York City Skyline"
              className="rounded-lg shadow-2xl mx-auto"
            />
          </div>
        </div>
      </section>

      {/* Minimal, Design-Oriented Full-Page Header Section with Video Background */}
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
              The Future of Driving
            </h1>
            <p className="text-xl md:text-2xl mb-8 animate-fade-in-up animation-delay-300">
              Experience the power of electric innovation.
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

      {/* Features Demo Section */}
      <section className="bg-gray-50 py-12 rounded-lg shadow-inner">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-indigo-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              A better way to build
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Lorem ipsum dolor sit amet consect adipisicing elit. Possimus magnam voluptatum cupiditate veritatis in accusamus quisquam.
            </p>
          </div>

          <div className="mt-10">
            <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {[
                {
                  name: 'Competitive exchange rates',
                  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                    </svg>
                  ),
                },
                {
                  name: 'No hidden fees',
                  description: 'Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.',
                  icon: (
                    <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  ),
                },
              ].map((feature) => (
                <div key={feature.name} className="relative">
                  <dt>
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white">
                      {feature.icon}
                    </div>
                    <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                  </dt>
                  <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our simple process makes it easy to get started and achieve results.
            </p>
          </div>
          <div className="mt-20">
            <div className="relative">
              {/* Connecting line */}
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              {/* Steps */}
              <div className="relative flex justify-between">
                {[
                  { step: '1', title: 'Sign Up', description: 'Create your account in minutes.' },
                  { step: '2', title: 'Configure', description: 'Set up your preferences and goals.' },
                  { step: '3', title: 'Start Building', description: 'Use our tools to bring your ideas to life.' },
                  { step: '4', title: 'Launch', description: 'Go live with your project and see results.' },
                ].map((item, index) => (
                  <div key={item.step} className="relative flex flex-col items-center">
                    <div className="h-16 w-16 rounded-full border-2 border-indigo-600 bg-white flex items-center justify-center">
                      <span className="text-xl font-bold text-indigo-600">{item.step}</span>
                    </div>
                    <div className="mt-4 text-center">
                      <h3 className="text-lg font-medium text-gray-900">{item.title}</h3>
                      <p className="mt-2 text-sm text-gray-500">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reset Password Form Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Reset Your Password
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your email"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Reset Link
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Referral Form Section */}
      <section className="py-16 bg-white">
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-extrabold text-gray-900">
              Refer a Friend
            </h2>
            <p className="mt-2 text-sm text-gray-600">
              Share the love and earn rewards when your friends sign up!
            </p>
          </div>
          <form className="mt-8 space-y-6">
            <div>
              <label htmlFor="friendName" className="block text-sm font-medium text-gray-700">
                Friend's Name
              </label>
              <div className="mt-1">
                <input
                  id="friendName"
                  name="friendName"
                  type="text"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your friend's name"
                />
              </div>
            </div>
            <div>
              <label htmlFor="friendEmail" className="block text-sm font-medium text-gray-700">
                Friend's Email
              </label>
              <div className="mt-1">
                <input
                  id="friendEmail"
                  name="friendEmail"
                  type="email"
                  required
                  className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  placeholder="Enter your friend's email"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Send Referral
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Sign In Section */}
      <section className="min-h-screen flex items-stretch text-white">
        <div className="lg:flex w-1/2 hidden bg-gray-500 bg-no-repeat bg-cover relative items-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)" }}>
          <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          <div className="w-full px-24 z-10">
            <h1 className="text-5xl font-bold text-left tracking-wide">Keep it special</h1>
            <p className="text-3xl my-4">Capture your personal memory in unique way, anywhere.</p>
          </div>
        </div>
        <div className="lg:w-1/2 w-full flex items-center justify-center text-center md:px-16 px-0 z-0 bg-white">
          <div className="absolute lg:hidden z-10 inset-0 bg-gray-500 bg-no-repeat bg-cover items-center" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1577495508048-b635879837f1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80)" }}>
            <div className="absolute bg-black opacity-60 inset-0 z-0"></div>
          </div>
          <div className="w-full py-6 z-20">
            <h1 className="my-6 text-3xl font-bold text-gray-800">Sign In</h1>
            <form action="" className="sm:w-2/3 w-full px-4 lg:px-0 mx-auto">
              <div className="pb-2 pt-4">
                <input type="email" name="email" id="email" placeholder="Email" className="block w-full p-4 text-lg rounded-sm bg-gray-100 text-gray-800" />
              </div>
              <div className="pb-2 pt-4">
                <input className="block w-full p-4 text-lg rounded-sm bg-gray-100 text-gray-800" type="password" name="password" id="password" placeholder="Password" />
              </div>
              <div className="text-right text-gray-600 hover:underline hover:text-gray-800">
                <a href="#">Forgot your password?</a>
              </div>
              <div className="px-4 pb-2 pt-4">
                <button className="uppercase block w-full p-4 text-lg rounded-full bg-indigo-500 hover:bg-indigo-600 focus:outline-none">sign in</button>
              </div>
            </form>
          </div>
        </div>
      </section>


      {/* Logos Section */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-8 text-center">Trusted by leading companies</h2>
          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-6">
            {[
              { name: 'Company 1', logo: '/path/to/logo1.svg' },
              { name: 'Company 2', logo: '/path/to/logo2.svg' },
              { name: 'Company 3', logo: '/path/to/logo3.svg' },
              { name: 'Company 4', logo: '/path/to/logo4.svg' },
              { name: 'Company 5', logo: '/path/to/logo5.svg' },
              { name: 'Company 6', logo: '/path/to/logo6.svg' },
            ].map((company) => (
              <div key={company.name} className="col-span-1 flex justify-center items-center">
                <img
                  className="h-12"
                  src={company.logo}
                  alt={company.name}
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Meet Our Talented Team Section */}
      <section className="py-12 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Meet Our Talented Team
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Our diverse team of experts is passionate about delivering exceptional results.
            </p>
          </div>
          <div className="mt-10">
            <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {[
                {
                  name: 'Leslie Alexander',
                  role: 'Co-Founder / CEO',
                  imageUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                  name: 'Michael Foster',
                  role: 'CTO',
                  imageUrl: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                  name: 'Dries Vincent',
                  role: 'Lead Designer',
                  imageUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
                {
                  name: 'Lindsay Walton',
                  role: 'Front-end Developer',
                  imageUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
                },
              ].map((person) => (
                <li
                  key={person.name}
                  className="col-span-1 flex flex-col text-center bg-white rounded-lg shadow divide-y divide-gray-200"
                >
                  <div className="flex-1 flex flex-col p-8">
                    <img className="w-32 h-32 flex-shrink-0 mx-auto rounded-full" src={person.imageUrl} alt="" />
                    <h3 className="mt-6 text-gray-900 text-sm font-medium">{person.name}</h3>
                    <dl className="mt-1 flex-grow flex flex-col justify-between">
                      <dt className="sr-only">Role</dt>
                      <dd className="text-gray-500 text-sm">{person.role}</dd>
                    </dl>
                  </div>
                  <div>
                    <div className="-mt-px flex divide-x divide-gray-200">
                      <div className="w-0 flex-1 flex">
                        <a
                          href={`mailto:${person.name.toLowerCase().replace(' ', '.')}@example.com`}
                          className="relative -mr-px w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-bl-lg hover:text-gray-500"
                        >
                          <span className="ml-3">Email</span>
                        </a>
                      </div>
                      <div className="-ml-px w-0 flex-1 flex">
                        <a
                          href="#"
                          className="relative w-0 flex-1 inline-flex items-center justify-center py-4 text-sm text-gray-700 font-medium border border-transparent rounded-br-lg hover:text-gray-500"
                        >
                          <span className="ml-3">LinkedIn</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-8 mt-12">
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
      </footer>

      {/* Simple Footer Section */}
      <footer className="bg-gray-100 text-gray-600 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-lg font-semibold">Playground V0</h3>
              <p className="text-sm">Bringing ideas to life</p>
            </div>
            <nav className="flex space-x-4">
              <a href="#" className="text-sm hover:text-gray-900 transition">Home</a>
              <a href="#" className="text-sm hover:text-gray-900 transition">About</a>
              <a href="#" className="text-sm hover:text-gray-900 transition">Contact</a>
            </nav>
          </div>
          <div className="mt-6 text-center text-sm">
            <p>&copy; 2024 Playground V0. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Nonprofit Footer Section */}
      <footer className="bg-green-50 text-green-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h3 className="text-xl font-semibold mb-4">EcoFriends Foundation</h3>
              <p className="text-sm">Protecting our planet, one step at a time.</p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Our Initiatives</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-green-600 transition">Reforestation</a></li>
                <li><a href="#" className="text-sm hover:text-green-600 transition">Ocean Cleanup</a></li>
                <li><a href="#" className="text-sm hover:text-green-600 transition">Wildlife Conservation</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-3">Get Involved</h4>
              <ul className="space-y-2">
                <li><a href="#" className="text-sm hover:text-green-600 transition">Donate</a></li>
                <li><a href="#" className="text-sm hover:text-green-600 transition">Volunteer</a></li>
                <li><a href="#" className="text-sm hover:text-green-600 transition">Newsletter</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-green-200 text-center">
            <p className="text-sm">&copy; 2024 EcoFriends Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>


      {/* Statistics Component Demo */}
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Statistics Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <StatCard title="Total Users" value="10,897" change="+5.4%" isPositive={true} />
          <StatCard title="Revenue" value="$54,321" change="-2.1%" isPositive={false} />
          <StatCard title="Active Projects" value="23" change="+12.3%" isPositive={true} />
        </div>
      </div>

      {/* Crypto Statistics Component */}
      <div className="bg-white shadow rounded-lg p-6 mt-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Crypto Market Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Bitcoin (BTC)</h3>
            <p className="text-3xl font-bold text-gray-900">$45,678.90</p>
            <p className="text-sm text-green-600 mt-1">+2.5% <span className="text-gray-500">24h</span></p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Ethereum (ETH)</h3>
            <p className="text-3xl font-bold text-gray-900">$3,456.78</p>
            <p className="text-sm text-red-600 mt-1">-1.2% <span className="text-gray-500">24h</span></p>
          </div>
          <div className="bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">Market Cap</h3>
            <p className="text-3xl font-bold text-gray-900">$2.1T</p>
            <p className="text-sm text-green-600 mt-1">+0.8% <span className="text-gray-500">24h</span></p>
          </div>
        </div>
      </div>

      {/* Marketing Statistics Section */}
      <section className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white py-12 px-4 sm:px-6 lg:px-8 rounded-lg shadow-xl my-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-extrabold text-center mb-8">Our Impact in Numbers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <StatisticCard
              number="1M+"
              label="Happy Customers"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              }
            />
            <StatisticCard
              number="$50M"
              label="Revenue Generated"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
            <StatisticCard
              number="95%"
              label="Customer Satisfaction"
              icon={
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              }
            />
          </div>
        </div>
      </section>


      {/* Button */}
      <div>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
          Click me
        </button>
      </div>
      {/* Banner */}
      <div className="bg-indigo-600">
        <div className="max-w-7xl mx-auto py-3 px-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between flex-wrap">
            <div className="w-0 flex-1 flex items-center">
              <span className="flex p-2 rounded-lg bg-indigo-800">
                <svg className="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z" />
                </svg>
              </span>
              <p className="ml-3 font-medium text-white truncate">
                <span className="md:hidden">We announced a new product!</span>
                <span className="hidden md:inline">Big news! We're excited to announce a brand new product.</span>
              </p>
            </div>
            <div className="order-3 mt-2 flex-shrink-0 w-full sm:order-2 sm:mt-0 sm:w-auto">
              <a href="#" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-indigo-600 bg-white hover:bg-indigo-50">
                Learn more
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Form */}
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username" />
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password
          </label>
          <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
        </div>
        <div className="flex items-center justify-between">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline
      " type="button">
            Sign In
          </button>
          <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
          </a>
        </div>
      </form>

      {/* Success Alert */}
      <div className="bg-green-50 border-l-4 border-green-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-green-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-green-700">
              Operation completed successfully!
            </p>
          </div>
        </div>
      </div>

      {/* Warning Alert */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Please be cautious. This action cannot be undone.
            </p>
          </div>
        </div>
      </div>

      {/* Error Alert */}
      <div className="bg-red-50 border-l-4 border-red-400 p-4 mb-4">
        <div className="flex">
          <div className="flex-shrink-0">
            <svg className="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-red-700">
              An error occurred. Please try again later.
            </p>
          </div>
        </div>
      </div>

      {/* Card Heading */}
      <div className="bg-white shadow overflow-hidden sm:rounded-lg">
        <div className="px-4 py-5 sm:px-6">
          <h3 className="text-lg leading-6 font-medium text-gray-900">User Information</h3>
          <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p>
        </div>
      </div>

      {/* Table */}
      <div className="flex flex-col">
        <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
            <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap">Jane Cooper</td>
                    <td className="px-6 py-4 whitespace-nowrap">Regional Paradigm Technician</td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Dropdown */}
      <div className="relative mt-8">
        <label htmlFor="dropdown" className="block text-sm font-medium text-gray-700 mb-2">
          Select an option
        </label>
        <div className="relative">
          <select
            id="dropdown"
            name="dropdown"
            className="block w-full pl-3 pr-10 py-2 text-base border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md appearance-none transition duration-150 ease-in-out"
            defaultValue=""
          >
            <option value="" disabled>Choose an option</option>
            <option value="option1">Option 1</option>
            <option value="option2">Option 2</option>
            <option value="option3">Option 3</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
      </div>

    </div>
  )
}