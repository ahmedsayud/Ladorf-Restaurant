import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the shape of the user object
interface User {
  id: number;
  name: string;
  mobile: string;
  address: string;
}

// Define the context type
interface AuthContextType {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (token: string, userData: User) => void;
  logout: () => void;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Create the provider component
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  // Effect to run on initial component mount to check localStorage
  useEffect(() => {
    try {
      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');
      
      if (storedToken && storedUser && storedUser !== 'undefined') {
        try {
          setUser(JSON.parse(storedUser));
        } catch (e) {
          localStorage.removeItem('user');
        }
        setToken(storedToken);
      }
    } catch (error) {
      // Clear potentially corrupted storage to prevent login loops
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
  }, []); // Empty dependency array ensures this runs only once on mount

  // Login function
  const login = (newToken: string, userData: User) => {
    if (!newToken || !userData) {
      return;
    }
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(userData));
    setToken(newToken);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  // Derived state for authentication status
  const isAuthenticated = !!token;

  const value = { user, token, isAuthenticated, login, logout };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}; 