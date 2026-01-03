import { createContext, useState} from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [role, setRole] = useState("");

  const login = (email, password) => {
    if (email === 'admin@gmail.com' && password === 'admin1234') {
      setIsAuthenticated(true);
      setRole("admin");
      return "admin";
    } else if (email === 'customer@gmail.com' && password === 'customer1234') {
      setIsAuthenticated(true);
      setRole("customer");
      return "customer";
    } else {
      alert('Invalid credentials');
      return null;
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole("");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};