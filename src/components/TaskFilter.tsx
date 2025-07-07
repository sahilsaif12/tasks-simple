import React from 'react'
import { TaskFilter as FilterType } from '../types/Task';
import { CheckCircle, Clock, Target } from 'lucide-react';

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  taskCounts: {
    all: number;
    completed: number;
    pending: number;
  };
}

const TaskFilter: React.FC<TaskFilterProps> = ({ currentFilter, onFilterChange, taskCounts }) => {
    const filters: { 
    key: FilterType; 
    label: string; 
    count: number;
    icon: React.ReactNode;
    gradient: string;
  }[] = [
    { 
      key: 'all', 
      label: 'All Missions', 
      count: taskCounts.all,
      icon: <Target className="h-4 w-4" />,
      gradient: 'from-purple-500 to-blue-500'
    },
    { 
      key: 'pending', 
      label: 'Active', 
      count: taskCounts.pending,
      icon: <Clock className="h-4 w-4" />,
      gradient: 'from-orange-500 to-red-500'
    },
    { 
      key: 'completed', 
      label: 'Completed', 
      count: taskCounts.completed,
      icon: <CheckCircle className="h-4 w-4" />,
      gradient: 'from-green-500 to-emerald-500'
    },
  ];
  return (
    <div className="bg-white/10 backdrop-blur-xl -z-20 rounded-3xl shadow-2xl p-6 mb-8 border border-white/20">
  <div className="flex flex-wrap gap-4">
    {filters.map((filter) => (
      <button
        key={filter.key}
        onClick={() => onFilterChange(filter.key)}
        className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
          currentFilter === filter.key
            ? `bg-gradient-to-r ${filter.gradient} text-white shadow-2xl`
            : 'bg-white/10 text-gray-300 hover:bg-white/20 border border-white/20'
        }`}
      >
        {filter.icon}
        <span>{filter.label}</span>

        <span
          className={`inline-block text-sm font-bold px-3 py-1 rounded-full border ${
            currentFilter === filter.key
              ? 'bg-white/20 text-white border-white/20'
              : 'bg-gradient-to-r from-purple-500/20 to-blue-500/20 text-gray-300 border-white/10'
          }`}
        >
          {filter.count}
        </span>
      </button>
    ))}

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
                
            </div>
          
          </div>
  </div>
</div>

  )
}

export default TaskFilter