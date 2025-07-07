import { LogIn, Sparkles, User } from 'lucide-react';
import React, { useState } from 'react'
import { createOrGetUser, setCurrentUser } from '../utils/localStorage';

interface LoginProps {
  onLogin: (username: string) => void;
}

const  Login: React.FC<LoginProps> = ({ onLogin }) => {

  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      setIsLoading(true);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const user = createOrGetUser(username.trim());
      setCurrentUser(user.username);
      onLogin(user.username);
      
      setIsLoading(false);
    }
  };
    return(
    <div className="min-h-screen flex items-center justify-center p-4 relative ">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 to-blue-600/10 backdrop-blur-3xl "></div>

      <div className="w-full max-w-md relative z-10 bg-white/10 backdrop-blur-xl border border-white/10 shadow-2xl shadow-slate-950 rounded-lg p-6 animate-fade-in">
        <div className="text-center space-y-4">
          <div className="mx-auto w-20 h-20 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full flex items-center justify-center mb-4 shadow-lg relative">
            <User className="h-10 w-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-200 bg-clip-text text-transparent">
            Welcome to TaskFlow
          </h2>
          <p className="text-gray-300 text-lg">
            Your personal task manager
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6 mt-6">
          <div className="space-y-2">
            <label htmlFor="username" className="text-sm font-medium text-gray-200">
              Username
            </label>
            <input
              id="username"
              type="text"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-white/10 border border-none text-white placeholder-gray-400 focus:border-none focus:outline-none focus:ring-1 focus:ring-slate-400/50 rounded-lg p-2.5 backdrop-blur-"
              required
              disabled={isLoading}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300  hover:shadow-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed "
            disabled={!username.trim() || isLoading}
          >
            {isLoading ? (
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                <span>Loading...</span>
              </div>
            ) : (
              <>
                <LogIn className="mr-2 h-5 w-5" />
                Get Inside Tasks
              </>
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-xs text-gray-400 flex gap-3 items-center">
            New here? Don't worry, we'll create your account automatically!    
                     <Sparkles className="h-4 w-4 text-yellow-400 animate-pulse" />

          </p>
        </div>
      </div>
    </div>
  );
}

export default Login