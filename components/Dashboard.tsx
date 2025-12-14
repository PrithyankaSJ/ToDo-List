import React from 'react';
import { Trophy, CheckCircle2, Flame } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
  pomodoros: number;
}

const Dashboard: React.FC<DashboardProps> = ({ tasks, pomodoros }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getMotivationalMessage = () => {
    if (progress === 100 && totalTasks > 0) return "GOD MODE ACTIVATED! ⚡";
    if (progress >= 75) return "ABSOLUTELY CRUSHING IT! 🔥";
    if (progress >= 50) return "HALFWAY TO GLORY! 🚀";
    if (progress >= 25) return "MOMENTUM IS BUILDING... 🚂";
    return "LET'S GET THIS BREAD! 🥖";
  };

  return (
    <div className="w-full max-w-6xl mx-auto mb-8 px-4">
      <div className="bg-white border-4 border-black rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-300 rounded-bl-full border-l-4 border-b-4 border-black -mr-[4px] -mt-[4px] z-0"></div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Stat 1: Task Progress */}
          <div className="bg-cyan-200 border-2 border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
            <div className="bg-white border-2 border-black p-3 rounded-xl">
              <CheckCircle2 size={32} className="text-black" />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider">Missions Done</p>
              <p className="text-4xl font-black funky-font">{completedTasks}<span className="text-xl text-black/50">/{totalTasks}</span></p>
            </div>
          </div>

          {/* Stat 2: Pomodoros */}
          <div className="bg-pink-300 border-2 border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
             <div className="bg-white border-2 border-black p-3 rounded-xl">
              <Flame size={32} className="text-black" />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider">Focus Rounds</p>
              <p className="text-4xl font-black funky-font">{pomodoros}</p>
            </div>
          </div>

          {/* Stat 3: Vibe Check */}
          <div className="bg-lime-300 border-2 border-black rounded-2xl p-4 flex items-center gap-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:-translate-y-1 transition-transform">
             <div className="bg-white border-2 border-black p-3 rounded-xl">
              <Trophy size={32} className="text-black" />
            </div>
            <div>
              <p className="font-bold text-sm uppercase tracking-wider">Vibe Check</p>
              <p className="text-lg font-bold leading-tight">{getMotivationalMessage()}</p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Dashboard;