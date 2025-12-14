import React from 'react';

const FunkyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[#fffdf5]">
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.05]" 
           style={{ backgroundImage: 'radial-gradient(#000 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Big Yellow Circle */}
      <div className="absolute -top-20 -left-20 w-64 h-64 bg-yellow-300 rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] animate-bounce duration-[3000ms]"></div>

      {/* Pink Triangle (simulated with clip-path) */}
      <div className="absolute top-1/4 right-10 w-48 h-48 bg-pink-400 border-b-4 border-r-4 border-black transform rotate-12 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)]"></div>
      
      {/* Cyan Rectangle */}
      <div className="absolute bottom-20 left-10 w-40 h-64 bg-cyan-300 border-4 border-black transform -rotate-6 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] rounded-xl"></div>

      {/* Purple Squiggle/Blob */}
      <div className="absolute top-1/2 left-1/3 w-32 h-32 bg-purple-400 border-4 border-black rounded-[40%_60%_70%_30%/40%_50%_60%_50%] shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] animate-pulse"></div>

      {/* Lime Pill */}
      <div className="absolute bottom-10 right-1/4 w-56 h-20 bg-lime-300 border-4 border-black rounded-full transform rotate-45 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"></div>

      {/* Floating Elements */}
      <div className="absolute top-10 right-1/3 text-6xl opacity-20 transform rotate-12">★</div>
      <div className="absolute bottom-1/3 right-10 text-8xl opacity-20 transform -rotate-12">✦</div>
      <div className="absolute top-1/3 left-10 text-6xl opacity-20 transform rotate-45">✖</div>
    </div>
  );
};

export default FunkyBackground;