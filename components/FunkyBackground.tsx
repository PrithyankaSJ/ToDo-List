import React from 'react';

const FunkyBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-slate-50 dark:bg-[#0f172a] transition-colors duration-500">
      {/* Animated Blobs */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-60 dark:opacity-40">
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] bg-purple-400 dark:bg-brand-primary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob"></div>
        <div className="absolute top-[-10%] right-[-10%] w-[50vw] h-[50vw] bg-yellow-200 dark:bg-brand-secondary rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-[-20%] left-[20%] w-[60vw] h-[60vw] bg-pink-300 dark:bg-brand-accent rounded-full mix-blend-multiply dark:mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000"></div>
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150"></div>
      
      {/* Subtle Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
    </div>
  );
};

export default FunkyBackground;