import React, { useState, useEffect } from 'react';
import FunkyBackground from './components/FunkyBackground';
import Timer from './components/Timer';
import TodoList from './components/TodoList';
import Dashboard from './components/Dashboard';
import { Task, TimerMode, PriorityLevel } from './types';

const App: React.FC = () => {
  // --- Task State ---
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('funky-tasks');
    if (saved) {
      try {
        setTasks(JSON.parse(saved));
      } catch (e) {
        console.error("Failed to parse tasks", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('funky-tasks', JSON.stringify(tasks));
  }, [tasks]);

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
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTask = (id: string) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  // --- Timer State ---
  const [pomodoroCount, setPomodoroCount] = useState<number>(0);

  useEffect(() => {
    const savedPomo = localStorage.getItem('funky-pomodoros');
    if (savedPomo) {
      setPomodoroCount(parseInt(savedPomo, 10) || 0);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('funky-pomodoros', pomodoroCount.toString());
  }, [pomodoroCount]);

  const handleTimerComplete = (mode: TimerMode) => {
    if (mode === TimerMode.WORK) {
      setPomodoroCount(prev => prev + 1);
      // Play a sound or show notification could go here
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden overflow-y-auto">
      <FunkyBackground />
      
      {/* Header */}
      <header className="relative z-10 py-6 text-center">
        <h1 className="text-6xl font-black funky-font tracking-tighter drop-shadow-[4px_4px_0px_rgba(255,255,255,1)]">
          <span className="text-black bg-yellow-300 px-2 inline-block transform -rotate-3 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] mr-2">
            FUNKY
          </span>
          <span className="text-white bg-purple-500 px-2 inline-block transform rotate-2 border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            FOCUS
          </span>
        </h1>
        <p className="font-bold text-lg mt-4 bg-white inline-block px-4 py-1 border-2 border-black rounded-full shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          Stay sharp. Be bold.
        </p>
      </header>

      {/* Main Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center p-4 w-full">
        
        {/* Progress Dashboard */}
        <Dashboard tasks={tasks} pomodoros={pomodoroCount} />

        <div className="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          
          <section className="w-full flex justify-center order-1 md:order-1">
            <Timer onTimerComplete={handleTimerComplete} />
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
      <footer className="relative z-10 p-4 text-center font-bold text-sm bg-white/50 border-t-2 border-black backdrop-blur-sm mt-8">
        <p>Made with ⚡ for productivity</p>
      </footer>
    </div>
  );
};

export default App;