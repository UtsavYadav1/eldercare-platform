import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

const MOCK_USER = {
  id: 1,
  name: "Ramesh Gupta",
  email: "ramesh@example.com",
  phone: "+91 98100 12345",
  role: "user", // 'user' | 'caregiver' | 'admin'
  initials: "RG",
  memberSince: "January 2025",
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  const login = async (email, password, role = 'user') => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1000));
    setUser({ ...MOCK_USER, role, email });
    setLoading(false);
    return true;
  };

  const logout = () => setUser(null);

  const signup = async (data) => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 1200));
    setUser({ ...MOCK_USER, ...data, role: 'user' });
    setLoading(false);
    return true;
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, signup, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
