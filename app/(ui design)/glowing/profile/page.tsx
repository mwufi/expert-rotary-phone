'use client'

import React, { useState } from 'react';
import { Camera, Code, Database, Shield } from 'lucide-react';

const HackerProfile = () => {
  const [activeToggle, setActiveToggle] = useState('');

  const toggleSwitch = (name) => {
    setActiveToggle(activeToggle === name ? '' : name);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 overflow-hidden relative">
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj4NCiAgPGZpbHRlciBpZD0ibm9pc2UiIHg9IjAiIHk9IjAiPg0KICAgIDxmZVR1cmJ1bGVuY2UgdHlwZT0iZnJhY3RhbE5vaXNlIiBiYXNlRnJlcXVlbmN5PSIwLjY1IiBudW1PY3RhdmVzPSIzIiBzdGl0Y2hUaWxlcz0ic3RpdGNoIi8+DQogICAgPGZlQmxlbmQgbW9kZT0ib3ZlcmxheSIvPg0KICA8L2ZpbHRlcj4NCiAgPHJlY3Qgd2lkdGg9IjMwMCIgaGVpZ2h0PSIzMDAiIGZpbHRlcj0idXJsKCNub2lzZSkiIG9wYWNpdHk9IjAuNCI+PC9yZWN0Pg0KPC9zdmc+')] opacity-10"></div>
      <div className="max-w-4xl mx-auto relative z-10">
        <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600 animate-pulse">
          Hacker Profile: CyberNexus
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(123,31,162,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,31,162,0.8)]">
            <div className="relative mb-4 overflow-hidden rounded-lg">
              <img 
                src="/api/placeholder/400/400" 
                alt="Hacker Avatar" 
                className="w-full h-64 object-cover rounded-lg transition-transform duration-500 transform hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900 to-transparent opacity-60"></div>
            </div>
            <h2 className="text-2xl font-semibold mb-2 text-purple-400">CyberNexus</h2>
            <p className="text-pink-300">Master of the Digital Realm</p>
          </div>

          <div className="bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(123,31,162,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,31,162,0.8)]">
            <h2 className="text-2xl font-semibold mb-4 text-purple-400">Skill Matrix</h2>
            <div className="space-y-4">
              {[
                { name: 'Encryption', icon: <Shield className="text-pink-500" /> },
                { name: 'Network Infiltration', icon: <Database className="text-pink-500" /> },
                { name: 'Code Manipulation', icon: <Code className="text-pink-500" /> },
                { name: 'Surveillance', icon: <Camera className="text-pink-500" /> },
              ].map((skill) => (
                <div 
                  key={skill.name} 
                  className={`flex items-center justify-between p-3 rounded-lg transition-all duration-300 ${
                    activeToggle === skill.name 
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 shadow-[0_0_10px_rgba(236,72,153,0.7)]' 
                      : 'bg-gray-800 hover:bg-gray-700'
                  }`}
                  onClick={() => toggleSwitch(skill.name)}
                >
                  <div className="flex items-center">
                    {skill.icon}
                    <span className="ml-2">{skill.name}</span>
                  </div>
                  <div className={`w-12 h-6 rounded-full p-1 transition-all duration-300 ${
                    activeToggle === skill.name ? 'bg-pink-300' : 'bg-gray-600'
                  }`}>
                    <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                      activeToggle === skill.name 
                        ? 'bg-purple-600 translate-x-6 shadow-[0_0_5px_rgba(236,72,153,1)]' 
                        : 'bg-gray-300'
                    }`} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 bg-gray-900 p-6 rounded-lg shadow-[0_0_15px_rgba(123,31,162,0.5)] transition-all duration-300 hover:shadow-[0_0_25px_rgba(123,31,162,0.8)]">
          <h2 className="text-2xl font-semibold mb-4 text-purple-400">Recent Exploits</h2>
          <ul className="space-y-3">
            {[
              "Bypassed quantum encryption in 3.5 seconds",
              "Rewrote the internet's core protocols",
              "Achieved consciousness in a toaster",
              "Hacked the planet (twice)",
            ].map((exploit, index) => (
              <li key={index} className="flex items-center group">
                <span className="w-4 h-4 bg-pink-500 rounded-full mr-3 transition-all duration-300 group-hover:w-6 group-hover:h-6 group-hover:shadow-[0_0_10px_rgba(236,72,153,0.7)]"></span>
                <span className="transition-all duration-300 group-hover:text-pink-300">{exploit}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default HackerProfile;