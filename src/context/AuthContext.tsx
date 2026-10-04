import React, { createContext, useContext, useState, useEffect } from 'react';
import { db, User } from '../services/db';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, role?: User['role']) => boolean;
  signup: (name: string, email: string, company?: string, role?: User['role']) => User;
  logout: () => void;
  updateUserRole: (userId: string, newRole: User['role']) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => db.getCurrentUser());

  useEffect(() => {
    // Keep user updated
    if (!user) {
      const current = db.getCurrentUser();
      if (current) setUser(current);
    }
  }, [user]);

  const login = (email: string, defaultRole: User['role'] = 'Sales Employee'): boolean => {
    const users = db.getUsers();
    let found = users.find((u) => u.email.toLowerCase() === email.toLowerCase());

    if (!found) {
      // Auto-register during demo if non-existent
      found = db.saveUser({
        name: email.split('@')[0].replace('.', ' '),
        email,
        role: defaultRole,
      });
    }

    if (found.status === 'Disabled') {
      alert('This user account has been disabled by an administrator.');
      return false;
    }

    db.setCurrentUser(found);
    setUser(found);
    return true;
  };

  const signup = (name: string, email: string, company?: string, role: User['role'] = 'Sales Employee'): User => {
    const newUser = db.saveUser({
      name,
      email,
      company: company || 'Kairoo Organization',
      role,
      status: 'Active',
    });
    db.setCurrentUser(newUser);
    setUser(newUser);
    return newUser;
  };

  const logout = () => {
    db.setCurrentUser(null);
    setUser(null);
  };

  const updateUserRole = (userId: string, newRole: User['role']) => {
    const users = db.getUsers();
    const target = users.find((u) => u.id === userId);
    if (target) {
      target.role = newRole;
      db.saveUser(target);
      if (user?.id === userId) {
        setUser({ ...target });
        db.setCurrentUser(target);
      }
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        updateUserRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
