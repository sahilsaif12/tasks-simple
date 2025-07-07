import { Task } from '../types/Task';
import { User } from '../types/User';
const USERS_KEY = 'taskTracker_users';
export const CURRENT_USER_KEY = 'taskTracker_currentUser';


export const getCurrentUser = (): string | null => {
  try {
    return localStorage.getItem(CURRENT_USER_KEY);
  } catch (error) {
    console.error('Error loading current user from localStorage:', error);
    return null;
  }
};

export const setCurrentUser = (username: string): void => {
  try {
    localStorage.setItem(CURRENT_USER_KEY, username);
  } catch (error) {
    console.error('Error saving current user to localStorage:', error);
  }
};

export const getStoredUsers = (): User[] => {
  try {
    const stored = localStorage.getItem(USERS_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Error loading users from localStorage:', error);
    return [];
  }
};

export const createOrGetUser = (username: string): User => {
  const users = getStoredUsers();
  let user = users.find(u => u.username === username);
  
  if (!user) {
    user = {
      username,
      createdAt: new Date().toISOString(),
      tasks: []
    };
    users.push(user);
    saveUsersToStorage(users);
  }
  
  return user;
};

export const saveUsersToStorage = (users: User[]): void => {
  try {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error saving users to localStorage:', error);
  }
};


export const getUserTasks = (username: string): Task[] => {
  const users = getStoredUsers();
  const user = users.find(u => u.username === username);
  console.log('User tasks:',username, user, user?.tasks);
  return user ? user.tasks : [];
};



export const updateUserTasks = (username: string, tasks: Task[]): void => {
  const users = getStoredUsers();
  const userIndex = users.findIndex(u => u.username === username);
  console.log('Updating tasks for user:', username, 'Tasks:', tasks);
  if (userIndex !== -1) {
    users[userIndex].tasks = tasks;
    saveUsersToStorage(users);
  }
};
