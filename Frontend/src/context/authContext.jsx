import { useState, useContext, createContext, useEffect } from "react";
import AuthService from "../services/auth.service";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const temp = localStorage.getItem("user");
    return temp ? JSON.parse(temp) : null; // Load initial member state
  });

  const login = (newUser) => {
    setUser(newUser);
  };

  const logout = () => {
    AuthService.logout();
    setUser(null); // Clear member data after logout
  };

  // Save member data to localStorage whenever it changes
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user"); // Remove member from storage if null
    }
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuthContext = () => useContext(AuthContext);
