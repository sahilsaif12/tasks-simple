import React, { useEffect, useState } from 'react'
import { Task } from '../types/Task';
import { Calendar, Flag, Save, Tag, X } from 'lucide-react';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (data: { 
    title: string; 
    description: string; 
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    category?: string;
  }) => void;
  onCancel: () => void;
}

const Taskform: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
   const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState<'low' | 'medium' | 'high'>('medium');
  const [dueDate, setDueDate] = useState('');
  const [category, setCategory] = useState('');
  const [titleError, settitleError] = useState(false);

  useEffect(() => {
    if (task) {
      setTitle(task.title);
      setDescription(task.description);
      setPriority(task.priority);
      setDueDate(task.dueDate || '');
      setCategory(task.category || '');
    }
  }, [task]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (title.trim()) {
      onSubmit({
        title: title.trim(),
        description: description.trim(),
        priority,
        dueDate: dueDate || undefined,
        category: category.trim() || undefined,
      });
      setTitle('');
      setDescription('');
      setPriority('medium');
      setDueDate('');
      setCategory('');
    }else{
      
      settitleError(true);
      setTimeout(() => {
        settitleError(false);
      }, 2000);
    }
  };
  return (
    <div className="w-full max-w-lg animate-scale-in bg-slate-900 backdrop-blur-xl shadow-2xl border border-white/20 rounded-2xl p-6">
  <div className="flex flex-row items-center justify-between pb-4">
    <h2 className="text-xl font-semibold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
      {task ? 'Edit Task' : 'Create New Task'}
    </h2>
    <div
      onClick={onCancel}
      className="h-8 w-8 p-0 flex items-center justify-center rounded hover:bg-slate-800 cursor-pointer hover:text-red-400"
    >
      <X className="h-4 w-4" />
    </div>
  </div>

  <form onSubmit={handleSubmit} className="space-y-6">
    <div className="space-y-2">
      <label htmlFor="title" className="text-sm font-medium text-gray-400 flex items-center gap-2">
        <Flag className="h-4 w-4" />
        Task Title *  {titleError && <span className='text-red-500'>Title is required</span>}
      </label>
      <input
        id="title"
        type="text"
        placeholder="Enter task title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        // required
        className="w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 outline-none"
      />
    </div>

    <div className="space-y-2">
      <label htmlFor="description" className="text-sm font-medium text-gray-600">
        Task description
      </label>
      <textarea
        id="description"
        placeholder="Describe your task details..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        rows={3}
        className="w-full rounded-lg border border-gray-300 p-2 resize-none focus:border-purple-400 focus:ring-purple-400 focus:ring-2 outline-none"
      />
    </div>

    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-600">Priority Level</label>
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value as 'low' | 'medium' | 'high')}
          className="w-full rounded-lg bg-slate-800 border-gray-300 p-2 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 outline-none"
        >
          <option className='bg-slate-950/90  hover:bg-amber-400 ' value="low">🟢 Low</option>
          <option  className='bg-slate-950/90 ' value="medium">🟡 Medium</option>
          <option  className='bg-slate-950/90 ' value="high">🔴 High</option>

        </select>
      </div>

      <div className="space-y-2">
        <label htmlFor="dueDate" className="text-sm font-medium text-gray-600 flex items-center gap-2">
          <Calendar className="h-4 w-4" />
          Due Date
        </label>
        <input
          id="dueDate"
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 outline-none"
        />
      </div>
    </div>

    <div className="space-y-2">
      <label htmlFor="category" className="text-sm font-medium text-gray-600 flex items-center gap-2">
        <Tag className="h-4 w-4" />

        Category
      </label>
      <input
        id="category"
        type="text"
        placeholder="e.g., Work, Personal, Study..."
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="w-full rounded-lg border border-gray-300 p-2 focus:border-purple-400 focus:ring-purple-400 focus:ring-2 outline-none"
      />
    </div>

    <div className="flex gap-3 pt-4">
      <button
        type="submit"
        disabled={!title.trim()}
        className="flex-1 rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-2 shadow-lg"
      >
        <div className="flex justify-center items-center gap-2">
          <Save className="h-4 w-4" />
          {task ? 'Update task' : 'Create task'}
        </div>
      </button>
      <button
        type="button"
        onClick={onCancel}
        className="flex-1 rounded-lg border border-gray-300 text-red-400 !bg-gray-800 font-semibold py-2 hover:bg-gray-50"
      >
        Cancel
      </button>
    </div>
  </form>
</div>

  )
}

export default Taskform