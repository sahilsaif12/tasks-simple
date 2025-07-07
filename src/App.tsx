import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import TaskDashboard from './components/TaskDashboard';
import { CURRENT_USER_KEY, getCurrentUser } from './utils/localStorage';

const App = () => {
  const [user, setUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    setIsLoading(true);
    const currentUser = getCurrentUser();
    if (currentUser) {
      console.log('Current user:', currentUser);
      setUser(currentUser);
    }
    setIsLoading(false); 
  
  }, []);

  const handleLogin = (username: string) => {
    setUser(username);
  };

  const handleLogout = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
    setUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 via-state-900 to-slate-950  relative overflow-hidden">
      {isLoading ? (
        <div className="flex items-center space-x-2">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span>Loading...</span>
        </div>
              )
            :
            user ? (
              <TaskDashboard user={user} onLogout={handleLogout} />
            ) : (
        <Login onLogin={handleLogin} />
      )
            }

    </div>
  );
};

export default App;