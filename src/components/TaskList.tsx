import React from 'react'
import { Task } from '../types/Task';
import TaskItem from './TaskItem';
import { BookOpenCheck } from 'lucide-react';
interface TaskListProps {
  tasks: Task[];
  onToggleComplete: (id: string) => void;
  onEdit: (task: Task) => void;
  onDelete: (id: string) => void;
}
const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleComplete, onEdit, onDelete }) => {
    if (tasks.length === 0) {
    return (
      <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-16 text-center border border-white/20">
        <div className="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
          <BookOpenCheck  className="h-12 w-12 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-3">No tasks found</h3>
      </div>
    );
  }
  return (
     <div className="space-y-4">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onToggleComplete={onToggleComplete}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  )
}

export default TaskList