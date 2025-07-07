import React, { useState } from 'react'
import { Task } from '../types/Task';
import { Calendar, Clock, Edit2, Tag, Trash2 } from 'lucide-react';
interface TaskItemProps {
  task: Task;
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
const TaskItem: React.FC<TaskItemProps> = ({ task, onToggleComplete, onEdit, onDelete }) => {

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatDueDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = date.getTime() - now.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays < 0) return 'Overdue';
    if (diffDays === 0) return 'Due today';
    if (diffDays === 1) return 'Due tomorrow';
    return `Due in ${diffDays} days`;
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'border-red-400 bg-red-3-00/30';
      case 'medium': return 'border-yellow-400 bg-yellow-3-00/30';
      case 'low': return 'border-green-400 bg-green-3-00/30';
      default: return 'border-blue-400';
    }
  };

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'high': return { color: 'bg-gradient-to-r from-red-500 to-red-600', text: '🔴 High', textColor: 'text-white' };
      case 'medium': return { color: 'bg-gradient-to-r from-yellow-500 to-yellow-600', text: '🟡 Medium', textColor: 'text-white' };
      case 'low': return { color: 'bg-gradient-to-r from-green-500 to-green-600', text: '🟢 Low', textColor: 'text-white' };
      default: return { color: 'bg-gray-200', text: priority, textColor: 'text-gray-800' };
    }
  };

  const isOverdue = task.dueDate && new Date(task.dueDate) < new Date() && !task.completed;
  const priority = getPriorityBadge(task.priority);

  return (
   <div
  className={`bg-gray-700/50 backdrop-blur-xl rounded-2xl shadow-lg border-l-4 p-6 transition-all duration-300 hover:shadow-xl hover:scale-[1.02] animate-fade-in ${
    task.completed 
      ? 'border-green-500 bg-green-200/30' 
      : getPriorityColor(task.priority)
  } ${isOverdue ? 'ring-2 ring-red-300 ring-opacity-50' : ''}`}
>
  <div className="flex  items-start gap-4">
    <input
      type="checkbox"
      checked={task.completed}
      onChange={() => onToggleComplete(task.id)}
      className="mt-1 h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
    />

    <div className="flex-1  min-w-0">
      <div className="flex items-start justify-between mb-3">
        <h3 className={`text-lg font-semibold transition-all ${
          task.completed 
            ? 'text-gray-200 line-through' 
            : 'text-gray-300'
        }`}>
          {task.title}
        </h3>

        <div className="flex gap-2 ml-4">
          <span className={`px-3 py-1 text-xs font-medium rounded-full ${priority.color} ${priority.textColor}`}>
            {priority.text}
          </span>
          {task.category && (
            <span className="flex items-center bg-purple-100 text-purple-800 px-3 py-1 text-xs font-medium rounded-full">
              <Tag className="h-3 w-3 mr-1" />
              {task.category}
            </span>
          )}
        </div>
      </div>

      {task.description && (
        <p className={`mb-3 text-sm transition-all ${
          task.completed 
            ? 'text-gray-300' 
            : 'text-gray-400'
        }`}>
          {task.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-4 text-xs text-gray-400">
        <div className="flex items-center gap-1">
          <Clock className="h-3 w-3" />
          <span>Created {formatDate(task.createdAt)}</span>
        </div>

        {task.dueDate && (
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full ${
            isOverdue 
              ? 'bg-red-100 text-red-600' 
              : task.completed 
                ? 'bg-green-100 text-green-600'
                : 'bg-blue-100 text-blue-600'
          }`}>
            <Calendar className="h-3 w-3" />
            <span className="font-medium">{formatDueDate(task.dueDate)}</span>
          </div>
        )}
      </div>
    </div>

    <div className="flex gap-2">
      <span
        onClick={() => onEdit(task)}
        className="h-8 w-8 p-0 flex items-center justify-center text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded transition-colors"
      >
        <Edit2 className="h-4 w-4" />
      </span>

      <span
       onClick={() => onDelete(task.id)}
        className="h-8 w-8 p-0 flex items-center justify-center text-gray-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
      >
        <Trash2 className="h-4 w-4" />
      </span>
    </div>
  </div>



</div>

  )
}

export default TaskItem