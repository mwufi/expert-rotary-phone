import React from 'react';
import { Heart, Star, Zap, Sun, Moon, Cloud, Globe, Music, Camera, Coffee } from 'lucide-react';

const App = () => {
  return (
    <>
      <link href="https://fonts.googleapis.com/css2?family=Source+Sans+Pro:wght@400;700&display=swap" rel="stylesheet" />
      <div className="mb-3 flex flex-col gap-2.5 rounded-xl bg-white/40 p-3 backdrop-blur-lg sm:mb-7">
        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-yellow-600 to-pink-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Heart className="mr-1.5 text-white" size={16} />
            <span className="text-white">435</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🏎️💨</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Speed Boost</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-green-600 to-blue-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Star className="mr-1.5 text-white" size={16} />
            <span className="text-white">789</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🌿</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Eco Friendly</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-purple-600 to-indigo-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Zap className="mr-1.5 text-white" size={16} />
            <span className="text-white">1.2k</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🔮</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Magic Spell</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-red-600 to-orange-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Sun className="mr-1.5 text-white" size={16} />
            <span className="text-white">567</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🔥</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Fire Power</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-blue-600 to-cyan-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Moon className="mr-1.5 text-white" size={16} />
            <span className="text-white">890</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">❄️</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Ice Blast</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-yellow-600 to-green-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Cloud className="mr-1.5 text-white" size={16} />
            <span className="text-white">345</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🌱</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Nature's Call</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-pink-600 to-purple-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Globe className="mr-1.5 text-white" size={16} />
            <span className="text-white">2.1k</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🌍</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>World Explorer</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-indigo-600 to-blue-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Music className="mr-1.5 text-white" size={16} />
            <span className="text-white">1.5k</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">🎵</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Melody Maker</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-green-600 to-teal-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Camera className="mr-1.5 text-white" size={16} />
            <span className="text-white">678</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">📸</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Snapshot Pro</h4>
        </article>

        <article className="relative z-0 mx-auto flex flex-col items-center justify-center bg-gradient-to-br p-4 filter from-orange-600 to-yellow-600 overflow-hidden hover:brightness-110 h-16 rounded-lg">
          <div className="absolute left-0 top-0 h-24 w-1/2 bg-gradient-to-br from-black/20 via-transparent to-transparent"></div>
          <div className="absolute flex items-center rounded-xl top-2 right-3.5 text-xs">
            <Coffee className="mr-1.5 text-white" size={16} />
            <span className="text-white">987</span>
          </div>
          <div className="absolute opacity-60 text-4xl drop-shadow">☕</div>
          <h4 className="z-40 max-w-full truncate text-center font-bold leading-tight text-blue-50 text-md" style={{textShadow: "0px 1px 2px rgba(0, 0, 0, 0.25)"}}>Energy Boost</h4>
        </article>
      </div>
    </>
  );
};

export default App;
