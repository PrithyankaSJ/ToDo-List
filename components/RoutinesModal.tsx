import React from 'react';
import { X, Zap, Clock, Brain, Ghost, Rocket, Layout } from 'lucide-react';
import { TimerConfig, TimerMode } from '../types';
import Button from './Button';

interface RoutinesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectRoutine: (config: TimerConfig) => void;
  currentConfig: TimerConfig;
}

const RoutinesModal: React.FC<RoutinesModalProps> = ({ isOpen, onClose, onSelectRoutine, currentConfig }) => {
  if (!isOpen) return null;

  const routines = [
    {
      id: 'classic',
      name: 'Pomodoro',
      description: 'The classic balanced approach. Good for almost anything.',
      icon: <Clock size={24} />,
      config: {
        [TimerMode.WORK]: 25 * 60,
        [TimerMode.SHORT_BREAK]: 5 * 60,
        [TimerMode.LONG_BREAK]: 15 * 60,
      }
    },
    {
      id: 'deep',
      name: 'Deep Work',
      description: 'Longer sessions for complex problem solving.',
      icon: <Brain size={24} />,
      config: {
        [TimerMode.WORK]: 50 * 60,
        [TimerMode.SHORT_BREAK]: 10 * 60,
        [TimerMode.LONG_BREAK]: 30 * 60,
      }
    },
    {
      id: 'power',
      name: 'Power Hour',
      description: 'A solid hour of focus. No interruptions.',
      icon: <Zap size={24} />,
      config: {
        [TimerMode.WORK]: 60 * 60,
        [TimerMode.SHORT_BREAK]: 0,
        [TimerMode.LONG_BREAK]: 20 * 60,
      }
    },
    {
      id: 'sprint',
      name: 'Quick Sprint',
      description: 'Short bursts. Great for clearing small tasks.',
      icon: <Rocket size={24} />,
      config: {
        [TimerMode.WORK]: 15 * 60,
        [TimerMode.SHORT_BREAK]: 3 * 60,
        [TimerMode.LONG_BREAK]: 10 * 60,
      }
    }
  ];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Layout className="w-5 h-5 text-brand-primary" />
            Focus Routines
          </h2>
          <button 
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-full transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 custom-scrollbar bg-slate-50/50 dark:bg-slate-900/50">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {routines.map((routine) => {
              const isActive = JSON.stringify(routine.config) === JSON.stringify(currentConfig);
              return (
                <button
                  key={routine.id}
                  onClick={() => {
                    onSelectRoutine(routine.config);
                    onClose();
                  }}
                  className={`group flex flex-col items-start p-5 rounded-2xl text-left transition-all border ${
                    isActive 
                      ? 'bg-brand-primary text-white border-brand-primary shadow-lg shadow-brand-primary/30' 
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 hover:border-brand-primary dark:hover:border-brand-primary hover:shadow-md'
                  }`}
                >
                  <div className={`mb-3 p-2 rounded-xl ${isActive ? 'bg-white/20' : 'bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300'}`}>
                    {routine.icon}
                  </div>
                  
                  <h3 className={`font-display font-bold mb-1 ${isActive ? 'text-white' : 'text-slate-800 dark:text-white'}`}>
                    {routine.name}
                  </h3>
                  <p className={`text-sm mb-4 leading-relaxed ${isActive ? 'text-white/80' : 'text-slate-500 dark:text-slate-400'}`}>
                    {routine.description}
                  </p>

                  <div className={`mt-auto w-full flex gap-3 text-xs font-semibold ${isActive ? 'text-white/90' : 'text-slate-500'}`}>
                       <span className="flex items-center gap-1">{routine.config[TimerMode.WORK] / 60}m Focus</span>
                       <span>•</span>
                       <span className="flex items-center gap-1">{routine.config[TimerMode.SHORT_BREAK] / 60}m Break</span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end">
             <Button onClick={onClose} variant="ghost" size="md">
                Cancel
             </Button>
        </div>
      </div>
    </div>
  );
};

export default RoutinesModal;