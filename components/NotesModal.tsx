import React from 'react';
import { X, Feather, Scroll } from 'lucide-react';
import { Task } from '../types';
import Button from './Button';

interface NotesModalProps {
  isOpen: boolean;
  onClose: () => void;
  tasks: Task[];
  onUpdateTask: (id: string, updates: Partial<Task>) => void;
}

const NotesModal: React.FC<NotesModalProps> = ({ isOpen, onClose, tasks, onUpdateTask }) => {
  if (!isOpen) return null;

  const activeTasks = tasks.filter(t => !t.completed).sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-white dark:bg-slate-900 w-full max-w-2xl max-h-[85vh] flex flex-col rounded-3xl shadow-2xl overflow-hidden border border-slate-100 dark:border-slate-800">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-slate-100 dark:border-slate-800">
          <h2 className="text-xl font-display font-bold text-slate-800 dark:text-white flex items-center gap-2">
            <Scroll className="w-5 h-5 text-brand-primary" />
            Task Notes
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
          {activeTasks.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center text-slate-400">
              <Scroll size={48} className="mb-4 opacity-20" />
              <p className="font-medium">No active tasks.</p>
              <p className="text-sm mt-1">Add tasks to start taking notes!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-6">
              {activeTasks.map(task => (
                <div key={task.id} className="bg-white dark:bg-slate-800 rounded-2xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                  
                  <div className="flex items-center gap-3 mb-3">
                      <div className={`w-2 h-2 rounded-full ${
                        task.priority === 'high' ? 'bg-red-400' : 
                        task.priority === 'medium' ? 'bg-orange-400' : 'bg-green-400'
                      }`}></div>
                      <h3 className="font-semibold text-slate-700 dark:text-slate-200">
                        {task.text}
                      </h3>
                  </div>

                  <div className="relative">
                    <textarea
                      value={task.notes || ''}
                      onChange={(e) => onUpdateTask(task.id, { notes: e.target.value })}
                      placeholder="Jot down ideas, links, or subtasks..."
                      className="w-full h-24 p-3 bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-xl text-slate-600 dark:text-slate-300 text-sm focus:border-brand-primary focus:ring-1 focus:ring-brand-primary/50 resize-none transition-all outline-none"
                    />
                  </div>

                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="p-4 border-t border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900 flex justify-end">
             <Button onClick={onClose} variant="primary" size="md">
                Save & Close
             </Button>
        </div>
      </div>
    </div>
  );
};

export default NotesModal;