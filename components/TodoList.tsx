import React, { useState } from 'react';
import { Plus, Trash2, Check, ArrowUp, ArrowDown, AlertCircle } from 'lucide-react';
import { Task, PriorityLevel } from '../types';
import Button from './Button';

interface TodoListProps {
  tasks: Task[];
  onAddTask: (text: string, priority: PriorityLevel) => void;
  onToggleTask: (id: string) => void;
  onDeleteTask: (id: string) => void;
}

const FUN_PLACEHOLDERS = [
  "Conquer the world...",
  "Defeat the laundry monster...",
  "Write the best code ever...",
  "Summon a demon (just kidding)...",
  "Become a wizard...",
  "Acquire forbidden knowledge...",
  "Plot world domination...",
  "Eat a vegetable (maybe)...",
  "Slay the bug dragon...",
];

const TodoList: React.FC<TodoListProps> = ({ tasks, onAddTask, onToggleTask, onDeleteTask }) => {
  const [inputValue, setInputValue] = useState('');
  const [priority, setPriority] = useState<PriorityLevel>('low');
  const [placeholder, setPlaceholder] = useState(FUN_PLACEHOLDERS[0]);

  React.useEffect(() => {
    setPlaceholder(FUN_PLACEHOLDERS[Math.floor(Math.random() * FUN_PLACEHOLDERS.length)]);
  }, [tasks.length]); // Change placeholder when list changes

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    onAddTask(inputValue.trim(), priority);
    setInputValue('');
    setPriority('low'); // Reset priority
  };

  // Sort tasks: High -> Medium -> Low
  const priorityScore = { high: 3, medium: 2, low: 1 };
  
  const sortedTasks = [...tasks].sort((a, b) => {
    // First by completion status (incomplete first)
    if (a.completed !== b.completed) return a.completed ? 1 : -1;
    // Then by priority
    return priorityScore[b.priority] - priorityScore[a.priority];
  });

  const getPriorityColor = (p: PriorityLevel) => {
    switch (p) {
      case 'high': return 'bg-pink-500 text-white';
      case 'medium': return 'bg-yellow-300 text-black';
      case 'low': return 'bg-cyan-300 text-black';
    }
  };

  const getPriorityLabel = (p: PriorityLevel) => {
     switch (p) {
      case 'high': return 'URGENT';
      case 'medium': return 'NORMAL';
      case 'low': return 'CHILL';
    }
  };

  return (
    <div className="bg-white border-4 border-black p-6 rounded-3xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] w-full max-w-md mx-auto flex flex-col h-full max-h-[600px] relative">
       {/* Decorative top bar */}
       <div className="absolute top-0 left-0 right-0 h-6 bg-lime-300 border-b-4 border-black flex items-center px-2 gap-2 rounded-t-[20px]">
        <div className="w-2 h-2 rounded-full bg-black"></div>
        <div className="w-2 h-2 rounded-full bg-black"></div>
      </div>

      <h2 className="text-3xl font-black mb-4 mt-4 funky-font text-center flex items-center justify-center gap-2">
        <span className="bg-black text-white px-2 transform -rotate-2">QUEST</span>
        <span className="transform rotate-2 text-purple-600">LOG</span>
      </h2>

      <form onSubmit={handleSubmit} className="mb-6 flex flex-col gap-3">
        <div className="flex gap-2">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={placeholder}
            className="flex-1 border-2 border-black rounded-lg px-4 py-2 font-bold outline-none focus:ring-2 focus:ring-yellow-300 focus:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] transition-all bg-gray-50 placeholder-gray-400"
          />
          <Button type="submit" variant="secondary" size="md" className="shrink-0">
            <Plus size={24} />
          </Button>
        </div>
        
        {/* Priority Selection */}
        <div className="flex gap-2 justify-center">
          {(['low', 'medium', 'high'] as PriorityLevel[]).map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => setPriority(p)}
              className={`px-3 py-1 rounded-md border-2 border-black font-bold text-xs uppercase transition-all
                ${priority === p ? getPriorityColor(p) + ' shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] -translate-y-1' : 'bg-white hover:bg-gray-100 text-gray-500'}
              `}
            >
              {p === 'high' && '🔥 '}
              {p === 'medium' && '⚡ '}
              {p === 'low' && '☕ '}
              {getPriorityLabel(p)}
            </button>
          ))}
        </div>
      </form>

      <div className="flex-1 overflow-y-auto pr-2 space-y-3 custom-scrollbar">
        {sortedTasks.length === 0 && (
          <div className="text-center text-gray-400 font-bold py-10 italic">
            Quest log empty. Time to relax... or plan world domination?
          </div>
        )}
        {sortedTasks.map((task) => (
          <div
            key={task.id}
            className={`group flex items-center justify-between p-3 rounded-xl border-2 border-black transition-all hover:-translate-y-1 hover:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] relative overflow-hidden ${
              task.completed ? 'bg-gray-100 opacity-60' : 'bg-white'
            }`}
          >
             {/* Priority Indicator Strip */}
            <div className={`absolute left-0 top-0 bottom-0 w-2 ${!task.completed ? getPriorityColor(task.priority) : 'bg-gray-300'}`}></div>

            <div 
              className="flex items-center gap-3 flex-1 cursor-pointer pl-3"
              onClick={() => onToggleTask(task.id)}
            >
              <div className={`w-6 h-6 border-2 border-black rounded flex items-center justify-center transition-colors shrink-0 ${task.completed ? 'bg-black' : 'bg-white'}`}>
                {task.completed && <Check size={16} className="text-white" />}
              </div>
              <div className="flex flex-col">
                 <span className={`font-bold text-lg break-all leading-tight ${task.completed ? 'line-through decoration-2 text-gray-500' : ''}`}>
                  {task.text}
                </span>
                {!task.completed && (
                  <span className={`text-[10px] font-black uppercase tracking-wider w-fit px-1 rounded mt-1 border border-black ${getPriorityColor(task.priority)}`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                )}
              </div>
            </div>
            <button
              onClick={() => onDeleteTask(task.id)}
              className="p-2 text-black hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
              aria-label="Delete task"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TodoList;