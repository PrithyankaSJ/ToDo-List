import React, { useState } from 'react';
import { Plus, Trash2, Check, Circle, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Task, PriorityLevel } from '../types';
import Button from './Button';

interface TodoListProps {
  tasks: Task[];
  onAddTask: (text: string, priority: PriorityLevel) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const TodoList: React.FC<TodoListProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('medium');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue.trim(), priority);
    setInputValue('');
  };

  const priorityScore = { high: 3, medium: 2, low: 1 };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    return priorityScore[b.priority] - priorityScore[a.priority];
  });

  const getPriorityColor = (p: PriorityLevel) => {
    switch (p) {
      case 'high': return 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400';
      case 'medium': return 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-400';
      case 'low': return 'bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400';
    }
  };

  return (
    <div className="bg-white/60 dark:bg-brand-darkless/60 backdrop-blur-xl border border-white/50 dark:border-white/5 p-8 rounded-[40px] w-full max-w-md mx-auto flex flex-col h-full max-h-[600px] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-display font-bold text-slate-800 dark:text-white">
          Tasks
        </h2>
        <span className="bg-brand-primary/10 text-brand-primary text-xs font-bold px-3 py-1 rounded-full">
            {tasks.filter(t => !t.completed).length} Remaining
        </span>
      </div>
      
      <form onSubmit={handleSubmit} className="mb-8">
        <div className="relative group">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="w-full bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-white/10 rounded-2xl px-4 py-4 pr-12 text-slate-700 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-primary/50 transition-all shadow-sm"
          />
          <button 
            type="submit"
            disabled={!inputValue.trim()}
            className="absolute right-2 top-2 bottom-2 bg-brand-primary text-white p-2 rounded-xl hover:bg-brand-secondary transition-colors disabled:opacity-50 disabled:hover:bg-brand-primary"
          >
            <Plus size={20} />
          </button>
        </div>
        
        {/* Priority Selection */}
        <div className="flex gap-3 mt-3">
          {(['low', 'medium', 'high'] as PriorityLevel[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`text-xs font-semibold px-3 py-1.5 rounded-lg capitalize transition-all border ${
                priority === p 
                  ? 'bg-slate-800 text-white dark:bg-white dark:text-slate-800 border-transparent' 
                  : 'bg-transparent text-slate-500 border-slate-200 dark:border-slate-700 hover:border-slate-400'
              }`}
            >
              {p}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {sortedTasks.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-slate-400 text-center">
            <div className="w-16 h-16 bg-slate-100 dark:bg-slate-800 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={32} className="opacity-50" />
            </div>
            <p className="font-medium">You're all caught up!</p>
            <p className="text-xs mt-1">Add a task to get started.</p>
          </div>
        )}
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-center gap-3 p-4 bg-white dark:bg-slate-800/40 rounded-2xl border border-transparent hover:border-brand-primary/20 transition-all shadow-sm ${task.completed ? 'opacity-60 bg-slate-50 dark:bg-slate-800/20' : ''}`}
          >
            <button 
              onClick={() => onToggleTask(task.id)}
              className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                  task.completed 
                  ? 'bg-green-500 border-green-500 text-white' 
                  : 'border-slate-300 dark:border-slate-600 hover:border-brand-primary text-transparent'
              }`}
            >
              <Check size={14} strokeWidth={3} />
            </button>
            
            <div className="flex-1 min-w-0">
               <span className={`font-medium block truncate ${task.completed ? 'line-through text-slate-400' : 'text-slate-700 dark:text-slate-200'}`}>
                {task.text}
              </span>
              {!task.completed && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded inline-block mt-1 capitalize ${getPriorityColor(task.priority)}`}>
                   {task.priority}
                </span>
              )}
            </div>

            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;