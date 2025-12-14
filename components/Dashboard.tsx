import React from 'react';
import { Trophy, Scroll, Flame, History, Feather, Zap, LayoutGrid, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';

interface DashboardProps {
  tasks: Task[];
  pomodoros: number;
  onHistoryClick: () => void;
  onNotesClick: () => void;
  onRoutinesClick: () => void;
}

interface CardProps {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  icon?: React.ReactNode;
  title: string;
}

const Card: React.FC<CardProps> = ({ children, onClick, className = '', icon, title }) => (
  <button 
    onClick={onClick}
    className={`relative p-6 rounded-3xl text-left w-full group transition-all duration-300 hover:-translate-y-1
      bg-white/60 dark:bg-brand-darkless/60 backdrop-blur-xl border border-white/50 dark:border-white/5 
      shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)]
      hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)] dark:hover:shadow-[0_8px_30px_rgb(139,92,246,0.15)]
      ${className}`}
  >
    <div className="flex items-center gap-3 mb-3 text-slate-500 dark:text-slate-400 group-hover:text-brand-primary transition-colors">
        {icon}
        <span className="font-display font-semibold text-xs uppercase tracking-wider">{title}</span>
    </div>
    {children}
  </button>
);

const Dashboard: React.FC<DashboardProps> = ({ tasks, pomodoros, onHistoryClick, onNotesClick, onRoutinesClick }) => {
  const completedTasks = tasks.filter(t => t.completed).length;
  const totalTasks = tasks.length;
  const progress = totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const getMotivationalMessage = () => {
    if (progress === 100 && totalTasks > 0) return "All done! Amazing.";
    if (progress >= 75) return "Almost there!";
    if (progress >= 50) return "Halfway through.";
    if (progress >= 25) return "Great start.";
    return "Ready to focus?";
  };

  return (
    <div className="w-full max-w-5xl mx-auto mb-10 px-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Stat 1: History */}
        <Card 
            onClick={onHistoryClick} 
            title="History"
            icon={<History size={18} />}
        >
          <div>
            <div className="flex items-baseline gap-2">
              <p className="text-4xl font-display font-bold text-slate-800 dark:text-white">{completedTasks}</p>
              <span className="text-sm font-medium text-slate-400">/ {totalTasks} Tasks</span>
            </div>
            <div className="w-full bg-slate-100 dark:bg-slate-700 h-1.5 rounded-full mt-3 overflow-hidden">
                <div className="h-full bg-brand-primary rounded-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
            </div>
          </div>
        </Card>

        {/* Stat 2: Routines */}
        <Card 
            onClick={onRoutinesClick} 
            title="Sessions"
            icon={<Zap size={18} />}
        >
          <div className="flex justify-between items-end">
            <div>
                 <p className="text-4xl font-display font-bold text-slate-800 dark:text-white">{pomodoros}</p>
                 <p className="text-xs text-slate-400 mt-1">Focus cycles completed</p>
            </div>
            <div className="bg-brand-secondary/10 p-2 rounded-xl text-brand-secondary mb-1">
                <Flame size={20} />
            </div>
          </div>
        </Card>

        {/* Stat 3: Notes */}
        <Card 
            onClick={onNotesClick} 
            title="Notes & Status"
            icon={<Scroll size={18} />}
        >
          <div>
            <p className="text-lg font-medium text-slate-700 dark:text-slate-200 mb-1">{getMotivationalMessage()}</p>
            <p className="text-xs text-slate-400">Click to open scratchpad</p>
          </div>
        </Card>

      </div>
    </div>
  );
};

export default Dashboard;