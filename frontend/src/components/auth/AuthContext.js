import React, { createContext, useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";

// Create the AuthContext
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null); // Add user state

  useEffect(() => {
    console.log('Token in localStorage:', localStorage.getItem('token'));

    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);  // Set logged-in state if token exists
      // Optionally, you can decode the token to get user info
      const decoded = jwtDecode(token); // Use a library like jwt-decode to decode the token
      console.log('decoded token: ', decoded);
      setUser(decoded); // Assuming the token has user info
      console.log('user after authcontext: ', user);
    }
  }, []);
  useEffect(() => {
    console.log('User state after token decode:', user); // Log the user state whenever it changes
  }, [user]);
  

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setUser(null); // Clear user on logout
    console.log('user logged out!!')
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn, logout, user }}> {/* Provide user in context */}
      {children}
    </AuthContext.Provider>
  );
};