import React, { createContext, useState, ReactNode, useCallback, useEffect } from 'react';
import { User } from '../types';
import { DEMO_USERS } from '../constants';
import { useToast } from '../hooks/useToast';

interface UserContextType {
  currentUser: User | null;
  users: User[];
  login: (email: string, pass: string) => boolean;
  logout: () => void;
  register: (name: string, email: string, pass: string) => boolean;
}

export const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(() => {
    try {
      const storedUsers = localStorage.getItem('users');
      return storedUsers ? JSON.parse(storedUsers) : DEMO_USERS;
    } catch {
      return DEMO_USERS;
    }
  });

  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const addToast = useToast();
  
  // Effect to initialize currentUser from localStorage once, after users are set
  useEffect(() => {
    try {
      const storedUserId = localStorage.getItem('currentUserId');
      if (storedUserId) {
        const userId = JSON.parse(storedUserId);
        const user = users.find((u: User) => u.id === userId) || null;
        setCurrentUser(user);
      }
    } catch {
      setCurrentUser(null);
    }
  }, []); // Runs only on mount

  useEffect(() => {
    try {
      localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.error('Failed to save users to localStorage', e);
    }
  }, [users]);
  
  useEffect(() => {
    try {
        if(currentUser) {
            localStorage.setItem('currentUserId', JSON.stringify(currentUser.id));
        } else {
            localStorage.removeItem('currentUserId');
        }
    } catch (e) {
        console.error('Failed to save current user to localStorage', e);
    }
  }, [currentUser]);


  const login = useCallback((email: string, pass: string): boolean => {
    // In a real app, you'd check email and a hashed password.
    // Here we just find the first user for simplicity of demo.
    const user = users[0]; 
    if (user) {
        setCurrentUser(user);
        addToast(`Welcome back, ${user.name}!`, 'success');
        return true;
    }
    addToast('Invalid credentials. Please try again.', 'error');
    return false;
  }, [users, addToast]);

  const logout = useCallback(() => {
    setCurrentUser(null);
    addToast('You have been logged out.', 'info');
  }, [addToast]);

  const register = useCallback((name: string, email: string, pass: string): boolean => {
    if (users.some(u => u.name.toLowerCase() === name.toLowerCase())) {
      addToast('A user with this name already exists.', 'error');
      return false;
    }
    const newUser: User = {
      id: Math.max(...users.map(u => u.id), 0) + 1,
      name,
      isVerified: false, // New users are not verified by default
    };
    setUsers(prev => [...prev, newUser]);
    setCurrentUser(newUser);
    addToast(`Welcome to IT.exe, ${name}! Your account is created.`, 'success');
    return true;
  }, [users, addToast]);


  return (
    <UserContext.Provider value={{ currentUser, users, login, logout, register }}>
      {children}
    </UserContext.Provider>
  );
};