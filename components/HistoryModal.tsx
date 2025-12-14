import React from 'react';
import { X, Archive, CheckCircle2 } from 'lucide-react';
import { Task } from '../types';
import Button from './Button';

interface HistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
}

const HistoryModal: React.FC<HistoryModalProps> = ({ isOpen, onClose, tasks }) => {
  if (!isOpen) return null;

  const completedTasks = tasks.filter(t => t.completed).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-lg max-h-[80vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Archive className="w-5 h-5 text-brand-primary" />
            History
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
          {completedTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <Archive size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No completed tasks yet.</p>
              <p className="text-sm mt-1">Focus on your current tasks to fill this list!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {completedTasks.map(task => (
                <div key={task.id} className="flex gap-4 p-4 bg-white dark:bg-slate-800 rounded-2xl border border-slate-100 dark:border-slate-700/50">
                  <div className="mt-1">
                     <CheckCircle2 size={20} className="text-green-500" />
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-slate-700 dark:text-slate-200 leading-tight line-through opacity-70">
                      {task.text}
                    </p>
                    <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                      <span className="capitalize font-semibold text-slate-500 dark:text-slate-400">
                        {task.priority} Priority
                      </span>
                      <span>•</span>
                      <span>
                        {new Date(task.createdAt).toLocaleDateString(undefined, { dateStyle: 'medium' })}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end">
             <Button onClick={onClose} variant="ghost" size="md">
                Close
             </Button>
        </div>
      </div>
    </div>
  );
};

export default HistoryModal;