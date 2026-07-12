import { createContext, useContext, useState, useEffect } from 'react';
import { fetchMe, logoutUser, getTokens } from '../services/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // On mount, check if we have tokens and fetch the user profile
  useEffect(() => {
    async function loadUser() {
      const { access } = getTokens();
      if (access) {
        const userData = await fetchMe();
        if (userData) {
          setUser(userData);
        }
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  const login = (userData) => {
    setUser(userData);
  };

  const logout = () => {
    logoutUser();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
