import React, { useState, useEffect } from 'react';
import FunkyBackground from './components/FunkyBackground';
import Timer from './components/Timer';
import TodoList from './components/TodoList';
import Dashboard from './components/Dashboard';
import Confetti from './components/Confetti';
import HistoryModal from './components/HistoryModal';
import NotesModal from './components/NotesModal';
import RoutinesModal from './components/RoutinesModal';
import { Task, TimerMode, PriorityLevel, TimerConfig } from './types';
import { TIMER_SETTINGS } from './constants';
import { Moon, Sun, Sparkles } from 'lucide-react';

const App: React.FC = () => {
  // Theme State
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('aura-theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return true;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aura-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aura-theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // --- Task State ---
  const [tasks, setTasks] = useState<Task[]>([]);
  const [confettiBurst, setConfettiBurst] = useState(0);

  // --- Modal State ---
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [isNotesOpen, setIsNotesOpen] = useState(false);
  const [isRoutinesOpen, setIsRoutinesOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('aura-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aura-tasks', JSON.stringify(tasks));
  }, [tasks]);

  const triggerConfetti = () => {
    setConfettiBurst(prev => prev + 1);
  };

  const addTask = (text: string, priority: PriorityLevel) => {
    const newTask: Task = {
      id: crypto.randomUUID(),
      text,
      completed: false,
      createdAt: Date.now(),
      priority,
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id: string) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        const newCompleted = !t.completed;
        if (newCompleted) {
          triggerConfetti();
        }
        return { ...t, completed: newCompleted };
      }
      return t;
    }));
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(t => {
      if (t.id === id) {
        return { ...t, ...updates };
      }
      return t;
    }));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // --- Timer State ---
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);
  const [timerConfig, setTimerConfig] = useState<TimerConfig>(TIMER_SETTINGS);

  useEffect(() => {
    const savedPomo = localStorage.getItem('aura-pomodoros');
    if (savedPomo) {
      setPomodoroCount(parseInt(savedPomo, 10) || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('aura-pomodoros', pomodoroCount.toString());
  }, [pomodoroCount]);

  const handleTimerComplete = (mode: TimerMode) => {
    if (mode === TimerMode.WORK) {
      setPomodoroCount(prev => prev + 1);
      triggerConfetti();
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden overflow-y-auto transition-colors duration-500">
      <FunkyBackground />
      <Confetti burst={confettiBurst} />
      
      {/* Modals */}
      <HistoryModal 
        isOpen={isHistoryOpen} 
        onClose={() => setIsHistoryOpen(false)} 
        tasks={tasks} 
      />
      <NotesModal
        isOpen={isNotesOpen}
        onClose={() => setIsNotesOpen(false)}
        tasks={tasks}
        onUpdateTask={updateTask}
      />
      <RoutinesModal 
        isOpen={isRoutinesOpen}
        onClose={() => setIsRoutinesOpen(false)}
        onSelectRoutine={setTimerConfig}
        currentConfig={timerConfig}
      />

      {/* Header */}
      <header className="relative z-10 pt-12 pb-6 text-center flex flex-col items-center justify-center">
        <div className="absolute top-6 right-6">
          <button
            onClick={toggleTheme}
            className="p-3 bg-white/50 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 rounded-full transition-all shadow-sm backdrop-blur-md text-slate-600 dark:text-slate-300"
            aria-label="Toggle Theme"
          >
            {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
        
        <div className="flex items-center gap-2 mb-2 animate-float">
            <Sparkles className="text-brand-secondary" size={24} />
        </div>

        <h1 className="text-5xl font-display font-bold tracking-tight text-slate-900 dark:text-white mb-2">
          Aura<span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-primary to-brand-secondary">Focus</span>
        </h1>
        
        <p className="text-slate-500 dark:text-slate-400 font-medium">
            Your daily flow state companion
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center p-4 w-full">
        
        {/* Progress Dashboard */}
        <Dashboard 
          tasks={tasks} 
          pomodoros={pomodoroCount} 
          onHistoryClick={() => setIsHistoryOpen(true)}
          onNotesClick={() => setIsNotesOpen(true)}
          onRoutinesClick={() => setIsRoutinesOpen(true)}
        />

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start pb-16">
          
          <section className="w-full flex justify-center order-1 md:order-1">
            <Timer 
              onTimerComplete={handleTimerComplete} 
              config={timerConfig} 
            />
          </section>

          <section className="w-full flex justify-center order-2 md:order-2">
            <TodoList 
              tasks={tasks} 
              onAddTask={addTask} 
              onToggleTask={toggleTask} 
              onDeleteTask={deleteTask}
            />
          </section>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 p-6 text-center text-xs text-slate-400 font-medium">
        <p>Designed for your productivity</p>
      </footer>
    </div>
  );
};

export default App;