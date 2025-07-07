import { Filter, Flag, LogOut, Plus, Sparkles, Zap } from 'lucide-react';
import React, { useEffect, useState } from 'react'
import SearchBar from './SearchBar';
import Taskform from './TaskForm';
import TaskFilter from './TaskFilter';
import TaskList from './TaskList';
import { PriorityFilter, Task ,TaskFilter as FilterType} from '../types/Task';
import { v4 as uuid } from 'uuid';
import { getUserTasks, updateUserTasks } from '../utils/localStorage';
import PriorityDropdown from './PriorityDropdown';

interface TaskDashboardProps {
  user: string;
  onLogout: () => void;
}

const  TaskDashboard:React.FC<TaskDashboardProps> = ({ user, onLogout }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filter, setFilter] = useState<FilterType>('all');
const [hasLoadedTasks, setHasLoadedTasks] = useState(false);

    useEffect(() => {
    const userTasks = getUserTasks(user);
    console.log('User tasks loaded:', userTasks);
    setTasks(userTasks);
        setHasLoadedTasks(true); 

  }, [user]);

useEffect(() => {
  if (user && hasLoadedTasks) {
    updateUserTasks(user, tasks);
    console.log('Tasks updated for user:', user, tasks);
  }
}, [tasks, user, hasLoadedTasks]);

  const addTask = (taskData: { 
    title: string; 
    description: string; 
    priority: 'low' | 'medium' | 'high';
    dueDate?: string;
    category?: string;
  }) => {
    const newTask: Task = {
      id:uuid(),
      title: taskData.title,
      description: taskData.description,
      completed: false,
      createdAt: new Date().toISOString(),
      priority: taskData.priority,
      dueDate: taskData.dueDate,
      category: taskData.category,
    };
    setTasks([newTask, ...tasks]);
    setShowTaskForm(false);
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, ...updates } : task
    ));
    setEditingTask(null);
  };

   const deleteTask = (id: string) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const toggleTaskCompletion = (id: string) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

    const categories = Array.from(new Set(tasks.filter(t => t.category).map(t => t.category!)));

    const filteredTasks = tasks.filter(task => {
    // Status filter
    const statusMatch = filter === 'all' || 
      (filter === 'completed' && task.completed) || 
      (filter === 'pending' && !task.completed);
    
    // Priority filter
    const priorityMatch = priorityFilter === 'all' || task.priority === priorityFilter;
    
    // Category filter
    const categoryMatch = categoryFilter === 'all' || task.category === categoryFilter;
    
    // Search filter
    const searchMatch = searchTerm === '' || 
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (task.category && task.category.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return statusMatch && priorityMatch && categoryMatch && searchMatch;
  });

     const taskCounts = {
    all: tasks.length,
    completed: tasks.filter(t => t.completed).length,
    pending: tasks.filter(t => !t.completed).length,
  };

  return (
  <div className="min-h-screen p-4 relative">
  <div className="max-w-7xl mx-auto relative z-10 flex flex-col">
    <div className="bg-white/10 backdrop-blur-xl  rounded-xl shadow-2xl p-4 mb-4 border border-white/20">
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 p-2 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl flex items-center justify-center shadow-lg">
            <svg id="logo-70" width="78" height="30" viewBox="0 0 78 30" fill="none" xmlns="http://www.w3.org/2000/svg"> <path d="M18.5147 0C15.4686 0 12.5473 1.21005 10.3934 3.36396L3.36396 10.3934C1.21005 12.5473 0 15.4686 0 18.5147C0 24.8579 5.14214 30 11.4853 30C14.5314 30 17.4527 28.7899 19.6066 26.636L24.4689 21.7737C24.469 21.7738 24.4689 21.7736 24.4689 21.7737L38.636 7.6066C39.6647 6.57791 41.0599 6 42.5147 6C44.9503 6 47.0152 7.58741 47.7311 9.78407L52.2022 5.31296C50.1625 2.11834 46.586 0 42.5147 0C39.4686 0 36.5473 1.21005 34.3934 3.36396L15.364 22.3934C14.3353 23.4221 12.9401 24 11.4853 24C8.45584 24 6 21.5442 6 18.5147C6 17.0599 6.57791 15.6647 7.6066 14.636L14.636 7.6066C15.6647 6.57791 17.0599 6 18.5147 6C20.9504 6 23.0152 7.58748 23.7311 9.78421L28.2023 5.31307C26.1626 2.1184 22.5861 0 18.5147 0Z" className="ccustom" fill="#fff"></path> <path d="M39.364 22.3934C38.3353 23.4221 36.9401 24 35.4853 24C33.05 24 30.9853 22.413 30.2692 20.2167L25.7982 24.6877C27.838 27.8819 31.4143 30 35.4853 30C38.5314 30 41.4527 28.7899 43.6066 26.636L62.636 7.6066C63.6647 6.57791 65.0599 6 66.5147 6C69.5442 6 72 8.45584 72 11.4853C72 12.9401 71.4221 14.3353 70.3934 15.364L63.364 22.3934C62.3353 23.4221 60.9401 24 59.4853 24C57.0498 24 54.985 22.4127 54.269 20.2162L49.798 24.6873C51.8377 27.8818 55.4141 30 59.4853 30C62.5314 30 65.4527 28.7899 67.6066 26.636L74.636 19.6066C76.7899 17.4527 78 14.5314 78 11.4853C78 5.14214 72.8579 0 66.5147 0C63.4686 0 60.5473 1.21005 58.3934 3.36396L39.364 22.3934Z" className="ccustom" fill="#141F33"></path> </svg>
          </div>
          <div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
              TaskFlow
            </h1>
            <p className="text-gray-300 mt-2 flex items-center">
              <Zap className="h-4 w-4 mr-1 text-yellow-400" />
              Welcome back, {user}! Ready for today's tasks?
            </p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button 
            onClick={onLogout}
            className="bg-red-500/10 border border-red-400/30 text-red-300 hover:bg-red-500/20 hover:border-red-400/50 backdrop-blur-sm py-2 px-4 rounded-lg transition-all duration-300 flex items-center"
          >
            <LogOut className="mr-2 h-4 w-4" />
            Log out
          </button>
        </div>
      </div>
    </div>

    <div className="flex w-5/6 self-center  justify-between h-20  ">
      <div className='flex  gap-5'>

    <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />

    <div className="bg-white/10 backdrop-blur-xl z-50 rounded-2xl shadow-2xl   self-start  border border-white/20">
      <div className="flex items-center p-2 gap-x-2  justify-center  self-start">
        <Filter className="h-5 w-10 text-white" />
        <PriorityDropdown
      value={priorityFilter}
      onChange={(val) => setPriorityFilter(val)}
    /> 

               <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="w-full rounded-lg bg-slate-800 border-gray-400 p-2 focus:border-gray-400 focus:ring-gray-900 focus:ring-1 outline-none"
        >
          <option value="all" className='bg-slate-950/90 '> Categories</option>
           {categories.map(category => (
                      <option className='bg-slate-950/90 ' value={category}>{category}</option>
                  ))}
        </select>
              
      </div>
           
    </div>
      </div>
     <div className="mb-8">
      <button
        onClick={() => setShowTaskForm(true)}
        className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white font-semibold py-4 px-8 rounded-2xl shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105"
      >
        <Plus className="mr-2 h-5 w-5 inline" />
        Create New Task
      </button>
    </div>
    </div>

    {(showTaskForm || editingTask) && (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
        <Taskform
          task={editingTask}
          onSubmit={editingTask ? 
            (data) => updateTask(editingTask.id, data) : 
            addTask
          }
          onCancel={() => {
            setShowTaskForm(false);
            setEditingTask(null);
          }}
        />
      </div>
    )}

    {/* Filter Tabs */}
    <div className="w-5/6 self-center">
    <TaskFilter
      currentFilter={filter}
      onFilterChange={setFilter}
      taskCounts={taskCounts}
    />
    </div>

    {/* Results Summary */}
    {(searchTerm || priorityFilter !== 'all' || categoryFilter !== 'all') && (
      <div className="bg-white/10 backdrop-blur-xl rounded-2xl w-5/6 self-center p-4 mb-6 border border-white/20">
        <p className="text-gray-300 text-sm">
          Showing {filteredTasks.length} task{filteredTasks.length !== 1 ? 's' : ''} 
          {searchTerm && ` matching "${searchTerm}"`}
          {priorityFilter !== 'all' && ` with ${priorityFilter} priority`}
          {categoryFilter !== 'all' && ` in "${categoryFilter}" category`}
        </p>
      </div>
    )}

    {/* Task List */}
    <div className="w-5/6 self-center">
    
    <TaskList
      tasks={filteredTasks}
      onToggleComplete={toggleTaskCompletion}
      onEdit={setEditingTask}
      onDelete={deleteTask}
    />
    </div>
  </div>
</div>
  )
}

export default TaskDashboard